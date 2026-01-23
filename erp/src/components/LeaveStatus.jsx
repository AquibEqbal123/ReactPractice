export default function LeaveStatusCard() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-sm">Leave Status</h2>

        {/* Right dots */}
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
        </div>
      </div>

      {/* Status Boxes */}
      <div className="grid grid-cols-3 gap-3 text-center">
        {/* Approved */}
        <div className="bg-green-50 rounded-lg p-3 shadow-sm">
          <h3 className="text-2xl font-bold text-green-600">6</h3>
          <p className="text-xs text-green-700 font-medium">
            Approved
          </p>
        </div>

        {/* Pending */}
        <div className="bg-blue-50 rounded-lg p-3 shadow-sm">
          <h3 className="text-2xl font-bold text-blue-600">2</h3>
          <p className="text-xs text-blue-700 font-medium">
            Pending
          </p>
        </div>

        {/* Rejected */}
        <div className="bg-red-50 rounded-lg p-3 shadow-sm">
          <h3 className="text-2xl font-bold text-red-600">1</h3>
          <p className="text-xs text-red-700 font-medium">
            Rejected
          </p>
        </div>
      </div>
    </div>
  );
}
