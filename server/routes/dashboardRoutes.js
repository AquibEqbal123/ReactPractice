import express from "express";
import {
  getMyProfile,
  getStats,
  getChartsData,
  getRecentSales
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/me", protect, getMyProfile);
router.get("/stats", protect, getStats);
router.get("/charts", protect, getChartsData);
router.get("/recent-sales", protect, getRecentSales);

export default router;
