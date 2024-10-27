import transpoterModel from "../models/transpoterModel.js";
import fs from "fs";

export const createtranspoterController = async (req, res) => {
  try {
    const {
      name,
      address,
      state,
      country,
      pinCode,
      contact,
      email,
      website,
      registrationType,
      gstin,
      openingBalance,
      asOnDate,
    } = req.body;
    const requiredFields = [
      "name",
      "address",
      "state",
      "country",
      "pinCode",
      "contact",
      "registrationType",
      "openingBalance",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }
    const old = await transpoterModel.findOne({ email });
    if (old) {
      return res.status(400).send({
        success: false,
        message: "This transpoter already exists",
      });
    }
    const data = await transpoterModel.create({
      name,
      address,
      state,
      country,
      pinCode,
      contact,
      email,
      website,
      registrationType,
      gstin,
      openingBalance,
      asOnDate,
    });
    return res.status(201).send({
      success: true,
      message: "transpoter Create successful",
      data,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
export const managetranspoterController = async (req, res) => {
  try {
    const data = await transpoterModel.find();
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
export const manageSingletranspoterController = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await transpoterModel.find({ _id });
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
export const deletetranspoterController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await transpoterModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "transpoter not found" });
    }

    return res.status(200).send({
      success: true,
      message: "transpoter deleted successfully",
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
export const updatetranspoterController = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;
    //   console.log(updateData)
    // const requiredFields = [
    //   "name",
    //   "contact",
    //   "address",
    //   "pinCode",
    //   "state",
    //   "country",
    //   "email",
    //   "website",
    //   "registrationType",
    //   "gstIn",
    //   "panNo",
    //   "bankName",
    //   "ifscCode",
    //   "accountNo",
    //   "accountHolder",
    //   "upiId",
    //   "dispatchDocNo",
    //   "dispatchThrough",
    //   "destination",
    //   "billOfLading",
    //   "date",
    //   "vehicaleNo",
    //   "openingBalance",
    //   "drCr",
    // ];
    // const missingFields = requiredFields.filter(
    //   (field) => !(field in updateData)
    // );

    // if (missingFields.length > 0) {
    //   return res.status(400).send({
    //     message: "Required fields are missing",
    //     missingFields: missingFields,
    //   });
    // }

    const transpoter = await transpoterModel.findByIdAndUpdate(
      _id,
      updateData,
      {
        new: true,
      }
    );
    // console.log(transpoter)

    if (!transpoter) {
      return res.status(404).send({
        success: false,
        message: "transpoter not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "transpoter updated successfully",
      data: transpoter,
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
