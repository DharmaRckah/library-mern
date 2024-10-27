import React, { useState } from "react";
import axios from "axios";
import Loader from "../loader/LoaderHand";
import {
  FaUserAlt,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaAddressCard,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    userName: "",
    address: "",
    contact: "",
    email: "",
    password: "",
    businessType: "",
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
      businessName: "",
      userName: "",
      address: "",
      contact: "",
      email: "",
      password: "",
      businessType: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { businessName, userName, address, contact, email, password, businessType } = formData;
    if (!businessName) return toast.error("Business Name is required");
    if (!userName) return toast.error("Username is required");
    if (!address) return toast.error("Address is required");
    if (!contact) return toast.error("Contact is required");
    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");
    if (!businessType) return toast.error("Business Type is required");

    setLoading(true);

    try {
      const response = await axios.post("/api/v1/auth/register", formData);
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        clearData();
        setTimeout(() => {
          navigate("/otpverification");
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred. Please try again.");
      } else if (error.request) {
        toast.error("No response from the server. Please check your network connection.");
      } else {
        toast.error("An error occurred while sending the request.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center font-montserrat px-2z " data-aos="fade-left">
      {loading ? (
        <Loader />
      ) : (
        <div className=" md:w-1/3 lg:w-1/3 sm:w-full bg-gradient-to-b from-white to-slate-200 rounded-2xl p-6 border-5 border-white shadow-lg ">
          {/* Logo and title */}
          <div className="text-center ">
            <div className="logo rounded-full w-16 h-16 mx-auto bg-blue-500 text-white flex justify-center items-center">
              <FaUserAlt className="text-3xl" />
            </div>
            <h2 className="text-2xl font-bold mb-1">Sign Up</h2>
          </div>
          {/* Form */}
          <form className="space-y-4 " onSubmit={handleSubmit}>
            <div className="relative">
              <FaBuilding className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <FaUserAlt className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="userName"
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <FaAddressCard className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-gray-500" />
              <input
                type="number"
                name="contact"
                placeholder="Contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
              <input
                type="email"
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
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <FaBuilding className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="businessType"
                placeholder="Business Type"
                value={formData.businessType}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-center  ">
              {/* Cancel Button */}
            
              {/* Sign Up Button */}
              <button
                type="submit"
                className="block w-full font-bold bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-full mt-5 cursor-pointer transition-transform transform hover:scale-105 active:scale-95 shadow-md"
                disabled={loading}
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
          <Link
              to="/login"
              className="text-yellow-500 font-mono font-semibold hover:underline transition duration-200 ease-in-out"
            >
              <p className="text-sm mt-4 p-2 bg-white rounded-lg shadow-md text-center">
              Already have an account? <span className="text-green-500">Login</span>
              </p>
            </Link>
          
          </div>
          <div className="flex justify-center space-x-4 ">
              {/* Cancel Button */}
              <button
                type="button"
                className="block w-full font-bold bg-gradient-to-r from-red-600 to-pink-500 text-white py-3 rounded-full mt-5 cursor-pointer transition-transform transform hover:scale-105 active:scale-95 shadow-md"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
          
            </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Registration;
