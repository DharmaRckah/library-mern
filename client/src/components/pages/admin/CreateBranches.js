import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateBranches = () => {
  const [formData, setFormData] = useState({
    branchName: "",
    branchId: "",
    location: "",
    address: "",
    contact: "",
    emailId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "branchName",
      "branchId",
      "location",
      "address",
      "contact",
      "emailId",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field} field.`);
        return;
      }
    }

    try {
      const response = await axios.post(
        "/api/v1/auth/createBranches",
        formData
      );

      if (response) {
        toast.success("Branches Created Successfully...");
      }

      clearData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const clearData = () => {
    setFormData({
      branchName: "",
      branchId: "",
      location: "",
      address: "",
      contact: "",
      emailId: "",
    });
  };
  return (
    <div className="responsive-container">
      <form className=" mx-auto  p-8 border border-gray-300 shadow-lg rounded-lg">
        <h4 className="text-3xl font-semibold mb-8 text-center underline mb-6 text-violet-800">
          Create Branches{" "}
        </h4>
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-4">
            <label className="w-1/4 ">Branch Name</label>
            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              className=" w-1/2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </div>{" "}
          <div className="flex items-center gap-4">
            <label className="w-1/4 ">Branch Id</label>
            <input
              type="text"
              name="branchId"
              value={formData.branchId}
              onChange={handleChange}
              className=" w-1/2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </div>{" "}
          <div className="flex items-center gap-4">
            <label className="w-1/4 ">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className=" w-1/2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </div>{" "}
          <div className="flex items-center gap-4">
            <label className="w-1/4 ">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className=" w-1/2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </div>{" "}
          <div className="flex items-center gap-4">
            <label className="w-1/4 ">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className=" w-1/2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-1/4 ">Email Id</label>
            <input
              type="text"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              className=" w-1/2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </div>
        </div>
        <div className="flex justify-between mt-8 px-1">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateBranches;
