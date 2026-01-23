import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
    },
    employeeId: String,
    employeeName: String,
    startDate: String,
    endDate: String,
    status: {
      type: String,
      enum: ["Assigned", "In Progress", "Completed"],
      default: "Assigned",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
