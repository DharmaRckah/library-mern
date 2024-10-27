import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom"; // Ensure you import useNavigate for navigation
import DemoForm from "./DemoForm"; // Import your DemoForm component

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Fees Plans", id: "plans" },
  { label: "Mission Vision", id: "missionvision" },
  { label: "Contact", id: "contact" },
  { label: "Our Gallery", id: "gallery" },
  // { label: "Login", href: "/login" },
];

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenLogin = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const drawer = (
    <div className="text-center p-4 bg-gradient-to-r from-pink-700 via-orange-500 to-blue-700">
      <div className="flex">
        <img src={logo} alt="Logo" className="h-20" />
        <h1 className=" bg-gradient-to-r from-red-500 to-blue-500 via-orange-500 via-yellow-500 to-white bg-clip-text text-transparent text-7xl font-bold">
          𝕊𝕍ℕ
        </h1>
      </div>
      <div className="border-b border-gray-300 mb-4" />
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href ? item.href : `#${item.id}`}
              className="block text-left text-sm font-bold py-2 px-4 rounded-md border-2 border-transparent text-white bg-pink-700 hover:bg-[#FA1616] hover:text-pink-300 px-4 py-2 rounded-md"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <button
        onClick={handleOpenLogin} // Use handleOpenLogin to navigate to login
        className="mt-4 bg-pink-500 hover:bg-red-700 text-white py-2 px-6 rounded-full text-sm font-semibold hover:bg-blue-600"
      >
        Login
      </button>
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-pink-700 via-orange-500 to-blue-700">
      <div className="flex">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
          <nav className="bg-gradient-to-r from-pink-700 via-orange-500 to-blue-700 container mx-auto flex justify-between items-center  ">
            {/* Logo for small and large screens */}
            <div className="flex">
              <img src={logo} alt="Logo" className="h-20" />
              <h1 className=" bg-gradient-to-r from-red-500 to-blue-500 via-orange-500 via-yellow-500 to-white bg-clip-text text-transparent text-7xl font-bold">
                𝕊𝕍ℕ
              </h1>
            </div>
            {/* Mobile menu button */}
            <button
              className="text-gray-800 md:hidden"
              onClick={handleDrawerToggle}
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href ? item.href : `#${item.id}`}
                    className="text-lg font-bold text-white hover:text-blue-700 py-1 px-1 relative group"
                  >
                    {item.label}
                    {/* Left-to-Right Underline Animation */}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] rounded bg-blue-700  transition-all duration-300 transform group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Book Demo button */}
            <button
              onClick={handleOpenLogin} // Handle login button click here
              className="text-2xl px-6 py-1 mr-4 text-[red] border border-[red] hover:border-[yellow] rounded hover:bg-green-500 hover:text-white transition duration-300"
            >
              Login
            </button>
          </nav>
        </header>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-white p-4">
            <div className="flex justify-end">
              <button onClick={handleDrawerToggle} className="text-gray-800">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            {drawer}
          </div>
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
