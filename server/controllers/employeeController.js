import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";

import Department from "../models/Department.js";
import User from "../models/User.js";

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
// export const createEmployee = async (req, res) => {
//   try {
//     const emailNormalized = req.body.email.trim().toLowerCase();
//     const passwordNormalized = req.body.password.trim(); // 🔥 THIS WAS MISSING

//     const hashedPassword = await bcrypt.hash(passwordNormalized, 10);

//     const employee = await Employee.create({
//       ...req.body,
//       email: emailNormalized,
//       password: hashedPassword,
//     });



//     res.status(201).json(employee);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const createEmployee = async (req, res) => {
  try {
    const {
      email,
      password,
      role,
      status,
      ...rest
    } = req.body;

    const emailNormalized = email.trim().toLowerCase();

    // 🔒 Check if login user already exists
    const userExists = await User.findOne({ email: emailNormalized });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    // 👤 CREATE LOGIN USER (FOR AUTH)
    const user = await User.create({
      email: emailNormalized,
      password: hashedPassword,
      role: "employee",
    });

    // 🧾 CREATE EMPLOYEE PROFILE
    const employee = await Employee.create({
      ...rest,
      email: emailNormalized,
      role,
      status,
      user: user._id, // 🔗 link auth user
    });

    res.status(201).json(employee);
  } catch (err) {
    console.error("Create employee error:", err);
    res.status(500).json({ message: "Create employee failed" });
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





