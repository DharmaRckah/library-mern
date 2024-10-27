import customerModel from "../models/customersModel.js";
import fs from "fs";

export const createCustomerController = async (req, res) => {
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
      asOnDate,
      userId,
    } = req.body;
    // const requiredFields = [
    //   "name",
    //   "address",
    //   "state",
    //   "country",
    //   "pinCode",
    //   "contact",
    //   "bankName",
    //   "ifscCode",
    //   "accountHolderName",
    //   "accountNumber",
    //   "registrationType",
    //   "openingBalance",
    //   "userId"
    // ];
    // const missingFields = requiredFields.filter((field) => !req.body[field]);
    // if (missingFields.length > 0) {
    //   return res.status(400).send({
    //     message: "Required fields are missing",
    //     missingFields: missingFields,
    //   });
    // }
    const old = await customerModel.findOne({ email });
    if (old) {
      return res.status(400).send({
        success: false,
        message: "This Customer already exists",
      });
    }
    const data = await customerModel.create({
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
      asOnDate,
      admin:userId,
    });
    return res.status(201).send({
      success: true,
      message: "Customer Create successful",
      data,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
export const manageCustomerController = async (req, res) => {
  try {
    const _id= req.params._id;
    const data = await customerModel.find({admin:_id});
   
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
export const manageSingleCustomerController = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await customerModel.find({ _id });
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
export const deleteCustomerController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await customerModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "Customer not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Customer deleted successfully",
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
export const updateCustomerController = async (req, res) => {
  try {
    const { _id } = req.params; 
    const updateData = req.body;

   
    const Customer = await customerModel.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    // console.log(Customer)

    if (!Customer) {
      return res.status(404).send({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Customer updated successfully",
      data: Customer,
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
