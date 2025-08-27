const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const Job = require("../models/Job");
const cloudinary = require("../config/cloudinary");
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const fs = require('fs')

// Protected route apply to a job
router.post("/", auth, upload.single("resume"), async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;

    console.log(req.file);

    if (!jobId || !req.file) {
      return res
        .status(400)
        .json({ message: "Job ID and resume are required" });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    let resumeUrl;

    if (process.env.NODE_ENV === "production") {
      // uploading to cloudinary in production
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "resumes",
        resource_type: "raw", // required for pdf/doc
      });
      resumeUrl = result.secure_url;
      // Delete local temp file
      fs.unlinkSync(req.file.path); // delete local file
    } else {
      // in development upload to locally
      resumeUrl = `/uploads/${req.file.filename}`;
    }

    const application = await Application.create({
      applicant: req.user._id,
      job: jobId,
      resumeUrl, // resume file storing path in db
      coverLetter,
    });

    res.status(201).json({ message: "Application submitted", application });
  } catch (err) {
    console.error(`Apply Error: ${err.message}`);
    res.status(500).json({ message: "Server Error" });
  }
});

// viewing my applications
router.get("/", auth, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate("job", "title company location")
      .sort({ appliedAt: -1 });

    res.json({ applications });
  } catch (err) {
    console.error(`View My Applications Error: ${err.message}`);
    res.status(500).json({ message: "Server Error" });
  }
});

// viewing my single application
router.get("/:id", auth, async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      applicant: req.user._id,
    }).populate("job", "title company location description");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (err) {
    console.error(`View My Single Application Error: ${err.message}`);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
