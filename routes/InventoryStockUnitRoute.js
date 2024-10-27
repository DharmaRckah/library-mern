import express from "express";

import {
  createInventoryStockUnitController,
  deleteInventoryStockUnitController,
  manageInventoryStockUnitController,
  updateInventoryStockUnitController,
} from "../controllers/InventoryStockUnitController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/createStockUnit",requireSignIn, createInventoryStockUnitController);
router.get("/getStockUnit/:_id",requireSignIn, manageInventoryStockUnitController);
router.delete("/deleteStockUnit/:_id",requireSignIn, deleteInventoryStockUnitController);
router.put("/updtaeStockUnit/:_id",requireSignIn, updateInventoryStockUnitController);
export default router;
