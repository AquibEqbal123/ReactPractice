import Announcement from "../models/Announcement.js";

/* ================= CREATE (ADMIN) ================= */
export const createAnnouncement = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message required" });
    }

    const announcement = await Announcement.create({ message });

    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* ================= GET ALL ================= */
export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({
      createdAt: -1,
    });

    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE (ADMIN) ================= */
export const deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
