const express = require("express");
const multer = require("multer");
const Image = require("../Models/FileUpload");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Multer instance expecting a field named "images"
const upload = multer({ storage });

router.post("/", upload.array("images", 10), async (req, res) =>  {
  try {
    console.log(req.files); // Log uploaded files
    console.log(req.body);  // Log any other data from the request

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Assuming a FileUpload model is defined, save the file metadata here
    const uploadedImages = req.files.map(file => ({
      filename: file.filename,
      path: file.path,
    }));
    
    await Image.insertMany(uploadedImages);

    res.status(200).json({ message: "Files uploaded successfully", files: uploadedImages });
  } catch (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "Multer error", error: err.message });
    } else {
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  }
});

// Route to fetch an image by its ID
router.get("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Send the image file as a response
    res.sendFile(path.resolve(image.path));
  } catch (err) {
    res.status(500).json({ message: "Error fetching image", error: err.message });
  }
});

module.exports = router;
