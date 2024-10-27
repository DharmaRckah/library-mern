import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Zoom,
  TextField,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { useAuth } from "../../../context/Auth.js";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const ManageAuthor = () => {
  const [zoomIn, setZoomIn] = useState(false);
  // Dummy authors
  const [authors, setAuthors] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [newAuthorName, setNewAuthorName] = useState('');

  const handleDelete = async (author) => {
    const response = await axios.delete(`/api/v1/authorRoute/deleteauther/${author._id}`);
    if (response.data) {
      toast.success(response.data.message);
      fetchData();
    }
  };

  useEffect(() => {
    setZoomIn(true); // Activate zoom animation on mount
  }, []);
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
    fetchData();
  }, [auth, userId]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/v1/authorRoute/getauther/${userId}`
      );
     
      setAuthors(response.data.data);
    } catch (error) {
      console.log("Error fetching student data");
    }
  };

  const handleOpenModal = (author) => {
    setSelectedAuthor(author);
    setNewAuthorName(author.autherName);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleUpdate = async() => {
    const response = await axios.put(
      `/api/v1/authorRoute/updtaeauther/${selectedAuthor._id}`,
      {
        autherName: newAuthorName,
      }
    );

    // If the update is successful, update the state locally
    if (response.data) {
      toast.success(response.data.message);
      fetchData()
    }

    handleCloseModal(); // Close modal after update
  };

  return (
    <div className="responsive-container">
      <Zoom in={zoomIn} timeout={3000}>
        <Box sx={{ maxWidth: 600, margin: 'auto', marginTop: '20px', padding: '20px' }}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom color='blue'>
              Manage Authors
            </Typography>
            {/* Header for Author Name and Actions */}
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
              <Grid item xs={8}>
                <Typography variant="h6">Author Name</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6">Action</Typography>
              </Grid>
            </Grid>

            <List>
              {authors?.map((author) => (
                <ListItem key={author} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary={author.autherName} />
                  <Box>
                    <IconButton onClick={() => handleOpenModal(author)} title="Edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(author)} title="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Modal with Zoom-In Effect */}
          <Modal open={open} onClose={handleCloseModal} closeAfterTransition>
            <Box
              sx={{
                maxWidth: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                margin: 'auto',
                marginTop: '20vh',
                borderRadius: 2,
                transform: open ? 'scale(1)' : 'scale(0.7)', // Zoom effect
                transition: 'transform 0.3s ease-in-out', // Smooth transition
              }}
            >
              <Typography variant="h6" gutterBottom>
                Update Author
              </Typography>
              <TextField
                label="Author Name"
                value={newAuthorName.autherName}
                onChange={(e) => setNewAuthorName(e.target.value)}
                fullWidth
                required
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: '20px' }}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Box>
          </Modal>
        </Box>
      </Zoom>
      <ToastContainer />
    </div>
  );
};

export default ManageAuthor;
