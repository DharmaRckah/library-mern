import React from "react";
import { FaTimes } from "react-icons/fa";

const BankViewModal = ({ BankData, closeModal }) => {
  return (
    <div className=" max-w-3xl mx-auto md:pl-4 md:pr-4 p-2 responsive-container  text-black ">
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
              <span type="text" name="openingBalance" className="flex-1 pl-4">
                {BankData.name}
              </span>
            </label>
          </div>

          <div>
            <label className="block mb-2">
              IFSC Code
              <span type="text" name="openingBalance" className="flex-1 pl-4">
                {BankData.ifscCode}
              </span>
            </label>
          </div>

          <div>
            <label className="block mb-2">
              Account Number
              <span type="text" name="openingBalance" className="flex-1 pl-4">
                {BankData.accountNumber}
              </span>
            </label>
          </div>

          <div>
            <label className="block mb-2">
              Opening Balance
              <span type="text" name="openingBalance" className="flex-1 pl-4">
                {BankData.openingBalance}
              </span>
            </label>
          </div>
          <div>
            <label className="block flex items-center">
              Dr. / Cr.
              <span type="text" name="drCr" className="flex-1 pl-4">
                {BankData.drCr}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankViewModal;
