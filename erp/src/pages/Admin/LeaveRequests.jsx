import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

// ✅ NEW: axios import (backend connect ke liye)
import axios from "axios";

export default function LeaveRequests() {

  /* ================= STATE ================= */
  const [requests, setRequests] = useState([]);

  // popup state (same)
  const [showConfirm, setShowConfirm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [actionType, setActionType] = useState("");

  // pagination (same)
  const [page, setPage] = useState(1);
  const perPage = 7;

  /* ================= FETCH ALL LEAVES FROM BACKEND ================= */

  useEffect(() => {
    fetchAllLeaves();
  }, []);

  // ✅ NEW FUNCTION: Admin ke liye saare leave requests lana
  const fetchAllLeaves = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/leaves"
      );
      setRequests(res.data);
    } catch (error) {
      console.error("Fetch leaves error", error);
    }
  };

  /* ================= OPEN CONFIRM ================= */
  const openConfirm = (req, action) => {
    setSelected(req);
    setActionType(action);
    setShowConfirm(true);
  };

  /* ================= CONFIRM ACTION ================= */
  const confirmAction = async () => {
    try {
      const payload = {
        status: actionType === "approve" ? "Approved" : "Rejected",
        message:
          actionType === "approve"
            ? "Your leave request has been Approved by Admin."
            : "Your leave request has been Rejected by Admin.",
      };

      // ✅ CORRECT ROUTE (NO /approve)
      await axios.patch(
        `http://localhost:5000/api/leaves/${selected._id}`,
        payload
      );

      // 🔁 Refresh data
      fetchAllLeaves();

      setShowConfirm(false);
      setSelected(null);
      setActionType("");
    } catch (error) {
      console.error("Action error", error);
    }
  };


  /* ================= FILTER ================= */

  // Pending requests
  const pending = requests.filter(
    (r) => r.status === "Pending"
  );

  // Approved + Rejected history
  const history = requests.filter(
    (r) => r.status !== "Pending"
  );

  // pagination logic (same)
  const totalPages = Math.ceil(history.length / perPage);
  const paginatedHistory = history.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="p-6 space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold">
          Leave Requests (Admin)
        </h1>
        <p className="text-sm text-gray-500">
          Manage employee leave approvals
        </p>
      </div>

      {/* ================= PENDING REQUESTS ================= */}
      <div className="bg-white rounded-xl shadow">
        <h2 className="font-semibold p-4 border-b">
          Pending Requests
        </h2>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Employee</th>
              <th className="text-left">Type</th>
              <th className="text-left">From</th>
              <th className="text-left">To</th>
              <th className="text-left">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {pending.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No pending requests
                </td>
              </tr>
            ) : (
              pending.map((req) => (
                <tr key={req._id} className="border-t text-left">
                  <td className="p-3 font-medium">
                    {req.employeeName}
                  </td>
                  <td>{req.type}</td>
                  <td>{req.from.slice(0, 10)}</td>
                  <td>{req.to.slice(0, 10)}</td>
                  <td className="flex items-center gap-1">
                    <Clock size={14} /> Pending
                  </td>
                  <td className="flex justify-center gap-2 p-3">
                    <button
                      onClick={() => openConfirm(req, "approve")}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => openConfirm(req, "reject")}
                      className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= HISTORY ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">
          Approved / Rejected History
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedHistory.map((req) => (
            <div
              key={req._id}
              className="border rounded-lg p-4 text-sm"
            >
              <p className="font-medium">{req.employeeName}</p>
              <p>{req.type}</p>
              <p className="text-gray-500">
                {req.from.slice(0, 10)} → {req.to.slice(0, 10)}
              </p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded text-xs ${req.status === "Approved"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                  }`}
              >
                {req.status}
              </span>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* ================= CONFIRM POPUP ================= */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-3">
              Are you sure?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Do you want to {actionType} this request?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`px-4 py-2 text-white rounded ${actionType === "approve"
                    ? "bg-green-600"
                    : "bg-red-600"
                  }`}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
