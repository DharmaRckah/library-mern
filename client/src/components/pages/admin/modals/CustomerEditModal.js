
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CustomerEditModal = ({ CustomerData, closeModal }) => {
  const [formData, setFormData] = useState(CustomerData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the PUT request to update supplier details
      const response = await axios.put(
        `/api/v1/auth/updateCustomer/${formData._id}`,
        formData
      );
      console.log(response, "res");

      if (response.status === 200) {
        toast.success("Customer updated successfully!");
        closeModal();
      } else {
        toast.error("Failed to update Customer.");
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
      toast.error("An error occurred while updating the supplier.");
    }
  };

  return (
    <div className="responsive-container px-4 py-1 max-w-7xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-center text-gray-700 text-3xl underline">
            Update Customer
          </h1>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 border"
            onClick={closeModal}
          >
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Supplier Details */}
          <div className="mb-6">
            <h3 className="text-gray-800 font-semibold mb-2">
              Customer Details :
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Country:</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">State:</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Pin Code:</label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Contact:</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Website:</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Banking Details */}
          <div className="mb-6">
            <h3 className="text-gray-800 font-semibold mb-2">
              Banking Details :
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Bank Name:</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">
                  Bank Address:
                </label>
                <input
                  type="text"
                  name="bankAddress"
                  value={formData.bankAddress}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">IFSC Code:</label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">
                  Account Holder Name:
                </label>
                <input
                  type="text"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">
                  Account Number:
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Statutory Details */}
          <div className="mb-6">
            <h3 className="text-gray-800 font-semibold mb-2">
              Statutory Details :
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">
                  Registration Type:
                </label>
                <select
                  name="registrationType"
                  value={formData.registrationType}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                >
                  <option value="">Select Registration Type</option>
                  <option value="Composition">Composition</option>
                  <option value="Regular">Regular</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">GSTIN:</label>
                <input
                  type="text"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Opening Balance */}
          <div className="mb-6">
            <h3 className="text-gray-800 font-semibold mb-2">
              Opening Balance :
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">
                  Opening Balance:
                </label>
                <input
                  type="text"
                  name="openingBalance"
                  value={formData.openingBalance}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700">
                  As On Date
                </label>
                <input
                  type="date"
                  name=""
                  value={formData.asOnDate}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update Customer
            </button>
          </div>
        </form>
      <ToastContainer />
    </div>
  );
};

export default CustomerEditModal;
