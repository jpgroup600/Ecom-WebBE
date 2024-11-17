const Notification = require("../Models/Notification");

exports.sendNotification = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    const notification = new Notification({ sender, receiver, message });
    await notification.save();
    res.status(201).json({ message: "Notification sent" });
  } catch (error) {
    console.error("Error saving notification:", error);
    res.status(500).json({ error: "Notification failed" });
  }
};
