import express from "express";
import {
  createSale,
  getSales,
  updateSale,
  deleteSale
} from "../controllers/salesController.js";

const router = express.Router();

router.get("/", getSales);
router.post("/", createSale);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

export default router;

