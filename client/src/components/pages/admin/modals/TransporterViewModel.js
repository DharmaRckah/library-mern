import React from "react";
import { FaTimes } from "react-icons/fa";

const TransporterViewModel = ({ TransporterData, closeModal }) => {
  return (
    <div className="responsive-container  ">
      <div className="flex justify-between items-center mb-1">
        <h1 className="font-bold text-center text-gray-700 text-2xl underline mb-4">
          View Transporter
        </h1>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 border"
          onClick={closeModal}
        >
          <FaTimes size={24} />
        </button>
      </div>

      {/* Transporter Details */}
      <div className="mb-2">
        <h3 className="text-gray-800 font-semibold mb-1">Transporter Details :</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Name:</label>
            <div className="p-2 bg-gray-100 rounded">{TransporterData.name}</div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Address:</label>
            <div className="p-2 bg-gray-100 rounded">
              {TransporterData.address}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Country:</label>
            <div className="p-2 bg-gray-100 rounded">
              {TransporterData.country}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">State:</label>
            <div className="p-2 bg-gray-100 rounded">{TransporterData.state}</div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Pin Code:</label>
            <div className="p-2 bg-gray-100 rounded">
              {TransporterData.pinCode}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Contact:</label>
            <div className="p-2 bg-gray-100 rounded">
              {TransporterData.contact}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Email:</label>
            <div className="p-2 bg-gray-100 rounded">{TransporterData.email}</div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Website:</label>
            <div className="p-2 bg-gray-100 rounded">
              {TransporterData.website}
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
              {TransporterData.registrationType}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">GSTIN:</label>
            <div className="p-2 bg-gray-100 rounded">{TransporterData.gstin}</div>
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
              {TransporterData.openingBalance}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700">As on date:</label>
            <div className="p-2 bg-gray-100 rounded">
              {TransporterData.asOnDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransporterViewModel;
