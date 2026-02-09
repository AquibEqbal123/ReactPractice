import Attendance from "../models/Attendance.js";

const today = () => new Date().toISOString().split("T")[0];


// ================= PUNCH IN =================
export const punchIn = async (req, res) => {
  try {
    const userId = req.user.id;

    const date = new Date();
    const today = date.toISOString().split("T")[0];

    const exists = await Attendance.findOne({ userId, date: today });
    if (exists)
      return res.status(400).json({ message: "Already punched in today" });

    // ===== FIXED OFFICE TIME (9:30 AM) =====
    const officeTime = new Date(date);
    officeTime.setHours(9, 30, 0, 0);

    const punchTime = new Date();

    let lateMinutes = 0;
    let isLate = false;

    if (punchTime > officeTime) {
      lateMinutes = Math.floor((punchTime - officeTime) / 1000 / 60);
      isLate = true;
    }

    const record = await Attendance.create({
      userId,
      date: today,
      punchIn: punchTime,
      lateMinutes,
      isLate
    });

    res.json(record);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ================= PUNCH OUT =================
export const punchOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    const record = await Attendance.findOne({ userId, date: today });

    if (!record || !record.punchIn)
      return res.status(400).json({ message: "Punch in first" });

    const punchOutTime = new Date();

    const workedMinutes = Math.floor(
      (punchOutTime - record.punchIn) / 1000 / 60
    );

    // ===== OVERTIME LOGIC =====
    const officeMinutes = 8 * 60;

    let overtime = 0;
    if (workedMinutes > officeMinutes) {
      overtime = workedMinutes - officeMinutes;
    }

    record.punchOut = punchOutTime;
    record.totalMinutes = workedMinutes;
    record.overtimeMinutes = overtime;

    await record.save();

    res.json(record);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ================= GET MY ATTENDANCE =================
export const getMyAttendance = async (req, res) => {
  const data = await Attendance.find({ userId: req.user.id })
    .sort({ date: -1 });

  res.json(data);
};
