import React from "react";
import { FaTimes } from "react-icons/fa";

const QuotationViewModel = ({ closeModal, QuotationData }) => {
  console.log(QuotationData, "modaldata");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative responsive-container p-4 bg-white shadow-md rounded-lg">
      <button
        className="absolute mb-4 right-2 p-1 text-white bg-black text-xl focus:outline-none md:text-2xl md:right-4 border"
        onClick={closeModal}
      >
        <FaTimes />
      </button>
      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 0;
            }

            body * {
              visibility: hidden;
            }

            .responsive-container, .responsive-container * {
              visibility: visible;
            }

            .responsive-container {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }

            .hide-on-print {
              display: none !important;
            }

            .hide-on-print button {
              display: none !important;
            }
          }

          html, body {
            width: 240mm;
          }
        `}
      </style>

      <form className="print">
        <h1 className="text-center text-3xl mb-4 font-bold bg-gray-200 p-2">
          Quotation
        </h1>
        <div className="p-4 border-b border-gray-300 bg-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Date', value: QuotationData?.date, type: 'date' },
              { label: 'Quotation No', value: QuotationData?.quotationNo, type: 'text' },
              { label: 'Select Customer', value: QuotationData?.selectCustomer, type: 'text' },
              { label: 'Reverse Charge', value: QuotationData?.reverseCharge, type: 'text' },
              { label: 'Place of Supply', value: QuotationData?.placeOfSupply, type: 'text' },
              { label: 'Payment Terms', value: QuotationData?.paymentsTerms, type: 'text' },
              { label: 'Due Date', value: QuotationData?.dueDate, type: 'date' },
              { label: 'Tax Type', value: QuotationData?.taxType, type: 'text' },
            ].map((field, index) => (
              <div key={index}>
                <label className="block font-bold">{field.label}</label>
                <span className="border p-2 rounded w-full block bg-white">{field.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold">Billing Address</label>
              <textarea
                name="billingAddress"
                className="border p-2 rounded w-full"
                readOnly
                rows="3"
              >
                {QuotationData?.billingAddress}
              </textarea>
            </div>
            <div>
              <label className="block font-bold">Shipping Address</label>
              <textarea
                name="shippingAddress"
                className="border p-2 rounded w-full"
                readOnly
                rows="3"
              >
                {QuotationData?.shippingAddress}
              </textarea>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-100 mt-4 overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Product Details</h3>
          </div>
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-2">S.No.</th>
                <th className="border p-2">Item Code</th>
                <th className="border p-2">Item Name</th>
                <th className="border p-2">HSN Code</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">Rate</th>
                <th className="border p-2">CGST</th>
                <th className="border p-2">SGST</th>
                <th className="border p-2">IGST</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
                {console.log(QuotationData,"dkfj")}
              {QuotationData?.rows?.map((product, index) => (

                
                <tr key={index}>
                  <td className="border p-2 ">{index + 1}</td>
                  <td className="border p-2">{product.itemCode}</td>
                  <td className="border p-2">{product.itemName}</td>
                  <td className="border p-2">{product.hsnCode}</td>
                  <td className="border p-2">{product.qty}</td>
                  <td className="border p-2">{product.rate}</td>
                  <td className="border p-2">{product.cgst}</td>
                  <td className="border p-2">{product.sgst}</td>
                  <td className="border p-2">{product.igst}</td>
                  <td className="border p-2">{product.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 border-t">
          <div className="flex justify-end bg-gray-100 p-4">
            <div className="text-right">
              <div className="mb-2">
                <span className="block font-bold">Tax Total: {QuotationData?.taxAmount}</span>
              </div>
              <div>
                <span className="block font-bold">Net Amount: {QuotationData?.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 flex justify-between mb-4">
          <button
            type="button"
            className="bg-blue-500 text-white rounded-md px-4 py-2 hide-on-print"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuotationViewModel;
