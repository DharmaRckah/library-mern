import express from "express";
import formidable from "express-formidable";

import {  requireSignIn } from "../middleware/authMiddleware.js";
import { createnoticeController, deletenoticeController, managenoticeController, updatenoticeController } from "../controllers/noticeController.js";
const router = express.Router();

router.post("/createnotice",requireSignIn,createnoticeController);
router.get("/managenotice/:_id",requireSignIn, managenoticeController);
router.delete("/deletenotice/:_id",requireSignIn, deletenoticeController);
router.put("/updatenotice/:id",requireSignIn, updatenoticeController);

export default router;