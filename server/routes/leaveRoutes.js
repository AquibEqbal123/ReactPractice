import express from "express";
import {
  applyLeave,
  getEmployeeLeaves,
  getAllLeaves,
  updateLeaveStatus,
} from "../controllers/leaveController.js";

const router = express.Router();

// ✅ EMPLOYEE
router.post("/", applyLeave);
router.get("/employee/:employeeId", getEmployeeLeaves);

// ✅ ADMIN
router.get("/", getAllLeaves);
router.patch("/:id", updateLeaveStatus);

export default router;
