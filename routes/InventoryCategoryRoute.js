import express from "express"
import { createInventoryCategoryController, deleteInventoryCategoryController, manageInventoryCategoryController, updateInventoryCategoryController } from "../controllers/InventoryCategogryController.js";
import {  requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/createcategory",requireSignIn,createInventoryCategoryController)
router.get("/getcategory/:_id",requireSignIn,manageInventoryCategoryController)
router.delete("/deletecategory/:_id",requireSignIn,deleteInventoryCategoryController)
router.put("/updtaecategory/:_id",requireSignIn,updateInventoryCategoryController)
export default router;
