import Attendance from "../models/Attendance.js";

const today = () => new Date().toISOString().split("T")[0];


// ================= PUNCH IN =================
export const punchIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const currentDate = today();

    const exists = await Attendance.findOne({ userId, date: currentDate });
    if (exists)
      return res.status(400).json({ message: "Already punched in today" });

    const officeTime = new Date();
    officeTime.setHours(9, 30, 0, 0);

    const punchTime = new Date();

    let lateMinutes = 0;
    let isLate = false;

    if (punchTime > officeTime) {
      lateMinutes = Math.floor((punchTime - officeTime) / 60000);
      isLate = true;
    }

    const record = await Attendance.create({
      userId,
      date: currentDate,
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
    const currentDate = today();

    const record = await Attendance.findOne({ userId, date: currentDate });

    if (!record)
      return res.status(400).json({ message: "Punch in first" });

    const punchOutTime = new Date();

    const workedMinutes = Math.floor(
      (punchOutTime - record.punchIn) / 60000
    );

    const officeMinutes = 8 * 60;

    record.punchOut = punchOutTime;
    record.totalMinutes = workedMinutes;
    record.overtimeMinutes =
      workedMinutes > officeMinutes ? workedMinutes - officeMinutes : 0;

    await record.save();

    res.json(record);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= MY ATTENDANCE =================
export const getMyAttendance = async (req, res) => {
  try {
    const data = await Attendance.find({ userId: req.user.id })
      .populate("userId", "name avatar department")
      .sort({ date: -1 });

    res.json(data);

  } catch (err) {
    console.error("MY ATTENDANCE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

