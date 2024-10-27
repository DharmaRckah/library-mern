import inventroySubBrandModel from "../models/inventroySubBrandModel.js";

export const createInventorySubBrandController = async (req, res) => {
  try {
    const { BrandName, SubBrandName ,manufacturerName,userId } = req.body;

    const requiredFields = ["BrandName", "SubBrandName" ,"manufacturerName"];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const response = await inventroySubBrandModel.create({
      BrandName,
      SubBrandName,
      manufacturerName,
      admin:userId
    });

    if (response) {
      return res.status(201).send({
        success: true,
        message: "SubBrand Created Successfully",
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
export const manageInventorySubBrandController = async (req, res) => {
  try {
    const _id = req.params._id;

    const data = await inventroySubBrandModel.find({admin:_id});
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
export const deleteInventorySubBrandController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await inventroySubBrandModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "SubBrand not found" });
    }

    return res.status(200).send({
      success: true,
      message: "SubBrand deleted successfully",
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
export const updateInventorySubBrandController = async (req, res) => {
  try {
    const { _id } = req.params;
    const { BrandName, SubBrandName ,manufacturerName} = req.body;

    const requiredFields = ["BrandName", "SubBrandName" ,"manufacturerName"];
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const SubBrand = await inventroySubBrandModel.findByIdAndUpdate(
      _id,
      { BrandName, SubBrandName ,manufacturerName},
      {
        new: true,
      }
    );

    if (!SubBrand) {
      return res.status(404).send({
        success: false,
        message: "SubBrand not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "SubBrand updated successfully",
      data: SubBrand,
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
