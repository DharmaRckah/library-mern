import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import Select from "react-select";
import { useAuth } from "../../../context/Auth";

const EditEstimateModal = ({ closeModal, estimate, getCustomerName }) => {
  const [date, setDate] = useState("");
  const [estimateNo, setEstimateNo] = useState("");
  const [salesType, setSalesType] = useState("");
  const [chooseUser, setChooseUser] = useState([]);
  const [customerType, setCustomerType] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [placeOfSupply, setPlaceOfSupply] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");
  const [dueDate, setDueDate] = useState("");
  
  const [company, setCompanyData] = useState([]);
  const [receiptDocNo, setReceiptDocNo] = useState("");
  const [dispatchedThrough, setDispatchedThrough] = useState("");
  const [destination, setDestination] = useState("");
  const [carrierNameAgent, setCarrierNameAgent] = useState("");
  const [billOfLading, setBillOfLading] = useState("");
  const [motorVehicleNo, setMotorVehicleNo] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [reverseCharge, setReverseCharge] = useState("");
  const [gstType, setGstType] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [rows, setRows] = useState([]);
  const [otherChargesDescriptions, setOtherChargesDescriptions] = useState("");
  const [otherCharges, setOtherCharges] = useState("");
  const [narration, setNarration] = useState("");
  const [grossAmount, setGrossAmount] = useState("");
  const [customer, setCustomer] = useState([]);
  const [GstAmount, setGstAmount] = useState("");
  const [netAmount, setNetAmount] = useState("");
  const [auth] = useAuth();
  const [userId, setUserId] = useState("");
  const [banks, setBanks] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedBank, setSelectedBank] = useState([]); // Array to hold bank data
  const [cash, setCash] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOtherChargesOpen, setIsModalOtherChargesOpen] = useState(false);

  useEffect(() => {
    if (estimate) {
      setDate(estimate.date || "");
      setEstimateNo(estimate.estimateNo || "");
      setSalesType(estimate.salesType || "");
      setCustomerType(estimate.customerType || "");
      setCustomerName(
        estimate?.customerName ||
          estimate?.cash ||
          ` ${estimate.selectedBank[0]?.name} ` ||
          ""
      );
      setPlaceOfSupply(estimate.placeOfSupply || "");
      setPaymentTerm(estimate.paymentTerm || "");
      setDueDate(estimate.dueDate || "");
      setReceiptDocNo(estimate.receiptDocNo || "");
      setDispatchedThrough(estimate.dispatchedThrough || "");
      setDestination(estimate.destination || "");
      setCarrierNameAgent(estimate.carrierNameAgent || "");
      setBillOfLading(estimate.billOfLading || "");
      setMotorVehicleNo(estimate.motorVehicleNo || "");
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
    }
  }, [estimate, getCustomerName]);
  useEffect(() => {
    if (auth.user.role === 1) {
      setUserId(auth.user._id);
    }
    if (auth.user.role === 0) {
      setUserId(auth.user.admin);
    }
    fetchBanks();
  }, [auth, userId]);

  const fetchBanks = async () => {
    try {
      const response = await axios.get(`/api/v1/auth/manageBank/${userId}`);
      setBanks(response.data.data);
    } catch (error) {
      console.error("Error fetching Bank data", error);
    }
  };

  useEffect(() => {
    const companyData = async () => {
      try {
        const response = await axios.get(`/api/v1/company/get/${userId}`);
        setCompanyData(response.data.data); // Assuming setCompanyData updates the company state
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    companyData(); // Fetch company data on component mount
  }, [userId]); // Empty dependency array ensures this only runs once, on mount

  const handleCashPayment = (value) => {
    setCash(value);
    setGstType("CGST/SGST");

    // Update formData with the cash value
    // setFormData((prev) => ({
    //   ...prev,
    //   cash: value,
    // }));
    setCash(value);
    setCustomerName("");
    setPlaceOfSupply("")
    setBillingAddress("")
    setSelectedBank([]);
  };

  const handleCustomerChange = (e) => {
    const value = e.target.value;
    setSelectedCustomer(value);
 
    setSelectedBank([]);
    setCash("")
    console.log(customer,"customer")
    const selectedCustomerData = customer.find((cust) => cust._id === value);
    setChooseUser(selectedCustomerData);
    setCustomerName(selectedCustomerData?.name);
    console.log(selectedCustomerData,"selectedCustomerData")

    setPlaceOfSupply(selectedCustomerData ? selectedCustomerData.state : "");
    setBillingAddress(selectedCustomerData ? selectedCustomerData.address : "");
    if (
      selectedCustomerData.state.trim().toLowerCase() ===
      company.state.trim().toLowerCase()
    ) {
      setGstType("CGST/SGST");
    } else {
      setGstType("IGST");
    }
  };
  const handleBankChange = (bankId) => {
    const selectedBank = banks.find((bank) => bank._id === bankId);
    // Update the selected banks
    setSelectedBank(selectedBank);
    setCash("");
    setCustomerName("");
    setPlaceOfSupply("")
    setBillingAddress("")
    // Additional logic for handling bank data
    setGstType("CGST/SGST");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "otherCharges") {
      setOtherCharges(value);
      calculateTotalAmounts();
    }
    switch (name) {
      // Handle transport details fields separately
      case "receiptDocNo":
        setReceiptDocNo(value);
        break;
      case "dispatchedThrough":
        setDispatchedThrough(value);
        break;
      case "destination":
        setDestination(value);
        break;
      case "carrierNameAgent":
        setCarrierNameAgent(value);
        break;
      case "billOfLading":
        setBillOfLading(value);
        break;
      case "motorVehicleNo":
        setMotorVehicleNo(value);
        break;
      case "date":
        setDate(value);
        break;
      case "estimateNo":
        setEstimateNo(value);
        break;
      case "salesType":
        setSalesType(value);
        break;
      case "customerType":
        setCustomerType(value);
        break;
      case "customerName":
        setCustomerName(value);
        break;
      case "placeOfSupply":
        setPlaceOfSupply(value);
        break;
      case "paymentTerm":
        setPaymentTerm(value);
        break;
      case "dueDate":
        setDueDate(value);
        break;
      case "billingAddress":
        setBillingAddress(value);
        break;
      case "reverseCharge":
        setReverseCharge(value);
        break;
      case "gstType":
        setGstType(value);
        break;
      case "otherChargesDescriptions":
        setOtherChargesDescriptions(value);
        break;
      case "otherCharges":
        setOtherCharges(value);
        break;
      case "narration":
        setNarration(value);
        break;
      case "grossAmount":
        setGrossAmount(value);
        break;
      case "GstAmount":
        setGstAmount(value);
        break;
      case "netAmount":
        setNetAmount(value);
        break;
      default:
        break;
    }
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        itemCode: "",
        productName: "",
        hsnCode: "",
        qty: 0,
        units: "",
        mrp: 0,
        discountpercent: 0,
        discountRS: 0,
        taxable: 0,
        cgstpercent: 0,
        cgstRS: 0,
        sgstRS: 0,
        sgstpercent: 0,
        igstpercent: 0,
        igstRS: 0,
        totalValue: 0,
      },
    ]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const calculateTotalAmounts = () => {
    let grossAmount = 0;
    let totalGST = 0;

    rows.forEach((row) => {
      grossAmount += parseFloat(row.taxable) || 0;
      totalGST += (parseFloat(row.cgstRS) || 0) + (parseFloat(row.sgstRS) || 0);
    });

    const netAmount = grossAmount + totalGST + parseFloat(otherCharges || 0);

    setGrossAmount(grossAmount.toFixed(2));
    setGstAmount(totalGST.toFixed(2));
    setNetAmount(netAmount.toFixed(2));
  };

  const calculateTotals = () => {
    let grossAmount = 0;
    let GstAmount = 0;
    rows.forEach((rows) => {
      grossAmount += Number(rows.taxableValue);
      GstAmount +=
        gstType === "CGST/SGST"
          ? Number(rows.cgstrs) + Number(rows.sgstrs)
          : Number(rows.igstrs);
    });
    let netAmount;
    // Check if otherChargesDescriptions includes "discount"
    if (salesType === "Bill of Supply") {
      if (otherChargesDescriptions.includes("discount")) {
        netAmount = grossAmount - otherCharges; // Do not add GstAmount
      } else {
        netAmount = grossAmount + otherCharges; // Do not add GstAmount
      }
    } else {
      if (otherChargesDescriptions.includes("discount")) {
        netAmount = grossAmount + GstAmount - otherCharges;
      } else {
        netAmount = grossAmount + GstAmount + otherCharges;
      }
    }

    return { grossAmount, GstAmount, netAmount };
  };

  const handleRowChange = (index, field, value) => {
    // Create a copy of rows
    const newRows = [...rows];

    newRows[index] = { ...newRows[index], [field]: value };

    const selectedProduct = products.find(
      (product) => product.productName === newRows[index].productName
    );

    if (selectedProduct) {
      // Calculate retail price and apply the discount if applicable
      const retailPrice = selectedProduct.maxmimunRetailPrice
        ? selectedProduct.maxmimunRetailPrice -
          (selectedProduct.maxmimunRetailPrice *
            selectedProduct.retailDiscount) /
            100
        : 0;

      // Get sales tax and GST rate
      const salesTaxInclude = selectedProduct.salesTaxInclude;
      const gstRate = selectedProduct.gstRate;

      // Extract the quantity from the updated row
      const { qty } = newRows[index];

      // Calculate taxable value
      const taxableValue = salesTaxInclude
        ? (selectedProduct.retailPrice * qty * 100) /
          (100 + Number(selectedProduct.gstRate))
        : retailPrice * qty;

      // Calculate GST amounts
      const cgstrs =
        gstType === "CGST/SGST" ? (taxableValue * gstRate) / 2 / 100 : 0;
      const sgstrs =
        gstType === "CGST/SGST" ? (taxableValue * gstRate) / 2 / 100 : 0;
      const igstrs = gstType === "IGST" ? (taxableValue * gstRate) / 100 : 0;

      // Calculate total value
      const totalValue = taxableValue + (taxableValue * gstRate) / 100;

      // Update the row with the calculated values
      newRows[index] = {
        ...newRows[index],
        taxableValue: taxableValue.toFixed(2),
        quantity: qty,
        cgstrs: cgstrs.toFixed(2),
        sgstrs: sgstrs.toFixed(2),
        igstrs: igstrs.toFixed(2),
        totalvalue: totalValue.toFixed(2),
      };
      // Set the updated rows state
      setRows(newRows);
      // Trigger total calculation
      calculateTotals(newRows);
    }
  };
  
  useEffect(() => {
    if (auth?.user) {
      if (auth.user.role === 1) {
        setUserId(auth.user._id);
      } else if (auth.user.role === 0) {
        setUserId(auth.user.admin);
      }
    }

    fetchCustomer();
  }, [auth, userId]);
  const fetchCustomer = async () => {
    try {
      const response = await axios.get(`/api/v1/auth/manageCustomer/${userId}`);
      setCustomer(response.data.data);
    } catch (error) {
      console.error("Error fetching Customers:", error);
    }
  };

  const handleQtyChange = (index, value) => {
    const qty = parseFloat(value);

    const updatedRows = [...rows];

    // Fetch the selected product for this row
    const selectedProduct = products.find(
      (product) => product.itemCode === updatedRows[index].itemCode
    );

    if (selectedProduct) {
      const mrp = parseFloat(selectedProduct.maxmimunRetailPrice) || 0;

      const discountPercent =
        customerType === "Wholesaler"
          ? selectedProduct.wholesalerDiscount || 0
          : selectedProduct.retailDiscount || 0;

      const discountAmount = (mrp * qty * discountPercent) / 100;

      const taxableValue = mrp * qty - discountAmount;

      updatedRows[index] = {
        ...updatedRows[index],
        qty: qty,
        wholesalerDiscount: selectedProduct.wholesalerDiscount || 0,
        wholesalerDiscountRS: (
          (mrp * selectedProduct.wholesalerDiscount) /
          100
        ).toFixed(2),
        retailDiscount: selectedProduct.retailDiscount || 0,
        retailDiscountRS: (
          (mrp * selectedProduct.retailDiscount) /
          100
        ).toFixed(2),
        taxable: taxableValue.toFixed(2),
        cgstpercent: selectedProduct.gstRate / 2 || 0,
        sgstpercent: selectedProduct.gstRate / 2 || 0,
        igstpercent: selectedProduct.gstRate || 0,
        cgstRS: ((taxableValue * selectedProduct.gstRate) / 2 / 100).toFixed(2),
        sgstRS: ((taxableValue * selectedProduct.gstRate) / 2 / 100).toFixed(2),
        igstRS: ((taxableValue * selectedProduct.gstRate) / 100).toFixed(2),
        totalValue: (
          taxableValue +
          (taxableValue * selectedProduct.gstRate) / 100
        ).toFixed(2),
      };

      // Set the updated rows back to state
      setRows(updatedRows);

      // Recalculate total amounts after updating the row
      calculateTotalAmounts();
    }
  };

  useEffect(() => {
    calculateTotalAmounts();
  }, [rows, otherCharges]);

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/v1/auth/manageproduct/${userId}`);
      if (response.data && Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // toast.error("Failed to fetch products. Please try again.");
    }
  };

  useEffect(() => {
    if (auth?.user) {
      if (auth.user.role === 1) {
        setUserId(auth.user._id);
      } else if (auth.user.role === 0) {
        setUserId(auth.user.admin);
      }
    }

    fetchProducts();
  }, [auth, userId]);

  const handleProductSelect = (rowIndex, selectedProductName) => {
    const selectedProduct = products.find(
      (product) => product.productName === selectedProductName
    );

    if (selectedProduct) {
      updateRowValues(selectedProduct, rowIndex);
    }
  };

  const handleItemCodeSelect = (rowIndex, selectedItemCode) => {
    const selectedProduct = products.find(
      (product) => product.itemCode === selectedItemCode
    );

    if (selectedProduct) {
      updateRowValues(selectedProduct, rowIndex);
    }
  };

  const updateRowValues = (selectedProduct, rowIndex) => {
    const updatedRows = [...rows]; // Clone the current rows

    // Calculate retail price and taxable value based on product details
    const retailPrice =
      selectedProduct.maxmimunRetailPrice -
      (selectedProduct.maxmimunRetailPrice * selectedProduct.retailDiscount) /
        100;

    const taxableValue = selectedProduct.salesTaxInclude
      ? (selectedProduct.retailPrice * selectedProduct.quantity * 100) /
        (100 + Number(selectedProduct.gstRate))
      : retailPrice * selectedProduct.quantity;

    // Update all relevant fields in the selected row
    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex], // Keep any existing row data
      itemCode: selectedProduct.itemCode || "", // Map itemCode
      productName: selectedProduct.productName || "", // Map productName
      hsnCode: selectedProduct.hsnCode || "", // Map HSN code
      units: selectedProduct.units || "", // Map units
      mrp: selectedProduct.maxmimunRetailPrice
        ? parseFloat(selectedProduct.maxmimunRetailPrice).toFixed(2)
        : "0.00", // Map maximum retail price

      qty: selectedProduct.quantity || 0, // Map quantity
      wholesalerDiscount: selectedProduct.wholesalerDiscount || 0, // Map wholesaler discount
      wholesalerDiscountRS: (
        (selectedProduct.maxmimunRetailPrice *
          selectedProduct.wholesalerDiscount) /
        100
      ).toFixed(2), // Calculate wholesaler discount in ₹
      retailDiscount: selectedProduct.retailDiscount || 0, // Map retail discount
      retailDiscountRS: (
        (selectedProduct.maxmimunRetailPrice * selectedProduct.retailDiscount) /
        100
      ).toFixed(2), // Calculate retail discount in ₹
      taxable: taxableValue.toFixed(2), // Map taxable value

      // GST rates
      cgstpercent: selectedProduct.gstRate / 2 || 0,
      sgstpercent: selectedProduct.gstRate / 2 || 0,
      igstpercent: selectedProduct.gstRate || 0,
      // GST amounts
      cgstRS: ((taxableValue * selectedProduct.gstRate) / 2 / 100).toFixed(2),
      sgstRS: ((taxableValue * selectedProduct.gstRate) / 2 / 100).toFixed(2),
      igstRS: ((taxableValue * selectedProduct.gstRate) / 100).toFixed(2),

      // Total value (taxable value + GST)
      totalValue: (
        taxableValue +
        (taxableValue * selectedProduct.gstRate) / 100
      ).toFixed(2),
    };

    // Set updated rows back to the state
    setRows(updatedRows);

    // Recalculate total amounts after updating the row
    calculateTotalAmounts();
  };

  const handleUpdate = async () => {
    try {
      console.log(customerName,"dheeru")
      console.log(cash,"cash", "    ",selectedBank,"bank",customerName,"customer name")
      const updatedEstimate = {
        date,
        estimateNo,
        salesType,
        customerType,
        customerName,
        cash,
        selectedBank,
        placeOfSupply,
        paymentTerm,
        dueDate,
        receiptDocNo,
        dispatchedThrough,
        destination,
        carrierNameAgent,
        billOfLading,
        motorVehicleNo,
        billingAddress,
        reverseCharge,
        gstType,

        rows: rows.map((row) => ({
          itemCode: row.itemCode,
          productName: row.productName,
          hsnCode: row.hsnCode,
          qty: row.qty,
          units: row.units,
          mrp: row.mrp,

          discountpercent:
            customerType === "Wholesaler"
              ? row.wholesalerDiscount
              : row.retailDiscount,
          discountRS:
            customerType === "Wholesaler"
              ? row.wholesalerDiscountRS
              : row.retailDiscountRS,

          taxable: row.taxable,
          cgstpercent: row.cgstpercent,
          cgstRS: row.cgstRS,
          sgstpercent: row.sgstpercent,
          sgstRS: row.sgstRS,
          igstpercent: row.igstpercent,
          igstRS: row.igstRS,
          totalValue: row.totalValue,
        })),
        otherChargesDescriptions,
        otherCharges,
        narration,
        grossAmount,
        GstAmount,
        netAmount,
      };

      const response = await axios.put(
        `/api/v1/salesEstimateRoute/updateSalesEstimatetByID/${estimate._id}`,
        updatedEstimate
      );

      if (response.data.success) {
        alert("Estimate updated successfully");
        closeModal();
      } else {
        alert("Failed to update estimate: " + response.data.message);
      }
    } catch (error) {
      console.error("Error updating estimate:", error);
      alert("Error updating estimate: " + error.message);
    }
  };

  return (
    <div style={{ backgroundColor: "#82ac73" }} className="p-4 ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-center text-black text-2xl underline mb-4"></h1>
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
              name="date"
              value={date}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </label>
        </div>
        <div>
          <label className="font-bold">Estimate No.</label>
          <input
            type="text"
            name="estimateNo"
            value={estimateNo}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="font-bold">Sales Type</label>
          <select
            value={salesType}
            name="salesType"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="GST Invoice">GST Invoice</option>
            <option value="Bill of Supply">Bill of Supply</option>
          </select>
        </div>
        <div>
          <label className="font-bold">Customer Type</label>
          <select
            value={customerType}
            name="customerType"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="Retailer">Retailer</option>
            <option value="Wholesaler">Wholesaler</option>
          </select>
        </div>
        <div>
          <label className="font-bold">Customer Name</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={selectedValue} // This ensures the selected value is shown in the dropdown
            onChange={(e) => {
              const selectedValue = e.target.value;
              setSelectedValue(selectedValue); // Update the state to reflect the selected value

              if (selectedValue === "add-new-customer") {
                window.location.href = "/admin/CreateCustomer";
              } else if (selectedValue === "add-new-bank") {
                window.location.href = "/admin/addbank";
              } else if (selectedValue === "cash") {
                handleCashPayment(selectedValue); // Handle cash payment
              } else if (selectedValue.startsWith("bank-")) {
                handleBankChange(selectedValue.replace("bank-", "")); // Handle bank change
              } else {
                handleCustomerChange(e); // Handle customer change
              }
            }}
          >
            {/* Customer Options */}
            <optgroup label="Customers">
           {   console.log(customer,"customer fffffffffffff")}
              {customer?.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
              <option value="add-new-customer" className="text-blue-500">
                + Add New Customer
              </option>
            </optgroup>
            {/* Bank Options */}
            <optgroup label="Banks">
              {banks?.map((bank) => (
                <option key={bank._id} value={`bank-${bank._id}`}>
                  {bank.name}
                </option>
              ))}
              <option value="cash" className="text-green-500">
                Cash
              </option>
              {/* Uncomment if you need the Add New Bank option */}
              {/* <option value="add-new-bank" className="text-blue-500">
                   + Add New Bank
                 </option> */}
            </optgroup>
          </select>
        </div>
        <div>
          <label className="font-bold">Place of Supply</label>
          <input
            type="text"
            name="placeOfSupply"
            value={placeOfSupply}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="font-bold">
            Payment Term (days):
            <input
              type="number"
              name="paymentTerm"
              value={paymentTerm}
              onChange={handleChange}
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
              name="dueDate"
              onChange={handleChange}
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
                <label>Receipt Doc No.</label>
                <input
                  type="text"
                  name="receiptDocNo"
                  value={receiptDocNo}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Dispatched Through</label>
                <input
                  type="text"
                  name="dispatchedThrough"
                  value={dispatchedThrough}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={destination}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Carrier Name/Agent</label>
                <input
                  type="text"
                  name="carrierNameAgent"
                  value={carrierNameAgent}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Bill of Lading/LR-RR No.</label>
                <input
                  type="text"
                  name="billOfLading"
                  value={billOfLading}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Motor Vehicle No.</label>
                <input
                  type="text"
                  name="motorVehicleNo"
                  value={motorVehicleNo}
                  onChange={handleChange}
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
            name="billingAddress"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="font-bold">Reverse Charge</label>
          <select
            value={reverseCharge}
            onChange={handleChange}
            name="reverseCharge"
            className="border p-2 w-full rounded"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {salesType === "GST Invoice" && (
          <div className="mb-4 w-full">
            <label className="font-bold">GST Type:</label>
            <select
              value={gstType}
              name="gstType"
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="CGST/SGST">CGST/SGST</option>
              <option value="IGST">IGST</option>
            </select>
          </div>
        )}
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
              <th className="border p-2">Qty</th>
              <th className="border p-2">Units</th>
              <th className="border p-2">MRP</th>
              <th className="border p-2">
                Discount
                <div className="flex justify-between">
                  <span className="mr-8">%</span> <span>₹</span>
                </div>
              </th>
              {salesType === "GST Invoice" && (
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
              )}
              <th className="border p-2">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  <td className="border">
                    <Select
                      id="itemcode-select"
                      value={
                        rows[index].itemCode
                          ? {
                              label: rows[index].itemCode,
                              value: rows[index].itemCode,
                            }
                          : null
                      }
                      onChange={(selectedOption) =>
                        handleItemCodeSelect(index, selectedOption.value)
                      }
                      options={products.map((product) => ({
                        label: product.itemCode,
                        value: product.itemCode,
                      }))}
                      isSearchable={true}
                      placeholder="Select"
                      styles={{
                        control: (base) => ({
                          ...base,
                          minWidth: "120px",
                          maxWidth: "300px",
                          fontSize: "14px",
                          minHeight: "34px",
                          height: "34px",
                        }),
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                    />
                  </td>
                </td>
                <td className="border p-2">
                  <td className="border ">
                    <Select
                      id="product-select"
                      value={
                        rows[index].productName
                          ? {
                              label: rows[index].productName,
                              value: rows[index].productName,
                            }
                          : null
                      }
                      onChange={(selectedOption) =>
                        handleProductSelect(index, selectedOption.value)
                      }
                      options={products.map((product) => ({
                        label: product.productName,
                        value: product.productName,
                      }))}
                      isSearchable={true}
                      placeholder="Select a Product"
                      styles={{
                        control: (base) => ({
                          ...base,
                          minWidth: "200px",
                          maxWidth: "500px",
                          fontSize: "14px",
                          minHeight: "34px",
                          height: "34px",
                        }),
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                    />
                  </td>
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={row.hsnCode}
                    onChange={(e) =>
                      handleRowChange(index, "hsnCode", e.target.value)
                    }
                    className="w-full flex-grow"
                    style={{
                      minWidth: "60px",
                      flexBasis: "60px",
                      flexShrink: 1,
                    }}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={row.qty}
                    onChange={(e) => handleQtyChange(index, e.target.value)}
                    className="w-full"
                  />
                </td>

                <td className="border p-2">
                  <input
                    type="text"
                    value={row.units}
                    onChange={(e) =>
                      handleRowChange(index, "units", e.target.value)
                    }
                    className="w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={row.mrp}
                    onChange={(e) =>
                      handleRowChange(index, "mrp", e.target.value)
                    }
                    className="w-full flex-grow"
                    style={{
                      minWidth: "60px",
                      flexBasis: "60px",
                      flexShrink: 1,
                    }}
                  />
                </td>
                <td className="border">
                  {row.discountpercent && row.discountRS ? (
                    // If discountpercent and discountRS exist, show these fields
                    <div className="p-1 flex gap-1">
                      <input
                        type="text"
                        value={row.discountpercent}
                        readOnly
                        className="w-full flex-grow"
                        style={{
                          minWidth: "20px",
                          flexBasis: "20px",
                          flexShrink: 1,
                        }}
                      />
                      <input
                        type="text"
                        value={row.discountRS}
                        readOnly
                        className="w-full flex-grow"
                        style={{
                          minWidth: "40px",
                          flexBasis: "40px",
                          flexShrink: 1,
                        }}
                      />
                    </div>
                  ) : (
                    // If discountpercent and discountRS do not exist, show these input boxes
                    <>
                      {customerType === "Wholesaler" && (
                        <div className="p-1 flex gap-1">
                          <input
                            type="text"
                            value={row.wholesalerDiscount}
                            onChange={(e) =>
                              handleRowChange(
                                index,
                                "discountpercent",
                                e.target.value
                              )
                            }
                            className="w-full flex-grow"
                            style={{
                              minWidth: "20px",
                              flexBasis: "20px",
                              flexShrink: 1,
                            }}
                          />

                          <input
                            type="text"
                            value={row.wholesalerDiscountRS}
                            onChange={(e) =>
                              handleRowChange(
                                index,
                                "discountRS",
                                e.target.value
                              )
                            }
                            className="w-full"
                          />
                        </div>
                      )}
                      {customerType === "Retailer" && (
                        <div className="p-1 flex gap-1">
                          <input
                            type="text"
                            value={row.retailDiscount}
                            onChange={(e) =>
                              handleRowChange(
                                index,
                                "discountpercent",
                                e.target.value
                              )
                            }
                            className="w-full flex-grow"
                            style={{
                              minWidth: "20px",
                              flexBasis: "20px",
                              flexShrink: 1,
                            }}
                          />
                          <input
                            type="text"
                            value={row.retailDiscountRS}
                            onChange={(e) =>
                              handleRowChange(
                                index,
                                "discountRS",
                                e.target.value
                              )
                            }
                            className="w-full"
                          />
                        </div>
                      )}
                    </>
                  )}
                </td>
                {salesType === "GST Invoice" && (
                  <>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={row.taxable}
                        onChange={(e) =>
                          handleRowChange(index, "taxable", e.target.value)
                        }
                        className="w-full flex-grow"
                        style={{
                          minWidth: "60px",
                          flexBasis: "60px",
                          flexShrink: 1,
                        }}
                      />
                    </td>
                    {gstType === "CGST/SGST" && (
                      <>
                        <td className="border p-2">
                          <div className="flex gap-1">
                            <input
                              type="number"
                              value={row.cgstpercent}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "cgstpercent",
                                  e.target.value
                                )
                              }
                              className="w-full"
                            />
                            <input
                              type="number"
                              value={row.cgstRS}
                              onChange={(e) =>
                                handleRowChange(index, "cgstRS", e.target.value)
                              }
                              className="w-full"
                            />
                          </div>
                        </td>
                        <td className="border p-2">
                          <div className="flex gap-1">
                            <input
                              type="number"
                              value={row.sgstpercent}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "sgstpercent",
                                  e.target.value
                                )
                              }
                              className="w-full"
                            />
                            <input
                              type="number"
                              value={row.sgstRS}
                              onChange={(e) =>
                                handleRowChange(index, "sgstRS", e.target.value)
                              }
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
                            onChange={(e) =>
                              handleRowChange(
                                index,
                                "igstpercent",
                                e.target.value
                              )
                            }
                            className="w-full flex-grow"
                            style={{
                              minWidth: "10px",
                              flexBasis: "20px",
                              flexShrink: 1,
                            }}
                          />
                          <input
                            type="number"
                            value={row.igstRS}
                            onChange={(e) =>
                              handleRowChange(index, "igstRS", e.target.value)
                            }
                            className="w-full flex-grow"
                            style={{
                              minWidth: "60px",
                              flexBasis: "60px",
                              flexShrink: 1,
                            }}
                          />
                        </div>
                      </td>
                    )}
                  </>
                )}
                <td className="border p-2">
                  <input
                    type="number"
                    value={row.totalValue}
                    onChange={(e) =>
                      handleRowChange(index, "totalValue", e.target.value)
                    }
                    className="w-full flex-grow"
                    style={{
                      minWidth: "70px",
                      flexBasis: "70px",
                      flexShrink: 1,
                    }}
                  />
                </td>
                <td className="p-1 gap-2 flex">
                  <button
                    onClick={() => removeRow(index)}
                    className="bg-red-500 text-white p-1 mt-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={addRow}
        className="bg-green-500 text-white p-2 mt-2 rounded hoverbg-green-600 focusoutline-none focusring-2 focusring-green-400 focusring-opacity-50 flex items-center justify-center"
      >
        <svg
          xmlns="http//www.w3.org/2000/svg"
          className="h-4 w-4 "
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
        Add New Row
      </button>
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
                  name="otherChargesDescriptions"
                  value={otherChargesDescriptions}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Other Charges</label>
                <input
                  type="text"
                  name="otherCharges"
                  value={otherCharges}
                  onChange={handleChange}
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
      {/* Narration and Amounts */}
      <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
        <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
          <label className="font-bold">Narration</label>
          <br />
          <textarea
            value={narration}
            name="narration"
            onChange={handleChange}
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
              name="grossAmount"
              value={grossAmount}
              onChange={handleChange}
              className="bg-black text-white border p-1 w-full rounded lg:w-2/3"
            />
          </div>
          {salesType === "GST Invoice" && (
            <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
              <label className="font-bold lg:w-1/2 text-nowrap">
                GST Amount
              </label>
              <input
                type="text"
                name="GstAmount"
                value={GstAmount}
                onChange={handleChange}
                className="bg-black text-white border p-1 w-full rounded lg:w-2/3"
              />
            </div>
          )}
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label className="font-bold lg:w-1/2 text-nowrap">
              Other Charges
            </label>
            <input
              type="text"
              name="otherCharges"
              value={otherCharges}
              onChange={handleChange}
              className="bg-black text-white border p-1 w-full rounded lg:w-2/3"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label className="font-bold lg:w-1/2 text-nowrap">Net Amount</label>
            <input
              type="text"
              name="netAmount"
              value={netAmount}
              onChange={handleChange}
              className="bg-black text-white border p-1 w-full rounded lg:w-2/3"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white p-2 rounded mr-2"
            >
              Save Changes
            </button>

            <button
              onClick={closeModal}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEstimateModal;
