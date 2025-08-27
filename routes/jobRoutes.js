const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// GET /api/jobs list of all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ jobs });
  } catch (err) {
    console.error(`Get Jobs Error: ${err.message}`);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET /api/jobs/:id getting specific job
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (err) {
    console.error(`Get Job by ID error: ${err.message}`);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
