
import React, { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../loader/LoaderHand"; // Import the Loader component

const ResetPassword = () => {
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post('/api/v1/auth/resetPassword', formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          email: '',
          otp: '',
          password: '',
          confirmPassword: '',
        });
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center font-montserrat px-2">
      {loading ? (
        <Loader />
      ) : (
        <div className="p-6 shadow-lg rounded-lg bg-white w-full max-w-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="text-center mb-6">
            <div className="logo rounded-full w-16 h-16 mx-auto bg-blue-500 text-white flex justify-center items-center">
              <FaUserAlt className="text-3xl" />
            </div>
            <h2 className="text-2xl font-bold mt-4">Reset Password</h2>
          </div>
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
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-500" />
              <input
                type="password"
                name="password"
                placeholder="New Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-500" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between mt-6">
              {/* Cancel Button */}
              <button
                type="button"
                onClick={handleCancel}
                className="py-3 px-4 rounded-md bg-gradient-to-r from-red-400 to-blue-500 hover:from-teal-500 hover:to-orange-500"
              >
                Cancel
              </button>
              {/* Reset Button */}
              <button
                type="submit"
                className="py-3 px-4 rounded-md bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
                disabled={loading}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
