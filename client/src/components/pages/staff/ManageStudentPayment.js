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
import axios from "axios";
import { useAuth } from "../../context/Auth.js";

const ManageStudentPayment = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState(payments);
  const [auth] = useAuth();
  const [userId, setUserId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [zoomIn, setZoomIn] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // New state variables for filtering
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchName, setSearchName] = useState("");

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
   
      const response = await axios.get(
        `/api/v1/studentpaymentRoute/manageStudentbystaffIdPayment/${auth.user._id}`
      );
      setPayments(response.data.data);
      setFilteredPayments(response.data.data);
    } catch (error) {
      toast.error("Error fetching student data");
    }
  };

  // Handle filtering payments
  const handleFilterPayments = () => {
    const filtered = payments.filter((payment) => {
      const paymentDate = new Date(payment.paymentDate);
      const from = new Date(fromDate);
      const to = new Date(toDate);

      const isWithinDateRange =
        (!fromDate || paymentDate >= from) && (!toDate || paymentDate <= to);

      const matchesName = payment.name
        .toLowerCase()
        .includes(searchName.toLowerCase());

      return isWithinDateRange && matchesName;
    });
    setFilteredPayments(filtered);
  };

  // Handle viewing payment in modal
  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setOpenModal(true);
  };
  const handleDeletet = async (payment) => {
    console.log(payment);
    const resp = await axios.delete(
      `/api/v1/studentpaymentRoute/deleteStudentPayment/${payment._id}`
    );
    if (resp.data.success) {
      toast.success(resp.data.message);
    } else {
      toast.success(resp.data.message);
    }
    fetchData();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPayment(null);
  };

  const handleGenerateReceipt = () => {
    const printWindow = window.open("", "_blank");

    const receiptContent = `
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
            .receipt-container { width: 80%; margin: 20px auto; border: 1px solid #ccc; padding: 20px; }
            .header { text-align: center; }
            .header img { width: 50px; height: 50px; }
            .header h1 { margin: 0; color: green; }
            .header p { margin: 0; color: red; }
            .info-table, .line-items-table { width: 100%; margin-top: 20px; border-collapse: collapse; }
            .info-table td { padding: 8px; border: none; color: MediumBlue; }
            .line-items-table th, .line-items-table td { border: 1px solid #ccc; padding: 8px; text-align: center; }
            .line-items-table th { background-color: #f2f2f2; }
            .totals { float: right; width: 40%; margin-top: 20px; }
            .totals td { padding: 5px; }
            .totals td:first-child { font-weight: bold; }
            .footer { text-align: right; margin-top: 20px; font-weight: bold; color: blue; }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="header">
              <img src="./logo.png" alt="Library Logo">
              <h1>Swami Vivekananda Library</h1>
              <p><strong>Address:</strong> Chaurasiya tiles madhauganj road Swami Vivekanand library Ajaigarh, Madhya Pradesh 488220</p>
              <p><strong>Phone:</strong> +918269932214 | <strong>Email:</strong> kp826993@gmail.com</p>
            </div>

            <table class="info-table">
              <tr>
                <td><strong>Bill To:</strong><br> Swami Vivekananda Library<br> Chaurasiya tiles madhauganj road Ajaigarh, Madhya Pradesh 488220<br> +918269932214, kp826993@gmail.com</td>
                <td><strong>Ship To:</strong><br> ${selectedPayment.name}<br> ${
      selectedPayment.address
    }<br> ${selectedPayment.contact}, ${selectedPayment.email}</td>
                <td><strong>Payment Date:</strong><br> ${new Date(
                  selectedPayment.paymentDate
                ).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}</td>
              </tr>
            </table>

            <table class="line-items-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${selectedPayment.description || "Service/Product"}</td>
                  <td>1</td>
                  <td>${selectedPayment.amount}</td>
                  <td>${selectedPayment.amount}</td>
                </tr>
              </tbody>
            </table>

            <table class="totals">
              <tr>
                <td>Subtotal:</td>
                <td>${selectedPayment.amount}</td>
              </tr>
              <tr>
                <td>Tax:</td>
                <td>0.00</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>${selectedPayment.amount}</td>
              </tr>
            </table>

            <div class="footer">
              Paid: $${selectedPayment.amount}
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(receiptContent);
    printWindow.document.close();
    printWindow.print();

    toast.success("Receipt generated successfully!");
    handleCloseModal();
  };

  const totalAmount = filteredPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  return (
    <div className="responsive-container">
      <Zoom in={zoomIn} timeout={3000}>
        <Box sx={{ margin: "auto", padding: "20px" }}>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
            Manage Student Payments
          </Typography>

          {/* <Paper elevation={3} sx={{ padding: "20px", mb: 4 }}>
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
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  fullWidth
                  placeholder="Search By Student Name"
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ padding: "15px 20px" }}
                  onClick={handleFilterPayments}
                >
                  Filter Payments
                </Button>
              </Grid>
            </Grid>
          </Paper> */}

          <Paper elevation={4} sx={{ mb: 4 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Serial No</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Pincode</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPayments
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {new Date(payment.paymentDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </TableCell>
                        <TableCell>{payment.name}</TableCell>
                        <TableCell>{payment.contact}</TableCell>
                        <TableCell>{payment.email}</TableCell>
                        <TableCell>{payment.pincode}</TableCell>
                        <TableCell>{payment.amount}</TableCell>

                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleViewPayment(payment)}
                          >
                            View
                          </Button>
                        </TableCell>
                        {/* <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleDeletet(payment)}
                          >
                            Delete
                          </Button>
                        </TableCell> */}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={filteredPayments.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => setRowsPerPage(e.target.value)}
            />
          </Paper>
          <Grid container spacing={2}>
            {/* Other content fields here */}

            {/* Total Amount (right aligned text) */}
            <Grid item xs={12} container justifyContent="flex-end">
              <Typography variant="h6" align="right">
                Total Amount Collected: ₹{totalAmount}
              </Typography>
            </Grid>
          </Grid>

          <Modal open={openModal} onClose={handleCloseModal}>
            <Box
              sx={{
                maxWidth: 600,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                margin: "auto",
                marginTop: "20vh",
                borderRadius: 2,
              }}
            >
              {selectedPayment && (
                <>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Payment Details for {selectedPayment.studentName}
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="Name"
                        value={selectedPayment.name}
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Father's Name"
                        value={selectedPayment.fatherName}
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Contact"
                        value={selectedPayment.contact}
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Email"
                        value={selectedPayment.email}
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Pincode"
                        value={selectedPayment.pincode}
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Payment Date"
                        type="date"
                        value={selectedPayment.date}
                        fullWidth
                        disabled
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Payment Method"
                        value={selectedPayment.method}
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Amount"
                        value={selectedPayment.amount}
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Description"
                        value={selectedPayment.description}
                        fullWidth
                        multiline
                        rows={2}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGenerateReceipt}
                        sx={{ mt: 2 }}
                      >
                        Generate Receipt
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </Box>
          </Modal>

          <Toaster />
        </Box>
      </Zoom>
    </div>
  );
};

export default ManageStudentPayment;
