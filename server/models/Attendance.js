import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },


    date: {
        type: String,
        required: true
    },

    punchIn: Date,
    punchOut: Date,

    lateMinutes: {
        type: Number,
        default: 0
    },

    isLate: {
        type: Boolean,
        default: false
    },

    totalMinutes: {
        type: Number,
        default: 0
    },

    overtimeMinutes: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

export default mongoose.model("Attendance", attendanceSchema);
