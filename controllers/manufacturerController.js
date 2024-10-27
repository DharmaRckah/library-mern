import manufacturerModel from "../models/manufacturerModel.js";

export const createManufacturerController = async (req, res) => {
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
    const old = await manufacturerModel.findOne({ email });
    if (old) {
      return res.status(400).send({
        success: false,
        message: "This manufacturer already exists",
      });
    }
    const data = await manufacturerModel.create({
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
     admin: userId,
    });
    return res.status(201).send({
      success: true,
      message: "manufacturer Create successful",
      data,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
export const managemanufacturerController = async (req, res) => {
  try {

    
    const _id = req.params._id;
    const data = await manufacturerModel.find({admin:_id});
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
export const manageSinglemanufacturerController = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await manufacturerModel.find({ _id });
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
export const deletemanufacturerController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await manufacturerModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "manufacturer not found" });
    }

    return res.status(200).send({
      success: true,
      message: "manufacturer deleted successfully",
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
export const updatemanufacturerController = async (req, res) => {
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
    //   "itemCategories",
    //   "discountPercentage",
    //   "discountAmount",
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

    const manufacturer = await manufacturerModel.findByIdAndUpdate(
      _id,
      updateData,
      {
        new: true,
      }
    );
    // console.log(manufacturer)

    if (!manufacturer) {
      return res.status(404).send({
        success: false,
        message: "manufacturer not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "manufacturer updated successfully",
      data: manufacturer,
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
