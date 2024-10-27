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
    <div className="bg-gray-100 min-h-screen flex justify-center items-center font-montserrat p-6" data-aos="fade-left">
      {loading ? (
        <Loader />
      ) : (
        <div className="p-6 shadow-lg rounded-lg bg-white w-full max-w-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          {/* Logo and title */}
          <div className="text-center mb-6" data-aos="zoom-in-down" data-aos-delay="300">
            <div className="logo rounded-full w-16 h-16 mx-auto bg-blue-500 text-white flex justify-center items-center">
              <FaUserAlt className="text-3xl" />
            </div>
            <h2 className="text-2xl font-bold mt-4" data-aos="zoom-in-down" data-aos-delay="400">Sign up</h2>
          </div>
          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative" data-aos="zoom-in-down" data-aos-delay="500">
              <FaBuilding className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>
            <div className="relative" data-aos="zoom-in-down" data-aos-delay="600">
              <FaUserAlt className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="userName"
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>
            <div className="relative" data-aos="zoom-in-down" data-aos-delay="700">
              <FaAddressCard className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>
            <div className="relative" data-aos="zoom-in-down" data-aos-delay="800">
              <FaPhone className="absolute left-3 top-3 text-gray-500" />
              <input
                type="number"
                name="contact"
                placeholder="Contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>
            <div className="relative" data-aos="zoom-in-down" data-aos-delay="900">
              <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>
            <div className="relative" data-aos="zoom-in-down" data-aos-delay="1000">
              <FaLock className="absolute left-3 top-3 text-gray-500" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>
            <div className="relative" data-aos="zoom-in-down" data-aos-delay="1100">
              <FaBuilding className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="businessType"
                placeholder="Business Type"
                value={formData.businessType}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>
            <div className="flex justify-center space-x-4 mt-6" data-aos="zoom-in-down">
              {/* Cancel Button */}
              <button
                type="button"
                className="py-3 px-4 rounded-md bg-gradient-to-r from-red-400 to-blue-500 hover:from-teal-500 hover:to-orange-500"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
              {/* Sign Up Button */}
              <button
                type="submit"
                className="py-3 px-4 rounded-md bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
                disabled={loading}
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-white-500 hover:underline border border-white px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-teal-500 hover:to-blue-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Registration;
