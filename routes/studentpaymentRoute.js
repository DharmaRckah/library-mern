import express from "express";
import formidable from "express-formidable";

import {  requireSignIn } from "../middleware/authMiddleware.js";
import { createStudentPaymentController, deleteStudentPaymentController, manageStudentByStffIdPaymentController, manageStudentPaymentController, updateStudentPaymentController } from "../controllers/studentPaymetController.js";

const router = express.Router();

router.post("/createStudentPayment",requireSignIn,createStudentPaymentController);
router.get("/manageStudentPayment/:_id",requireSignIn, manageStudentPaymentController);
router.get("/manageStudentbystaffIdPayment/:_id",requireSignIn, manageStudentByStffIdPaymentController);
router.delete("/deleteStudentPayment/:_id",requireSignIn, deleteStudentPaymentController);
router.put("/updateStudentPayment/:id",requireSignIn, updateStudentPaymentController);

export default router;