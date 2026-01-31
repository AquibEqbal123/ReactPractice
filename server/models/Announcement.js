import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Announcement", announcementSchema);
