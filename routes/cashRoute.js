import express from "express"
import { createCashController, deleteCashController, manageCashController, manageSingleCashController, updateCashController } from "../controllers/CashController.js";

const router = express.Router();

router.post("/createCash",createCashController);
router.get("/manageCash/:_id",manageCashController)
router.get("/manageSingleCash/:_id",manageSingleCashController)
router.delete("/deleteCash/:_id", deleteCashController);
router.put("/updateCash/:_id", updateCashController);
export default router;