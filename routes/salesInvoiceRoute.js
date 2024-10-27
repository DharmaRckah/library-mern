import express from "express";
import {
  createSalesInvoiceController,
  deletSalesInvoiceByIDController,
  getAllSalesByNameInvoiceController,
  getAllSalesInvoiceByIdController,
  getAllSalesInvoiceCOntroller,
  updateSalesInvoiceByIDController,
} from "../controllers/salesInvoiceController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createsalesinvoice",requireSignIn,isAdmin, createSalesInvoiceController);
router.get("/getAllsalesinvoice/:_id",requireSignIn, getAllSalesInvoiceCOntroller);
router.get('/salesinvoicesByName/:customerName', getAllSalesByNameInvoiceController);
router.get("/getAllsalesinvoiceById/:_id",requireSignIn,isAdmin, getAllSalesInvoiceByIdController);
router.put("/updatesalesinvoice/:_id",requireSignIn,isAdmin, updateSalesInvoiceByIDController);
router.delete("/deletesalesinvoice/:_id",requireSignIn,isAdmin, deletSalesInvoiceByIDController);

export default router;
