import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", protect, getItems);
router.post("/", protect, createItem);
router.put("/:id", protect, updateItem);
router.delete("/:id", protect, deleteItem);

export default router;
