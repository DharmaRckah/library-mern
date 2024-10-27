import incomeModel from "../models/incomeModel.js";

// Create a new income
export const createincomeController = async (req, res) => {
  try {
    const {
      userId,
      date,
      incomeNo,
      incomeType,
      gstType,
      vendor,
      income,
      amount,
      gstRate,
      cgstAmount,
      sgstAmount,
      igstAmount,
      total,
      narration,
    } = req.body;

    const newincome = await incomeModel.create({
      admin:userId,
      date,
      incomeNo,
      incomeType,
      gstType,
      vendor,
      income,
      amount,
      gstRate,
      cgstAmount,
      sgstAmount,
      igstAmount,
      total,
      narration,
    });

    return res.status(201).send({
      success: true,
      message: "income Created Successfully",
      data: newincome,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

// Get all incomes
export const manageincomeController = async (req, res) => {
  try {
    const {_id} =req.params;
    const incomes = await incomeModel.find({admin:_id});
    if (incomes.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Data found",
        data: incomes,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "No incomes found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

// Delete an income by ID
export const deleteincomeController = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedincome = await incomeModel.findByIdAndDelete(_id);

    if (!deletedincome) {
      return res.status(404).send({
        success: false,
        message: "income not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "income deleted successfully",
      data: deletedincome,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

// Update an income by ID
export const updateincomeController = async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      date,
      incomeNo,
      incomeType,
      gstType,
      vendor,
      income,
      amount,
      gstRate,
      cgstAmount,
      sgstAmount,
      igstAmount,
      total,
      narration,
    } = req.body;

    const updatedincome = await incomeModel.findByIdAndUpdate(
      _id,
      {
        date,
        incomeNo,
        incomeType,
        gstType,
        vendor,
        income,
        amount,
        gstRate,
        cgstAmount,
        sgstAmount,
        igstAmount,
        total,
        narration,
      },
      { new: true }
    );

    if (!updatedincome) {
      return res.status(404).send({
        success: false,
        message: "income not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "income updated successfully",
      data: updatedincome,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};
