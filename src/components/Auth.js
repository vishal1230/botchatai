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
  CircularProgress,
} from '@mui/material';
// We need the base Nhost client for a custom sign-up flow
import { useNhostClient, useSignInEmailPassword } from '@nhost/react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State variables to manage the UI feedback and flow
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [showSuccessView, setShowSuccessView] = useState(false);

  // The base Nhost client allows us to call the signUp method directly
  const nhost = useNhostClient();
  
  // The sign-in hook is used as before for the sign-in functionality
  const {
    signInEmailPassword,
    isLoading: isSignInLoading,
    error: signInError,
  } = useSignInEmailPassword();

  /**
   * Handles the sign-up form submission.
   * It uses nhost.auth.signUp to create a user without signing them in,
   * then shows a success message prompting for email verification.
   */
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSignUpLoading(true);
    setFormError(null);

    const { error } = await nhost.auth.signUp({
      email,
      password,
    });

    setIsSignUpLoading(false);

    if (error) {
      setFormError(error.message);
    } else {
      // On success, we switch to the view that asks the user to verify their email.
      setShowSuccessView(true);
    }
  };

  /**
   * Handles the sign-in form submission.
   */
  const handleSignIn = async (e) => {
    e.preventDefault();
    setFormError(null);
    await signInEmailPassword(email, password);
  };
  
  // Combine loading and error states for cleaner rendering
  const isCurrentlyLoading = isSignUpLoading || isSignInLoading;
  const displayError = formError || signInError?.message;

  // If sign up was successful, render the verification message view.
  if (showSuccessView) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', p: 2, }}>
        <Container maxWidth="sm">
          <Card sx={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', backdropFilter: 'blur(10px)', borderRadius: 3, }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 }, textAlign: 'center' }}>
              <Typography variant="h5" component="h1" gutterBottom>
                Sign Up Successful!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Please check your email (and spam folder) and click the verification link to complete your registration.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  // Otherwise, render the standard sign-in/sign-up form.
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', p: 2 }}>
      <Container maxWidth="xs">
        <Card sx={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', backdropFilter: 'blur(10px)', borderRadius: 3, }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Box textAlign="center" mb={3}>
              <Typography variant="h4" component="h1" gutterBottom>
                Nexus Chat AI
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Sign in or create an account
              </Typography>
            </Box>

            {displayError && (
              <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
                {displayError}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSignIn} noValidate>
              <Stack spacing={2}>
                <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
                  <Button type="submit" variant="contained" fullWidth disabled={isCurrentlyLoading} size="large">
                    {isSignInLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                  </Button>
                  <Button variant="outlined" fullWidth disabled={isCurrentlyLoading} onClick={handleSignUp} size="large">
                    {isSignUpLoading ? <CircularProgress size={24} /> : 'Sign Up'}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Auth;
