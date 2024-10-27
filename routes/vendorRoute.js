import express from "express"
import { createvendorController, deletevendorController, manageSinglevendorController, managevendorController, updatevendorController } from "../controllers/vendorController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createVendor",requireSignIn,createvendorController);
router.get("/manageVendor/:_id",requireSignIn,managevendorController)
router.get("/manageSingleVendor/:_id",requireSignIn,manageSinglevendorController)
router.delete("/deleteVendor/:_id",requireSignIn, deletevendorController);
router.put("/updateVendor/:_id",requireSignIn, updatevendorController);
export default router;
