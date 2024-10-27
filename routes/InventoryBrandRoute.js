import express from "express";
import {
  createInventoryBrandController,
  deleteInventoryBrandController,
  manageInventoryBrandController,
  updateInventoryBrandController,
} from "../controllers/InventoryBrandController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/createBrand",requireSignIn, createInventoryBrandController);
router.get("/getBrand/:_id",requireSignIn, manageInventoryBrandController);
router.delete("/deleteBrand/:_id",requireSignIn, deleteInventoryBrandController);
router.put("/updtaeBrand/:_id",requireSignIn, updateInventoryBrandController);
export default router;
