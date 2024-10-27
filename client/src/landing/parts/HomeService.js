import React from "react";
import photo from "../../assets/images/logo.png";

const HomeService = () => {
  return (
    <section
      id="section-services"
      className="py-12 font-serif text-white  bg-gradient-to-r from-orange-800 via-blue-600 to-pink-700"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
            <div className="space-y-16">
              <div className="lg:text-right hover:scale-95 duration-300">
                <h3 className="text-xl font-bold text-yellow-600">
                  Personalized Learning Experience
                </h3>
                <p>
                  Our team works with you to create a personalized learning
                  journey tailored to your academic goals and interests,
                  ensuring that your time at the library is enriching and
                  productive.
                </p>
              </div>
              <div className="lg:text-right hover:scale-95 duration-300">
                <h3 className="text-xl font-bold text-yellow-600">
                  Sustainable Knowledge Resources
                </h3>
                <p>
                  We provide access to a wealth of sustainable and eco-friendly
                  digital resources, helping reduce paper use while offering
                  comprehensive educational materials for all learners.
                </p>
              </div>
              <div className="lg:text-right hover:scale-95 duration-300">
                <h3 className="text-xl font-bold text-yellow-600">
                  Remote Access to Resources
                </h3>
                <p>
                  Connect with our vast collection of digital books, journals,
                  and research papers from the comfort of your home. Our virtual
                  library ensures that knowledge is always at your fingertips.
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0 flex justify-center items-center">
            <img
              src={photo}
              alt="Interior Design"
              className="max-w-full rounded-full hover:shadow-black border-solid border-2 border-[#b97432] hover:scale-95 duration-300 shadow-lg"
            />
          </div>
          {/* Image */}

          <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
            <div className="space-y-16">
              <div className="lg:text-left hover:scale-95 duration-300">
                <h3 className="text-xl font-bold text-yellow-600">
                  Comprehensive Resource Planning
                </h3>
                <p>
                  We offer a full range of services, from initial consultations
                  to finding the right resources, ensuring every academic or
                  research need is fully addressed.
                </p>
              </div>
              <div className="lg:text-left hover:scale-95 duration-300">
                <h3 className="text-xl font-bold text-yellow-600">
                  Timely Access to Information
                </h3>
                <p>
                  Our library team ensures that you have timely access to books,
                  journals, and digital materials without delays, so you can
                  stay on track with your studies or research.
                </p>
              </div>
              <div className="lg:text-left hover:scale-95 duration-300">
                <h3 className="text-xl font-bold text-yellow-600">
                  User Satisfaction
                </h3>
                <p>
                  Your satisfaction is our top priority. We go the extra mile to
                  provide the resources and support you need, ensuring a
                  fulfilling and enriching library experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeService;
