import express from "express";
import {
  createManufacturerController,
  deletemanufacturerController,
  managemanufacturerController,
  manageSinglemanufacturerController,
  updatemanufacturerController,
} from "../controllers/manufacturerController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createManufacturer",requireSignIn, createManufacturerController);
router.get("/manageManufacturer/:_id",requireSignIn,managemanufacturerController);
router.get(
  "/manageSingleManufacturer/:_id",requireSignIn,
  manageSinglemanufacturerController
);
router.delete("/deleteManufacturer/:_id", deletemanufacturerController);
router.put("/updateManufacturer/:_id", updatemanufacturerController);
export default router;
