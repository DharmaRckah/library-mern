import React, { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { motion } from 'framer-motion';
import g1 from '../assets/images/about.jpeg';

const HomeAboutSection = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes scrollingText {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
    `;
    document.head.appendChild(style);
  }, []);
  return (
    <div className="py-12 px-4 sm:px-8 bg-gradient-to-r from-pink-800 via-orange-600 to-pink-700">
           <div className="w-full   p-4  flex flex-col">
        <div className="relative overflow-hidden h-12">
          {/* Moving text element */}
          <div
            className="inline-block whitespace-nowrap text-lg text-4xl md:text-4xl font-bold shadow-sm p-2 rounded  text-white"
            style={{
              animation: "scrollingText 10s linear infinite",
            }}
          >
             Hello, Welcome To Swami Vivekananda Library, Enjoy Your Day
          </div>
        </div>
      </div>
       <hr className='border-t-2 border-white pb-5' />
      <div className="container mx-auto flex flex-col lg:flex-row items-center font-serif lg:space-x-16">
        {/* Image Section */}
        <motion.div
          className="w-full lg:w-1/2 xl:w-1/3 mb-10 lg:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={g1}
            alt="Dr Harshita Patel"
            className="rounded-xl shadow-md object-cover w-full h-auto max-h-[500px]"
            data-aos="zoom-in"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="w-full lg:w-1/2 xl:w-2/3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-center text-white mb-6" data-aos="zoom-in-down">
            About Swami Vivekananda Library
          </h2>
          <p className="text-white text-base sm:text-lg mb-4 leading-relaxed" data-aos="zoom-out-up">
            Welcome to <span className="font-bold text-white font-serif">Swami Vivekananda Library</span>, led by a dedicated and knowledgeable team. Our library is committed to providing access to a wide range of educational resources, focusing on personalized support, advanced technology, and a member-first approach.
          </p>
          <p className="text-white text-base sm:text-lg mb-6 leading-relaxed" data-aos="zoom-out-up">
            Whether you're here for routine study sessions, research, or special events, our experienced team is dedicated to offering the best library experience with a focus on your learning and growth.
          </p>
          <p className="text-white text-base sm:text-lg leading-relaxed" data-aos="zoom-out-up">
            We invite you to explore our comprehensive collection of books, journals, and digital resources that will not only enhance your knowledge but also boost your confidence and intellectual curiosity.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeAboutSection;