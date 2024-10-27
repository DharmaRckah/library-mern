import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import cara from "../../assets/images/crousel3.webp";
import cara2 from "../../assets/images/crouesl4.avif";
import cara3 from "../../assets/images/cruesl5.avif";
import cara4 from "../../assets/images/crouserl1.jpg";
import cara5 from "../../assets/images/crousel6.avif";
import cara6 from "../../assets/images/crousel7.avif";

const Home = () => {
  const slides = [
    { id: 0, srcimg: cara, alt: "library" },
    { id: 1, srcimg: cara2, alt: "library" },
    { id: 2, srcimg: cara3, alt: "library" },
    { id: 3, srcimg: cara4, alt: "library" },
    { id: 4, srcimg: cara5, alt: "library" },
    { id: 5, srcimg: cara6, alt: "library" },
  ];

  // Initialize AOS on mount
  useEffect(() => {
    AOS.init({
      duration: 1200, // Set default animation duration
    });
  }, []);

  // Function to handle carousel change and refresh AOS
  const handleSlideChange = () => {
    setTimeout(() => {
      AOS.refresh(); // Refresh AOS animations after the slide change
    }, 50); // Add a small delay to ensure AOS refreshes after the transition
  };

  return (
    <div
      className="object-cover mt-24 mt-24  sm:mt-[-10px] md:mt-[-10px] lg:mt-[-10px]"
      style={{ width: "100%", overflowY: "hidden" }}
    >
     
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        interval={3000}
        className="h-full"
        onChange={handleSlideChange} // Trigger AOS refresh on slide change
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full h-full flex items-center justify-center"
            data-aos="zoom-out-up" // AOS animation type
            data-aos-duration="3000"
          >
            <img
              src={slide.srcimg}
              alt={slide.alt}
              className="w-screen h-full object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Home;
