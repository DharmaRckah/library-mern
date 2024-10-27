import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Zoom,
  Grid,
} from "@mui/material";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../../context/Auth.js";

const AddCategory = () => {
  const [CategoryName, setCategoryName] = useState("");
  const [zoomIn, setZoomIn] = useState(false);
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
  useEffect(() => {
    setZoomIn(true); // Activate zoom animation on mount
  }, []);
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle the submission logic (e.g., sending the data to the backend)

    // Reset the input field

    const formData = {
      CategoryName,
      userId,
    };
    try {
      // Submit form data to the backend as JSON
      const response = await axios.post(
        "/api/v1/CategoryRoute/createcategory",
        formData, // Send the data as an object
        {
          headers: {
            "Content-Type": "application/json", // JSON content type
          },
        }
      );
      console.log(response,"response")
      // Handle success
      if (response.data.success) {
        toast.success(response.data.message);
        // Reset the form fields
        setCategoryName("");
      }
    } catch (error) {
      console.log(error);
      console.log("Error: Unable to create Notice");
    }

  };

  return (
    <div className="responsive-container">
      <Zoom in={zoomIn} timeout={3000}>
        <Box
          sx={{
            maxWidth: 600,
            margin: "auto",
            marginTop: "20px",
            padding: "20px",
          }}
        >
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Add Book Category
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Category Name"
                    value={CategoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Add Category
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Zoom>
      <ToastContainer />
    </div>
  );
};

export default AddCategory;
