import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true },

    name: String,
    father: String,
    dob: String,
    gender: String,
    marital: String,
    phone: String,
    email: String,

    position: String,
    joiningDate: String,
    company: String,

    photo: String, // /uploads/filename.jpg
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
