import { useEffect, useState, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function AssignTask() {
  /* ================= STATE ================= */
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const hasFetched = useRef(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    employeeId: "",
    employeeName: "",
    startDate: "",
    endDate: "",
  });

  /* ================= HELPERS ================= */
  const statusLabel = (status) => {
    if (status === "assigned") return "Assigned";
    if (status === "accepted") return "In Progress";
    if (status === "completed") return "Completed";
    return status;
  };

  /* ================= FETCH ================= */
  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/tasks/admin");
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch tasks error", err.message);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axiosInstance.get("/departments");
      setDepartments(res.data);
    } catch (err) {
      console.error("Fetch departments error", err.message);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchTasks();
    fetchDepartments();
  }, []);

  /* ================= ASSIGN TASK ================= */
  const handleAssignTask = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.employeeId ||
      !formData.startDate ||
      !formData.endDate
    ) {
      alert("All fields are required");
      return;
    }

    try {
      const { employeeName, ...cleanData } = formData;

      const payload = {
        ...cleanData,
        startDate: new Date(cleanData.startDate),
        endDate: new Date(cleanData.endDate),
      };

      await axiosInstance.post("/tasks", payload);
      await fetchTasks();

      setShowModal(false);
      setFormData({
        title: "",
        description: "",
        priority: "Low",
        employeeId: "",
        employeeName: "",
        startDate: "",
        endDate: "",
      });
    } catch (err) {
      console.error("Assign task error", err.message);
    }
  };

  /* ================= DELETE TASK ================= */
  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await axiosInstance.delete(`/tasks/${id}`);
      await fetchTasks();
    } catch (err) {
      console.error("Delete task error", err.message);
    }
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Assign Tasks (Admin)
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-sky-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus /> Assign Task
        </button>
      </div>

      {/* TASK LIST (ACTIVE + HISTORY) */}
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks assigned</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{task.title}</h2>
                <p className="text-sm text-gray-600">
                  {task.employee?.name} • {task.priority}
                </p>

                <p className="text-xs text-gray-500">
                  {task.startDate} → {task.endDate}
                </p>

                <span className="inline-block mt-1 text-xs px-2 py-1 rounded bg-blue-100 text-blue-600">
                  {task.status}
                </span>
              </div>

              {/* DELETE = HISTORY ONLY */}
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-500"
                title="Delete (kept as history)"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ASSIGN MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-170">
            <h2 className="text-lg font-semibold mb-4">
              Assign New Task
            </h2>

            <form onSubmit={handleAssignTask} className="space-y-4">

              {/* Task Title */}
              <div>
                <label className="text-sm font-medium">Task Title</label>
                <input
                  placeholder="Enter task title"
                  className="w-full border px-3 py-2 rounded mt-1"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium">Task Description</label>
                <textarea
                  placeholder="Enter task description"
                  className="w-full border px-3 py-2 rounded mt-1"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              {/* Priority */}
              <div>
                <label className="text-sm font-medium">Priority</label>
                <select
                  className="w-full border px-3 py-2 rounded mt-1"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="text-sm font-medium">Department</label>
                <select
                  className="w-full border px-3 py-2 rounded mt-1"
                  value={selectedDepartment}
                  onChange={async (e) => {
                    const deptId = e.target.value;
                    setSelectedDepartment(deptId);

                    if (!deptId) {
                      setEmployees([]);
                      return;
                    }

                    const res = await axiosInstance.get(
                      `/departments/${deptId}/employees`
                    );
                    setEmployees(res.data);

                    setFormData({
                      ...formData,
                      employeeId: "",
                      employeeName: "",
                    });
                  }}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Employee */}
              <div>
                <label className="text-sm font-medium">Employee</label>
                <select
                  className="w-full border px-3 py-2 rounded mt-1"
                  value={formData.employeeId}
                  onChange={(e) => {
                    const emp = employees.find(
                      (x) => x._id === e.target.value
                    );

                    if (!emp) return;

                    setFormData({
                      ...formData,
                      employeeId: emp._id,
                      employeeName: emp.name,
                    });
                  }}
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <input
                    type="date"
                    className="border px-3 py-2 rounded w-full mt-1"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <input
                    type="date"
                    className="border px-3 py-2 rounded w-full mt-1"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border px-4 py-2 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-sky-800 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Assign
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
