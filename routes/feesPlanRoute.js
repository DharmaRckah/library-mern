import express from "express";
import formidable from "express-formidable";

import {  requireSignIn } from "../middleware/authMiddleware.js";
import { createFeesPlanController, deleteFeesPlanController, manageFeesPlanController, updateFeesPlanController } from "../controllers/fessPlanController.js";

const router = express.Router();

router.post("/createFeesPlan",requireSignIn,createFeesPlanController);
router.get("/manageFeesPlan/:_id",requireSignIn, manageFeesPlanController);
router.delete("/deleteFeesPlan/:_id",requireSignIn, deleteFeesPlanController);
router.put("/updateFeesPlan/:id",requireSignIn, updateFeesPlanController);

export default router;