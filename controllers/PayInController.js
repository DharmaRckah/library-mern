import payInModel from "../models/PayInModel.js";

export const createPayInController = async (req, res) => {
  try {
    const {
      date,
      receiptNo,
      selectCustomer,

      receiptMode,
      rows,
      grandtotal,
      Narration,
      selectBank,         
      method,              
      transactionCheckNo,
      userId,    
    } = req.body;
   


    try {
      const newPayIn = new payInModel({
        admin: userId,
        date,
        receiptNo,
        selectCustomer,

        receiptMode,
        rows,
        grandtotal,
        Narration,
        selectBank,         
        method,
        transactionCheckNo
      });
      const savedPayIn = await newPayIn.save();
      res.status(201).send({
        message: "Pay In created successfully",
        payIn: savedPayIn,
      });
    } catch (error) {
      res.status(500).send({ error: "Server error", message: error.message });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};


export const getAllPayInController = async (req, res) => {
  try {
    const _id = req.params._id;
    const response = await payInModel.find({admin:_id});

    if (!response || response.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No data found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Data found",
      payInList: response,
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

export const getPayInByIdController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await payInModel.findById(_id);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data found",
      payIn: response,
    });
  } catch (error) {
    console.error("Error fetching Pay In by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Issue",
      error: error.message,
    });
  }
};

export const deletePayInByIdController = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteData = await payInModel.findByIdAndDelete({ _id });

    if (!deleteData) {
      return res.status(404).send({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Pay In deleted successfully",
      deletedPayIn: deleteData,
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

export const updatePayInByIdController = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;

    const payIn = await payInModel.findById(_id);
    if (!payIn) {
      return res.status(404).send({
        success: false,
        message: "Data not found",
      });
    }

    // Update fields if provided in the request body
    payIn.date = updateData.date || payIn.date;
    payIn.receiptNo = updateData.receiptNo || payIn.receiptNo;
    payIn.selectCustomer = updateData.selectCustomer || payIn.selectCustomer;
    payIn.receiptMode = updateData.receiptMode || payIn.receiptMode;
    payIn.rows = updateData.rows || payIn.rows;
    payIn.grandtotal = updateData.grandtotal || payIn.grandtotal;
    payIn.Narration = updateData.Narration || payIn.Narration;
    payIn.selectBank = updateData.selectBank || payIn.selectBank;            // New field
    payIn.method = updateData.method || payIn.method;                        // New field
    payIn.transactionCheckNo = updateData.transactionCheckNo || payIn.transactionCheckNo;  // New field

    try {
      const updatedPayIn = await payIn.save();
      return res.status(200).send({
        success: true,
        message: "Pay In updated successfully",
        payIn: updatedPayIn,
      });
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        success: false,
        message: "Error updating Pay In",error,
        error: error.message,
      });
    }
  } catch (error) {
    console.error("Error updating Pay In by ID:", error);
    console.log(error)
    return res.status(500).send({
      success: false,
      message: "Internal Server Issue",
      error: error.message,
    });
  }
};

