import spendModel from "../models/spendModel.js";

// Create Spend Controller
export const createSpendController = async (req, res) => {
  try {
    const { spendType, amount, date, description, userId } = req.body;

    const newSpend = new spendModel({
      spendType,
      amount,
      date,
      description,
      admin: userId,
    });

    const savedSpend = await newSpend.save();
    res.status(201).send({ message: "Spend entry created successfully", spend: savedSpend });
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};

// Manage Spend Controller
export const manageSpendController = async (req, res) => {
  try {
    const _id = req.params._id;
    const data = await spendModel.find({ admin: _id });
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

// Delete Spend Controller
export const deleteSpendController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await spendModel.findByIdAndDelete(_id);

    if (!response) {
      return res.status(404).send({ success: false, message: "Spend entry not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Spend entry deleted successfully",
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

// Update Spend Controller
export const updateSpendController = async (req, res) => {
  try {
    const { spendType, amount, date, description } = req.body;

    try {
      const updatedSpend = await spendModel.findByIdAndUpdate(
        req.params.id,
        {
          spendType,
          amount,
          date,
          description,
        },
        { new: true }
      );

      if (!updatedSpend) {
        return res.status(404).send({ message: "Spend entry not found" });
      }

      res.status(200).send({ message: "Spend entry updated successfully", spend: updatedSpend });
    } catch (error) {
      res.status(500).send({ error: "Server error", message: error.message });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};
