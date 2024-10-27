import deliveryChallanModel from "../models/deliveryChallanModel.js";

export const createChallanController = async (req, res) => {
  try {
    const {
      userId,
      date,
      salesType,
      challanNo,
      customerName,
      cash, // Include cash in the model
      selectedBank, // Include selected bank data
      placeOfSupply,
      customerType,
      paymentTerm,
      dueDate,
      dispatchedThrough,
      destination,
      carrierNameAgent,
      billOfLading,
      billingAddress,
      reverseCharge,
      gstType,
      rows,
      otherChargesDescriptions,
      otherCharges,
      narration,
      grossAmount,
      GstAmount,
      netAmount,
    } = req.body;

    try {
      
      const newChallan = new deliveryChallanModel({
        admin: userId,
        date,
        salesType,
        challanNo,
        customerName,
        cash, // Include cash in the model
        selectedBank, // Include selected bank data
        placeOfSupply,
        customerType,
        paymentTerm,
        dueDate,
        dispatchedThrough,
        destination,
        carrierNameAgent,
        billOfLading,
        billingAddress,
        reverseCharge,
        gstType,
        rows,
        otherChargesDescriptions,
        otherCharges,
        narration,
        grossAmount,
        GstAmount,
        netAmount,
      });
      const savedChallan = await newChallan.save();
      res.status(201).send({
        message: "Challan created successfully",
        challan: savedChallan,
      });
    } catch (error) {
      res.status(500).send({ error: "Server error", message: error.message });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};
export const getAllChallanCOntroller = async (req, res) => {
  try {
    const _id = req.params._id;
    const response = await deliveryChallanModel.find({admin:_id});

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
export const getAllChallanByIdController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await deliveryChallanModel.findById(_id); // Use findById instead of find
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data found",
      challan: response,
    });
  } catch (error) {
    console.error("Error fetching sales challan by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Issue",
      error: error.message,
    });
  }
};
export const deletChallanByIDController = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteData = await deliveryChallanModel.findByIdAndDelete({ _id });

    if (!deleteData) {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Sales Challan Deleted Successfully",
      deleteData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Issue" });
  }
};
export const updateChallanByIDController = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;

    const challan = await deliveryChallanModel.findById(_id);
    if (!challan) {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }

    // Update fields
    challan.userId = updateData.userId || challan.userId;
    challan.date = updateData.date || challan.date;
    challan.salesType = updateData.salesType || challan.salesType;
    challan.challanNo = updateData.ChallanNo || challan.ChallanNo;
    challan.customerName = updateData.customerName || challan.customerName;
    challan.placeOfSupply = updateData.placeOfSupply || challan.placeOfSupply;
    challan.paymentTerm = updateData.paymentTerm || challan.paymentTerm;
    challan.dueDate = updateData.dueDate || challan.dueDate;
    challan.dispatchedThrough =
      updateData.dispatchedThrough || challan.dispatchedThrough;
    challan.destination = updateData.destination || challan.destination;
    challan.carrierNameAgent =
      updateData.carrierNameAgent || challan.carrierNameAgent;
    challan.billOfLading = updateData.billOfLading || challan.billOfLading;
    challan.billingAddress =
      updateData.billingAddress || challan.billingAddress;
    challan.reverseCharge = updateData.reverseCharge || challan.reverseCharge;
    challan.gstType = updateData.gstType || challan.gstType;
    challan.rows = updateData.rows || challan.rows;
    challan.otherChargesDescription =
      updateData.otherChargesDescription || challan.otherChargesDescription;
    challan.othercharges = updateData.othercharges || challan.othercharges;
    challan.narration = updateData.narration || challan.narration;
    challan.grossAmount = updateData.grossAmount || challan.grossAmount;
    challan.GstAmount = updateData.GstAmount || challan.GstAmount;
    challan.netAmount = updateData.netAmount || challan.netAmount;

    const updatedChallan = await challan.save();

    return res.status(200).send({
      success: true,
      message: "Sales Challan updated successfully",
      updatedChallan,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Issue" });
  }
};
