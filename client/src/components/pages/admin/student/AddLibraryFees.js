import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Container, Paper, Zoom } from "@mui/material";
import { useAuth } from "../../../context/Auth.js";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
function AddLibraryFees() {
  const [planName, setPlanName] = useState("");
  const [planDuration, setPlanDuration] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [description, setDescription] = useState("");
  const [zoomIn, setZoomIn] = useState(false);
  const [auth] = useAuth();
  const [userId, setUserId] = useState("");
 

  useEffect(() => {
    if (auth?.user) {
      if (auth.user.role === 1) {
        setUserId(auth.user._id)
      } else if (auth.user.role === 0) {
        setUserId(auth.user.admin)
      }
    }

  }, [auth, userId])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create the data object
    const formData = {
      planName,
      planduration: planDuration,
      planprice: planPrice,
      description,
      userId,
    };
  
    try {
      // Submit form data to the backend as JSON
      const response = await axios.post(
        "/api/v1/feesPlanRoute/createFeesPlan",
        formData, // Send the data as an object
        {
          headers: {
            "Content-Type": "application/json", // JSON content type
          },
        }
      );
      // Handle success
      if (response.data.message) {
        toast.success(response.data.message);
        setPlanDuration("")
        setPlanName("");
        setPlanPrice("")
        setDescription("")
      }
    } catch (error) {
      console.log(error);
      console.log("Error: Unable to add fees plan");
    }
  };
  

  useEffect(() => {
    setZoomIn(true); // Activate zoom animation on mount
  }, []);

  return (
   <div className="responsive-container">
     <Zoom in={zoomIn} timeout={3000}>
      <Container component="main" maxWidth="sm">
        <Paper elevation={6} sx={{ padding: 4, marginTop: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Add Fees Plan
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Plan Name"
              variant="outlined"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              label="Plan Duration (in months)"
              variant="outlined"
              type="number"
              value={planDuration}
              onChange={(e) => setPlanDuration(e.target.value)}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              label="Plan Price"
              variant="outlined"
              type="number"
              value={planPrice}
              onChange={(e) => setPlanPrice(e.target.value)}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ paddingX: 4 }}
              >
                Add Plan
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Zoom>
    <ToastContainer />
   </div>
  );
}

export default AddLibraryFees;
