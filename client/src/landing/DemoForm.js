import { State } from 'country-state-city';
import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import img1 from './assets/demo.jpeg';
import { toast, ToastContainer } from 'react-toastify';
import LoaderHand from '../components/loader/LoaderHand'; // Import your loader component

const DemoForm = () => {
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    contact: '',
    city: '',
    email: '',
    state: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // State to track errors

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '' // Clear error on change
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.business) newErrors.business = 'Business Name is required';
    if (!formData.contact) {
      newErrors.contact = 'Contact Number is required';
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = 'Contact Number must be 10 digits';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // Stop submission if validation fails

    setLoading(true);
    try {
      const response = await axios.post('/api/v1/contact/create', formData);
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(handleClose, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  return (
    <>
      {open && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>
            Schedule a One-on-One Demo
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ position: 'relative' }}>
            <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
              <img
                src={img1}
                alt="Demo"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 8
                }}
              />
            </Box>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              name="name"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Business Name"
              type="text"
              name="business"
              fullWidth
              variant="outlined"
              value={formData.business}
              onChange={handleChange}
              error={!!errors.business}
              helperText={errors.business}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Contact Number"
              type="tel"
              name="contact"
              fullWidth
              variant="outlined"
              value={formData.contact}
              onChange={handleChange}
              error={!!errors.contact}
              helperText={errors.contact}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Email"
              type="text"
              name="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="City"
              type="text"
              name="city"
              fullWidth
              variant="outlined"
              value={formData.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                label="State"
                error={!!errors.state}
              >
                {State.getStatesOfCountry('IN').map((state) => (
                  <MenuItem key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.state && <Box color="error.main" sx={{ mt: 1 }}>{errors.state}</Box>}
            </FormControl>
            {loading && (
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)', // Center the loader
                  zIndex: 10 
                }}
              >
                <LoaderHand /> {/* Your custom loader component */}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary" variant="contained" disabled={loading}>
              {loading ? 'Booking...' : 'Book a Demo'}
            </Button>
          </DialogActions>
          <ToastContainer />
        </Dialog>
      )}
    </>
  );
};

export default DemoForm;
