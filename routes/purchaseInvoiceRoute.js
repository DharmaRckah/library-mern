import express from "express";

import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createPurchaseInvoiceController, deletePurchaseInvoiceByIdController, getAllPurchaseByNameInvoiceController, getAllPurchaseInvoiceController, getPurchaseInvoiceByIdController, updatePurchaseInvoiceByIdController } from "../controllers/purchesInvoiceController.js";

const router = express.Router();

router.post("/createpurchaseinvoice",requireSignIn, createPurchaseInvoiceController);
router.get("/getAllpurchaseinvoice/:_id",requireSignIn, getAllPurchaseInvoiceController);
router.get("/getAllpurchaseinvoiceById/:_id",requireSignIn, getPurchaseInvoiceByIdController);
router.put("/updatepurchaseinvoice/:_id",requireSignIn, updatePurchaseInvoiceByIdController);
router.delete("/deletepurchaseinvoice/:_id",requireSignIn,deletePurchaseInvoiceByIdController );

router.get('/purchaseinvoicesByName/:supplierName', getAllPurchaseByNameInvoiceController);

export default router;
