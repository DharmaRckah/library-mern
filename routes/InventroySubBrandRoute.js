import express from "express"
import { createInventorySubBrandController, deleteInventorySubBrandController, manageInventorySubBrandController, updateInventorySubBrandController } from "../controllers/InventroySubBrandontroller.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/createSubBrand",requireSignIn,createInventorySubBrandController)
router.get("/getSubBrand/:_id",requireSignIn,manageInventorySubBrandController)
router.delete("/deleteSubBrand/:_id",requireSignIn,deleteInventorySubBrandController)
router.put("/updtaeSubBrand/:_id",requireSignIn,updateInventorySubBrandController)
export default router;