import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    date: {
        type: String, // YYYY-MM-DD
        required: true
    },

    lateMinutes: {
        type: Number,
        default: 0
    },

    isLate: {
        type: Boolean,
        default: false
    },


    punchIn: Date,
    punchOut: Date,

    overtimeMinutes: {
        type: Number,
        default: 0
    },


    totalMinutes: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        default: "Present"
    }

}, { timestamps: true });

export default mongoose.model("Attendance", attendanceSchema);
