import authorModel from "../models/authorModel.js";

export const createAuthorController = async (req, res) => {
  try {
    const {  autherName, userId } = req.body;

    const requiredFields = [ "autherName", "userId"];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const response = await authorModel.create({
    
      autherName,
      admin: userId,
    });

    if (response) {
      return res.status(201).send({
        success: true,
        message: "Auther Created Successfully",
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
export const manageAuthorController = async (req, res) => {
  try {
    const _id = req.params._id;

    const data = await authorModel.find({ admin: _id });

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
export const deleteAuthorController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await authorModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "Auther not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Auther deleted successfully",
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
export const updateAuthorController = async (req, res) => {
  try {
    const { _id } = req.params;
    const {  autherName } = req.body;

    const requiredFields = [ "autherName"];
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const Auther = await authorModel.findByIdAndUpdate(
      _id,
      {  autherName },
      {
        new: true,
      }
    );

    if (!Auther) {
      return res.status(404).send({
        success: false,
        message: "Auther not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Auther updated successfully",
      data: Auther,
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
