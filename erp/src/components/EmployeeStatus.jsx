import React from "react";

const employees = [
  {
    name: "Brett Johnson",
    role: "UI Designer",
    type: "Regular",
    time: "9:18 AM",
    status: "late",
    img: "",
  },
  {
    name: "Brett Johnson",
    role: "Software Engineer",
    type: "Regular",
    time: "9:15 AM",
    status: "late",
    img: "",
  },
  {
    name: "Rhodes Peter",
    role: "Project Manager",
    type: "Regular",
    time: "9:05 AM",
    status: "late",
    img: "",
  },
  {
    name: "Jeff Jane",
    role: "HR Head",
    type: "Regular",
    time: "9:00 AM",
    status: "ontime",
    img: "",
  },
  {
    name: "Emily Butler",
    role: "Data Scientist",
    type: "Vendor",
    time: "8:55 AM",
    status: "ontime",
    img: "",
  },
];

export default function EmployeeStatus() {
  return (
    <div className="w-90 bg-white rounded-2xl shadow-md p-4 space-y-4">

      {/* Header */}
      <div className="flex justify-between items-center text-sm font-medium">
        <p>Select Department</p>
        <span>▼</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 text-sm border-b">
        <p className="border-b-2 border-blue-500 pb-2 font-semibold">
          Logged in (110)
        </p>
        <p className="text-gray-400">On Time (80)</p>
        <p className="text-gray-400">Late (30)</p>
      </div>

      {/* Search */}
      <div className="flex items-center border rounded-lg px-3 py-2 text-sm">
        <input
          placeholder="Search employees"
          className="flex-1 outline-none"
        />
        🔍
      </div>

      <p className="text-blue-500 text-sm cursor-pointer">
        View all employees
      </p>

      {/* Employee List */}
      <div className="space-y-4">
        {employees.map((emp, i) => (
          <div key={i} className="flex justify-between items-center">

            <div className="flex items-center gap-3">
              <img
                src={emp.img}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <p className="font-semibold text-sm">{emp.name}</p>
                <p className="text-xs text-gray-400">
                  {emp.role} | {emp.type}
                </p>
                <p className="text-xs text-gray-400">
                  Login - {emp.time}
                </p>
                <p className="text-xs text-gray-300">Logout -</p>
              </div>
            </div>

            <span
              className={`w-3 h-3 rounded-full ${
                emp.status === "late"
                  ? "bg-sky-400"
                  : "bg-indigo-500"
              }`}
            ></span>

          </div>
        ))}
      </div>
    </div>
  );
}
