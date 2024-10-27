import payOutModel from "../models/PayOutModel.js";

export const createPayOutController = async (req, res) => {
  try {
    const {
      date,
      paymentNo,
      supplierName,
      paymentMode,
      selectBank,
      method,
      transactionCheckNo,
      rows,
      grandtotal,
      Narration,
    } = req.body;
    const { _id } = req.user;

    try {
      const newPayOut = new payOutModel({
        admin: _id,
        date,
        paymentNo,
        supplierName,
        paymentMode,
        selectBank,
        method,
        transactionCheckNo,
        rows,
        grandtotal,
        Narration,
      });
      const savedPayOut = await newPayOut.save();
      res.status(201).send({
        message: "Pay Out created successfully",
        payOut: savedPayOut,
      });
    } catch (error) {
      res.status(500).send({ error: "Server error", message: error.message });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};

export const getAllPayOutController = async (req, res) => {
  try {
    const _id = req.params._id;
    const response = await payOutModel.find({admin:_id});

    if (!response || response.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No Pay Out records found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Pay Out records found",
      payOutList: response,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Issue",
      error: error.message,
    });
  }
};

export const getPayOutByIdController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await payOutModel.findById(_id);

    if (!response) {
      return res.status(404).send({
        success: false,
        message: "Pay Out record not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Pay Out record found",
      payOut: response,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Issue",
      error: error.message,
    });
  }
};

export const deletePayOutByIdController = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteData = await payOutModel.findByIdAndDelete(_id);

    if (!deleteData) {
      return res.status(404).send({
        success: false,
        message: "Pay Out record not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Pay Out record deleted successfully",
      deletedPayOut: deleteData,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Issue",
      error: error.message,
    });
  }
};

export const updatePayOutByIdController = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;

    const payOut = await payOutModel.findById(_id);
    if (!payOut) {
      return res.status(404).send({
        success: false,
        message: "Pay Out record not found",
      });
    }

    // Update only the provided fields
    payOut.date = updateData.date || payOut.date;
    payOut.paymentNo = updateData.paymentNo || payOut.paymentNo;
    payOut.supplierName = updateData.supplierName || payOut.supplierName;
    payOut.paymentMode = updateData.paymentMode || payOut.paymentMode;
    payOut.selectBank = updateData.selectBank || payOut.selectBank;
    payOut.method = updateData.method || payOut.method;
    payOut.transactionCheckNo =
      updateData.transactionCheckNo || payOut.transactionCheckNo;
    payOut.rows = updateData.rows || payOut.rows;
    payOut.grandtotal = updateData.grandtotal || payOut.grandtotal;
    payOut.Narration = updateData.Narration || payOut.Narration;

    try {
      const updatedPayOut = await payOut.save();
      return res.status(200).send({
        success: true,
        message: "Pay Out updated successfully",
        payOut: updatedPayOut,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "Error updating Pay Out",
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Issue",
      error: error.message,
    });
  }
};
