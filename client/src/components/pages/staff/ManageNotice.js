import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Modal,
  Zoom,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';

import { GrView } from "react-icons/gr";
import { useAuth } from "../../context/Auth.js";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { MdNotificationsActive } from "react-icons/md";
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
      const response = await axios.get(`/api/v1/noticeRoute/managenotice/${userId}`);
      setNotices(response.data.data);

      if (response.data.data && response.data.data.length > 0) {
        // Automatically open the first notice in the modal
   
      }
    } catch (error) {
      toast.error("Error fetching notices");
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


  return (
    <div className="responsive-container">
      <Zoom in={zoomIn} timeout={3000}>
        <Box sx={{ maxWidth: 700, margin: 'auto', marginTop: '20px', padding: '20px' }}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom color="blue">
              Manage Notices
            </Typography>
            <List>
              {notices?.map((notice) => (
                <ListItem key={notice._id} sx={{backgroundColor:"pink", display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary={notice.title} secondary={notice.content} />
                  <Box>
                    <IconButton onClick={() => handleOpenModal(notice)} title="Edit">
                    <MdNotificationsActive  sx={{color:"#FFA24C"}}/>
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
               Notice 
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
              
            </Box>
          </Modal>
        </Box>
      </Zoom>
      <ToastContainer />
    </div>
  );
};

export default ManageNotice;
