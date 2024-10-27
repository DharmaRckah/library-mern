import React from "react";
import { FaTimes } from "react-icons/fa";

const CustomerViewModal = ({ CustomerData, closeModal }) => {
  return (
    <div className="responsive-container  ">
      <div className="flex justify-between items-center mb-1">
        <h1 className="font-bold text-center text-gray-700 text-2xl underline">
          View Customer
        </h1>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 border"
          onClick={closeModal}
        >
          <FaTimes size={24} />
        </button>
      </div>

      {/* Customer Details */}
      <div className="mb-2">
        <h3 className="text-gray-800 font-semibold mb-1">Customer Details :</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Name:</label>
            <div className="p-2 bg-gray-100 rounded">{CustomerData.name}</div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Address:</label>
            <div className="p-2 bg-gray-100 rounded">
              {CustomerData.address}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Country:</label>
            <div className="p-2 bg-gray-100 rounded">
              {CustomerData.country}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">State:</label>
            <div className="p-2 bg-gray-100 rounded">{CustomerData.state}</div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Pin Code:</label>
            <div className="p-2 bg-gray-100 rounded">
              {CustomerData.pinCode}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Contact:</label>
            <div className="p-2 bg-gray-100 rounded">
              {CustomerData.contact}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Email:</label>
            <div className="p-2 bg-gray-100 rounded">{CustomerData.email}</div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Website:</label>
            <div className="p-2 bg-gray-100 rounded">
              {CustomerData.website}
            </div>
          </div>
        </div>
      </div>

      {/* Banking Details */}
      <div className="mb-2">
        <h3 className="text-gray-800 font-semibold mb-1">Banking Details :</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Bank Name:</label>
            <div className="p-2 bg-gray-100 rounded">
              {CustomerData.bankName}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Bank Address:</label>
            <div className="p-2 bg-gray-100 rounded">
              {CustomerData.bankAddress}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">IFSC Code:</label>
            <div className="p-2 bg-gray-100 rounded">
              {CustomerData.ifscCode}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              Account Holder Name:
            </label>
            <div className="p-2 bg-gray-100 rounded">
              {CustomerData.accountHolderName}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Account Number:</label>
            <div className="p-2 bg-gray-100 rounded">
              {CustomerData.accountNumber}
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Details */}
      <div className="mb-2">
        <h3 className="text-gray-800 font-semibold mb-1">
          Statutory Details :
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              Registration Type:
            </label>
            <div className="p-2 bg-gray-100 rounded">
              {CustomerData.registrationType}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">GSTIN:</label>
            <div className="p-2 bg-gray-100 rounded">{CustomerData.gstin}</div>
          </div>
        </div>
      </div>

      {/* Opening Balance */}
      <div className="mb-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              Opening Balance:
            </label>
            <div className="p-2 bg-gray-100 rounded">
              {CustomerData.openingBalance}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700">As on date:</label>
            <div className="p-2 bg-gray-100 rounded">
              {CustomerData.asOnDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerViewModal;
