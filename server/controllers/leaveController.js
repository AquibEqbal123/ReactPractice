import LeaveRequest from "../models/LeaveRequest.js";

/* ================= APPLY LEAVE (EMPLOYEE) ================= */
export const applyLeave = async (req, res) => {
  try {
    const { employeeId, employeeName, type, from, to, reason } = req.body;

    // ✅ VALIDATION
    if (!employeeId || !employeeName || !type || !from || !to || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (new Date(from) > new Date(to)) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    const leave = await LeaveRequest.create({
      employeeId,
      employeeName,
      type,
      from,
      to,
      reason,
    });

    res.status(201).json(leave);
  } catch (error) {
    console.error("Apply leave error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET LEAVES BY EMPLOYEE ================= */
export const getEmployeeLeaves = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const leaves = await LeaveRequest.find({ employeeId }).sort({
      createdAt: -1,
    });

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
