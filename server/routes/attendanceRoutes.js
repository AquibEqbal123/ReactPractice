import express from "express";
import {
  punchIn,
  punchOut,
  getMyAttendance
} from "../controllers/attendanceController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/punch-in", authMiddleware, punchIn);
router.post("/punch-out", authMiddleware, punchOut);
router.get("/my", authMiddleware, getMyAttendance);

export default router;
