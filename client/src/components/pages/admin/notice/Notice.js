import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Modal,
  Grid,
} from '@mui/material';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../../context/Auth.js";
import axios from 'axios';
const Notice = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);
  const [auth] = useAuth();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (auth?.user) {
      if (auth.user.role === 1) {
        setUserId(auth.user._id);
      } else if (auth.user.role === 0) {
        setUserId(auth.user.admin);
      }
    }
  }, [auth, userId]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can add logic to handle the notice submission, such as sending to the backend
    console.log('Notice Title:', title);
    console.log('Notice Content:', content);
    const formData = {
      title,
      content,
      userId,
    };
    try {
      // Submit form data to the backend as JSON
      const response = await axios.post(
        "/api/v1/noticeRoute/createnotice",
        formData, // Send the data as an object
        {
          headers: {
            "Content-Type": "application/json", // JSON content type
          },
        }
      );
      console.log(response,"response")
      // Handle success
      if (response.data.message) {
        toast.success(response.data.message);
        // Reset the form fields
        setTitle('');
        setContent('');
        handleClose(); // Close modal after submission
      }
    } catch (error) {
      console.log(error);
      console.log("Error: Unable to create Notice");
    }
    // Reset form fields after submission
 
  };

  return (
    <div className="responsive-container">
      <Box sx={{ maxWidth: 600, margin: 'auto', marginTop: '20px', padding: '20px' }}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom color='blue'>
            Add Notice
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Create Notice
          </Button>

          {/* Modal for Adding Notice */}
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                maxWidth: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                margin: 'auto',
                marginTop: '20vh',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Create a New Notice
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Notice Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  required
                  sx={{ marginBottom: '10px' }}
                />
                <TextField
                  label="Notice Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                  required
                  sx={{ marginBottom: '10px' }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                      Submit Notice
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Modal>
        </Paper>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default Notice;
