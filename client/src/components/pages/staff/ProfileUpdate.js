import React, { useState, useEffect } from "react";
import {
  Avatar,
  CssBaseline,
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useAuth } from "../../context/Auth.js";
import { toast, ToastContainer } from "react-toastify";

const theme = createTheme({
  spacing: 8,
});

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ProfileUpdate() {
  const classes = useStyles();

  // Manage form state using useState hook
  const [formData, setFormData] = useState({
    userName: "",
    contact: "",
    address: "",
    pincode: "",
    fatherName: "",
    email: "",
    password: "",
    state: "",
  });

  const [auth] = useAuth();

  // Set form data when component mounts or auth changes
  useEffect(() => {
    if (auth && auth.user) {
      setFormData({
        userName: auth.user.userName || "",
        contact: auth.user.contact || "",
        address: auth.user.address || "",
        pincode: auth.user.pincode || "",
        fatherName: auth.user.fatherName || "",
        email: auth.user.email || "",
        password: "", // Do not pre-fill the password
        state: auth.user.state || "",
      });
    }
  }, [auth]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = auth.user._id; // Fetch staff ID from auth

    try {
      const response = await axios.put(
        `/api/v1/auth/updateProfileStaff/${id}`,
        formData
      );
      if (response.data.success) {
        toast.success(response.data.message); // Display success message
      } else {
        toast.error(response.data.message); // Display error message if any
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message); // Handle server error
      } else if (error.request) {
        toast.error("No response received from server."); // Handle no response
      } else {
        toast.error("Error updating profile."); // Handle general error
      }
    }
  };

  return (
    <div className="responsive-container">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Profile Update
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="userName"
                    variant="outlined"
                    required
                    fullWidth
                    label="User Name"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="contact"
                    variant="outlined"
                    required
                    fullWidth
                    label="Contact Number"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="address"
                    variant="outlined"
                    required
                    fullWidth
                    label="Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="pincode"
                    variant="outlined"
                    required
                    fullWidth
                    label="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="fatherName"
                    variant="outlined"
                    required
                    fullWidth
                    label="Father Name"
                    value={formData.fatherName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    variant="outlined"
                    required
                    fullWidth
                    label="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    variant="outlined"
                    fullWidth
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="state"
                    variant="outlined"
                    required
                    fullWidth
                    label="State"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                sx={{ marginTop: "20px" }}
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update
              </Button>
            </form>
          </div>
        </Container>
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}
