// src/App.js
import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useAuthenticationStatus } from '@nhost/react';
import Auth from './components/Auth';
import Chat from './components/Chat';
import { Box, CircularProgress } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    secondary: {
      main: '#06d6a0',
      light: '#26de81',
      dark: '#059669',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    surface: {
      main: '#334155',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#cbd5e1',
    },
    divider: '#334155',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#475569',
            },
            '&:hover fieldset': {
              borderColor: '#8b5cf6',
            },
          },
        },
      },
    },
  },
});

function App() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="100vh"
          sx={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          }}
        >
          <CircularProgress size={40} sx={{ color: 'primary.main' }} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isAuthenticated ? <Chat /> : <Auth />}
    </ThemeProvider>
  );
}

export default App;
