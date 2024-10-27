import express from "express";
import formidable from "express-formidable";

import {  requireSignIn } from "../middleware/authMiddleware.js";

import { createSpendController, deleteSpendController, manageSpendController, updateSpendController } from "../controllers/spendController.js";

const router = express.Router();
// Create Fees Plan
router.post(
  "/createspends",
  requireSignIn,  createSpendController
);
// Manage Fees Plan
router.get("/managespends/:_id", requireSignIn, manageSpendController);
// Update Fees Plan
router.put(
  "/updatespends/:id",
  requireSignIn,  updateSpendController
);
// Delete Fees Plan
router.delete("/deletespends/:_id", requireSignIn, deleteSpendController);

export default router;
