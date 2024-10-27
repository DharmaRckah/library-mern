import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const BankEditModal = ({ BankData, closeModal }) => {
  const [formData, setFormData] = useState(BankData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    const requiredFields = [
      "name",
      "ifscCode",
      "accountNumber",
      "openingBalance",
      "drCr",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field} field.`);
        return;
      }
    }

    try {
      const response = await axios.put(
        `/api/v1/auth/updateBank/${formData._id}`,
        formData
      );

      if (response.data.success) {
        toast.success("Bank updated successfully...");
        closeModal();
      } else {
        console.error("Failed to update Bank");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto md:pl-4 md:pr-4 p-2 responsive-container text-black">
      <button
        className="absolute top-2 right-2 p-2 text-gray-700 text-xl hover:text-gray-900 focus:outline-none md:text-2xl md:top-4 md:right-4 border"
        onClick={closeModal}
      >
        <FaTimes />
      </button>
      <h4 className="text-3xl font-semibold mb-4 text-center underline mb-6 text-violet-800 mt-8">
        Bank
      </h4>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block mb-2">
              name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>
          </div>
          <div>
            <label className="block mb-2">
              IFSC:
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>
          </div>
          <div>
            <label className="block mb-2">
              Account Number:
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>
          </div>
          <div>
            <label className="block mb-2">
              Opening Balance:
              <input
                type="text"
                name="openingBalance"
                value={formData.openingBalance}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>
          </div>
          <div>
            <label className="block flex items-center">
              Dr. / Cr.:
              <input
                type="text"
                name="drCr"
                value={formData.drCr}
                onChange={handleChange}
                className="flex-1 pl-4"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankEditModal;
