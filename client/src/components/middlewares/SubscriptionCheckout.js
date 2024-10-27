import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { useAuth } from '../context/Auth.js';

const SubscriptionCheckout = () => {
  const [plans, setPlans] = useState([]);
  const [loadingPlan, setLoadingPlan] = useState(null); // Track loading state for each plan
  const [auth] = useAuth();
  const _id = auth?.user?._id;

  useEffect(() => {
    toast.error("Your Subscription has been expired ...!  Subscribe Now ")
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('/api/v1/subscription/all');
      setPlans(response.data.plan);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const loadRazorpay = (plan) => {
    if (plan.planStatus === "Inactive") {
      toast.error("This plan is currently Unavailable");
      return;
    }

    setLoadingPlan(plan._id); 

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      alert('Razorpay SDK failed to load. Are you online?');
    };
    script.onload = async () => {
      try {
        const result = await axios.post('/api/v1/payment/createorder', {
          amount: plan.price * 100,
        });
        const { amount, id: order_id, currency } = result.data;
        const { data: { key: razorpayKey } } = await axios.get('/api/v1/payment/get-razorpay-key');

        const options = {
          key: razorpayKey,
          amount: amount,
          currency: currency,
          name: 'Manasvi Technologies',
          description: 'Transaction to Manasvi',
          order_id: order_id,
          handler: async (response) => {
            await axios.post('/api/v1/payment/subpayorder', {
              paymentMode: true,
              amount: amount,
              razorpay: {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              },
              plan: plan,
              customer: _id,
            });

            toast.success('Payment Completed Successfully');
            handleLogout()
          },
          prefill: {
            name: 'Manasvi Technologies',
            email: 'staff.manasvi@gmail.com',
            contact: "6268301547",
          },
          notes: {
            address: '30, Minal Residency Bhopal D.',
          },
          theme: {
            color: '#80c0f0',
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
      } finally {
        setLoadingPlan(null); // Reset loading state after completion
      }
    };
    document.body.appendChild(script);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("dauth");
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <div className="responsive-container  px-4 py-1 max-w-48xl">
      <div className="mx-auto p-8 border border-gray-300 shadow-lg rounded-lg bg-white">
        <Box>
          {/* Welcome Message */}
          {auth?.user && (
            <Box display="flex" justifyContent="center" alignItems="center" mb={2} sx={{ width: "100%" }}>
              <Typography variant="h4" sx={{ mr: 2 ,  textShadow: '2px 2px 4px rgba(160, 32, 40, 0.9)',}}>
                Welcome, {auth?.user.userName}!
              </Typography>
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                mr: 2,
                textShadow: '2px 2px 4px rgba(160, 32, 40, 0.5)', // Add box shadow to text
              }}
            >
              Subscribe Now to Continue Our Service
            </Typography>
          </Box>


          {/* Subscription Plans Section */}
          <Box mt={2}>
            <Grid container spacing={2}>
              {plans.map((plan) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={plan._id}>
                  <Card variant="outlined" sx={{ mb: 2, pt: 0.2,  borderTopLeftRadius: 50, borderBottomRightRadius: 50 }}>
                    <CardContent align="center">
                      <Typography style={{borderTopLeftRadius:50,borderBottomRightRadius:50,}} variant="h6" pb={1} sx={{  pb: 1, background: 'purple', textAlign: "center", color: 'white', borderRadius: '5px', padding: '2px 6px' }}>
                        {plan.planName} Plan
                      </Typography>
                      <Typography variant="h6" sx={{ textAlign: "center", fontFamily: "Merriweather", fontStyle: "bold" }}>
                        Duration: {plan.duration} days
                      </Typography>
                      <Typography variant="h5" sx={{ textAlign: "center", color: "tomato", fontFamily: "Kings", fontWeight: "40px" }}>
                        Price ₹{plan.price}
                      </Typography>
                      <Typography>
                        Status: {plan.planStatus} {plan.planStatus === 'Active' ? (
                          <CheckCircle sx={{ color: 'green', mr: 1 }} />
                        ) : (
                          <Cancel sx={{ color: 'red', mr: 1 }} />
                        )}
                      </Typography>
                      <Typography>{plan.description}</Typography>
                      <Box mt={2} display="flex" justifyContent="center">
                        <Button style={{borderTopLeftRadius:40,borderBottomRightRadius:40,  textShadow: '2px 2px 4px rgba(160, 32, 40, 0.9)',}}
                          variant="contained"
                          sx={{ textAlign: 'center', borderRadius: '1px' }}
                          color="primary"
                          onClick={() => loadRazorpay(plan)}
                          disabled={loadingPlan === plan._id}
                        >
                          {loadingPlan === plan._id ? 'Processing ...' : 'Subscribe'}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Toaster />
        </Box>
      </div>
    </div>
  );
};

export default SubscriptionCheckout;
