import express from "express";
import { getProfile, saveProfile } from "../controllers/profileController.js";

const router = express.Router();

// GET PROFILE
router.get("/:employeeId", getProfile);

// CREATE / UPDATE PROFILE
router.post("/", saveProfile);

export default router;
