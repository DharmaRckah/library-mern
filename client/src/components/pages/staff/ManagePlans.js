import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

function ManagePlans() {
  const [showFeesPlan, setFessPlan] = useState([]);
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
        {showFeesPlan.map((plan, index) => {
          // Calculate the 10% discount
          const discount = (plan.planprice * 10) / 100;
          const discountedPrice = plan.planprice - discount;

          return (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <Card
                elevation={3}
                style={{
                  background: gradientColors[index % gradientColors.length],
                  padding: "10px",
                }}
              >
                <CardContent>
                  {/* Custom styles applied here */}
                  <div className="p-4">
                    <h3 className="text-xl font-serif font-semibold text-[#b97432] mb-3">
                      {plan.planName}
                    </h3>
                    <p className="text-gray-600">{plan.description}</p>
                    
                    {/* Original price with strikethrough */}
                    <p className="text-lg font-bold text-gray-500 line-through">
                      Price: ₹{plan.planprice}
                    </p>
                    
                    {/* 10% off text */}
                    <p className="text-sm text-green-600">10% off</p>

                    {/* Discounted price */}
                    <div className="text-lg font-bold text-[#b97432]">
                      New Price: ₹{discountedPrice.toFixed(2)}
                    </div>
                  </div>

                  {/* Duration section */}
                  <Typography color="text.secondary" gutterBottom>
                    Duration: {plan.planduration} months
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <ToastContainer />
    </div>
  );
}

export default ManagePlans;
