import  express from "express";
import {contactCreateController, contactListController} from "../controllers/demoContact/demoController.js"
import { isAdmin, isSuperAdmin, requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/create",contactCreateController)
router.get("/allList",requireSignIn,isSuperAdmin,contactListController)
export default router;
