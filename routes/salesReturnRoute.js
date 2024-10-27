import express, { request } from "express";
import {
  createReturnController,
  deletReturnByIDController,
  getAllReturnByIdController,
  getAllReturnCOntroller,
  updateReturnByIDController,
} from "../controllers/salesReturnController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createsalesreturn",requireSignIn, createReturnController);
router.get("/getAllreturn/:_id",requireSignIn, getAllReturnCOntroller);
router.get("/getAllreturnById/:_id",requireSignIn,isAdmin, getAllReturnByIdController);
router.put("/updatereturn/:_id",requireSignIn,isAdmin, updateReturnByIDController);
router.delete("/deletereturn/:_id",requireSignIn,isAdmin, deletReturnByIDController);

export default router;
