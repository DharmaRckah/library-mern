import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
   try {
    console.log(formData,"formdata")
      const response = await axios.post('/api/v1/formEmailRoute/sendEmail', formData);
    
      if(response.data.success){
        alert(response.data.message)
      }
      setSuccessMessage('Message sent successfully!');
      setFormData({ name: '', mobile: '', email: '', address: '',  message: '',  });
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="bg-gradient-to-r from-blue-800 via-pink-600 to-orange-700 w-full font-serif py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold font-serif text-white mb-4">Contact Swami Vivekananda Library</h2>
          <p className="text-base text-white font-serif">
            Reach out to us with any questions or inquiries!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Info Section */}
          <div className="space-y-6" data-aos="fade-up">
            <div className="bg-white p-8 rounded-lg shadow-md text-start text-[#3e2015]">
              <h3 className="text-2xl font-semibold mb-4 text-center text-[#BB1E4B] font-serif">Contact Info</h3>
              <p className="mb-2">Name: Kuldeep Prajapati</p>
              <p className="mb-2">open: 24 x 7</p>
              <p className="mb-2">Mobile: <a href="tel:+918269932214" className="text-gray-800 hover:underline">+918269932214</a></p>
              <p className="mb-2">Mobile: <a href="tel:+916265732532" className="text-gray-800 hover:underline">+916265732532</a></p>
              <p className="mb-2">Email: <a href="mailto:mkp826993@gmail.com" className="text-gray-800 hover:underline">kp826993@gmail.com</a></p>
              <p>Location: <a href="https://www.google.com/maps/dir//24.905614,80.262158/@24.9055049,80.2210473,13z/data=!3m1!4b1!4m2!4m1!3e0?hl=en&entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-600 hover:underline">Chaurasiya tiles madhauganj road Swami Vivekanand library Ajaigarh, Madhya Pradesh 488220</a></p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center" data-aos="fade-up">
              <h3 className="text-2xl font-semibold mb-4 font-serif text-[#BB1E4B]">Location</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3618.776211846685!2d80.25958307537236!3d24.905613977899705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDU0JzIwLjIiTiA4MMKwMTUnNDMuOCJF!5e0!3m2!1sen!2sin!4v1729360918933!5m2!1sen!2sin"
                width="100%"
                height="320"
                className="rounded-lg shadow-lg border-0 hover:text-blue-600"
                allowFullScreen="true"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Message Form Section */}
          <div className="space-y-4" data-aos="fade-down">
            
            <div className="bg-white  p-6 pt-3 pb-24 rounded-lg shadow-md" >
            <h3 className="text-2xl text-justify font-semibold mb-16 font-serif text-[#BB1E4B] ">Please fill out the form with all the required information. Based on the details you provide, we will get in touch with you shortly. Thank you! </h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 border border-[#3e2015] rounded-lg shadow-sm"
                  type="text"
                  placeholder="Enter Your Name"
                  required
                />
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 border border-[#3e2015] rounded-lg shadow-sm"
                  type="number"
                  placeholder="Enter Your Mobile Number"
                  required
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 border border-[#3e2015] rounded-lg shadow-sm"
                  type="email"
                  placeholder="Enter Your Email"
                  required
                />
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 border border-[#3e2015] rounded-lg shadow-sm"
                  type="text"
                  placeholder="Enter Your address"
                  required
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea w-full px-4 py-3 border border-[#3e2015] rounded-lg shadow-sm"
                  placeholder="Type Your Message.."
                  rows="3"
                  required
                ></textarea>

                <div className="text-center">
                  <button
                    type="submit"
                    className={`bg-[#BB1E4B] text-white px-6 py-3 rounded-lg transition-colors  ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>

              {successMessage && <p className="text-green-600 pt-4 text-center">{successMessage}</p>}
              {errorMessage && <p className="text-red-600 pt-4 text-center">{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;