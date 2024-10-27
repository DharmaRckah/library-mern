import express from "express"
import { createBankController, deleteBankController, manageBankController, manageSingleBankController, updateBankController } from "../controllers/bankController.js";
import { requireSignIn } from './../middleware/authMiddleware.js';

const router = express.Router();

router.post("/createBank",requireSignIn,createBankController);
router.get("/manageBank/:_id",requireSignIn,manageBankController)
router.get("/manageSingleBank/:_id",requireSignIn,manageSingleBankController)
router.delete("/deleteBank/:_id",requireSignIn, deleteBankController);
router.put("/updateBank/:_id",requireSignIn, updateBankController);
export default router;


