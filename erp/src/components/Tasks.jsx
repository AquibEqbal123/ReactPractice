import { Link } from "react-router-dom";

export default function TasksCard() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">My Tasks</h2>

        {/* Top View All */}
        <Link
          to="/tasks"
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          View all
        </Link>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {/* Task 1 */}
        <div className="flex justify-between items-center border-b pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <p className="text-sm font-medium">Finish Project Report</p>
          </div>
          <span className="text-xs bg-red-500 text-white px-3 py-1 rounded">
            Due Today
          </span>
        </div>

        {/* Task 2 */}
        <div className="flex justify-between items-center border-b pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <p className="text-sm font-medium">Code Review Meeting</p>
          </div>
          <span className="text-xs bg-blue-500 text-white px-3 py-1 rounded">
            Due Tomorrow
          </span>
        </div>

        {/* Task 3 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            <p className="text-sm font-medium">
              Client Presentation Prep
            </p>
          </div>
          <span className="text-xs bg-orange-400 text-white px-3 py-1 rounded">
            Due in 2 Days
          </span>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="mt-6 text-center">
        <Link
          to="/tasks"
          className="inline-block bg-blue-100 text-blue-600 px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-200"
        >
          View All
        </Link>
      </div>
    </div>
  );
}
