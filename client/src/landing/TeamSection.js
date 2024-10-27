import React from "react";
import img1 from "../assets/images/ceo.jpg";
import img2 from "../assets/images/janpad.avif";

const TeamSection = () => {
  return (
    <div className="container bg-gradient-to-r from-[#211C6A] via-[#B51B75] to-[#F94C10]  mx-auto p-6 md:flex md:flex-row font-serif justify-between items-center space-y-12 md:space-y-0 md:space-x-8">
      <hr className='border-t-2 border-white pb-5' />
      <div className="w-full md:w-1/2 p-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          data-aos="zoom-in-down"
        >
          Meet Er. Kuldeep Prajapati
        </h2>
        <p
          className=" leading-relaxed text-lg mb-6 text-white"
          data-aos="zoom-out-up"
        >
          <span className="font-bold text-white">
            Er. Kuldeep Prajapati
          </span>
          , a visionary leader and an advocate for education, is the driving
          force behind{" "}
          <span className="font-bold text-white">
            Swami Vivekananda Library
          </span>
          . With a blend of technical expertise and a passion for knowledge, he
          has transformed the library into a beacon of learning and intellectual
          growth. His commitment to providing the latest resources, combined
          with his focus on member-centric service, has made him a respected
          figure in the field of library sciences.
        </p>
        <p
          className=" leading-relaxed text-white text-lg"
          data-aos="zoom-out-up"
        >
          Under his leadership, Swami Vivekananda Library has expanded its
          reach, offering a wide array of books, journals, and digital
          resources. Er. Prajapati's vision is to make knowledge accessible to
          all, ensuring that every visitor finds the resources they need to
          excel academically and personally, leaving with a deeper sense of
          curiosity and a thirst for learning.
        </p>
      </div>

      {/* Right Section - Dr. Harshita Patel's Image and Title */}
      <div
        className="w-full md:w-1/2 p-4 flex justify-center"
        data-aos="zoom-in"
      >
        <div className="text-center relative">
          {/* Image with Circular Border */}
         <div className="flex flex-col sm:flex-row justify-center gap-5">
         <div className="relative">
            <img
              src={img1}
              alt="Dr. Harshita Patel"
              className="rounded-3xl mx-auto w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 object-cover border-4 border-[#3e2015] shadow-lg"
            />
            {/* Name Box at Bottom of Image */}
            <div className="relative bottom-[-10px] left-1/2 transform -translate-x-1/2 bg-[#3e2015] text-[#F7EAD0] font-semibold text-sm sm:text-lg px-3 sm:px-4 py-2 sm:py-2 rounded-lg shadow-md border-[#F7EAD0] border-4">
              Er. Kuldeep Prajapati
            </div>
         
          </div>
          <div className="relative">
            <img
              src={img2}
              alt="Dr. Harshita Patel"
              className="rounded-3xl mx-auto w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 object-cover border-4 border-[#3e2015] shadow-lg"
            />
            {/* Name Box at Bottom of Image */}
         
            <div className="relative bottom-[-10px] left-1/2 transform -translate-x-1/2 bg-[#3e2015] text-[#F7EAD0] font-semibold text-sm sm:text-lg px-3 sm:px-4 py-2 sm:py-2 rounded-lg shadow-md border-[#F7EAD0] border-4">
            Shree. Janpad Prasad Prajapati
            </div>
          </div>
         </div>

          {/* Role and Clinic Name */}
          <h4 className="text-lg sm:text-xl font-semibold text-white mt-4">
            Founder and CEO
          </h4>
          <h5 className="text-md sm:text-lg font-semibold text-white">
            Swami Vivekananda Library
          </h5>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
