import express from "express"
import { getController, registerController, updateController } from "../controllers/companyController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";




const router = express.Router();

router.post("/register",registerController)
router.get("/get/:admin",getController)
router.put("/update/:_id",updateController)


export default router;
