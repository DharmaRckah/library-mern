import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Zoom,
  Modal,
} from "@mui/material";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../../../context/Auth.js";
import axios from "axios";
const ManageSpend = () => {
  const [spends, setSpends] = useState([]);
  const [auth] = useAuth();
  const [userId, setUserId] = useState("");
  const [filteredSpends, setFilteredSpends] = useState(spends);
  const [spendType, setSpendType] = useState("");
  const [fromDate, setFromDate] = useState(""); // New state for from date
  const [toDate, setToDate] = useState(""); // New state for to date
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [zoomIn, setZoomIn] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSpend, setSelectedSpend] = useState(null);

  useEffect(() => {
    setZoomIn(true); // Activate zoom animation on mount
  }, []);

  useEffect(() => {
    if (auth?.user) {
      if (auth.user.role === 1) {
        setUserId(auth.user._id);
      } else if (auth.user.role === 0) {
        setUserId(auth.user.admin);
      }
    }
    fetchData();
  }, [auth, userId]);

  // Fetch all student payments
  const fetchData = async () => {
    try {
      console.log(`/api/v1/spendRoute/managespends/${auth.user._id}`);
      const response = await axios.get(
        `/api/v1/spendRoute/managespends/${auth.user._id}`
      );
      setSpends(response.data.data);
      setFilteredSpends(response.data.data);
    } catch (error) {
      console.log("Error fetching student data");
    }
  };
  const handleFilterChange = () => {
    const filtered = spends.filter((spend) => {
      const spendDate = new Date(spend.date);
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);

      return (
        (spendType
          ? spend.spendType.toLowerCase().includes(spendType.toLowerCase())
          : true) &&
        (fromDate ? spendDate >= fromDateObj : true) &&
        (toDate ? spendDate <= toDateObj : true)
      );
    });
    setFilteredSpends(filtered);
    setPage(0); // Reset to the first page after filtering
  };

  const handleViewSpend = (spend) => {
    setSelectedSpend(spend);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSpend(null);
  };

  // Calculate the total amount of spending
  const totalAmount = filteredSpends.reduce(
    (sum, spend) => sum + Number(spend.amount),
    0
  );

  return (
    <div className="responsive-container">
      <Zoom in={zoomIn} timeout={3000}>
        <Box sx={{ margin: "auto", padding: "20px" }}>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
            Manage Spending
          </Typography>

          <Paper elevation={3} sx={{ padding: "20px", mb: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item sx={{ flex: 1 }}>
                <TextField
                  label="From Date"
                  type="date"
                  value={fromDate} // Controlled value
                  onChange={(e) => setFromDate(e.target.value)} // Update state
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
                  value={toDate} // Controlled value
                  onChange={(e) => setToDate(e.target.value)} // Update state
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item sx={{ flex: 1 }}>
                <TextField
                  type="text"
                  label="Search By Spend Type"
                  value={spendType} // Controlled value
                  onChange={(e) => setSpendType(e.target.value)} // Update state
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Search By Spend Type"
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleFilterChange} // Call filter function
                  fullWidth
                  sx={{ padding: "15px 20px" }}
                >
                  Filter Payments
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Spend Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSpends
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((spend, index) => (
                    <TableRow key={spend.id}>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>
                        {new Date(spend.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>{spend.spendType}</TableCell>
                      <TableCell>₹{spend.amount}</TableCell>
                      <TableCell>{spend.description}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => handleViewSpend(spend)}
                          sx={{ mr: 1 }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredSpends.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />

          {/* Display Total Amount */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total Amount: ${totalAmount}
          </Typography>

          {/* Modal for Viewing Spend Details */}
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-title" variant="h6">
                Spend Details
              </Typography>
              {selectedSpend && (
                <>
                  <Typography id="modal-description" sx={{ mt: 2 }}>
                    <strong>Date:</strong>  {new Date(selectedSpend.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                  </Typography>
                  <Typography>
                    <strong>Spend Type:</strong> {selectedSpend.spendType}
                  </Typography>
                  <Typography>
                    <strong>Amount:</strong> ₹{selectedSpend.amount}
                  </Typography>
                  <Typography>
                    <strong>Description:</strong> {selectedSpend.description}
                  </Typography>
                </>
              )}
              <Button onClick={handleCloseModal} color="primary" sx={{ mt: 2 }}>
                Close
              </Button>
            </Box>
          </Modal>

          <Toaster position="top-center" reverseOrder={false} />
        </Box>
      </Zoom>
    </div>
  );
};

export default ManageSpend;
