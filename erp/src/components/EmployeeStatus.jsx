import React from "react";
import { Search } from "lucide-react";

export default function EmployeeStatus({ employees = [] }) {


  return (
    <div className="w-90 bg-white rounded-2xl shadow-md p-4 space-y-4">

      <div className="flex justify-between items-center text-sm font-medium">
        <p>Select Department</p>
        <span>▼</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 text-sm border-b">
        <p className="border-b-2 border-blue-500 pb-2 font-semibold">
          Working ({employees.length})
        </p>
        <p className="text-gray-400">
          On Time ({employees.filter(e => e.status === "ontime").length})
        </p>
        <p className="text-gray-400">
          Late ({employees.filter(e => e.status === "late").length})
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center border rounded-lg px-3 py-2 text-sm">
        <input
          placeholder="Search employees"
          className="flex-1 outline-none"
        />
        <Search className="text-gray-400" size={16} />
      </div>

      {/* EMPLOYEE LIST WITH SCROLL */}
      <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">

        {employees.length === 0 && (
          <p className="text-gray-400 text-sm">No employees punched in</p>
        )}

        {employees.map(row => {
          const emp = row.userId; // 👈 populate ke baad yahi hoga

          if (!emp) return null;

          return (
            <div key={row._id} className="flex justify-between items-center">

              <div className="flex items-center gap-3">
                {emp.avatar ? (
                  <img src={emp.avatar} className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-sm">
                    {emp.name?.[0]}
                  </div>
                )}

                <div>
                  <p className="font-semibold text-sm">{emp.name}</p>

                  <p className="text-xs text-gray-400">
                    {emp.department?.name || "No Department"}
                  </p>

                  <p className="text-xs text-gray-400">
                    Punch In – {row.punchIn ? new Date(row.punchIn).toLocaleTimeString() : "-"}
                  </p>

                  <p className="text-xs text-gray-300">
                    Punch Out – {row.punchOut ? new Date(row.punchOut).toLocaleTimeString() : "-"}
                  </p>
                  
                </div>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${row.isLate
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                  }`}
              >
                {row.isLate ? "Late" : "On Time"}
              </span>
            </div>
          );
        })}



      </div>
    </div>
  );
}
