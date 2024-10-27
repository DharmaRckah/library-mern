import express from "express";


import { requireSignIn } from "../middleware/authMiddleware.js";
import { createAuthorController, deleteAuthorController, manageAuthorController, updateAuthorController } from "../controllers/autherController.js";

const router = express.Router();
router.post(
  "/createauther",
  requireSignIn,
  createAuthorController
);
router.get(
  "/getauther/:_id",
  requireSignIn,
  manageAuthorController
);
router.delete(
  "/deleteauther/:_id",
  requireSignIn,
  deleteAuthorController
);
router.put(
  "/updtaeauther/:_id",
  requireSignIn,
  updateAuthorController
);
export default router;
