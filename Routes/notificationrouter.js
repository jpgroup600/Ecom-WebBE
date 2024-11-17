const express = require("express");
const { sendNotification } = require("../controllers/notificationController");

const registrationController = require('../controllers/registrationController');

const router = express.Router();

router.post("/", sendNotification);
router.post('/register', registrationController.registerUser);


router.get("/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Fetch notifications where the receiver is the user
      const notifications = await Notification.find({ receiver: userId })
        .populate("sender", "name")  // Optional: populate sender details
        .sort({ createdAt: -1 });    // Sort by latest notifications
  
      res.status(200).json({ notifications });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ error: "Failed to fetch notifications" });
    }
  });
module.exports = router;
