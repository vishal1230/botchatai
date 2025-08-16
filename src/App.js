// src/App.js
import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Auth from './components/Auth';
import Chat from './components/Chat';
import VerifyEmail from './components/VerifyEmail';
import { useAuthenticationStatus, useUserData } from '@nhost/react';
import { Box, CircularProgress } from '@mui/material';

// Define your application's theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8b5cf6' },
    secondary: { main: '#06d6a0' },
    background: { default: '#0f172a', paper: '#1e293b' },
    text: { primary: '#f1f5f9', secondary: '#cbd5e1' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  // Hook to check the user's authentication status
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  // Hook to get the authenticated user's data
  const user = useUserData();

  /**
   * Renders the main content based on the authentication and verification status.
   */
  const renderContent = () => {
    // While Nhost is checking the session, show a loading spinner.
    if (isLoading) {
      return (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      );
    }

    // If the user is not authenticated, show the login/signup page.
    if (!isAuthenticated) {
      return <Auth />;
    }

    // If the user is authenticated BUT their email is not verified,
    // show the email verification prompt.
    // The optional chaining `user?.` prevents errors if the user object is momentarily null.
    if (!user?.emailVerified) {
      return <VerifyEmail />;
    }

    // If the user is authenticated AND their email is verified, show the main chat application.
    return <Chat />;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {renderContent()}
    </ThemeProvider>
  );
}

export default App;
