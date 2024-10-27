import SalesEstimateModel from "../models/salesEstimateModel.js"; // Adjust the import path as needed

export const createSalesEstimateController = async (req, res) => {
  try {
    const {
      userId,
      date,
      estimateNo,
      salesType,
      customerType,
      customerName,
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
      rows, // Ensure this is an array of row objects
      otherChargesDiscount,
      othercharges,
      narration,
      grossAmount,
      GstAmount,
      netAmount,
    } = req.body;

    // Validate required fields
    const requiredFields = [
      "userId",
      "date",
      "estimateNo",
      "salesType",
      "customerType",
      "customerName",
      "placeOfSupply",
      "paymentTerm",
      "dueDate",
      "receiptDocNo",
      "dispatchedThrough",
      "destination",
      "carrierNameAgent",
      "billOfLading",
      "motorVehicleNo",
      "billingAddress",
      "reverseCharge",
      "gstType",
      "rows",
      "otherChargesDiscount",
      "othercharges",
      "narration",
      "grossAmount",
      "GstAmount",
      "netAmount",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    // Create a new sales estimate
    const newSalesEstimate = new SalesEstimateModel({
      userId,
      date,
      estimateNo,
      salesType,
      customerType,
      customerName,
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
      rows, // This should be an array of objects with the required fields as per the schema
      otherChargesDiscount,
      othercharges,
      narration,
      grossAmount,
      GstAmount,
      netAmount,
    });
    // Save the new sales estimate
    const savedSalesEstimate = await newSalesEstimate.save();
    res.status(201).send({
      message: "Sales Estimate created successfully",
      salesEstimate: savedSalesEstimate,
    });
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};


export const getAllSalesQuotationCOntroller = async (req, res) => {
  try {
    const response = await salesQuotationModel.find();

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }

    return res
      .status(200)
      .send({ success: true, message: "Data  found", response });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Issue" });
  }
};

export const deletSalesQuotationByIDController = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteData = await salesQuotationModel.findByIdAndDelete({ _id });

    if (!deleteData) {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Quotaion Deleted SUccessfully",
      deleteData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Issue" });
  }
};

export const updateQuotationByIDController = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;

    const quotation = await salesQuotationModel.findById(_id);
    if (!quotation) {
      return res.status(404).send({ success: false, message: "Data not found" });
    }

    // Update fields
    quotation.date = updateData.date || quotation.date;
    quotation.quotationNo = updateData.quotationNo || quotation.quotationNo;
    quotation.selectCustomer = updateData.selectCustomer || quotation.selectCustomer;
    quotation.reverseCharge = updateData.reverseCharge || quotation.reverseCharge;
    quotation.placeOfSupply = updateData.placeOfSupply || quotation.placeOfSupply;
    quotation.paymentsTerms = updateData.paymentsTerms || quotation.paymentsTerms;
    quotation.dueDate = updateData.dueDtae || quotation.dueDtae;
    quotation.taxType = updateData.taxType || quotation.taxType;
    quotation.billingAddress = updateData.billingAddress || quotation.billingAddress;
    quotation.shippingAddress = updateData.shippingAddress || quotation.shippingAddress;
    quotation.taxAmount = updateData.taxAmount || quotation.taxAmount;
    quotation.totalAmount = updateData.totalAmount || quotation.totalAmount;

    // Update rows array
    if (updateData.rows) {
      quotation.rows = updateData.rows.map((rowData) => ({
        itemCode: rowData.itemCode,
        itemName: rowData.itemName,
        hsnCode: rowData.hsnCode,
        qty: rowData.qty,
        rate: rowData.rate,
        cgst: rowData.cgst,
        sgst: rowData.sgst,
        igst: rowData.igst,
        total: rowData.total,
      }));
    }

    const updatedQuotation = await quotation.save();

    return res.status(200).send({
      success: true,
      message: "Quotation updated successfully",
      updatedQuotation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "Internal Server Issue" });
  }
};



