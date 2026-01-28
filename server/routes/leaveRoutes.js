import express from "express";
import {
  applyLeave,
  getEmployeeLeaves,
  getAllLeaves,
  updateLeaveStatus,
} from "../controllers/leaveController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * EMPLOYEE ROUTES
 */

// Apply leave (employee only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("employee"),
  applyLeave
);

// Get own leaves (employee only)
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("employee"),
  getEmployeeLeaves
);

/**
 * ADMIN ROUTES
 */

// Get all leaves
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAllLeaves
);

// Approve / reject leave
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateLeaveStatus
);

export default router;
