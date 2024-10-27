import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Grid,
  Typography,
  Modal,
  TextField,
  MenuItem,
  CardMedia,
  Zoom,
  Paper,
} from "@mui/material";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { useAuth } from "../../../context/Auth.js";

function IssueBook() {
  const [open, setOpen] = useState(false);
  const [booksData, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [zoomIn, setZoomIn] = useState(false);
  const [student, setStudent] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [issueDetails, setIssueDetails] = useState({
    issueDate: "",
    returnDate: "",
  });
  const [studentDetails, setStudentDetails] = useState({
    _id: "",
    name: "",
    contact: "",
    address: "",
    fatherName: "",
    email: "",
    pincode: "",
    state: "",
  });

  const [searchQuery, setSearchQuery] = useState(""); // State for search query
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
      const student = await axios.get("/api/v1/auth/all-staff");

      setStudent(student.data.staff);
      setBooks(response.data.books);
    } catch (error) {
      console.log("Error fetching books");
    }
  };
  useEffect(() => {
    // Fetch all students (staff)
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/auth/all-staff");
        setStudents(response.data.staff);
      } catch (error) {
        console.log("Error fetching student data");
      }
    };

    fetchData();
  }, []);

  const handleOpen = (book) => {
    console.log(book, "book");
    setSelectedBook(book);
    setOpen(true);
  };
  const handleStudentSelect = (e) => {
    const selectedId = e.target.value;
    setSelectedStudent(selectedId);

    // Find selected student details and set them in form
    const selected = students.find((student) => student._id === selectedId);
    if (selected) {
      setStudentDetails({
        _id: selected._id,
        name: selected.userName,
        contact: selected.contact,
        address: selected.address,
        fatherName: selected.fatherName,
        email: selected.email,
        pincode: selected.pincode,
        state: selected.state,
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
    setIssueDetails({
      studentName: "",
      issueDate: "",
      returnDate: "",
    });
  };

  const handleIssue = async () => {
    try {
      const response = await axios.post("/api/v1/books/issue", {
        bookId: selectedBook._id,
        studentId: studentDetails._id,
        issueDate: issueDetails.issueDate,
        returnDate: issueDetails.returnDate,
        userName: studentDetails.name,
        contact: studentDetails.contact,
      });

      if (response.data) {
        toast.success(response.data.message);
        handleClose();
        fetchBooks();
      }
    } catch (error) {
      if (error.response) {
        console.error("Failed to issue book:", error.response.data.message);
      } else {
        console.error("Error issuing book:", error.message);
      }
    }
  };

  const handleChange = (e) => {
    setIssueDetails({ ...issueDetails, [e.target.name]: e.target.value });
  };

  // New function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const gradientColors = [
    "linear-gradient(to right, #ffafbd, #ffc3a0)", // Pink gradient
    "linear-gradient(to right, #a1c4fd, #c2e9fb)", // Blue gradient
    "linear-gradient(to right, #ffecd2, #fcb69f)", // Orange gradient
    "linear-gradient(to right, #d4fc79, #96e6a1)", // Green gradient
  ];

  useEffect(() => {
    setZoomIn(true); // Activate zoom animation on mount
  }, []);

  // Filter books based on search query
  const filteredBooks = booksData?.filter((book) =>
    book.title.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }} className="responsive-container">
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 2, color: "blue" }}
      >
        Books Collections
      </Typography>
      <Paper elevation={6} sx={{ padding: "20px", mb: 4 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item sx={{ flex: 1 }}>
            <TextField
              type="text"
              label="Search By Book Name"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Search By Book Name"
              value={searchQuery} // Bind searchQuery to TextField
              onChange={handleSearchChange} // Update searchQuery on change
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              // onClick={handleFilterChange}
              fullWidth
              sx={{ padding: "15px 20px" }}
            >
              Filter Books
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {filteredBooks && filteredBooks?.length > 0 ? (
          filteredBooks?.map((book, index) => (
            <Zoom in={zoomIn} timeout={3000}>
              <Grid item xs={12} sm={12} md={4} key={book.id}>
                <Card
                  style={{
                    background: gradientColors[index % gradientColors.length],
                    padding: "10px",
                  }}
                >
                  <Grid container spacing={2}>
                    {/* Left side: Image */}
                    <Grid item xs={5}>
                      <CardMedia
                        component="img"
                        style={{
                          height: "300px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                        image={`/${book.img[0]}`}
                        alt={book.title}
                      />
                    </Grid>

                    {/* Right side: Content */}
                    <Grid item xs={7}>
                      <CardContent>
                        <Typography
                          variant="h5"
                          className="text-3xl text-red-500 semibold"
                        >
                          {book.title}
                        </Typography>
                        <Typography variant="subtitle1">
                          Author: {book.author}
                        </Typography>
                        <Typography variant="subtitle1">
                          Category: {book.category}
                        </Typography>
                        <Typography variant="subtitle1">
                          Price: {book.price}
                        </Typography>

                        <Typography
                          variant="subtitle1"
                          style={{
                            color:
                              book.status === "Available" ? "green" : "red",
                          }}
                        >
                          Status: {book.status}
                        </Typography>

                        {book.issueDate && book.returnDate && (
                          <>
                            <Typography
                              variant="subtitle2"
                              style={{ color: "green" }}
                            >
                              Issue Date:{" "}
                              {new Date(book.issueDate).toLocaleDateString()}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              style={{ color: "red" }}
                            >
                              Return Date:{" "}
                              {new Date(book.returnDate).toLocaleDateString()}
                            </Typography>
                          </>
                        )}

                        {book.userName && book.contact && (
                          <>
                            <Typography
                              variant="subtitle2"
                              style={{ color: "blue" }}
                            >
                              Issued To: {book.userName}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              style={{ color: "blue" }}
                            >
                              Contact: {book.contact}
                            </Typography>
                          </>
                        )}

                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpen(book)}
                          disabled={book.status !== "Available"}
                          style={{ marginTop: "10px" }}
                        >
                          Issue Book
                        </Button>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Zoom>
          ))
        ) : (
          <Typography
          
            style={{ textAlign: "center", width: "100%", marginTop: "100px" }}
          >
            There is not a single book issue.
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
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6">
            Issue Book: {selectedBook?.title}
          </Typography>
          <Grid item xs={12}>
            <TextField
              select
              label="Select Student"
              value={selectedStudent}
              onChange={handleStudentSelect}
              fullWidth
            >
              {students?.map((student) => (
                <MenuItem key={student._id} value={student._id}>
                  {student.userName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <TextField
            label="Issue Date"
            name="issueDate"
            value={issueDetails.issueDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Return Date"
            name="returnDate"
            value={issueDetails.returnDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="contained" color="primary" onClick={handleIssue}>
            Issue
          </Button>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default IssueBook;
