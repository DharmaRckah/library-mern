import React, { useEffect, useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify
import Loader from "../loader/LoaderHand.js"; // Import the Loader component
import { useAuth } from "../context/Auth.js";
import { Cancel } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const [dauth] = useAuth();

  useEffect(() => {
    if (dauth?.user?.role === 1 ) {
      navigate("/admin");
    }
  
  
    if (dauth?.user?.role === 0) {
      if (dauth.AccessToken) {
        navigate("/staff");
      }
    }
  }, [dauth, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // Loading state

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

    try {
      const response = await axios.post("/api/v1/auth/login", formData);
      
      if (response.data.success) {
        // Update the auth state once with the response
        const userData = {
          user: response.data.user,
          AccessToken: response.data.AccessToken,
        };
    
        setAuth(userData);
        sessionStorage.setItem("dauth", JSON.stringify(userData));
    
        // Check the user's role
        if (response.data.user.role === 1) {
          // Role is 1, so we hit the company API
          try {
            const companyResponse = await axios.get(`/api/v1/company/get/${response.data.user._id}`);
            
            if (companyResponse.data.success) {
              toast.success(response.data.message);
    
           
            } else {
              // Redirect to company registration if company data is not found
              navigate("/companyregistration", { replace: true });
            }
          } catch (error) {
            if (error.response && error.response.status === 404) {
              // Company not found, navigate to registration
              navigate("/companyregistration", { replace: true });
              return;
            } else {
              console.error("Error fetching company data:", error);
              toast.error("Error fetching company details. Please try again.");
            }
          }
        } else {
          // Handle navigation for non-admin users
          if (response.data.user.role === 0) {
            navigate("/staff", { replace: true });
          } else if (response.data.user.role === 2) {
            navigate("/superadmin", { replace: true });
          }
        }
      } else {
        // Display error message if login failed
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error during login:", error);
      
      if (error.response) {
        toast.error(`Server error: ${error.response.status} - ${error.response.data.message}`);
      } else if (error.request) {
        toast.error("Network error: No response from the server. Please check your connection.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
    
  };

  return (
    // <div
    //   className="bg-gray-100 min-h-screen flex justify-center items-center font-montserrat px-2"
    //   data-aos="fade-right"
    // >
    //   {loading ? (
    //     <Loader />
    //   ) : (
    //     <div
    //       className="p-6 shadow-lg rounded-lg bg-white w-full max-w-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    //       data-aos="fade-up"
    //       data-aos-duration="3000"
    //     >
    //       {/* Logo and title */}
    //       <div
    //         className="text-center mb-6 "
    //         data-aos="zoom-in-down"
    //         data-aos-delay="1000"
    //       >
    //         <div className="logo rounded-full w-16 h-16 mx-auto bg-blue-500 text-white flex justify-center items-center">
    //           <FaUserAlt className="text-3xl" />
    //         </div>
    //         <h2
    //           className="text-2xl font-bold mt-4"
    //           data-aos="zoom-in-down"
    //           data-aos-delay="300"
    //         >
    //           Login
    //         </h2>
    //       </div>
    //       {/* Form */}
    //       <form
    //         onSubmit={handleSubmit}
    //         className="space-y-4 "
    //         data-aos="zoom-in-up"
    //       >
    //         <div className="relative">
    //           <FaUserAlt className="absolute left-3 top-3 text-gray-500" />
    //           <input
    //             data-aos="zoom-in-down"
    //             data-aos-delay="800"
    //             type="email"
    //             name="email"
    //             placeholder="Email"
    //             value={formData.email}
    //             onChange={handleChange}
    //             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           />
    //         </div>
    //         <div className="relative">
    //           <FaLock className="absolute left-3 top-3 text-gray-500" />
    //           <input
    //             data-aos="zoom-in-down"
    //             data-aos-delay="1000"
    //             type="password"
    //             name="password"
    //             placeholder="Password"
    //             value={formData.password}
    //             onChange={handleChange}
    //             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           />
    //         </div>
    //         <div className="flex justify-center space-x-4 mt-6">
    //           {" "}
    //           {/* Flex container for buttons */}
    //           <button
    //             data-aos="zoom-out-right"
    //             data-aos-delay="2000"
    //             type="button" // Changed to type="button" for Cancel
    //             className="py-3 text-center px-4 rounded-md bg-gradient-to-r from-red-400 to-blue-500 hover:from-teal-500 hover:to-orange-500"
    //             onClick={() => navigate(-1)} // Navigate to another page on Cancel
    //           >
    //             Cancel
    //           </button>
    //           <button
    //             data-aos="zoom-out-left"
    //             data-aos-delay="2000"
    //             type="submit"
    //             className="py-3 text-center px-4 rounded-md bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
    //             disabled={loading} // Disable button while loading
    //           >
    //             Login
    //           </button>
    //         </div>
    //       </form>
    //       <div className="text-center mt-4">
    // <p className="text-sm ">
    //   Don't have an account?{" "}
    //   <Link
    //     to="/registration"
    //     className="text-yellow-500 font-mono hover:underline"
    //   >
    //     Sign Up
    //   </Link>
    // </p>
    //         <p className="text-sm text-gray-600">
    //           <Link
    //             to="/forgetpassword"
    //             className="text-yellow-500 font-light hover:underline"
    //           >
    //             Forgot password?
    //           </Link>
    //         </p>
    //       </div>
    //     </div>
    //   )}
    //   <ToastContainer />
    // </div>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="md:w-1/3 lg:w-1/3 sm:w-full bg-gradient-to-b from-white to-slate-200 rounded-2xl p-6 border-5 border-white shadow-lg">
        {loading ? (
          <Loader />
        ) : (
          <>
            <form onSubmit={handleSubmit} className="mt-5 h-[350px]">
              <div className="text-center font-bold text-3xl text-blue-600">
                Sign In
              </div>
              <input
                required
                className="w-full bg-white border-none py-3 px-5 rounded-full mt-4 shadow-md placeholder-gray-400 focus:outline-none focus:border-blue-400"
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                required
                className="w-full bg-white border-none py-3 px-5 rounded-full mt-4 shadow-md placeholder-gray-400 focus:outline-none focus:border-blue-400"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="block mt-2 ml-2">
                <Link
                  className="text-xs text-blue-600 no-underline"
                  to="/forgetpassword"
                >
                  Forgot Password?
                </Link>
              </span>
              <input
                className="block w-full font-bold bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-full mt-5 cursor-pointer transition-transform transform hover:scale-105 active:scale-95 shadow-md"
                type="submit"
                value="Sign In"
              />
              <Link
                to="/registration"
                className="text-yellow-500 font-mono font-semibold hover:underline transition duration-200 ease-in-out"
              >
                <p className="text-sm mt-4 p-2 bg-white rounded-lg shadow-md text-center">
                  Don't have an account? Sign Up
                </p>
              </Link>
              <button
                type="button"
                className="block w-full font-bold bg-gradient-to-r from-red-600 to-pink-500 text-white py-3 rounded-full mt-5 cursor-pointer transition-transform transform hover:scale-105 active:scale-95 shadow-md"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </form>
            <div className="mt-6">
              <span className="block text-center text-xs text-gray-400">
                Or Sign in with
              </span>
              <div className="flex justify-center gap-4 mt-2">
                <button className="bg-gradient-to-r from-black to-gray-600 border-5 border-white p-1 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-transform transform hover:scale-110 active:scale-90">
                  {/* Google SVG */}
                  <svg
                    className="w-6 h-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>
                </button>
                <button className="bg-gradient-to-r from-black to-gray-600 border-5 border-white p-1 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-transform transform hover:scale-110 active:scale-90">
                  {/* Apple SVG */}
                  <svg
                    className="w-6 h-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 1.3 52.7-7.9 69.8-34.4zm-4.7 327.3c-25.2 8.7-41.2 19.1-69.3 16-17.2-1.6-35.6-3.9-53.6-21-10.6-10.4-21.3-25.5-24.5-32.6-4-8.3-5.2-11.8-7.4-21.2 0 0-1.2-1.4-1.4-2 14.7 8.2 28.2 11 43.2 11.5 18.4.6 34.8-5.7 49.1-19.6 8.5-8.2 12.6-19.2 18.7-28 7.5-11.2 17.5-22 27.3-24.4 18.1-4.3 37.1 10.6 44.3 19.5 11.1 13.3 10.4 27.3-1.5 35-16.5 10.5-38.4 11.9-58.3 17.3-13.1 3.9-31.6 9.4-40.7 3.5z"></path>
                  </svg>
                </button>
                <button className="bg-gradient-to-r from-black to-gray-600 border-5 border-white p-1 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-transform transform hover:scale-110 active:scale-90">
                  {/* Apple SVG */}
                  <svg
                    class="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
