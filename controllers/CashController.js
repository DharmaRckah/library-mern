import cashModel from "../models/cashModel.js";

export const createCashController = async (req, res) => {
  try {
    const {
      name,
      drCr,
      openingBalance,
      userId,
    } = req.body;


    const data = await cashModel.create({
      admin:userId,
      name,
      drCr,
      openingBalance,
    });
    return res.status(201).send({
      success: true,
      message: "Cash Create successful",
      data,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export const manageCashController = async (req, res) => {
  try {
    const _id  = req.params._id;
    const data = await cashModel.find({admin:_id});
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
export const manageSingleCashController = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await cashModel.find({ _id });
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
export const deleteCashController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await cashModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "Cash not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Cash deleted successfully",
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
export const updateCashController = async (req, res) => {
  try {
    const { _id } = req.params; 
    const updateData = req.body;

    // const requiredFields = [
    //   "name",
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

   
    const Cash = await cashModel.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    // console.log(Cash)

    if (!Cash) {
      return res.status(404).send({
        success: false,
        message: "Cash not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Cash updated successfully",
      data: Cash,
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
