import InventoryBrandModel from "../models/InventroyBrandModel.js";

export const createInventoryBrandController = async (req, res) => {
  try {
    const { BrandName,manufacturerName ,userId} = req.body;

    const requiredFields = ["BrandName"];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const response = await InventoryBrandModel.create({
      BrandName,manufacturerName,admin:userId
    });

    if (response) {
      return res.status(201).send({
        success: true,
        message: "Brand Created Successfully",
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
export const manageInventoryBrandController = async (req, res) => {
  try {
    const _id=req.params._id;
    const data = await InventoryBrandModel.find({admin:_id});
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
export const deleteInventoryBrandController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await InventoryBrandModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "Brand not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Brand deleted successfully",
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
export const updateInventoryBrandController = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id,"fjkd")
    const { BrandName, manufacturerName } = req.body;

    // Check for missing required fields
    if (!BrandName || !manufacturerName) {
      return res.status(400).send({
        success: false,
        message: "Required fields are missing",
        missingFields: !BrandName ? "BrandName" : "manufacturerName",
      });
    }

    // Find and update the brand
    const updatedBrand = await InventoryBrandModel.findByIdAndUpdate(
      _id,
      { BrandName, manufacturerName },
      { new: true }
    );

    if (!updatedBrand) {
      return res.status(404).send({
        success: false,
        message: "Brand not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Brand updated successfully",
      data: updatedBrand,
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

  
