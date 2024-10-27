import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Zoom,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../../context/Auth.js";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [zoomIn, setZoomIn] = useState(false);
  const [auth] = useAuth();
  const [userId, setUserId] = useState("");
  const [bookImage, setBookImage] = useState(null); // State for the book image

  // Dummy categories and authors
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

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
    if (userId) {
      fetchCategories();
      fetchAuthors();
    }
  }, [userId]);
  
  // njfnjdf

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `/api/v1/CategoryRoute/getcategory/${userId}`
      );
      setCategories(response.data.data);
    } catch (error) {
      console.log("Error fetching categories");
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(
        `/api/v1/authorRoute/getauther/${userId}`
      );
      setAuthors(response.data.data);
    } catch (error) {
      console.log("Error fetching authors");
    }
  };

  useEffect(() => {
    setZoomIn(true); // Activate zoom animation on mount
  }, []);

  // Handle book image file upload
  const handleFileChange = (e) => {
    setBookImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("author", author);
    formData.append("price", price);
    if (bookImage) {
      formData.append("img", bookImage); // Append the book image if present
    }
  
    try {
      // Send the form data to the backend
      const response = await axios.post("/api/v1/books/add", formData);
     
      // Display success message
      toast.success(response.data.message );

      // Reset the input fields
      setTitle("");
      setCategory("");
      setAuthor("");
      setPrice("");
      setBookImage(null); // Reset the file input
    } catch (error) {
      // Display error message
      console.log("Error adding book");
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
            <Typography variant="h5" gutterBottom color="blue">
              Add Book
            </Typography>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Book Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={category}
                      label="Category"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories?.map((category) => (
                        <MenuItem
                          key={category._id}
                          value={category.CategoryName}
                        >
                          {category.CategoryName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Author</InputLabel>
                    <Select
                      value={author}
                      label="Author"
                      onChange={(e) => setAuthor(e.target.value)}
                    >
                      {authors?.map((author) => (
                        <MenuItem key={author._id} value={author.autherName}>
                          {author.autherName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="file"
                    onChange={handleFileChange} // Handle file selection
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Add Book
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

export default AddBook;
