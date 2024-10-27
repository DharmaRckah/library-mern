import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/Auth.js";
import {
  TextField,
  MenuItem,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Zoom,
} from "@mui/material";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

const StudentPayment = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [auth] = useAuth();
  const [userId, setUserId] = useState("");
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    contact: "",
    address: "",
    fatherName: "",
    email: "",
    pincode: "",
    state: "",
  });
  const [zoomIn, setZoomIn] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]); 

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

  useEffect(() => {
    setZoomIn(true); // Activate zoom animation on mount
  }, []);
  useEffect(() => {
    if (auth?.user) {
      if (auth.user.role === 1) {
        setUserId(auth.user._id)
      } else if (auth.user.role === 0) {
        setUserId(auth.user.admin)
      }
    }

  }, [auth, userId])

  const handleStudentSelect = (e) => {
    const selectedId = e.target.value;
    setSelectedStudent(selectedId);

    // Find selected student details and set them in form
    const selected = students.find((student) => student._id === selectedId);
    if (selected) {
      setStudentDetails({
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

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
  
    // Initialize FormData
    const formData = new FormData();
    
    // Append form fields
    formData.append("userId", userId);
    formData.append("name", studentDetails.name);
    formData.append("fatherName", studentDetails.fatherName);
    formData.append("contact", studentDetails.contact);
    formData.append("email", studentDetails.email);
    formData.append("address", studentDetails.address);
    formData.append("pincode", studentDetails.pincode);
    formData.append("state", studentDetails.state);
    formData.append("paymentDate", paymentDate);
    formData.append("paymentMethod", paymentMethod);
    formData.append("amount", amount);
    formData.append("description", description);
  
    // Append file if payment method is online
    if (paymentMethod === "online" && screenshot) {
      formData.append("img", screenshot); // Append the screenshot for online payment
    }
  
    // // Log all form data keys and values for debugging
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }
  
    try { 
      // Submit form data to the backend
      const response = await axios.post(
        "/api/v1/studentpaymentRoute/createStudentPayment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response, "res");
  
      // Handle success
      if (response.data.message) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Error submitting payment");
      console.error("Error:", error.response || error.message);
    }
  };
  
  

  const handleScreenshotUpload = (e) => {
    setScreenshot(e.target.files[0]); // Capture file for screenshot
  };

  return (
    <div className="responsive-container">
      <Zoom in={zoomIn} timeout={3000}>
        <Box
          sx={{
            maxWidth: "800px",
            margin: "auto",
            padding: "20px",
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center", mb: 1 }}>
            Student Payment
          </Typography>

          <Paper elevation={4} sx={{ padding: "20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Select Student"
                  value={selectedStudent}
                  onChange={handleStudentSelect}
                  fullWidth
                >
                  {students.map((student) => (
                    <MenuItem key={student._id} value={student._id}>
                      {student.userName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Name"
                  value={studentDetails.name}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Father's Name"
                  value={studentDetails.fatherName}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Contact"
                  value={studentDetails.contact}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  value={studentDetails.email}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Address"
                  value={studentDetails.address}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Pincode"
                  value={studentDetails.pincode}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="State"
                  value={studentDetails.state}
                  fullWidth
                  disabled
                />
              </Grid>
               {/* Payment Date Field */}
            <Grid item xs={6}>
              <TextField
                label="Payment Date"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

              {/* Payment Method Section */}
              <Grid item xs={6}>
                <TextField
                  label="Payment Method"
                  select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  fullWidth
                  required
                >
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="online">Online Transfer</MenuItem>
                </TextField>
              </Grid>

              {/* Conditional Fields */}
              <Grid item xs={6}>
                <TextField
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              {paymentMethod === "online" && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      type="file"
                      label="Upload Screenshot Payment Receipt"
                      onChange={handleScreenshotUpload}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </>
              )}

              {/* Description (appears in both cases) */}
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handlePaymentSubmit}
                >
                  Submit Payment
                </Button>
              </Grid>
            </Grid>
          </Paper>

          <ToastContainer />
        </Box>
      </Zoom>
    </div>
  );
};

export default StudentPayment;
