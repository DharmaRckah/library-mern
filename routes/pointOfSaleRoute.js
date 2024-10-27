import express from "express";
import {
  createPOFController,
  deletePOFByIDController,
  getAllPOFByIdController,
  getAllPOFController,
  updatePOFByIDController,
} from "../controllers/pointOfSaleController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createsalespof",requireSignIn,isAdmin, createPOFController);
router.get("/getAllpof",requireSignIn,isAdmin, getAllPOFController);
router.get("/getAllpofById/:_id",requireSignIn,isAdmin, getAllPOFByIdController);
router.put("/updatepof/:_id",requireSignIn,isAdmin, updatePOFByIDController);
router.delete("/deletepof/:_id",requireSignIn,isAdmin, deletePOFByIDController);

export default router;
