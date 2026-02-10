import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import ModernCalendar from "../../components/ModernCalendar";
import EmployeeStatus from "../../components/EmployeeStatus";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";



const chartData = [
    { day: "Mon", ontime: 75, late: 30 },
    { day: "Tue", ontime: 105, late: 20 },
    { day: "Wed", ontime: 90, late: 15 },
    { day: "Thu", ontime: 110, late: 10 },
    { day: "Fri", ontime: 85, late: 28 },
];

export default function AttendanceDashboard() {
    const [departments, setDepartments] = useState([]);

    // Fetch departments on mount
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await axiosInstance.get("/departments");
                setDepartments(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchDepartments();
    }, []);


    // For employee list in backlog
    const [employees, setEmployees] = useState([]);

    // Fetch employees on mount
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await axiosInstance.get("/attendance/active");
                setEmployees(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchEmployees();
    }, []);






    return (
        <div className="bg-gray-50 min-h-screen p-6 grid grid-cols-12 gap-6">

            <div className="text-xl mb-7 font-semibold col-span-12">
                <h2>Attendance (Admin)</h2>
            </div>

            <h2 className="text-2xl">Department</h2>
            <div className="flex space-y-4 mb-5 font-semibold col-span-12 gap-5 flex-wrap">
                {departments.map(dep => (
                    <div key={dep._id} className="bg-white p-4 rounded-xl shadow h-30 w-67">
                        <h3 className="font-semibold">{dep.name}</h3>
                        <p className="text-2xl font-bold mt-1">
                            {dep.totalEmployees || 0}
                        </p>
                        <p className="text-sm text-gray-500">
                            On-time {dep.onTime || 0} | Late {dep.late || 0}
                        </p>
                    </div>
                ))}
            </div>


            {/* LEFT SIDE */}
            <div className="col-span-7 space-y-6">

                {/* 📊 Chart */}
                <div className="bg-white rounded-xl p-6 shadow h-80">
                    <h2 className="font-semibold mb-4">Attendance Status</h2>

                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="ontime" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                            <Bar dataKey="late" fill="#38BDF8" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* 📅 Calendar BELOW chart */}
                <div className=" flex bg-white rounded-xl p-4 shadow w-fit gap-6">
                    <ModernCalendar />
                    <div className="bg-white rounded-xl p-6 shadow w-90">
                        <h3 className="font-semibold mb-3">Backlog</h3>

                        <table className="w-full text-sm ">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2 text-left">Name</th>
                                    <th className="p-2">Days</th>
                                    <th className="p-2">Pending hrs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {["Andric Ivo", "Barry May", "Christie Dave"].map(n => (
                                    <tr key={n} className="">
                                        <td className="p-2">{n}</td>
                                        <td className="p-2 text-center">5</td>
                                        <td className="p-2 text-center">1h 30m</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <div className="col-span-3 ml-10">
                <EmployeeStatus employees={employees} />
            </div>

        </div>
    );
}
