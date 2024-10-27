import React from "react";
import { FaTimes } from 'react-icons/fa';

const SupplierViewModal = ({ supplierData, closeModal }) => {
  return (
    <div className="responsive-container  ">
        <div className="flex justify-between items-center mb-1">
          <h1 className="font-bold text-center text-gray-700 text-2xl underline">View Supplier</h1>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 border"
            onClick={closeModal}
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Supplier Details */}
        <div className="mb-2">
          <h3 className="text-gray-800 font-semibold mb-1">Supplier Details :</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Name:</label>
              <div className="p-2 bg-gray-100 rounded">{supplierData.name}</div>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Address:</label>
              <div className="p-2 bg-gray-100 rounded">{supplierData.address}</div>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Country:</label>
              <div className="p-2 bg-gray-100 rounded">{supplierData.country}</div>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">State:</label>
              <div className="p-2 bg-gray-100 rounded">{supplierData.state}</div>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Pin Code:</label>
              <div className="p-2 bg-gray-100 rounded">{supplierData.pinCode}</div>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Contact:</label>
              <div className="p-2 bg-gray-100 rounded">{supplierData.contact}</div>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Email:</label>
              <div className="p-2 bg-gray-100 rounded">{supplierData.email}</div>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Website:</label>
              <div className="p-2 bg-gray-100 rounded">{supplierData.website}</div>
            </div>
          </div>
        </div>

        {/* Banking Details */}
        <div className="mb-2">
          <h3 className="text-gray-800 font-semibold mb-1">Banking Details :</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Bank Name:</label>
              <div className="p-2 bg-gray-100 rounded">{supplierData.bankName}</div>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Bank Address:</label>
              <div className="p-2 bg-gray-100 rounded">{supplierData.bankAddress}</div>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">IFSC Code:</label>
              <div className="p-2 bg-gray-100 rounded">{supplierData.ifscCode}</div>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Account Holder Name:</label>
              <div className="p-2 bg-gray-100 rounded">{supplierData.accountHolderName}</div>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Account Number:</label>
              <div className="p-2 bg-gray-100 rounded">{supplierData.accountNumber}</div>
            </div>
          </div>
        </div>

        {/* Statutory Details */}
        <div className="mb-2">
          <h3 className="text-gray-800 font-semibold mb-1">Statutory Details :</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Registration Type:</label>
              <div className="p-2 bg-gray-100 rounded">{supplierData.registrationType}</div>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">GSTIN:</label>
              <div className="p-2 bg-gray-100 rounded">{supplierData.gstin}</div>
            </div>
          </div>
        </div>

        {/* Opening Balance */}
        <div className="mb-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Opening Balance:</label>
              <div className="p-2 bg-gray-100 rounded">{supplierData.openingBalance}</div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">as on 1st day of F.Y.</p>
        </div>


 
    </div>
  );
};

export default SupplierViewModal;
