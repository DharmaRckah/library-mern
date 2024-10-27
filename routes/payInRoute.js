import express from "express";

import {
  createPayInController,
  deletePayInByIdController,
  getAllPayInController,
  getPayInByIdController,
  updatePayInByIdController,
} from "../controllers/PayInController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createsalespayin",requireSignIn, createPayInController);
router.get("/getAllpayin/:_id",requireSignIn, getAllPayInController);
router.get("/getAllpayinById/:_id",requireSignIn, getPayInByIdController);
router.put("/updatepayin/:_id",requireSignIn, updatePayInByIdController);
router.delete("/deletepayin/:_id",requireSignIn, deletePayInByIdController);

export default router;
