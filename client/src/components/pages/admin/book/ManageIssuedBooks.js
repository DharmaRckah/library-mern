import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../../../context/Auth.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
function ManageIssuedBooks() {
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filter, setFilter] = useState("");
  const [issuedBooksData, setBooks] = useState([]);
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
    fetchBooks();
  }, [auth, userId]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`/api/v1/books/all/${userId}`);
      setBooks(response.data.books);
    } catch (error) {
      console.log("Error fetching books");
    }
  };
  const handleOpen = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const returnBook = async(book) => {
    console.log(book, "book id");
    try {
      const response = await axios.post("/api/v1/books/return", {
        bookId: book._id,
      });
      console.log(response)

      if (response.data) {
        toast.success(response.data.message);
        handleClose();
        fetchBooks();
      }
    } catch (error) {
      if (error.response) {
        console.error("Failed to Return book:", error.response.data.message);
      } else {
        console.error("Error Return book:", error.message);
      }
    }
  };

  // Filter books by title or student name
  const filteredBooks = issuedBooksData?.filter(
    (book) =>
      book.title.toLowerCase().includes(filter.toLowerCase()) ||
      book.studentName.toLowerCase().includes(filter.toLowerCase())
  );
  const gradientColors = [
    "linear-gradient(to right, #ffafbd, #ffc3a0)", // Pink gradient
    "linear-gradient(to right, #a1c4fd, #c2e9fb)", // Blue gradient
    "linear-gradient(to right, #ffecd2, #fcb69f)", // Orange gradient
    "linear-gradient(to right, #d4fc79, #96e6a1)", // Green gradient
  ];

  return (
    <div style={{ padding: "20px" }} className="responsive-container">
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 2, color: "blue" }}
      >
        Manage Issued Books
      </Typography>

      <Paper elevation={6} sx={{ padding: "20px", mb: 4 }}>
        <TextField
          label="Search by Book Title or Student Name"
          value={filter}
          onChange={handleFilterChange}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
      </Paper>

      <Grid container spacing={3}>
        {filteredBooks?.length > 0 ? (
          filteredBooks
            ?.filter((book) => book.status === "Issued") // Filter to show only issued books
            ?.map((book, index) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <Card
                  style={{
                    background: gradientColors[index % gradientColors.length], // Apply gradient colors
                    padding: "10px", // Apply padding
                  }}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      <img
                        src={`/${book.img[0]}`}
                        alt={book.title}
                        style={{
                          width: "200px",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CardContent>
                        <Typography variant="h6">{book.title}</Typography>
                        <Typography variant="subtitle1">
                          Author: {book.author}
                        </Typography>
                        <Typography variant="body2">
                          Student: {book?.userName}
                        </Typography>
                        <Typography variant="body2">
                          Contact: {book?.contact}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ whiteSpace: "normal" }}
                        >
                          Issue Date:{" "}
                          {new Date(book?.issueDate).toLocaleDateString()}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ whiteSpace: "normal" }}
                        >
                          Return Date:{" "}
                          {new Date(book?.returnDate).toLocaleDateString()}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpen(book)}
                        >
                          View Details
                        </Button>
                        <Button
                          sx={{
                            background:
                              gradientColors[index % gradientColors.length],
                            marginTop: "10px",
                            border: "1px solid black",
                          }}
                          variant="contained"
                          color="secondary" // Fixed typo: "secondry" to "secondary"
                          onClick={() => returnBook(book)}
                        >
                          Return Book
                        </Button>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))
        ) : (
          <Typography
           
            sx={{ textAlign: "center", width: "100%",  marginTop:"100px"}}
          >
            No books found.
          </Typography>
        )}
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            maxHeight: "80vh", // Set a maximum height for the modal
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          <Typography variant="h6">
            Book Details: {selectedBook?.title}
          </Typography>
          {console.log(selectedBook, "selectedBook")}
          <img
            src={`/${selectedBook?.img[0]}`}
            alt={selectedBook?.title}
            style={{ width: "100%", height: "auto", marginBottom: "10px" }} // Add margin for spacing
          />
          <Typography variant="subtitle1">
            Author: {selectedBook?.author}
          </Typography>
          <Typography variant="body2">
            Student: {selectedBook?.userName}
          </Typography>
          <Typography variant="body2">
            Contact: {selectedBook?.contact}
          </Typography>
          <Typography variant="body2">
            Issue Date: {new Date(selectedBook?.issueDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            Return Date:{" "}
            {new Date(selectedBook?.returnDate).toLocaleDateString()}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default ManageIssuedBooks;
