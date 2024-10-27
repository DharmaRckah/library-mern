import express from "express";
import formidable from "express-formidable";
import {
  createProductController,
  deleteProductController,
  manageProductController,
  updateProductController,
} from "../controllers/productController.js";
import {  requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createproduct",requireSignIn,createProductController);
router.get("/manageproduct/:_id",requireSignIn, manageProductController);
router.delete("/deleteproduct/:_id",requireSignIn, deleteProductController);
router.put("/updateproduct/:id",requireSignIn, updateProductController);

export default router;
