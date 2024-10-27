import express from "express";
import {
  createPurchesOrderController,
  deletePurchesOrderByIdController,
  getAllPurchesOrderByIdController,
  getAllPurchesOrderController,
  updatePurchesOrderByIdController,
} from "../controllers/purchesOrderController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createpurchesorder",requireSignIn, createPurchesOrderController);
router.get("/getAllpurchesorder/:_id",requireSignIn, getAllPurchesOrderController);
router.get("/getAllpurchesorderById/:_id",requireSignIn, getAllPurchesOrderByIdController);
router.put("/updatepurchesorder/:_id", requireSignIn,updatePurchesOrderByIdController);
router.delete("/deletepurchesorder/:_id", requireSignIn,deletePurchesOrderByIdController);

export default router;
