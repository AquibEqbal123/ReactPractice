import { useState, useEffect } from "react";
import {
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";

// ✅ Backend connect ke liye
import axios from "axios";

export default function Leave() {
  /* ================= STATE ================= */

  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // ⚠️ DEMO VALUES
  // Later JWT se aayega
  const EMPLOYEE_ID = "65abc123demo";
  const EMPLOYEE_NAME = "Aquib Eqbal";

  const [formData, setFormData] = useState({
    type: "Sick Leave",
    from: "",
    to: "",
    reason: "",
  });

  /* ================= FETCH LEAVES FROM BACKEND ================= */

  useEffect(() => {
    fetchMyLeaves();
  }, []);

  // ✅ Employee ke sare leave requests lao
  const fetchMyLeaves = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/leaves/employee/${EMPLOYEE_ID}`
      );
      setLeaves(res.data);
    } catch (error) {
      console.error("Fetch leaves error", error);
    }
  };

  /* ================= APPLY LEAVE ================= */

  const handleApplyLeave = async () => {
    // 🔴 VALIDATION
    if (!formData.from || !formData.to || !formData.reason) {
      alert("All fields are required");
      return;
    }

    if (new Date(formData.from) > new Date(formData.to)) {
      alert("From date cannot be after To date");
      return;
    }

    try {
      // ✅ Backend payload
      const payload = {
        employeeId: EMPLOYEE_ID,
        employeeName: EMPLOYEE_NAME,
        type: formData.type,
        from: formData.from,
        to: formData.to,
        reason: formData.reason,
      };

      // ✅ POST leave request
      await axios.post(
        "http://localhost:5000/api/leaves",
        payload
      );

      // ✅ Fresh data reload
      fetchMyLeaves();

      // ✅ Reset UI
      setShowModal(false);
      setFormData({
        type: "Sick Leave",
        from: "",
        to: "",
        reason: "",
      });
    } catch (error) {
      console.error("Apply leave error", error);
      alert("Failed to apply leave");
    }
  };

  /* ================= DELETE MESSAGE (UI ONLY) ================= */
  // ⚠️ Ye DB se delete nahi karta
  // Sirf employee ke view se message hataata hai

  const handleDelete = (id) => {
    setLeaves(leaves.filter((l) => l._id !== id));
  };

  return (
    <div className="p-6 space-y-6">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Leave Requests</h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={16} /> Apply Leave
        </button>
      </div>

      {/* ================= LEAVE LIST ================= */}
      <div className="space-y-4">
        {leaves.length === 0 && (
          <p className="text-gray-500 text-sm">
            No leave requests found
          </p>
        )}

        {leaves.map((l) => (
          <div
            key={l._id}
            className="bg-white rounded-xl shadow p-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{l.type}</p>
                <p className="text-sm text-gray-500">
                  {l.from.slice(0, 10)} → {l.to.slice(0, 10)}
                </p>
              </div>

              {/* ================= STATUS ================= */}
              <div>
                {l.status === "Pending" && (
                  <span className="flex items-center gap-1 text-yellow-600 text-xs">
                    <Clock size={14} /> Pending
                  </span>
                )}
                {l.status === "Approved" && (
                  <span className="flex items-center gap-1 text-green-600 text-xs">
                    <CheckCircle size={14} /> Approved
                  </span>
                )}
                {l.status === "Rejected" && (
                  <span className="flex items-center gap-1 text-red-600 text-xs">
                    <XCircle size={14} /> Rejected
                  </span>
                )}
              </div>
            </div>

            {/* ================= ADMIN MESSAGE ================= */}
            {l.message && (
              <div
                className={`mt-3 text-sm rounded-lg p-3 ${
                  l.status === "Approved"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {l.message}
              </div>
            )}

            {/* ================= DELETE MESSAGE BUTTON ================= */}
            {(l.status === "Approved" || l.status === "Rejected") && (
              <div className="mt-3 text-right">
                <button
                  onClick={() => handleDelete(l._id)}
                  className="text-red-500 text-xs flex items-center gap-1 ml-auto"
                >
                  <Trash2 size={14} /> Delete Message
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ================= APPLY LEAVE MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Apply Leave
            </h2>

            <div className="space-y-3 text-sm">
              <div>
                <label>Leave Type</label>
                <select
                  className="w-full border px-3 py-2 rounded"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value,
                    })
                  }
                >
                  <option>Sick Leave</option>
                  <option>Casual Leave</option>
                  <option>Paid Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label>From</label>
                  <input
                    type="date"
                    className="w-full border px-3 py-2 rounded"
                    value={formData.from}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        from: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label>To</label>
                  <input
                    type="date"
                    className="w-full border px-3 py-2 rounded"
                    value={formData.to}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        to: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label>Reason</label>
                <textarea
                  rows="3"
                  className="w-full border px-3 py-2 rounded"
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reason: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleApplyLeave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
