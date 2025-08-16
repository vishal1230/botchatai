import React, { useState } from 'react';
import { useSignOut, useNhostClient, useUserData } from '@nhost/react';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Container,
  Alert,
} from '@mui/material';

const VerifyEmail = () => {
  const { signOut } = useSignOut();
  const nhost = useNhostClient();
  const user = useUserData();
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleResendVerification = async () => {
    setError('');
    setEmailSent(false);
    try {
      await nhost.auth.sendVerificationEmail({ email: user.email });
      setEmailSent(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Card>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" component="h1" gutterBottom>
              Verify Your Email
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              A verification link has been sent to your email address:
            </Typography>
            <Typography variant="h6" component="p" sx={{ mb: 3 }}>
              <strong>{user?.email}</strong>
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please click the link to continue. You can close this tab after verifying.
            </Typography>
            
            {emailSent && <Alert severity="success" sx={{ mt: 3 }}>A new verification email has been sent!</Alert>}
            {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}

            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Button
                onClick={handleResendVerification}
                disabled={emailSent}
                variant="contained"
              >
                {emailSent ? 'Email Sent!' : 'Resend Verification Email'}
              </Button>
              <Button onClick={signOut} variant="outlined">
                Sign Out
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default VerifyEmail;