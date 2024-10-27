import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  CircularProgress,
  Typography,
  Box,
  IconButton,
  Button,
  Grid,
  TextField,
  Zoom,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ViewStaff = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]); // To store filtered rows
  const [loading, setLoading] = useState(true);
  const [zoomIn, setZoomIn] = useState(false);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/auth/all-staff");
        const staffMembers = response.data.staff;

        const mappedRows = staffMembers?.map((staff, index) => ({
          id: staff._id,
          index: index + 1, // Serial number starts from 1
          date: staff.createdAt,
          name: staff.userName,
          fatherName: staff.fatherName,
          address: staff.address,
          contact: staff.contact,
          email: staff.email,
          pincode: staff.pincode,
          state: staff.state,
        }));

        setRows(mappedRows);
        setFilteredRows(mappedRows); // Initialize filtered rows
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setZoomIn(true); // Activate zoom animation on mount
  }, []);

  const handleDelete = async (id) => {
    const confirmation = prompt('Type "yes" to confirm deletion');
    if (confirmation === "yes") {
      try {
        const res = await axios.delete(`/api/v1/auth/delete-staff/${id}`);
        if (res.data.success) {
          toast.success(res.data.message);
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
          setFilteredRows((prevRows) => prevRows.filter((row) => row.id !== id));
        }
      } catch (error) {
        console.error("Failed to delete:", error);
        toast.error("Failed to delete the staff.");
      }
    } else {
      alert("Delete action canceled");
    }
  };

  const columns = [
    { field: "index", headerName: "#", flex: 0.5, minWidth: 30 }, // Serial number
    { field: "date", headerName: "Date", flex: 1, minWidth: 115 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    {
      field: "fatherName",
      headerName: "Father's Name",
      flex: 1,
      minWidth: 150,
    },
    { field: "address", headerName: "Address", flex: 2, minWidth: 100 },
    { field: "contact", headerName: "Contact", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 2, minWidth: 250 },
    { field: "pincode", headerName: "Pincode", flex: 1, minWidth: 100 },
    { field: "state", headerName: "State", flex: 1, minWidth: 120 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      minWidth: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.id)} color="secondary">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const handleFilterChange = () => {
    const filtered = rows.filter((row) => {
      const isNameMatch = studentName ? row.name.toLowerCase().includes(studentName.toLowerCase()) : true;
      const isDateMatch = (!fromDate || new Date(row.date) >= new Date(fromDate)) &&
                          (!toDate || new Date(row.date) <= new Date(toDate));
      return isNameMatch && isDateMatch;
    });
    setFilteredRows(filtered);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 5 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <Typography variant="h6" color="error">
          Error: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <div className="responsive-container">
      <Zoom in={zoomIn} timeout={2000}>
        <Paper sx={{ height: 400, width: "100%" }}>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 2,color:"blue" }}>
            Manage Student
          </Typography>

          <Paper elevation={3} sx={{ padding: "20px", mb: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item sx={{ flex: 1 }}>
                <TextField
                  label="From Date"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item sx={{ flex: 1 }}>
                <TextField
                  type="date"
                  label="To Date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item sx={{ flex: 1 }}>
                <TextField
                  type="text"
                  label="Search By Student Name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Search By Student Name"
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleFilterChange}
                  fullWidth
                  sx={{ padding: "15px 20px" }} 
                >
                  Filter Student 
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            autoHeight
            disableColumnMenu
            sx={{ border: 0 }}
          />
        </Paper>
      </Zoom>
      <Toaster />
    </div>
  );
};

export default ViewStaff;
