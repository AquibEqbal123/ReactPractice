import express from "express";
import {
  getDepartments,
  createDepartment,
  deleteDepartment,
  updateDepartment,
  getDepartmentEmployees
} from "../controllers/departmentController.js";


const router = express.Router();

router.get("/", getDepartments);
router.post("/", createDepartment);

// 🔥 DELETE ROUTE (THIS FIXES 404)
router.delete("/:id", deleteDepartment);

// employees popup
// router.get("/:id/employees", getEmployees);

router.put("/:id", updateDepartment); 
router.get("/:id/employees", getDepartmentEmployees);


export default router;
