import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function StatsCards() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/dashboard/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Stats error:", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card title="Total Employees" value={stats.totalSales} />
      <Card title="Orders" value={stats.totalOrders} />
      <Card title="Revenue" value={`₹${stats.totalRevenue}`} />
      <Card title="Customers" value={stats.totalCustomers} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-semibold">{value}</h3>
    </div>
  );
}
