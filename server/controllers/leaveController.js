import LeaveRequest from "../models/LeaveRequest.js";
import Employee from "../models/Employee.js";

/* ================= APPLY LEAVE (EMPLOYEE) ================= */
export const applyLeave = async (req, res) => {
  try {
    // 1️⃣ Get employee from JWT
    const employee = await Employee.findOne({ user: req.user.id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const { type, from, to, reason } = req.body;

    // 2️⃣ Validation
    if (!type || !from || !to || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (new Date(from) > new Date(to)) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    // 3️⃣ Create leave
    const leave = await LeaveRequest.create({
      employeeId: employee._id,
      employeeName: employee.name,
      type,
      from,
      to,
      reason,
      status: "Pending",
    });

    res.status(201).json(leave);
  } catch (error) {
    console.error("Apply leave error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET MY LEAVES (EMPLOYEE) ================= */
export const getEmployeeLeaves = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user.id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const leaves = await LeaveRequest.find({
      employeeId: employee._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(leaves);
  } catch (error) {
    console.error("Fetch employee leaves error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= ADMIN: GET ALL LEAVES ================= */
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find().sort({ createdAt: -1 });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= ADMIN: APPROVE / REJECT ================= */
export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, message } = req.body;

    const leave = await LeaveRequest.findByIdAndUpdate(
      id,
      { status, message },
      { new: true }
    );

    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
