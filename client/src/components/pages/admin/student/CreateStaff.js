import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button, TextField, MenuItem, Grid, Typography, Box, Paper,
  Zoom
} from "@mui/material";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", 
  "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Lakshadweep", "Delhi", 
  "Puducherry", "Ladakh", "Jammu and Kashmir"
];

const initialFormData = {
  name: "", contact: "", address: "", pincode: "", state: "", fatherName: "",
  email: "", password: ""
};

const CreateStaff = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [zoomIn, setZoomIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "name", "contact", "address", "pincode", "state", "fatherName", "email", "password"
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please enter ${field}.`);
        return;
      }
    }

    try {
      const response = await axios.post("/api/v1/auth/add-staff", formData, {
        headers: { "Content-Type": "application/json" }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        clearData();
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error(`There was an error creating the staff: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const clearData = () => {
    setFormData(initialFormData);
  };

  React.useEffect(() => {
    setZoomIn(true); // Activate zoom animation on mount
  }, []);

  return (
  <div className="responsive-container">
      <Zoom in={zoomIn} timeout={2000}>
      <Paper elevation={4} sx={{ p: 4, mt: 4, maxWidth: 1000, mx: "auto" }}>
        <Typography variant="h4" gutterBottom align="center" color="primary" sx={{ mb: 3 }}>
          Add Student
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Contact", name: "contact", type: "text" },
              { label: "Address", name: "address", type: "text" },
              { label: "Pin code", name: "pincode", type: "text" },
              { label: "Father's Name", name: "fatherName", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
            ].map(({ label, name, type }, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <TextField
                  label={label}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="">Select State</MenuItem>
                {indianStates.map((state, index) => (
                  <MenuItem key={index} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <ToastContainer />
      </Paper>
    </Zoom>
  </div>
  );
};

export default CreateStaff;
