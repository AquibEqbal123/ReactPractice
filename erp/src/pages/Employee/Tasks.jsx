import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCheckCircle,
  FaClock,
  FaTasks,
  FaUserTie,
} from "react-icons/fa";

export default function Tasks() {
  /* ================= STATE ================= */

  const [tasks, setTasks] = useState([]);

  // ⚠️ DEMO employee (later JWT se aayega)
  const EMPLOYEE_ID = "65abc123demo";

  /* ================= FETCH TASKS FROM BACKEND ================= */
  // Employee ke assigned tasks backend se load honge

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const fetchMyTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tasks/employee/${EMPLOYEE_ID}`
      );
      setTasks(res.data);
    } catch (error) {
      console.error("Fetch tasks error", error);
    }
  };

  /* ================= ACCEPT TASK ================= */
  // Status: Assigned → In Progress

  const acceptTask = async (taskId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}/accept`
      );
      fetchMyTasks(); // refresh list
    } catch (error) {
      console.error("Accept task error", error);
    }
  };

  /* ================= COMPLETE TASK ================= */
  // Status: In Progress → Completed

  const completeTask = async (taskId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}/complete`
      );
      fetchMyTasks(); // refresh list
    } catch (error) {
      console.error("Complete task error", error);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-blue-50 min-h-screen">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <FaTasks /> My Assigned Tasks
        </h1>
        <p className="text-sm text-gray-500">
          Tasks assigned by admin
        </p>
      </div>

      {/* ================= TASK LIST ================= */}
      {tasks.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          No tasks assigned yet
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-xl shadow p-6 space-y-4"
            >
              {/* TOP */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">
                    {task.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {task.description}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded text-xs ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-600"
                      : task.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {task.priority}
                </span>
              </div>

              {/* INFO */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaUserTie />
                  {task.employeeName}
                </div>
                <div className="flex items-center gap-2">
                  <FaClock />
                  {task.startDate} → {task.endDate}
                </div>
              </div>

              {/* STATUS */}
              <div>
                <span
                  className={`px-3 py-1 rounded text-xs ${
                    task.status === "Assigned"
                      ? "bg-blue-100 text-blue-600"
                      : task.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3">
                {task.status === "Assigned" && (
                  <button
                    onClick={() => acceptTask(task._id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
                  >
                    Accept Task
                  </button>
                )}

                {task.status === "In Progress" && (
                  <button
                    onClick={() => completeTask(task._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm flex items-center gap-2"
                  >
                    <FaCheckCircle /> Mark Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
