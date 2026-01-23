import Profile from "../models/Profile.js";

// GET PROFILE BY EMPLOYEE ID
export const getProfile = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const profile = await Profile.findOne({ employeeId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE / UPDATE PROFILE
export const saveProfile = async (req, res) => {
  try {
    const data = req.body;

    const profile = await Profile.findOneAndUpdate(
      { employeeId: data.employeeId },
      data,
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (error) {
    console.error("Save profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
