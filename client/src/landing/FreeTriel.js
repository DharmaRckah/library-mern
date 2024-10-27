import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

// Path to the uploaded image
const img = '/mnt/data/lg.jpeg';

const FreeTriel = () => {
  const [formType, setFormType] = useState('login');

  const handleFormChange = (type) => {
    setFormType(type);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0', // Optional: background color for the page
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${img})`, // Use the uploaded image as background
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: '600px', // Limit max width for larger screens
          padding: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            {formType === 'login' && 'Login'}
            {formType === 'signup' && 'Sign Up'}
            {formType === 'forgot' && 'Forgot Password'}
          </Typography>

          {formType === 'login' && (
            <>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Login
              </Button>
              <Typography
                variant="body2"
                align="center"
                sx={{ marginTop: 2 }}
                onClick={() => handleFormChange('forgot')}
              >
                Forgot Password?
              </Typography>
              <Typography
                variant="body2"
                align="center"
                sx={{ marginTop: 1 }}
                onClick={() => handleFormChange('signup')}
              >
                Don't have an account? Sign Up
              </Typography>
            </>
          )}

          {formType === 'signup' && (
            <>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Sign Up
              </Button>
              <Typography
                variant="body2"
                align="center"
                sx={{ marginTop: 2 }}
                onClick={() => handleFormChange('login')}
              >
                Already have an account? Login
              </Typography>
            </>
          )}

          {formType === 'forgot' && (
            <>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Send Password Reset Link
              </Button>
              <Typography
                variant="body2"
                align="center"
                sx={{ marginTop: 2 }}
                onClick={() => handleFormChange('login')}
              >
                Back to Login
              </Typography>
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default FreeTriel;




