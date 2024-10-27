import feesPlanModel from "../models/feesPlanModel.js";

// Create Fees Plan Controller
export const createFeesPlanController = async (req, res) => {
  try {
    const { planName, planduration, planprice, description, userId } = req.body;

    const newFeesPlan = new feesPlanModel({
      planName,
      planduration,
      planprice,
      description,
      admin: userId,
    });

    const savedPlan = await newFeesPlan.save();
    res.status(201).send({ message: "Fees plan created successfully", plan: savedPlan });
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};

// Manage Fees Plan Controller
export const manageFeesPlanController = async (req, res) => {
  try {
    const _id = req.params._id;
    const data = await feesPlanModel.find({ admin: _id });
    if (data && data.length > 0) {
      return res.status(200).send({ success: true, message: "Data found", data });
    } else {
      return res.status(404).send({ success: false, message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

// Delete Fees Plan Controller
export const deleteFeesPlanController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await feesPlanModel.findByIdAndDelete(_id);

    if (!response) {
      return res.status(404).send({ success: false, message: "Fees plan not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Fees plan deleted successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

// Update Fees Plan Controller
export const updateFeesPlanController = async (req, res) => {
  try {
    const { planName, planduration, planprice, description } = req.body;

    try {
      const updatedPlan = await feesPlanModel.findByIdAndUpdate(
        req.params.id,
        {
          planName,
          planduration,
          planprice,
          description,
        },
        { new: true }
      );

      if (!updatedPlan) {
        return res.status(404).send({ message: "Fees plan not found" });
      }

      res.status(200).send({ message: "Fees plan updated successfully", plan: updatedPlan });
    } catch (error) {
      res.status(500).send({ error: "Server error", message: error.message });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};
