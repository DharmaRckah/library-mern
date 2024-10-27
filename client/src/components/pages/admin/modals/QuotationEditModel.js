import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const QuotationEditModel = ({ closeModal, QuotationData }) => {
  const [formData, setFormData] = useState(QuotationData);

  // Function to calculate total for each row
  const calculateRowTotal = (row) => {
    const { qty, rate, cgst, sgst, igst } = row;
    const quantity = parseFloat(qty) || 0;
    const itemRate = parseFloat(rate) || 0;

    const cgstAmount = ((parseFloat(cgst) || 0) * itemRate * quantity) / 100;
    const sgstAmount = ((parseFloat(sgst) || 0) * itemRate * quantity) / 100;
    const igstAmount = ((parseFloat(igst) || 0) * itemRate * quantity) / 100;

    const total = quantity * itemRate + cgstAmount + sgstAmount + igstAmount;

    return isNaN(total) ? 0 : total.toFixed(2);
  };

  // Function to calculate tax total
  const calculatetaxAmount = () => {
    let taxAmount = 0;
    formData.rows.forEach((row) => {
      const { qty, rate, cgst, sgst, igst } = row;
      const quantity = parseFloat(qty) || 0;
      const itemRate = parseFloat(rate) || 0;

      const cgstAmount = ((parseFloat(cgst) || 0) * itemRate * quantity) / 100;
      const sgstAmount = ((parseFloat(sgst) || 0) * itemRate * quantity) / 100;
      const igstAmount = ((parseFloat(igst) || 0) * itemRate * quantity) / 100;

      taxAmount += cgstAmount + sgstAmount + igstAmount;
    });
    return taxAmount.toFixed(2);
  };

  // Function to calculate net amount
  const calculatetotalAmount = () => {
    let totalAmount = 0;
    formData.rows.forEach((row) => {
      totalAmount += parseFloat(calculateRowTotal(row));
    });
    return totalAmount.toFixed(2);
  };

  // Handle input change for form fields and table rows
  const handleInputChange = (e, rowIndex, fieldName) => {
    const { value } = e.target;

    if (fieldName.startsWith("rows")) {
      const updatedRows = [...formData.rows];
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        [fieldName.split(".")[1]]: value,
        total: calculateRowTotal({
          ...updatedRows[rowIndex],
          [fieldName.split(".")[1]]: value,
        }), // Recalculate total for the row
      };

      setFormData((prevData) => ({
        ...prevData,
        rows: updatedRows,
        taxAmount: calculatetaxAmount(),
        totalAmount: calculatetotalAmount(),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
        taxAmount: calculatetaxAmount(),
        totalAmount: calculatetotalAmount(),
      }));
    }
  };

  // Handle update of quotation
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `/api/v1/salesQuationRoute/updateSalesQuotation/${formData._id}`,
        formData
      );
      if (response.data.success) {
        toast.success("Quotation updated successfully...");
        closeModal();
      } else {
        console.error("Failed to update Quotation");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle printing the quotation
  const handlePrint = () => {
    window.print();
  };

  // Update tax total and net amount whenever rows are updated
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      taxAmount: calculatetaxAmount(),
      totalAmount: calculatetotalAmount(),
    }));
  }, [formData.rows]);

  return (
    <div className="relative responsive-container p-4 bg-white shadow-md rounded-lg ">
      <style>
        {`
             @media print {
              @page {
                size: A4;
                margin: 0;
                width:100%;
              }
                   
              @media print {
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
                .hide-on-print button{
                  display: none !important;
                }
              }
              .print-container {
                display: block;
                page-break-before: always;
              }

              html, body {
                width: 270mm;
              }
          
        `}
      </style>

      <button
        className="absolute mb-4 right-2 p-1 text-white bg-black text-xl focus:outline-none md:text-2xl md:right-4 border"
        onClick={closeModal}
      >
        <FaTimes />
      </button>

      <form className="print">
        <h1 className="text-center text-3xl mb-4 font-bold bg-gray-200 p-2">
          Quotation
        </h1>
        <div className="p-4 border-b border-gray-300 bg-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Date", name: "date", type: "text" },
              { label: "Quotation No", name: "quotationNo", type: "text" },
              {
                label: "Select Customer",
                name: "selectCustomer",
                type: "text",
              },
              { label: "Reverse Charge", name: "reverseCharge", type: "text" },
              {
                label: "Place of Supply",
                name: "placeOfSupply",
                type: "text",
              },
              { label: "Payment Terms", name: "paymentsTerms", type: "text" },
              { label: "Due Date", name: "dueDate", type: "text" },
              { label: "Tax Type", name: "taxType", type: "text" },
            ].map((field, index) => (
              <div key={index}>
                <label className="block font-bold">{field.label}</label>
                <input
                  className="border p-2 rounded w-full block bg-white"
                  name={field.name}
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleInputChange(e, null, field.name)}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold">Billing Address</label>
              <textarea
                name="billingAddress"
                className="border p-2 rounded w-full"
                value={formData.billingAddress || ""}
                onChange={(e) => handleInputChange(e, null, "billingAddress")}
                rows="3"
              />
            </div>
            <div>
              <label className="block font-bold">Shipping Address</label>
              <textarea
                name="shippingAddress"
                className="border p-2 rounded w-full"
                value={formData.shippingAddress || ""}
                onChange={(e) => handleInputChange(e, null, "shippingAddress")}
                rows="3"
              />
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
              {formData.rows.map((product, index) => (
                <tr key={index}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].itemCode`}
                      value={product.itemCode || ""}
                      onChange={(e) =>
                        handleInputChange(e, index, `rows[${index}].itemCode`)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].itemName`}
                      value={product.itemName || ""}
                      onChange={(e) =>
                        handleInputChange(e, index, `rows[${index}].itemName`)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].hsnCode`}
                      value={product.hsnCode || ""}
                      onChange={(e) =>
                        handleInputChange(e, index, `rows[${index}].hsnCode`)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].qty`}
                      value={product.qty || ""}
                      onChange={(e) =>
                        handleInputChange(e, index, `rows[${index}].qty`)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].rate`}
                      value={product.rate || ""}
                      onChange={(e) =>
                        handleInputChange(e, index, `rows[${index}].rate`)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].cgst`}
                      value={product.cgst || ""}
                      onChange={(e) =>
                        handleInputChange(e, index, `rows[${index}].cgst`)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].sgst`}
                      value={product.sgst || ""}
                      onChange={(e) =>
                        handleInputChange(e, index, `rows[${index}].sgst`)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].igst`}
                      value={product.igst || ""}
                      onChange={(e) =>
                        handleInputChange(e, index, `rows[${index}].igst`)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="w-full border p-2"
                      name={`rows[${index}].total`}
                      value={calculateRowTotal(product)}
                      readOnly // Display total as calculated from inputs
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 border-t">
          <div className="flex justify-end bg-gray-100 p-1">
            <div className="text-right">
              <div className="mb-2 flex justify-end">
                <span className="block font-bold">Tax Total</span>
                <input
                  className="bg-gray-100"
                  value={formData.taxAmount || ""}
                  onChange={(e) => handleInputChange(e, null, "taxAmount")}
                  readOnly
                ></input>
              </div>
              <div className="flex justify-end ">
                <span className="block font-bold">Net Amount</span>
                <input
                  className="bg-gray-100"
                  value={formData.totalAmount || ""}
                  onChange={(e) => handleInputChange(e, null, "totalAmount")}
                  readOnly
                ></input>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 flex justify-between mb-4 mt-4">
          <button
            type="button"
            className="bg-blue-500 text-white rounded-md px-4 py-2 hide-on-print"
            onClick={handlePrint}
          >
            Print
          </button>
          <button
            type="button"
            className="bg-green-500 text-white rounded-md px-4 py-2 hide-on-print"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuotationEditModel;
