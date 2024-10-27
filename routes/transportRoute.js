import express from "express"
import { createtranspoterController, deletetranspoterController, manageSingletranspoterController, managetranspoterController, updatetranspoterController } from "../controllers/transpoterController.js";

const router = express.Router();

router.post("/createTransport",createtranspoterController);
router.get("/manageTransport",managetranspoterController)
router.get("/manageSingleTransport/:_id",manageSingletranspoterController)
router.delete("/deleteTransport/:_id", deletetranspoterController);
router.put("/updateTransport/:_id", updatetranspoterController);
export default router;
