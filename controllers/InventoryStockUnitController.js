import InventoryStockUnitModel from "../models/InventoryStockUnitModel.js";

export const createInventoryStockUnitController = async (req, res) => {
  try {
    const { unitofquantity, symbol, formalName,userId } = req.body;
    const response = await InventoryStockUnitModel.create({
      unitofquantity,
      symbol,
      formalName,
      admin:userId,
    });

    if (response) {
      return res.status(201).send({
        success: true,
        message: "Stock Unit Created Successfully",
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
export const manageInventoryStockUnitController = async (req, res) => {
  try {
    const _id= req.params._id;
    const data = await InventoryStockUnitModel.find({admin:_id});
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
export const deleteInventoryStockUnitController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await InventoryStockUnitModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "Stock Unit not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Stock Unit deleted successfully",
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
export const updateInventoryStockUnitController = async (req, res) => {
  try {
    const { _id } = req.params;

    const { symbol, formalName, primaryUnit, conversionOf, secondaryUnit } =
      req.body;

    const StockUnit = await InventoryStockUnitModel.findByIdAndUpdate(
      _id,
      { symbol, formalName, primaryUnit, conversionOf, secondaryUnit },
      {
        new: true,
      }
    );

    if (!StockUnit) {
      return res.status(404).send({
        success: false,
        message: "StockUnit not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Stock Unit updated successfully",
      data: StockUnit,
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
