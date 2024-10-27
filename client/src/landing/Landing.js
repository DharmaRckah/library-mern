// Landing.js
import React, { useState, useEffect } from 'react';

import Navbar from './Navbar';
import Home from './parts/Home';
import About from './parts/About';
import Benefits from './parts/Benefits';

import Contact from './parts/Contact';
import Pricing from './parts/Pricing';

import HomeService from './parts/HomeService';
import Footer from './parts/Footer';
import FeesDescription from './parts/FeesDescription';
import Gallery from './parts/Gallery';
import { FaPhoneAlt } from "react-icons/fa"; // Import phone icon
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon
const Section = ({ id, children, aos }) => {
  return (
    <div
      id={id}
      data-aos={aos}
      style={{
        width: '100%',
        scrollMarginTop: '70px', // Adjust according to your Navbar height
      }}
    >
      {children}
    </div>
  );
};

const Landing = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
    
      {/* Pass the scrollToSection function to the Navbar to handle section navigation */}
      <Navbar
        onHomeClick={() => scrollToSection('home')}
        onAboutClick={() => scrollToSection('about')}
        onClientClick={() => scrollToSection('client')}
        onContactClick={() => scrollToSection('contact')}
        onPricingClick={() => scrollToSection('pricing')}
        onBenefitsClick={() => scrollToSection('benefits')}
        
      />

      {/* Home Section */}
      <Section id="home">
        <Home />
        
      </Section>

 
      {/* Other sections */}
      <Section id="about" >
        <About />
      </Section>
      <Section id="home-service" >
        <HomeService />
        
      </Section>

      
      <Section id="plans" aos="flip-right">
        <FeesDescription />
        
      </Section>
    

      <Section id="pricing" aos="flip-right">
        <Pricing />
      </Section>

      <Section id="missionvision" aos="flip-right">
        <Benefits />
      </Section>
      <Section id="gallery" aos="flip-right">
        <Gallery />
      </Section>
      <Section id="contact" aos="flip-right">
        <Contact />
      </Section>
      <Section id="footer" aos="flip-right">
        <Footer />
      </Section>

      <div className="fixed bottom-1 left-4">
        <a
          href="tel:+918269932214"
          className="flex items-center p-3 bg-transparent text-white rounded-full shadow-lg border border-blue-600 hover:bg-blue-400 hover:text-white transition duration-300"
        >
          <FaPhoneAlt className="h-8 w-8 text-blue-500" /> {/* Phone icon */}
        </a>
      </div>
      <div className="fixed bottom-1 right-6">
        <a
          href="https://wa.me/918269932214"
          className="flex items-center p-3 bg-transparent text-white rounded-full shadow-lg border border-green-400 hover:bg-green-600 hover:text-white transition duration-300"
        >
          <FaWhatsapp className="h-8 w-8 text-green-500" />{" "}
          {/* WhatsApp icon */}
        </a>
      </div>
    </div>
  );
};
// hfduhuhdi
// uihrfhweh
export default Landing;
