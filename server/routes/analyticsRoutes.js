import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  monthlySales,
  yearlySales,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/monthly", protect, monthlySales);
router.get("/yearly", protect, yearlySales);

export default router;
