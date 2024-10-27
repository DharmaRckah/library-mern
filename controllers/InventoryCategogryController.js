import InventoryCategoryModel from "../models/InventoryCategoryModel.js";

export const createInventoryCategoryController = async (req, res) => {
  try {
    const { CategoryName,userId } = req.body;

    const requiredFields = ["CategoryName","userId"];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const response = await InventoryCategoryModel.create({
      CategoryName,
      admin:userId,
    });

    if (response) {
      return res.status(201).send({
        success: true,
        message: "Category Created Successfully",
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
export const manageInventoryCategoryController = async (req, res) => {
  try {
       const _id= req.params._id;
    const data = await InventoryCategoryModel.find({admin:_id});
   
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
export const deleteInventoryCategoryController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await InventoryCategoryModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "Category not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Category deleted successfully",
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
export const updateInventoryCategoryController = async (req, res) => {
  try {
    const { _id } = req.params;
    const CategoryData = req.body;
    //   console.log(CategoryData)
    const requiredFields = [
        "CategoryName"
    ];
    const missingFields = requiredFields.filter(
      (field) => !(field in CategoryData)
    );

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const Category = await InventoryCategoryModel.findByIdAndUpdate(_id, CategoryData, {
      new: true,
    });
    // console.log(Category)

    if (!Category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Category updated successfully",
      data: Category,
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
