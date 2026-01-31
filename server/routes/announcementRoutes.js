import express from "express";
import {
  createAnnouncement,
  getAllAnnouncements,
  deleteAnnouncement,
} from "../controllers/announcementController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin only
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createAnnouncement
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteAnnouncement
);

// Admin + Employee (future)
router.get(
  "/",
  authMiddleware,
  getAllAnnouncements
);

export default router;
