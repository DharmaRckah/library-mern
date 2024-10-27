import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";

import logo from '../../assets/images/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-700 via-orange-500 to-blue-700 text-white w-screen py-6 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:justify-between space-y-8 lg:space-y-0">

        {/* Brand Section */}
        <div className="flex flex-col items-center lg:items-start lg:w-1/3">
          <img src={logo} alt="Logo" className="w-[60%]  border-[#F7EAD0] items-center" />
          <span className="text-2xl text-start mb-4 font-semibold">Swami Vivekanand library</span>
        </div>

        {/* Quick Links */}
        <div className="lg:w-1/3" style={{
          fontFamily:"Fira Sans",
          fontWeight:"bolder"
        }}>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-1.5">
            <li><a href="#home" className="hover:underline hover:text-gray-400 hover:font-extrabold transition-colors duration-300">Home</a></li>
            <li><a href="#about" className="hover:underline hover:text-gray-400 transition-colors duration-300">About Us</a></li>
            <li><a href="#plans" className="hover:underline hover:text-gray-400 transition-colors duration-300">Fess Plans</a></li>
            <li><a href="#missionvision" className="hover:underline hover:text-gray-400 transition-colors duration-300">Mission Vision</a></li>
            <li><a href="#gallery" className="hover:underline hover:text-gray-400 transition-colors duration-300">Gallery</a></li>
            <li><a href="#contact" className="hover:underline hover:text-gray-400 transition-colors duration-300">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="lg:w-1/3">
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex justify-center lg:justify-start space-x-4">
            <a href="https://www.facebook.com/profile.php?id=100024573845283" className="text-white text-blue-700 hover:text-blue-400 transition-colors duration-300"><FaFacebook size={32} /></a>
            <a href="https://www.instagram.com/study__king124/" className="text-red-800 hover:text-red-600 p-0 rounded-full transition-colors duration-300"><FaInstagram size={32} /></a>
            <a href="https://www.google.com/"><FcGoogle size={32} className='text-yellow-700'/></a>
            <a  href="https://wa.me/918269932214" className="text-green-700 hover:text-green-500 transition-colors duration-300"><FaWhatsapp size={32} /></a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="lg:w-1/3" style={{
          fontFamily:"playpen Sans"
        }}>
          <h3 className="text-lg font-bold mb-4">Contact Info</h3>
          <p className="mb-2">
            <span className="font-semibold">Mobile :</span> +918269932214 ,  +916265732532
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email :</span> kp826993@gmail.com
          </p>
          <p>
            <span className="font-semibold">Address :</span> Chaurasiya tiles madhauganj road Swami Vivekanand library Ajaigarh, Madhya Pradesh 488220
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;