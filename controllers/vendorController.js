import vendorModel from "../models/vendorModel.js";
import fs from "fs";

export const createvendorController = async (req, res) => {
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
      userId,
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
      "userId",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }
    const old = await vendorModel.findOne({ email });
    if (old) {
      return res.status(400).send({
        success: false,
        message: "This vendor already exists",
      });
    }
    const data = await vendorModel.create({
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
      admin:userId,
    });
    return res.status(201).send({
      success: true,
      message: "vendor Create successful",
      data,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
export const managevendorController = async (req, res) => {
  try {
    const _id=req.params._id;

    const data = await vendorModel.find({admin:_id});
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
export const manageSinglevendorController = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await vendorModel.find({ _id });
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
export const deletevendorController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await vendorModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "vendor not found" });
    }

    return res.status(200).send({
      success: true,
      message: "vendor deleted successfully",
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
export const updatevendorController = async (req, res) => {
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

    const vendor = await vendorModel.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    // console.log(vendor)

    if (!vendor) {
      return res.status(404).send({
        success: false,
        message: "vendor not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "vendor updated successfully",
      data: vendor,
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
