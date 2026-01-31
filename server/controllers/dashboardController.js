import Employee from "../models/Employee.js";
import Sale from "../models/Sale.js";
import Inventory from "../models/Inventory.js"; // ✅ ADD
import Department from "../models/Department.js";


/* ================= DASHBOARD HEADER ================= */
export const getMyProfile = async (req, res) => {
  res.status(200).json({
    name: "Employee User",
    role: "employee",
  });
};

/* ================= STATS CARDS (REAL DATA) ================= */
export const getStats = async (req, res) => {
  try {
    // ✅ Total Employees
    const totalEmployees = await Employee.countDocuments();

    // ✅ Total Revenue
    const revenueResult = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

      const totalDepartments = await Department.countDocuments();

    // ✅ TOTAL STOCK FROM INVENTORY (ADD ONLY)
    const stockResult = await Inventory.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$stock" },
        },
      },
    ]);

    const totalStock =
      stockResult.length > 0 ? stockResult[0].totalStock : 0;

    res.status(200).json({
      totalEmployees,
      totalRevenue,
      totalDepartments, 
      totalStock, // ✅ ADDED
    });
  } catch (error) {
    console.error("GET STATS ERROR:", error.message);
    res.status(500).json({
      message: "Dashboard stats failed",
    });
  }
};

/* ================= CHARTS (DO NOT TOUCH) ================= */
export const getChartsData = async (req, res) => {
  res.status(200).json({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    sales: [12, 19, 8, 15, 22, 30, 25],
  });
};

/* ================= RECENT SALES (DO NOT TOUCH) ================= */
export const getRecentSales = async (req, res) => {
  res.status(200).json([
    { id: 1, customer: "Ayan", amount: 1200, status: "Completed" },
    { id: 2, customer: "Rahul", amount: 900, status: "Pending" },
    { id: 3, customer: "Sana", amount: 1500, status: "Completed" },
  ]);
};
