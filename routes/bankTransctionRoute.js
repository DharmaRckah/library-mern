import express from "express"
import { CashDepositeIntoBankController, CashWithdrawfromBankController, bankToBankTransferController, getBankToBankTransferById, getCashDepositIntoBankById, getCashWithdrawFromBankById } from "../controllers/bankTransactionController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();
 
router.post("/banktoBankTransfer",requireSignIn,bankToBankTransferController)
router.post("/CashDepositeIntoBank",requireSignIn,CashDepositeIntoBankController)
router.post("/CashWithdrawfromBank",requireSignIn,CashWithdrawfromBankController)

router.get("/getbanktoBankTransfer/:_id",requireSignIn,getBankToBankTransferById)
router.get("/getCashDepositeIntoBank/:_id",requireSignIn,getCashDepositIntoBankById)
router.get("/getCashWithdrawfromBank/:_id",requireSignIn,getCashWithdrawFromBankById)

export  default router;