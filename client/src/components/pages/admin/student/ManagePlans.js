import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Modal,
  TextField,
  Box,
  Container,
  Paper
} from "@mui/material";
import { useAuth } from "../../../context/Auth";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

function ManagePlans() {
  const [showFeesPlan, setFessPlan] = useState([]);
  const [auth] = useAuth();
  const [userId, setUserId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Form fields for the modal
  const [planName, setPlanName] = useState("");
  const [planDuration, setPlanDuration] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [description, setDescription] = useState("");

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

  // Fetch all plans
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/v1/feesPlanRoute/manageFeesPlan/${userId}`
      );
      setFessPlan(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateClick = (plan) => {
    // Populate the modal fields with the selected plan data
    setSelectedPlan(plan);
    setPlanName(plan.planName);
    setPlanDuration(plan.planduration);
    setPlanPrice(plan.planprice);
    setDescription(plan.description);
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
  };

  const handleUpdatePlan = async () => {
    try {
      const updatedPlan = {
        planName,
        planduration: planDuration,
        planprice: planPrice,
        description,
      };

      const response = await axios.put(
        `/api/v1/feesPlanRoute/updateFeesPlan/${selectedPlan._id}`,
        updatedPlan,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message) {
        toast.success(response.data.message);
        fetchData(); // Refresh the plans after updating
        handleCloseModal(); // Close modal after success
      }
    } catch (error) {
      console.log(error);
      console.log("Error: Unable to update plan");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/feesPlanRoute/deleteFeesPlan/${id}`);
      if (response.data.message) {
        toast.success(response.data.message);
        fetchData(); // Refresh the list after deletion
      }
    } catch (error) {
      console.log(error);
      console.log("Error: Unable to delete the plan");
    }
  };

  const gradientColors = [
    "linear-gradient(to right, #ffafbd, #ffc3a0)", // Pink gradient
    "linear-gradient(to right, #a1c4fd, #c2e9fb)", // Blue gradient
    "linear-gradient(to right, #ffecd2, #fcb69f)", // Orange gradient
    "linear-gradient(to right, #d4fc79, #96e6a1)", // Green gradient
  ];

  return (
    <div style={{ padding: "20px" }} className="responsive-container">
      <Typography variant="h4" gutterBottom align="center">
        Manage Plans
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {showFeesPlan.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card
              elevation={3}
              style={{
                background: gradientColors[index % gradientColors.length],
                padding: "10px",
              }}
            >
              <CardContent>
              <div className="p-4">
                  <h3 className="text-3xl font-serif font-semibold text-[#b97432] mb-3">
                    {plan.planName}
                  </h3>
                  <p className="text-md text-blue-600">
                    {plan.description}
                  </p>
                  <p className="text-lg font-bold text-[#b97432]">
                    Price: ₹{plan.planprice}
                  </p>

                  <p className="text-lg font-bold text-[green]">
                  Duration: {plan.planduration} months
                  </p>
                </div>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleUpdateClick(plan)}
                >
                  Update
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleDelete(plan._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for updating plan */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Container maxWidth="sm">
          <Paper elevation={6} sx={{ padding: 4, marginTop: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Update Plan
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Plan Name"
                variant="outlined"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Plan Duration (in months)"
                variant="outlined"
                type="number"
                value={planDuration}
                onChange={(e) => setPlanDuration(e.target.value)}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Plan Price"
                variant="outlined"
                type="number"
                value={planPrice}
                onChange={(e) => setPlanPrice(e.target.value)}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdatePlan}
                  sx={{ paddingX: 4 }}
                >
                  Update Plan
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default ManagePlans;
