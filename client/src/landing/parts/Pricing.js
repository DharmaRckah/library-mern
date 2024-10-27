import React from 'react';
import { motion } from 'framer-motion';
import p1 from '../../assets/images/librarytobar.avif';
import p2 from '../../assets/images/catlog.avif';
import p3 from '../../assets/images/digitalresource.avif';
import p4 from '../../assets/images/collabrate.avif';
import p5 from '../../assets/images/experties.avif';

// Step Component for zigzag roadmap
const Step = ({ title, description, image, stepNumber, isLeft }) => {
  return (
    <div className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}  items-center mb-12 md:mb-16`}>
      {/* Step Content */}
      <motion.div
        className="flex-1 md:flex-none md:w-2/3 bg-white shadow-lg p-8 md:p-16 lg:p-16 my-1 rounded-lg transition-transform transform hover:scale-105 mx-4"
        initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-lg md:text-xl font-semibold text-[#b97432] mb-2">{title}</h3>
        <p className="text-gray-700 text-sm md:text-base">{description}</p>
      </motion.div>

      {/* Step Image */}
      <motion.img
        src={image}
        alt={title}
        className="w-50 h-48 md:w-72 md:h-60 object-cover rounded-lg transition-transform transform hover:scale-105"
        initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Step Circle */}
      <div className="hidden md:flex mx-2 items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#b97432] text-white font-bold text-base md:text-lg">
        {stepNumber}
      </div>
    </div>
  );
};

// Data for steps
const data = [
  {
    title: 'Library Tour',
    description: 'Our team offers a guided tour to introduce you to the library’s resources and services.',
    image: p1,
  },
  {
    title: 'Resource Cataloging',
    description: 'We ensure detailed cataloging of our vast collection for easy access and organization.',
    image: p2,
  },
  {
    title: 'Collaborative Learning',
    description: 'We work with you to identify the right resources and strategies to support your learning.',
    image: p4,
  },
  {
    title: 'Digital Resource Access',
    description: 'Explore our extensive digital library with a preview of available online resources.',
    image: p3,
  },
  {
    title: 'Expert Assistance',
    description: 'Our knowledgeable staff is here to provide guidance and support for all your research and reading needs.',
    image: p5,
  },
];


// OurProcess Component
const OurProcess = () => {
  return (
    <section className="bg-gradient-to-r from-orange-800 via-blue-600 to-pink-700 py-10 font-serif px-4 md:py-16 md:px-8">
      <hr className='border-t-2 border-white' />

      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-10 md:mb-12 text-center underline">
          Our Work Process
        </h2>
        {/* Zigzag roadmap container */}
        <div className="relative">
          {data.map((step, index) => (
            <Step
              key={index}
              title={step.title}
              description={step.description}
              image={step.image}
              stepNumber={index + 1}
              isLeft={index % 2 === 0} // Alternate sides
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;