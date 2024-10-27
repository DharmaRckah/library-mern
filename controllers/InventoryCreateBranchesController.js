import InventoryCreateBranchesModel from "../models/InventoryCreateBranchesModel.js";

export const createInventoryCreateBranchesController = async (req, res) => {
  try {
    const { branchName, branchId, location, address, contact, emailId } =
      req.body;

    const requiredFields = [
      "branchName",
      "branchId",
      "location",
      "address",
      "contact",
      "emailId",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const response = await InventoryCreateBranchesModel.create({
      branchName,
      branchId,
      location,
      address,
      contact,
      emailId,
    });

    if (response) {
      return res.status(201).send({
        success: true,
        message: " Branch Created Successfully",
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
export const manageInventoryCreateBranchesController = async (req, res) => {
  try {
    const data = await InventoryCreateBranchesModel.find();
    if (data && data.length > 0) {
      return res
        .status(200)
        .send({ success: true, message: "Branch Data found", data });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Branch Data not found" });
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
export const deleteInventoryCreateBranchesController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await InventoryCreateBranchesModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: " Branch not found" });
    }

    return res.status(200).send({
      success: true,
      message: " Branch deleted successfully",
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
export const updateInventoryCreateBranchesController = async (req, res) => {
  try {
    const { _id } = req.params;

    const {branchName,branchId,location,address,contact ,emailId } = req.body;

    // const requiredFields = ["branchName","branchId","location","address","contact" ,"emailId"];
    // const missingFields = requiredFields.filter(
    //   (field) => !(field in req.body)
    // );

    // if (missingFields.length > 0) {
    //   return res.status(400).send({
    //     message: "Required fields are missing",
    //     missingFields: missingFields,
    //   });
    // }

    const BranchesData = await InventoryCreateBranchesModel.findByIdAndUpdate(
      _id,
      {branchName,branchId,location,address,contact ,emailId},
      {
        new: true,
      }
    );

    if (!BranchesData) {
      return res.status(404).send({
        success: false,
        message: "Branch not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: " Branch updated successfully",
      data: BranchesData,
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
