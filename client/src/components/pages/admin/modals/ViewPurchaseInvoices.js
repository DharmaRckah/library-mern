import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "react-modal";

const ViewPurchaseInvoice = ({ closeModal, estimate }) => {
  const [documentPath, setdocumentPath] = useState(null);

  const [date, setDate] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [supplierInvoiceNo, setsupplierInvoiceNo] = useState("");

  const [customerType, setCustomerType] = useState("");
  const [supplierName, setsupplierName] = useState("");
  const [placeOfSupply, setPlaceOfSupply] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [transportDetails, setTransportDetails] = useState({
    receiptDocNo: "",
    dispatchedThrough: "",
    destination: "",
    carrierNameAgent: "",
    billOfLading: "",
    motorVehicleNo: "",
  });
  const [billingAddress, setBillingAddress] = useState("");
  const [reverseCharge, setReverseCharge] = useState("");
  const [gstType, setGstType] = useState("");
  const [rows, setRows] = useState([]);
  const [otherChargesDescriptions, setOtherChargesDescriptions] = useState("");
  const [otherCharges, setOtherCharges] = useState("");
  const [narration, setNarration] = useState("");
  const [grossAmount, setGrossAmount] = useState("");
  const [GstAmount, setGstAmount] = useState("");
  const [netAmount, setNetAmount] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [bank, setBank] = useState([]);
  const [cash, setCash] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOtherChargesOpen, setIsModalOtherChargesOpen] = useState(false);

  useEffect(() => {
    if (estimate) {
      setDate(estimate.date || "");
      setInvoiceNo(estimate.invoiceNo || "");
      setsupplierInvoiceNo(estimate.supplierInvoiceNo || "");

      setCustomerType(estimate.customerType || "");
      setsupplierName(estimate.supplierName || "");
      setPlaceOfSupply(estimate.placeOfSupply || "");
      setPaymentTerm(estimate.paymentTerm || "");
      setDueDate(estimate.dueDate || "");

      if (estimate.bank) {
        setBank({
          bank: estimate.bank.bank || "",
          selectBankType: estimate.bank.selectBankType || "",
          transactionDate: estimate.bank.transactionDate || "",
          chequeNo: estimate.bank.chequeNo || "",
          transactionNo: estimate.bank.transactionNo || "",
          Amount: estimate.bank.Amount || "",
          Advance: estimate.bank.Advance || "",
          Received: estimate.bank.Received || "",
          Balance: estimate.bank.Balance || "",
        });
      } else {
        setBank({
          bank: "",
          selectBankType: "",
          transactionDate: "",
          chequeNo: "",
          transactionNo: "",
          Amount: "",
          Advance: "",
          Received: "",
          Balance: "",
        });
      }

      if (estimate.cash) {
        setCash({
          Amount: estimate.cash.Amount || "",
          Advance: estimate.cash.Advance || "",
          Received: estimate.cash.Received || "",
          Balance: estimate.cash.Balance || "",
        });
      } else {
        setCash({
          Amount: "",
          Advance: "",
          Received: "",
          Balance: "",
        });
      }

      setTransportDetails({
        receiptDocNo: estimate.receiptDocNo || "",
        dispatchedThrough: estimate.dispatchedThrough || "",
        destination: estimate.destination || "",
        carrierNameAgent: estimate.carrierNameAgent || "",
        billOfLading: estimate.billOfLading || "",
        motorVehicleNo: estimate.motorVehicleNo || "",
      });
      setBillingAddress(estimate.billingAddress || "");
      setReverseCharge(estimate.reverseCharge || "");
      setGstType(estimate.gstType || "");
      setRows(estimate.rows || []);
      setOtherChargesDescriptions(estimate.otherChargesDescriptions || "");
      setOtherCharges(estimate.otherCharges || "");
      setNarration(estimate.narration || "");
      setGrossAmount(estimate.grossAmount || "");
      setGstAmount(estimate.GstAmount || "");
      setNetAmount(estimate.netAmount || "");
      setdocumentPath(estimate.documentPath || "");
    }
  }, [estimate]);

  const openViewModal = () => {
    setViewModal(true);
    setPaymentMethod("");
    setSubPaymentType("");
  };

  const [paymentMethod, setPaymentMethod] = useState("");
  const [subPaymentType, setSubPaymentType] = useState("");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setSubPaymentType(""); // Resetting subPaymentType when payment method changes
  };

  const handleSubPaymentTypeChange = (e) => {
    setSubPaymentType(e.target.value);
  };

  const handleDownload = async () => {
    if (!documentPath || typeof documentPath !== "string") {
      console.error("Invalid document path.");
      return;
    }
 
    console.log(documentPath, "Document path for download");
    const ff = "documentPath-1728112826730.pdf"
    // const fileUrl = documentPath ? documentPath : `/${documentPath}`;
      //     const fileUrl = "/uploads/documentPath-1728112826730.pdf";
                   
//  const fileUrl = `http://localhost:5011/uploads/${documentPath}`;

    
    const link = document.createElement("a");
    const fileUrl = `/${documentPath}`;

    try {
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error("Failed to download document");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;

      link.download = "document.pdf";

      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error while downloading document:", error);
    }
  };

  return (
    <div
      style={{ backgroundColor: "#82ac73" }}
      className="p-4 responsive-container"
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-center text-black text-2xl underline mb-4">
          View Purchase Invoice
        </h1>
        <button
          type="button"
          className="text-black hover:text-black border"
          onClick={closeModal}
        >
          <FaTimes size={24} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg::grid-cols-4 gap-4 mb-4">
        <div>
          <label className="font-bold">
            Date:
            <input
              type="date"
              value={date}
              disabled
              className="border p-2 w-full rounded"
            />
          </label>
        </div>
        <div>
          <label className="font-bold">Invoice No.</label>
          <input
            type="text"
            value={invoiceNo}
            disabled
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-bold">Supplier Invoice No.</label>
          <input
            type="text"
            value={supplierInvoiceNo}
            disabled
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-bold">Supplier Name</label>
          <input
            type="text"
            value={supplierName}
            disabled
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="font-bold">Place of Supply</label>
          <input
            type="text"
            value={placeOfSupply}
            disabled
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="font-bold">
            Payment Term (days):
            <input
              type="number"
              value={paymentTerm}
              disabled
              className="border p-2 w-full rounded"
            />
          </label>
        </div>

        <div>
          <label className="font-bold">
            Due Date
            <input
              type="text"
              value={dueDate}
              disabled
              className="border p-2 w-full text-black rounded"
            />
          </label>
        </div>

        <div className="mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white p-2"
          >
            Transport Details
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg z-50">
            <h4 className="font-bold mb-4">Transport Details</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label>Dispatched Through</label>
                <input
                  type="text"
                  value={transportDetails.dispatchedThrough}
                  disabled
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Destination</label>
                <input
                  type="text"
                  value={transportDetails.destination}
                  disabled
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Carrier Name/Agent</label>
                <input
                  type="text"
                  value={transportDetails.carrierNameAgent}
                  disabled
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Bill of Lading/LR-RR No.</label>
                <input
                  type="text"
                  value={transportDetails.billOfLading}
                  disabled
                  className="border p-2 w-full rounded"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white p-2 mr-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="mb-4">
          <label className="font-bold">Billing Address</label>
          <textarea
            value={billingAddress}
            disabled
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="font-bold">Reverse Charge</label>
          <select
            value={reverseCharge}
            disabled
            className="border p-2 w-full rounded"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="mb-4 w-full">
          <label className="font-bold">GST Type:</label>
          <select
            value={gstType}
            disabled
            className="border p-2 w-full rounded"
          >
            <option value="CGST/SGST">CGST/SGST</option>
            <option value="IGST">IGST</option>
          </select>
        </div>
      </div>

      {/* Items Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse overflow-x-auto">
          <thead>
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Item Code</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">HSN Code</th>
              <th className="border p-2">qty</th>
              <th className="border p-2">Units</th>
              <th className="border p-2">Free quantity</th>

              <th className="border p-2">mrp</th>
              <th className="border p-2">Unit Cost</th>
              <th className="border p-2">Scheme Margin</th>

              <th className="border p-2">
                Discount
                <div className="flex justify-between">
                  <span className="mr-16">%</span> <span>₹</span>
                </div>
              </th>
              <>
                <th className="border p-2">Taxable Value</th>
                {gstType === "CGST/SGST" && (
                  <>
                    <th className="border p-2">
                      CGST
                      <div className="flex justify-between">
                        <span className="mr-16">%</span> <span>₹</span>
                      </div>
                    </th>
                    <th className="border p-2">
                      SGST
                      <div className="flex justify-between">
                        <span className="mr-16">%</span> <span>₹</span>
                      </div>
                    </th>
                  </>
                )}
                {gstType === "IGST" && (
                  <th className="border p-2">
                    IGST
                    <div className="flex justify-between">
                      <span className="mr-16">%</span> <span>₹</span>
                    </div>
                  </th>
                )}
              </>
              <th className="border p-2">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={row.itemCode}
                    disabled
                    className="w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={row.productName}
                    disabled
                    className="w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={row.hsnCode}
                    disabled
                    className="w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={row.qty}
                    disabled
                    className="w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={row.units}
                    disabled
                    className="w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={row.freeQty}
                    disabled
                    className="w-full"
                  />
                </td>

                <td className="border p-2">
                  <input
                    type="number"
                    value={row.maxmimunRetailPrice}
                    disabled
                    className="w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={row.unitCost}
                    disabled
                    className="w-full"
                  />
                </td>

                <td className="border p-2">
                  <input
                    type="number"
                    value={row.schemeMargin}
                    disabled
                    className="w-full"
                  />
                </td>

                <td className="border p-2">
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={row.discountpercent}
                      disabled
                      className="w-full"
                    />
                    <input
                      type="number"
                      value={row.discountRs}
                      disabled
                      className="w-full"
                    />
                  </div>
                </td>
                <>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={row.taxableValue}
                      disabled
                      className="w-full"
                    />
                  </td>
                  {gstType === "CGST/SGST" && (
                    <>
                      <td className="border p-2">
                        <div className="flex gap-1">
                          <input
                            type="number"
                            value={row.cgstpercent}
                            disabled
                            className="w-full"
                          />
                          <input
                            type="number"
                            value={row.cgstRS}
                            disabled
                            className="w-full"
                          />
                        </div>
                      </td>
                      <td className="border p-2">
                        <div className="flex gap-1">
                          <input
                            type="number"
                            value={row.sgstpercent}
                            disabled
                            className="w-full"
                          />
                          <input
                            type="number"
                            value={row.sgstRS}
                            disabled
                            className="w-full"
                          />
                        </div>
                      </td>
                    </>
                  )}
                  {gstType === "IGST" && (
                    <td className="border p-2">
                      <div className="flex gap-1">
                        <input
                          type="number"
                          value={row.igstpercent}
                          disabled
                          className="w-full"
                        />
                        <input
                          type="number"
                          value={row.igstRS}
                          disabled
                          className="w-full"
                        />
                      </div>
                    </td>
                  )}
                </>
                <td className="border p-2">
                  <input
                    type="number"
                    value={row.totalValue}
                    disabled
                    className="w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Other Charges */}
      <div className="mt-4">
        <button
          onClick={() => setIsModalOtherChargesOpen(true)}
          className="text-blue-800 text-md p-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          View Other Charges
        </button>
      </div>

      {isModalOtherChargesOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg">
            <h4 className="font-bold mb-4">Other Charges Details</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label>Other Charges Description</label>
                <input
                  type="text"
                  value={otherChargesDescriptions}
                  disabled
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Other Charges</label>
                <input
                  type="text"
                  value={otherCharges}
                  disabled
                  className="border p-2 w-full rounded"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOtherChargesOpen(false)}
                className="bg-gray-500 text-white p-2 mr-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 mb-4">
        <button
          onClick={handleDownload}
          className="w-1/4 text-white text-md p-2 rounded bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Download Document
        </button>
      </div>

      {/* Narration and Amounts */}
      <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
        <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
          <label className="font-bold">Narration</label>
          <br />
          <textarea
            value={narration}
            disabled
            className="bg-black text-white border p-1 w-full rounded"
          />
        </div>
        <div className="w-full lg:w-1/3">
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label className="font-bold lg:w-1/2 text-nowrap">
              Gross Amount
            </label>
            <input
              type="text"
              value={grossAmount}
              disabled
              className="bg-black text-white border p-1 w-full rounded lg:w-2/3"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label className="font-bold lg:w-1/2 text-nowrap">GST Amount</label>
            <input
              type="text"
              value={GstAmount}
              disabled
              className="bg-black text-white border p-1 w-full rounded lg:w-2/3"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label className="font-bold lg:w-1/2 text-nowrap">
              Other Charges
            </label>
            <input
              type="text"
              value={otherCharges}
              disabled
              className="bg-black text-white border p-1 w-full rounded lg:w-2/3"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label className="font-bold lg:w-1/2 text-nowrap">Net Amount</label>
            <input
              type="text"
              value={netAmount}
              disabled
              className="bg-black text-white border p-1 w-full rounded lg:w-2/3"
            />
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={openViewModal}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          View Receipt
        </button>

        <Modal
          isOpen={viewModal}
          onRequestClose={closeModal}
          contentLabel="View Item Modal"
          style={{
            content: {
              width: "80%",
              height: "90%",
              maxWidth: "800px",
              margin: "auto",
              padding: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
            },
          }}
        >
          <div className="bg-white p-4 rounded shadow-lg w-full relative">
            <button
              onClick={closeModal}
              className="absolute text-3xl top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-4 text-black">Receipt</h2>

            {/* Radio buttons to select payment method */}
            <div className="gap-5 mb-4">
              <label className="font-bold">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash"
                  onChange={handlePaymentMethodChange}
                  checked={paymentMethod === "Cash"}
                />
                Cash
              </label>
              <label className="ml-5 font-bold">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Bank"
                  onChange={handlePaymentMethodChange}
                  checked={paymentMethod === "Bank"}
                />
                Bank
              </label>
            </div>

            {/* Conditional form rendering based on payment method */}
            <form>
              {paymentMethod === "Cash" && (
                <>
                  <label className="font-bold">Amount</label>
                  <input
                    type="text"
                    name="Amount"
                    value={cash.Amount}
                    className="border p-2 mb-2 w-full"
                    readOnly
                  />
                  <label className="font-bold">Advance</label>
                  <input
                    type="text"
                    name="Advance"
                    value={cash.Advance}
                    className="border p-2 mb-2 w-full"
                    readOnly
                  />
                  <label className="font-bold">Received</label>
                  <input
                    type="text"
                    name="Received"
                    value={cash.Received}
                    className="border p-2 mb-2 w-full"
                    readOnly
                  />
                  <label className="font-bold">Balance</label>
                  <input
                    type="text"
                    name="Balance"
                    value={cash.Balance}
                    className="border p-2 mb-2 w-full"
                    readOnly
                  />
                </>
              )}

              {paymentMethod === "Bank" && (
                <>
                  <label className="font-bold">Select Bank</label>
                  <input
                    name="bank"
                    className="border p-2 mb-2 w-full"
                    value={bank.bank}
                    readOnly
                  ></input>
                  <label className="font-bold">Payment Type</label>
                  <input
                    name="selectBankType"
                    className="border p-2 mb-2 w-full"
                    onChange={handleSubPaymentTypeChange}
                    value={bank.selectBankType}
                    readOnly
                  ></input>

                  {bank.selectBankType === "Online" && (
                    <>
                      <label className="font-bold">Transaction Date</label>
                      <input
                        type="text"
                        name="transactionDate"
                        value={bank.transactionDate}
                        className="border p-2 mb-2 w-full"
                        readOnly
                      />
                      <label className="font-bold">Transaction No</label>
                      <input
                        type="text"
                        name="transactionNo"
                        value={bank.transactionNo}
                        className="border p-2 mb-2 w-full"
                        readOnly
                      />
                    </>
                  )}
                  {bank.selectBankType === "Cheque" && (
                    <>
                      <label className="font-bold">Transaction Date</label>
                      <input
                        type="text"
                        name="transactionDate"
                        value={bank.transactionDate}
                        className="border p-2 mb-2 w-full"
                        readOnly
                      />
                      <label className="font-bold">Cheque No</label>
                      <input
                        type="text"
                        name="chequeNo"
                        value={bank.chequeNo}
                        className="border p-2 mb-2 w-full"
                        readOnly
                      />
                    </>
                  )}

                  <label className="font-bold">Amount</label>
                  <input
                    type="text"
                    name="Amount"
                    value={bank.Amount}
                    className="border p-2 mb-2 w-full"
                    readOnly
                  />
                  <label className="font-bold">Advance</label>
                  <input
                    type="text"
                    name="Advance"
                    value={bank.Advance}
                    className="border p-2 mb-2 w-full"
                    readOnly
                  />
                  <label className="font-bold">Received</label>
                  <input
                    type="text"
                    name="Received"
                    value={bank.Received}
                    className="border p-2 mb-2 w-full"
                    readOnly
                  />
                  <label className="font-bold">Balance</label>
                  <input
                    type="text"
                    name="Balance"
                    value={bank.Balance}
                    className="border p-2 mb-2 w-full"
                    readOnly
                  />
                </>
              )}
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ViewPurchaseInvoice;
