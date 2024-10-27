import React, { useState } from "react";

function AddReceiptModal({ isOpen, closeModal, onSubmit }) {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const [paymentType, setPaymentType] = useState("");
  const [subPaymentType, setSubPaymentType] = useState("");

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
    setSubPaymentType(""); // Reset subPaymentType when paymentType changes
  };

  const handleSubPaymentTypeChange = (e) => {
    setSubPaymentType(e.target.value);
  };

  return (
    <div className="">
      <div className="bg-white p-4 rounded shadow-lg w-full relative">
        <button
          onClick={closeModal}
          className="absolute text-3xl top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4 text-black"> Receipt</h2>

        <div className="gap-5 mb-4">
          <label className="font-bold">
            <input
              type="radio"
              name="paymentMethod"
              value="Cash"
              onChange={handlePaymentMethodChange}
            />{" "}
            Cash
          </label>
          <label  className="ml-5 font-bold">
            <input
              type="radio"
              name="paymentMethod"
              value="Bank"
              onChange={handlePaymentMethodChange}
            />{" "}
            Bank
          </label>
        </div>

        <form onSubmit={onSubmit}>
          {/* Conditionally render fields based on payment method */}
          {paymentMethod === "Cash" && (
            <>
              <labe className="font-bold" > Amount</labe>
              <input
                type="text"
                name="cashField1"
           
                className="border p-2 mb-2 w-full"
              />
              <labe className="font-bold"> Advance</labe>
              <input
                type="text"
                name="cashField2"
           
                className="border p-2 mb-2 w-full"
              />
              <label className="font-bold">Received</label>
              <input
                type="text"
                name="cashField3"
           
                className="border p-2 mb-2 w-full"
              />
              <label className="font-bold">Balance</label>
              <input
                type="text"
                name="cashField4"
        
                className="border p-2 mb-2 w-full"
              />
            </>
          )}

          {paymentMethod === "Bank" && (
            <>
              <select
                name="bankField1"
                // onChange={handleSubPaymentTypeChange}
                className="border font-bold p-2 mb-2 w-full"
              >
                <option value="">Select Bank</option>
                <option value="Online">bank1</option>
                <option value="Cheque">bank2</option>
              </select>
              <select
                name="bankField1"
                onChange={handleSubPaymentTypeChange}
                className="border font-bold p-2 mb-2 w-full"
              >
                <option value="">Select Payment Type</option>
                <option value="Online">Online</option>
                <option value="Cheque">Cheque</option>
              </select>

              {subPaymentType === "Online" && (
                <>
                <label className="font-bold">Transaction Date</label>
                  <input
                    type="text"
                    name="transactionId"
                   
                    className="border p-2 mb-2 w-full"
                  />
                  <label className="font-bold">Transaction No</label>
                  <input
                    type="text"
                    name="paymentGateway"
             
                    className="border p-2 mb-2 w-full"
                  />
                </>
              )}

              {subPaymentType === "Cheque" && (
                <>
                <label className="font-bold">Transaction Date</label>
                  <input
                    type="text"
                    name="TransactionDate"
       
                    className="border p-2 mb-2 w-full"
                  />
                  <label className="font-bold">Cheque No</label>
                  <input
                    type="text"
                    name="ChequeNo"
 
                    className="border p-2 mb-2 w-full"
                  />
                </>
              )}
               <labe className="font-bold"> Amount</labe>
              <input
                type="text"
                name="cashField1"
        
                className="border p-2 mb-2 w-full"
              />
              <labe className="font-bold"> Advance</labe>
              <input
                type="text"
                name="cashField2"
           
                className="border p-2 mb-2 w-full"
              />
              <label className="font-bold">Received</label>
              <input
                type="text"
                name="cashField3"
        
                className="border p-2 mb-2 w-full"
              />
              <label className="font-bold">Balance</label>
              <input
                type="text"
                name="cashField4"
             
                className="border p-2 mb-2 w-full"
              />
            </>
          )}

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 flex justify-center items-center rounded hover:bg-blue-600 h-10"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReceiptModal;
