import express from "express";
import {
  createChallanController,
  deletChallanByIDController,
  getAllChallanByIdController,
  getAllChallanCOntroller,
  updateChallanByIDController,
} from "../controllers/deliveryChallanController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createchallan",requireSignIn, createChallanController);
router.get("/getAllchallan/:_id",requireSignIn, getAllChallanCOntroller);
router.get("/getchallanById/:_id",requireSignIn, getAllChallanByIdController);
router.put("/updatechallan/:_id",requireSignIn, updateChallanByIDController);
router.delete("/deletechallan/:_id",requireSignIn, deletChallanByIDController);
export default router;
