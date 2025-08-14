// src/components/Chat.js
import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  Fab,
  CircularProgress,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Add as AddIcon,
  Chat as ChatIcon,
  ExitToApp as ExitIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useSignOut } from '@nhost/react';
import MessagesView from './MessagesView';
import MessageInput from './MessageInput';

const GET_CHATS = gql`
  query GetChats {
    chats(order_by: { created_at: desc }) {
      id
      created_at
    }
  }
`;

const CREATE_CHAT = gql`
  mutation CreateChat {
    insert_chats_one(object: {}) {
      id
    }
  }
`;

const drawerWidth = 320;

const Chat = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut } = useSignOut();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { loading, error, data, refetch } = useQuery(GET_CHATS);
  const [createChat, { loading: creatingChat }] = useMutation(CREATE_CHAT, {
    onCompleted: (data) => {
      setSelectedChatId(data.insert_chats_one.id);
      refetch();
      if (isMobile) setMobileOpen(false);
    }
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      <Box sx={{ 
        p: 2, 
        background: 'linear-gradient(135deg, #8b5cf6 0%, #06d6a0 100%)',
        color: 'white' 
      }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Chat History
        </Typography>
        <Button
          variant="contained"
          fullWidth
          startIcon={<AddIcon />}
          onClick={() => createChat()}
          disabled={creatingChat}
          sx={{
            bgcolor: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            '&:hover': { 
              bgcolor: 'rgba(255,255,255,0.3)',
              transform: 'translateY(-1px)',
            },
          }}
        >
          {creatingChat ? <CircularProgress size={20} color="inherit" /> : 'New Chat'}
        </Button>
      </Box>

      <List sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        {loading && (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress sx={{ color: 'primary.main' }} />
          </Box>
        )}
        {data?.chats?.map((chat) => (
          <ListItem key={chat.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={selectedChatId === chat.id}
              onClick={() => {
                setSelectedChatId(chat.id);
                if (isMobile) setMobileOpen(false);
              }}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 214, 160, 0.2) 100%)',
                  borderLeft: '3px solid',
                  borderLeftColor: 'primary.main',
                  '&:hover': { 
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(6, 214, 160, 0.3) 100%)',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(139, 92, 246, 0.1)',
                },
              }}
            >
              <ChatIcon sx={{ mr: 2, color: selectedChatId === chat.id ? 'primary.main' : 'text.secondary' }} />
              <ListItemText
                primary={`Chat ${chat.id.slice(0, 8)}`}
                secondary={new Date(chat.created_at).toLocaleString()}
                primaryTypographyProps={{ 
                  sx: { fontWeight: selectedChatId === chat.id ? 600 : 400 }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<ExitIcon />}
          onClick={signOut}
          color="error"
          sx={{
            borderColor: 'rgba(220, 38, 38, 0.3)',
            color: '#fca5a5',
            '&:hover': {
              borderColor: 'rgba(220, 38, 38, 0.5)',
              bgcolor: 'rgba(220, 38, 38, 0.1)',
            },
          }}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
      {isMobile && (
        <AppBar position="fixed" sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg, #8b5cf6 0%, #06d6a0 100%)',
        }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
              ChatBot AI
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'background.paper',
              borderRight: '1px solid',
              borderRightColor: 'divider',
              ...(isMobile && { mt: 8 }),
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          ...(isMobile && { mt: 8 }),
        }}
      >
        {selectedChatId ? (
          <>
            <MessagesView chatId={selectedChatId} />
            <MessageInput chatId={selectedChatId} />
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'text.secondary',
              background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
            }}
          >
            <ChatIcon sx={{ fontSize: 80, mb: 2, opacity: 0.7, color: 'primary.main' }} />
            <Typography variant="h5" gutterBottom sx={{ color: 'text.primary', fontWeight: 500 }}>
              Select a chat to start messaging
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Choose an existing conversation or create a new one
            </Typography>
          </Box>
        )}
      </Box>

      {isMobile && !selectedChatId && (
        <Fab
          onClick={() => createChat()}
          disabled={creatingChat}
          sx={{ 
            position: 'fixed', 
            bottom: 16, 
            right: 16,
            background: 'linear-gradient(135deg, #8b5cf6 0%, #06d6a0 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #7c3aed 0%, #059669 100%)',
            },
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
};

export default Chat;
