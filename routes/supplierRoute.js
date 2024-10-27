import express from "express"
import { createSupplierController, deleteSupplierController, manageSingleSupplierController, manageSupplierController, updateSupplierController } from "../controllers/supplierController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createSupplier",requireSignIn,createSupplierController);
router.get("/manageSupplier/:_id",requireSignIn,manageSupplierController)
router.get("/manageSingleSupplier/:_id",requireSignIn,manageSingleSupplierController)
router.delete("/deletesupplier/:_id",requireSignIn, deleteSupplierController);
router.put("/updateSupplier/:_id",requireSignIn, updateSupplierController);
export default router;
