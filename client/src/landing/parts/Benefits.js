import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBook, FaLightbulb, FaHeart } from "react-icons/fa";

const sections = [
  {
    title: "OUR MISSION",
    icon: <FaBook className="text-4xl text-white" />,
    description:
      "Our mission is to promote knowledge, provide diverse resources, and foster an environment where lifelong learning thrives.",
  },
  {
    title: "OUR VISION",
    icon: <FaLightbulb className="text-4xl text-white" />,
    description:
      "We envision becoming a premier hub of intellectual growth, offering access to a world of knowledge, both traditional and digital.",
  },
  {
    title: "OUR VALUES",
    icon: <FaHeart className="text-4xl text-white" />,
    description:
      "We uphold values of inclusivity, knowledge-sharing, and community building, ensuring that every visitor has a positive and enriching experience.",
  },
];

const Benefits = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="container w-screen mx-auto px-6 py-10 bg-gradient-to-r from-[#211C6A] via-[#B51B75] to-[#F94C10]">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-extrabold text-white mb-4">
          Mission, Vision & Values
        </h1>
        <p className="text-white text-lg font-serif">
          Committed to fostering knowledge, learning, and community growth through our library services.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className="w-full md:w-1/3 bg-gray-200 p-5 shadow-lg rounded-lg hover:shadow-2xl transform transition-all duration-500"
            data-aos="fade-up"
          >
            <div
              className="flex items-center justify-center mb-6"
              data-aos="flip-left"
            >
              <div className="bg-[#BB1E4B] p-4 rounded-full">
                {section.icon}
              </div>
            </div>
            <h2 className="text-[#BB1E4B] font-serif font-semibold text-center text-xl mb-4">
              {section.title}
            </h2>
            <p className="text-center text-black font-serif text-base">
              {section.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
