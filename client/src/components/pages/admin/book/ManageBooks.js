import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../../../context/Auth.js";
const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [auth] = useAuth();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    price: "",
  });
  useEffect(() => {
    if (auth?.user) {
      if (auth.user.role === 1) {
        setUserId(auth.user._id);
      } else if (auth.user.role === 0) {
        setUserId(auth.user.admin);
      }
    }
    fetchBooks();
    fetchCategories();
    fetchAuthors();
  }, [auth, userId]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`/api/v1/books/all/${userId}`);
     
      setBooks(response.data.books);
    } catch (error) {
      console.log("Error fetching books");
    }
  };

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

  const handleDelete = async (bookId) => {
    try {
      const response = await axios.delete(`/api/v1/books/delete/${bookId}`);
      if (response.data) {
        toast.success(response.data.message);
        fetchBooks(); // Refresh the list after deletion
      }
    } catch (error) {
      console.log("Error deleting book");
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      category: book.category,
      author: book.author,
      price: book.price,
    });
    setOpen(true); // Open the dialog after setting the form data
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/books/update/${editingBook._id}`, formData);
      toast.success("Book updated successfully");
      setEditingBook(null); // Exit edit mode
      fetchBooks(); // Refresh the list
    } catch (error) {
      console.log("Error updating book");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="responsive-container">
      <Box sx={{ margin: "auto", marginTop: "20px", padding: "20px" }}>
        <h2 className="text-2xl text-blue-500 text-center mb-4">
          Manage Books
        </h2>

        {/* Book List Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books?.map((book) => (
                <TableRow key={book._id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(book)}>
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(book._id)}>
                      <Delete color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Edit Form */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          {editingBook && (
            <form className="p-5" onSubmit={handleUpdate}>
              <DialogTitle>Edit Book</DialogTitle>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      {categories.map((category) => (
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
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                    >
                      {authors.map((author) => (
                        <MenuItem key={author._id} value={author.autherName}>
                          {author.autherName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleUpdate} color="primary" type="submit">
                  Update Book
                </Button>
              </DialogActions>
            </form>
          )}
        </Dialog>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default ManageBooks;
