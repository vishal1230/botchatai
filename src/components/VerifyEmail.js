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
  Fade,
  Avatar,
  Stack,
} from '@mui/material';
import { MarkEmailRead } from '@mui/icons-material';

const VerifyEmail = () => {
  const { signOut } = useSignOut();
  const nhost = useNhostClient();
  const user = useUserData();
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Handles resending the verification email.
   */
  const handleResendVerification = async () => {
    setLoading(true);
    setError('');
    setEmailSent(false);
    try {
      await nhost.auth.sendVerificationEmail({ email: user.email });
      setEmailSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(6, 214, 160, 0.1) 0%, transparent 50%)
          `,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={true} timeout={1000}>
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
                position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                background: 'linear-gradient(90deg, #8b5cf6 0%, #06d6a0 100%)',
              },
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 5 }, textAlign: 'center' }}>
              <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main', margin: '0 auto 1.5rem auto' }}>
                <MarkEmailRead sx={{ fontSize: 32 }} />
              </Avatar>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                Verify Your Email
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                A verification link has been sent to your email address:
              </Typography>
              <Typography variant="h6" component="p" sx={{ mb: 4, color: 'primary.light', wordBreak: 'break-all' }}>
                <strong>{user?.email}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please click the link to continue. You can close this tab after verifying.
              </Typography>

              {emailSent && <Alert severity="success" sx={{ mt: 3, bgcolor: 'rgba(6, 214, 160, 0.1)', color: '#a7f3d0' }}>A new verification email has been sent!</Alert>}
              {error && <Alert severity="error" sx={{ mt: 3, bgcolor: 'rgba(220, 38, 38, 0.1)', color: '#fca5a5' }}>{error}</Alert>}

              <Stack spacing={2} sx={{ mt: 4 }}>
                <Button
                  onClick={handleResendVerification}
                  disabled={emailSent || loading}
                  variant="contained"
                  size="large"
                  sx={{
                    py: 1.5,
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #06d6a0 100%)',
                    '&:hover': { background: 'linear-gradient(135deg, #7c3aed 0%, #059669 100%)' },
                  }}
                >
                  {loading ? 'Sending...' : (emailSent ? 'Email Sent!' : 'Resend Verification Email')}
                </Button>
                <Button onClick={signOut} variant="outlined" size="large">
                  Sign Out
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default VerifyEmail;
