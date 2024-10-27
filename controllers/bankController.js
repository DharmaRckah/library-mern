import bankModel from "../models/bankModel.js";

export const createBankController = async (req, res) => {
  try {
    const { name, ifscCode, accountNumber, openingBalance, drCr,userId } = req.body;

    const requiredFields = [
      "name",
      "ifscCode",
      "accountNumber",
      "openingBalance",
      "drCr",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const old = await bankModel.findOne({ accountNumber });
    if (old) {
      return res.status(400).send({
        success: false,
        message: "This Bank already exists",
      });
    }

    const data = await bankModel.create({
      admin:userId,
      name,
      ifscCode,
      accountNumber,
      openingBalance,
      drCr,
    });


    return res.status(201).send({
      success: true,
      message: "Bank Create successful",
      data,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};



export const manageBankController = async (req, res) => {
  try {
    const _id= req.params._id;
    const data = await bankModel.find({admin:_id});
    if (data && data.length > 0) {
      return res
        .status(200)
        .send({ success: true, message: "Data found", data });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
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

export const manageSingleBankController = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await bankModel.find({ _id });
    if (data && data.length > 0) {
      return res
        .status(200)
        .send({ success: true, message: "Data found", data });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
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

export const deleteBankController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await bankModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "Bank not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Bank deleted successfully",
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

export const updateBankController = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;


    const Bank = await bankModel.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    // console.log(Bank)

    if (!Bank) {
      return res.status(404).send({
        success: false,
        message: "Bank not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Bank updated successfully",
      data: Bank,
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
