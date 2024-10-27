import React, { useState } from 'react';
import { Box, Grid, Typography, Container, Button, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Tooltip } from '@mui/material';

const initialClientData = [
  { id: 1, name: 'Client A', email: 'clienta@example.com' },
  { id: 2, name: 'Client B', email: 'clientb@example.com' },
  { id: 3, name: 'Client C', email: 'clientc@example.com' },
  { id: 4, name: 'Client D', email: 'clientd@example.com' },
  { id: 5, name: 'Client E', email: 'clientc@example.com' },
  { id: 6, name: 'Client F', email: 'clientd@example.com' },
];

const Client = () => {
  const [clients, setClients] = useState(initialClientData);
  const [open, setOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', email: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewClient({ name: '', email: '' });
  };

  const handleAddClient = () => {
    if (newClient.name && newClient.email) {
      setClients([...clients, { ...newClient, id: clients.length + 1 }]);
      handleClose();
    }
  };

  const handleDeleteClient = (id) => {
    setClients(clients.filter(client => client.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
          Client Management
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Manage and view your clients efficiently with our inventory management system.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          onClick={handleOpen}
          sx={{ fontSize: '1.1rem', py: 1, px: 3 }}
        >
          Add New Client
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 3, color: 'text.primary' }}>
          Client List
        </Typography>
        <Grid container spacing={3}>
          {clients.map((client) => (
            <Grid item xs={12} sm={6} md={4} key={client.id}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2, transition: 'all 0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 } }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {client.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {client.email}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Tooltip title="Edit Client">
                    <IconButton sx={{ color: '#4CAF50' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Client">
                    <IconButton sx={{ color: '#F44336' }} onClick={() => handleDeleteClient(client.id)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Email Client">
                    <IconButton sx={{ color: '#2196F3' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h5" component="p" color="primary.main" sx={{ fontWeight: 'bold' }}>
          Efficiently manage and track your clients with our powerful tools.
        </Typography>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Client Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newClient.name}
            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Client Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddClient} variant="contained" color="primary">
            Add Client
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Client;