import pointOfSaleModel from "../models/PointOfSaleModel.js";

export const createPOFController = async (req, res) => {
  try {
    const {
      date,
      invoicNo, // Use invoicNo as in the schema
      customerDetail, // Use customerDetail instead of customerName
      paymentType,
      rows,
      grossAmount,
      GstAmount,
      netAmount,
      userId,
    } = req.body;
  
    
    try {
      const newPointOfSale = new pointOfSaleModel({
        admin:userId,
        date,
        invoicNo,
        customerDetail,
        paymentType,
        rows,
        grossAmount,
        GstAmount,
        netAmount,
      });
      const savedPOS = await newPointOfSale.save();
      res.status(201).send({
        message: "Point of Sale created successfully",
        pos: savedPOS,
      });
    } catch (error) {
      res.status(500).send({ error: "Server error", message: error.message });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};
export const getAllPOFController = async (req, res) => {
  try {
    const _id = req.params._id;
    const response = await pointOfSaleModel.find({admin:_id});

    if (!response || response.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No data found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Data found",
      posList: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Issue",
      error: error.message,
    });
  }
};
export const getAllPOFByIdController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await pointOfSaleModel.findById(_id);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data found",
      pos: response,
    });
  } catch (error) {
    console.error("Error fetching POS by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Issue",
      error: error.message,
    });
  }
};
export const deletePOFByIDController = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteData = await pointOfSaleModel.findByIdAndDelete({ _id });

    if (!deleteData) {
      return res.status(404).send({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "POS deleted successfully",
      deletedPOS: deleteData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Issue",
      error: error.message,
    });
  }
};
export const updatePOFByIDController = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;

    const pos = await pointOfSaleModel.findById(_id);
    if (!pos) {
      return res.status(404).send({
        success: false,
        message: "Data not found",
      });
    }

    // Update fields if provided in the request body
    pos.date = updateData.date || pos.date;
    pos.invoicNo = updateData.invoicNo || pos.invoicNo;
    pos.customerDetail = updateData.customerDetail || pos.customerDetail;
    pos.paymentType = updateData.paymentType || pos.paymentType;
    pos.rows = updateData.rows || pos.rows;
    pos.grossAmount = updateData.grossAmount || pos.grossAmount;
    pos.GstAmount = updateData.GstAmount || pos.GstAmount;
    pos.netAmount = updateData.netAmount || pos.netAmount;

    try {
      const updatedPOS = await pos.save();
      return res.status(200).send({
        success: true,
        message: "POS updated successfully",
        pos: updatedPOS,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "Error updating POS",
        error: error.message,
      });
    }
  } catch (error) {
    console.error("Error updating POS by ID:", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Issue",
      error: error.message,
    });
  }
};
