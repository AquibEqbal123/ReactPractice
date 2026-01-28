import express from "express";
import { getProfile, saveProfile } from "../controllers/profileController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * EMPLOYEE — view/update own profile
 */

// Get own profile
router.get(
  "/me",
  authMiddleware,
  roleMiddleware("employee"),
  getProfile
);

// Update own profile
router.post(
  "/me",
  authMiddleware,
  roleMiddleware("employee"),
  saveProfile
);

/**
 * ADMIN — view/update any employee profile
 */

// Admin get employee profile
router.get(
  "/:employeeId",
  authMiddleware,
  roleMiddleware("admin"),
  getProfile
);

// Admin update employee profile
router.post(
  "/:employeeId",
  authMiddleware,
  roleMiddleware("admin"),
  saveProfile
);

export default router;
