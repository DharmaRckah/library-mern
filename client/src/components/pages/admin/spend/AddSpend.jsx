import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/Auth.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Snackbar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Zoom,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddSpend() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [spendType, setSpendType] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);

  const spendTypes = [
    "Books Purchase",
    "Membership Fees",
    "Library Supplies",
    "Events and Programs",
    "Maintenance Costs",
    "electricity bill",
    "water cost",
    "library rent",
    "Other",
  ];
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to handle spend entry submission (e.g., API call)
    const formData = {
      spendType,
      amount,
      date,
      description,
      userId,
    };

    try {
      // Submit form data to the backend as JSON
      const response = await axios.post(
        "/api/v1/spendRoute/createspends",
        formData, // Send the data as an object
        {
          headers: {
            "Content-Type": "application/json", // JSON content type
          },
        }
      );
      console.log(response,"response")
      // Handle success
      if (response.data.message) {
        toast.success(response.data.message);
        // Reset the form fields
        setAmount("");
        setDate("");
        setDescription("");
        setSpendType("");

        // Show success message
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.log(error);
      console.log("Error: Unable to add fees plan");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  useEffect(() => {
    setZoomIn(true); // Activate zoom animation on mount
  }, []);

  return (
    <div className="responsive-container">
      <Zoom in={zoomIn} timeout={3000}>
        <Box sx={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Library Spend Entry
          </Typography>
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="spend-type-label">Spend Type</InputLabel>
                    <Select
                      labelId="spend-type-label"
                      value={spendType}
                      onChange={(e) => setSpendType(e.target.value)}
                      label="Spend Type"
                    >
                      {spendTypes.map((type, index) => (
                        <MenuItem key={index} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ padding: "15px 20px" }}
                  >
                    Add Spend
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
          >
            <Alert onClose={handleCloseSnackbar} severity="success">
              Spend entry added successfully!
            </Alert>
          </Snackbar>
        </Box>
      </Zoom>
      <ToastContainer />
    </div>
  );
}

export default AddSpend;
