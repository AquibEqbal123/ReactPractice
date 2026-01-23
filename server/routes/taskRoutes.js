import express from "express";
import {
  getAdminTasks,
  createTask,
  deleteTask,
  getEmployeeTasks,
  acceptTask,
  completeTask,
} from "../controllers/taskController.js";

const router = express.Router();

/* ADMIN */
router.get("/admin", getAdminTasks);
router.post("/", createTask);
router.delete("/:id", deleteTask);

/* EMPLOYEE */
router.get("/employee/:employeeId", getEmployeeTasks);
router.put("/:id/accept", acceptTask);
router.put("/:id/complete", completeTask);

export default router;
