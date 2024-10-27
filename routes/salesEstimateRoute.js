import express from "express";
import formidable from "express-formidable";

import { createSalesEstimateController, deleteSalesEstimateController, getSalesEstimateByIdController, getSalesEstimatesController, updateSalesEstimateController } from "../controllers/SalesEstimateController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createSalesEstimatet",requireSignIn, createSalesEstimateController);
router.get("/getAllSalesEstimatet/:_id",requireSignIn, getSalesEstimatesController);
router.get("/getAllSalesEstimatetByID/:_id",requireSignIn, getSalesEstimateByIdController);
router.delete("/deleteSalesEstimatetByID/:_id",requireSignIn,  deleteSalesEstimateController);
router.put("/updateSalesEstimatetByID/:_id",requireSignIn,  updateSalesEstimateController);

export default router;