// import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import {
  FaCheckCircle,
  FaClock,
  FaTasks,
  FaUserTie,
} from "react-icons/fa";
import { useEffect, useState, useRef } from "react";


export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const hasFetched = useRef(false);


   /* ================= STATUS LABEL ================= */
  const statusLabel = (status) => {
    if (status === "assigned") return "Assigned";
    if (status === "accepted") return "In Progress";
    if (status === "completed") return "Completed";
    return status;
  };


  /* ================= FETCH MY TASKS ================= */
  // useEffect(() => {
  //   fetchMyTasks();
  // }, []);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchMyTasks();
  }, []);


  const fetchMyTasks = async () => {
    try {
      const res = await axiosInstance.get("/tasks/my");
      setTasks(res.data);
    } catch (error) {
      console.error("Fetch tasks error", error);
    }
  };

  /* ================= ACCEPT TASK ================= */
  const acceptTask = async (taskId) => {
    try {
      await axiosInstance.put(`/tasks/${taskId}/accept`);
      fetchMyTasks();
    } catch (error) {
      console.error("Accept task error", error);
    }
  };

  /* ================= COMPLETE TASK ================= */
  const completeTask = async (taskId) => {
    try {
      await axiosInstance.put(`/tasks/${taskId}/complete`);
      fetchMyTasks();
    } catch (error) {
      console.error("Complete task error", error);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-blue-50 min-h-screen">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <FaTasks /> My Assigned Tasks
        </h1>
        <p className="text-sm text-gray-500">
          Tasks assigned by admin
        </p>
      </div>

      {/* TASK LIST */}
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
                  className={`px-3 py-1 rounded text-xs ${task.priority === "High"
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
                  Assigned to you
                </div>
                <div className="flex items-center gap-2">
                  <FaClock />
                  {task.startDate} → {task.endDate}
                </div>
              </div>

              {/* STATUS */}
              <div>
                <span
                  className={`px-3 py-1 rounded text-xs ${task.status === "assigned"
                    ? "bg-blue-100 text-blue-600"
                    : task.status === "accepted"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                    }`}
                >
                  {statusLabel(task.status)}
                </span>

              </div>

              {/* ACTIONS */}
              <div className="flex gap-3">
                {task.status === "assigned" && (
                  <button
                    onClick={() => acceptTask(task._id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
                  >
                    Accept Task
                  </button>
                )}

                {task.status === "accepted" && (
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
