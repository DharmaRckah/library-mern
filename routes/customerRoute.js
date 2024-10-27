import express from "express"
import { createCustomerController, deleteCustomerController, manageCustomerController, manageSingleCustomerController, updateCustomerController } from "../controllers/customerController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createCustomer",requireSignIn,createCustomerController);
router.get("/manageCustomer/:_id",requireSignIn,manageCustomerController)
router.get("/manageSingleCustomer/:_id",requireSignIn,manageSingleCustomerController)
router.delete("/deleteCustomer/:_id",requireSignIn, deleteCustomerController);
router.put("/updateCustomer/:_id",requireSignIn, updateCustomerController);
export default router;
