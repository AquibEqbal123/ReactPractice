import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";

import Department from "../models/Department.js";

/* ================= GET ALL ================= */
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("department", "name") // 🔥 THIS LINE
      .sort({ createdAt: -1 });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= CREATE ================= */
export const createEmployee = async (req, res) => {
  try {
    const emailNormalized = req.body.email.trim().toLowerCase();
    const passwordNormalized = req.body.password.trim(); // 🔥 THIS WAS MISSING

    const hashedPassword = await bcrypt.hash(passwordNormalized, 10);

    const employee = await Employee.create({
      ...req.body,
      email: emailNormalized,
      password: hashedPassword,
    });



    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



/* ================= UPDATE ================= */
export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Update employee error:", error);
    res.status(400).json({ message: error.message });
  }
};


/* ================= DELETE ================= */
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





