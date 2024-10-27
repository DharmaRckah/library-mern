import supplierModel from "../models/supplierModel.js";
import fs from "fs";

export const createSupplierController = async (req, res) => {
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
      bankName,
      bankAddress,
      ifscCode,
      accountHolderName,
      accountNumber,
      registrationType,
      gstin,
      openingBalance,
      userId,
    } = req.body;
    const requiredFields = [
      "name",
      "address",
      "state",
      "country",
      "pinCode",
      "contact",
      "bankName",
      "ifscCode",
      "accountHolderName",
      "accountNumber",
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
    const old = await supplierModel.findOne({ email });
    if (old) {
      return res.status(400).send({
        success: false,
        message: "This supplier already exists",
      });
    }
    const data = await supplierModel.create({
      name,
      address,
      state,
      country,
      pinCode,
      contact,
      email,
      website,
      bankName,
      bankAddress,
      ifscCode,
      accountHolderName,
      accountNumber,
      registrationType,
      gstin,
      openingBalance,
      Admin:userId,
    });
    return res.status(201).send({
      success: true,
      message: "Supplier Create successful",
      data,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
export const manageSupplierController = async (req, res) => {

  try {
    const data = await supplierModel.find({Admin:req.params});
   
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
export const manageSingleSupplierController = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await supplierModel.find({ _id });
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
export const deleteSupplierController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await supplierModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "Supplier not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Supplier deleted successfully",
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

export const updateSupplierController = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;
    const requiredFields = [
      "name",
      "address",
      "state",
      "country",
      "pinCode",
      "contact",
      "bankName",
      "ifscCode",
      "accountHolderName",
      "accountNumber",
      "registrationType",
      "openingBalance",
    ];
    const missingFields = requiredFields.filter(
      (field) => !(field in updateData)
    );

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const supplier = await supplierModel.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    console.log(supplier);

    if (!supplier) {
      return res.status(404).send({
        success: false,
        message: "Supplier not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Supplier updated successfully",
      data: supplier,
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
