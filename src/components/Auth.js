// src/components/Auth.js
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  Avatar,
  Chip,
} from '@mui/material';
import {
  AccountCircle,
  Lock,
  Email,
  Visibility,
  VisibilityOff,
  AutoAwesome,
  Chat,
  Security,
  Speed,
} from '@mui/icons-material';
import { useSignInEmailPassword, useSignUpEmailPassword } from '@nhost/react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    signUpEmailPassword,
    isLoading: signUpLoading,
    isError: signUpError,
    error: signUpErrorData
  } = useSignUpEmailPassword();

  const {
    signInEmailPassword,
    isLoading: signInLoading,
    isError: signInError,
    error: signInErrorData
  } = useSignInEmailPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      await signUpEmailPassword(email, password);
    } else {
      await signInEmailPassword(email, password);
    }
  };

  const isLoading = signUpLoading || signInLoading;
  const isError = signUpError || signInError;
  const error = signUpErrorData || signInErrorData;

  const features = [
    { icon: <AutoAwesome />, text: 'AI-Powered Responses' },
    { icon: <Security />, text: 'Secure & Private' },
    { icon: <Speed />, text: 'Lightning Fast' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        position: 'relative',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(6, 214, 160, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
          `,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 4,
            width: '100%',
            alignItems: 'center',
          }}
        >
          {/* Left Side - Features & Branding */}
          {!isMobile && (
            <Fade in={true} timeout={1000}>
              <Box sx={{ color: 'white', pr: 4 }}>
                <Box sx={{ mb: 4 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: 'primary.main',
                      mb: 3,
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #06d6a0 100%)',
                    }}
                  >
                    <Chat sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #06d6a0 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 2,
                    }}
                  >
                    ChatBot AI
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.6 }}>
                    Experience the future of conversation with our advanced AI chatbot. 
                    Get instant, intelligent responses to all your questions.
                  </Typography>
                </Box>

                <Stack spacing={3}>
                  {features.map((feature, index) => (
                    <Slide key={index} direction="right" in={true} timeout={1000 + index * 200}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: 'rgba(139, 92, 246, 0.2)',
                            color: 'primary.main',
                            width: 48,
                            height: 48,
                          }}
                        >
                          {feature.icon}
                        </Avatar>
                        <Typography variant="h6" sx={{ color: 'text.primary' }}>
                          {feature.text}
                        </Typography>
                      </Box>
                    </Slide>
                  ))}
                </Stack>
              </Box>
            </Fade>
          )}

          {/* Right Side - Auth Form */}
          <Fade in={true} timeout={1200}>
            <Card
              elevation={24}
              sx={{
                backdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                borderRadius: 4,
                border: '1px solid rgba(139, 92, 246, 0.2)',
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #8b5cf6 0%, #06d6a0 100%)',
                },
              }}
            >
              <CardContent sx={{ p: isMobile ? 3 : 5 }}>
                <Box textAlign="center" mb={4}>
                  <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                    }}
                  >
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {isSignUp 
                      ? 'Join thousands of users having amazing conversations' 
                      : 'Sign in to continue your AI conversation journey'
                    }
                  </Typography>

                  <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                    {features.map((feature, index) => (
                      <Chip
                        key={index}
                        icon={feature.icon}
                        label={feature.text}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: 'rgba(139, 92, 246, 0.3)',
                          color: 'text.secondary',
                          '& .MuiChip-icon': { color: 'primary.main' },
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                {isError && (
                  <Slide direction="down" in={isError} timeout={300}>
                    <Alert 
                      severity="error" 
                      sx={{ 
                        mb: 3, 
                        bgcolor: 'rgba(220, 38, 38, 0.1)',
                        borderColor: 'rgba(220, 38, 38, 0.3)',
                        color: '#fca5a5'
                      }}
                    >
                      {error?.message || 'Authentication failed'}
                    </Alert>
                  </Slide>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: <Email sx={{ color: 'text.secondary', mr: 1 }} />,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(15, 23, 42, 0.5)',
                          '&:hover': {
                            backgroundColor: 'rgba(15, 23, 42, 0.7)',
                          },
                          '&.Mui-focused': {
                            backgroundColor: 'rgba(15, 23, 42, 0.7)',
                          },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: <Lock sx={{ color: 'text.secondary', mr: 1 }} />,
                        endAdornment: (
                          <Box
                            onClick={() => setShowPassword(!showPassword)}
                            sx={{ cursor: 'pointer', color: 'text.secondary' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </Box>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(15, 23, 42, 0.5)',
                          '&:hover': {
                            backgroundColor: 'rgba(15, 23, 42, 0.7)',
                          },
                          '&.Mui-focused': {
                            backgroundColor: 'rgba(15, 23, 42, 0.7)',
                          },
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isLoading}
                      sx={{
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #06d6a0 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #7c3aed 0%, #059669 100%)',
                          transform: 'translateY(-1px)',
                        },
                        '&:disabled': {
                          background: 'rgba(139, 92, 246, 0.3)',
                        },
                      }}
                    >
                      {isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
                    </Button>
                    <Button
                      variant="text"
                      fullWidth
                      onClick={() => setIsSignUp(!isSignUp)}
                      sx={{
                        py: 1.5,
                        color: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        },
                      }}
                    >
                      {isSignUp 
                        ? 'Already have an account? Sign In' 
                        : "Don't have an account? Sign Up"
                      }
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
};

export default Auth;
