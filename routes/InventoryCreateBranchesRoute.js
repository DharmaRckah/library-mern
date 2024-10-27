import express from "express"

import { createInventoryCreateBranchesController, deleteInventoryCreateBranchesController, manageInventoryCreateBranchesController, updateInventoryCreateBranchesController } from "../controllers/InventoryCreateBranchesController.js";
const router = express.Router();
router.post("/createBranches",createInventoryCreateBranchesController)
router.get("/getBranches",manageInventoryCreateBranchesController)
router.delete("/deleteBranch/:_id",deleteInventoryCreateBranchesController)
router.put("/updtaeBranch/:_id",updateInventoryCreateBranchesController)
export default router;