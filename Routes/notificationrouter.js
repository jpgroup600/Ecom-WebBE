const express = require("express");
const { sendNotification } = require("../Controllers/notificationController");

const registrationController = require("../Controllers/registrationController");

const notificaitonrouter = express.Router();

notificaitonrouter.post("/", sendNotification);
notificaitonrouter.post("/register", registrationController.registerUser);

notificaitonrouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch notifications where the receiver is the user
    const notifications = await Notification.find({ receiver: userId })
      .populate("sender", "name") // Optional: populate sender details
      .sort({ createdAt: -1 }); // Sort by latest notifications

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});
module.exports = notificaitonrouter;
