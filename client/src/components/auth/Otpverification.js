
import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'; 

const OtpVerification = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const clearData = () => {
    setFormData({
      email: "",
      otp: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/auth/verification", formData);
     
      if (response.data.success) {
        toast.success(response.data.message);
        
        setTimeout(() => {
          navigate("/");
        }, 3000);  // Wait for 3 seconds before navigating
        
        clearData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error verifying OTP");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center font-montserrat">
      <div className="p-6 shadow-lg rounded-lg bg-white w-full max-w-md">
        {/* Logo and title */}
        <div className="text-center mb-6">
          <div className="logo rounded-full w-16 h-16 mx-auto bg-blue-500 text-white flex justify-center items-center">
            <FaUserAlt className="text-3xl" />
          </div>
          <h2 className="text-2xl font-bold mt-4">OTP Verification</h2>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="otp"
              placeholder="OTP"
              value={formData.otp}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none transition duration-300"
          >
            Verify
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OtpVerification;
