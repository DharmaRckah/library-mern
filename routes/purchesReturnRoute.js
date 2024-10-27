import express from "express";

import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createPurchaseReturnController, deletePurchaseReturnByIdController, getAllPurchaseReturnController, getPurchaseReturnByIdController, updatePurchaseReturnByIdController } from "../controllers/purchesReturnController.js";


const router = express.Router();

router.post("/createpurchasereturn",requireSignIn, createPurchaseReturnController);
router.get("/getAllpurchasereturn/:_id",requireSignIn, getAllPurchaseReturnController);
router.get("/getAllpurchasereturnById/:_id",requireSignIn, getPurchaseReturnByIdController);
router.put("/updatepurchasereturn/:_id",requireSignIn, updatePurchaseReturnByIdController);
router.delete("/deletepurchasereturn/:_id",requireSignIn,deletePurchaseReturnByIdController);

export default router;