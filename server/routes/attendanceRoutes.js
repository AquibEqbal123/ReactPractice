import express from "express";
import Attendance from "../models/Attendance.js";

import {
  punchIn,
  punchOut,
  getMyAttendance
} from "../controllers/attendanceController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// ========= EMPLOYEE =========
router.post("/punch-in", authMiddleware, punchIn);
router.post("/punch-out", authMiddleware, punchOut);
router.get("/my", authMiddleware, getMyAttendance);


// ========= ADMIN ACTIVE EMPLOYEES =========
router.get("/active", authMiddleware, async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const records = await Attendance.find({
      date: today,
      punchOut: null
    }).populate("userId", "name avatar department");

    res.json(records);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
