import express from "express";
import {
  // createSalesController,
  deletSalesQuotationByIDController,
  getAllSalesQuotationCOntroller,
  updateQuotationByIDController,
} from "../controllers/salesController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/getAllSalesQuotation",requireSignIn,isAdmin, getAllSalesQuotationCOntroller);
router.put("/updateSalesQuotation/:_id",requireSignIn,isAdmin, updateQuotationByIDController);
router.delete("/deleteSalesQuotation/:_id",requireSignIn,isAdmin, deletSalesQuotationByIDController);

export default router;
