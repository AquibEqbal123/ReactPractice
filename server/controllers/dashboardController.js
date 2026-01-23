// Dashboard Header (logged in user)
export const getMyProfile = async (req, res) => {
  res.status(200).json({
    name: "Employee User",
    role: "employee"
  });
};

// Stats Cards
export const getStats = async (req, res) => {
  res.status(200).json({
    totalSales: 125,
    totalOrders: 78,
    totalRevenue: 56000,
    totalCustomers: 42
  });
};

// Charts data
export const getChartsData = async (req, res) => {
  res.status(200).json({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    sales: [12, 19, 8, 15, 22, 30, 25]
  });
};

// Recent Sales Table
export const getRecentSales = async (req, res) => {
  res.status(200).json([
    { id: 1, customer: "Ayan", amount: 1200, status: "Completed" },
    { id: 2, customer: "Rahul", amount: 900, status: "Pending" },
    { id: 3, customer: "Sana", amount: 1500, status: "Completed" }
  ]);
};
