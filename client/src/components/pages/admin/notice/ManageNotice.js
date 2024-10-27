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
import { useAuth } from "../../../context/Auth.js";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const ManageNotice = () => {
  const [zoomIn, setZoomIn] = useState(false);
  const [notices, setNotices] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
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

  useEffect(() => {
    setZoomIn(true); // Activate zoom animation on mount
  }, []);
  const fetchData = async () => {
    try {
    
      const response = await axios.get(
        `/api/v1/noticeRoute/managenotice/${userId}`
      );
      setNotices(response.data.data);
    } catch (error) {
      console.log("Error fetching student data");
    }
  };

  const handleOpenModal = (notice) => {
    setSelectedNotice(notice);
    setNewTitle(notice.title);
    setNewContent(notice.content);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/v1/noticeRoute/updatenotice/${selectedNotice._id}`, {
        title: newTitle,
        content: newContent,
      });
  
      // If the update is successful, update the state locally
      if(response.data)
        {
         toast.success(response.data.message)
       
        }

      if (response.status === 200) {
        setNotices(
          notices?.map((notice) =>
            notice._id === selectedNotice._id
              ? { ...notice, title: newTitle, content: newContent }
              : notice
          )
        );
        handleCloseModal(); // Close modal after update
      }
    } catch (error) {
      console.error("Error updating notice:", error.response.data.message);
    }
  };

  const handleDelete = async (_id) => {
    try {
      // Send delete request to the server
      console.log(_id,"hdhd")
      const response = await axios.delete(`/api/v1/noticeRoute/deletenotice/${_id}`);
  
      // If deletion is successful, update the state locally

   if(response.data.success)
   {
    toast.success(response.data.message)
    fetchData();
   }

    } catch (error) {
      console.error("Error deleting notice:", error.response.data.message);
    }
  };

  return (
    <div className="responsive-container">
      <Zoom in={zoomIn} timeout={3000}>
        <Box sx={{ maxWidth: 600, margin: 'auto', marginTop: '20px', padding: '20px' }}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom color='blue'>
              Manage Notices
            </Typography>
            <List>
       
              {notices?.map((notice) => (
                <ListItem key={notice.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary={notice.title} secondary={notice.content} />
                  <Box>
                    <IconButton onClick={() => handleOpenModal(notice)} title="Edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(notice._id)} title="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Modal for Updating Notice */}
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
              }}
            >
              <Typography variant="h6" gutterBottom>
                Update Notice
              </Typography>
              <TextField
                label="Notice Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                fullWidth
                required
                sx={{ marginBottom: '10px' }}
              />
              <TextField
                label="Notice Content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                fullWidth
                multiline
                rows={4}
                required
                sx={{ marginBottom: '10px' }}
              />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                    fullWidth
                  >
                    Update Notice
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </Box>
      </Zoom>
      <ToastContainer />
    </div>
  );
};

export default ManageNotice;
