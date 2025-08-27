const mongoose = require("mongoose");
const Job = require("../models/Job");
const jobsData = require("./jobs.json");

require("dotenv").config();

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    await Job.deleteMany(); // clear old existing jobs
    // adding new jobs
    const jobs = await Job.insertMany(jobsData) 

    console.log(`Inserted ${jobs.length} jobs successfully`)
    await mongoose.disconnect()
    process.exit();
  } catch (err) {
    console.error(`Inserting jobs Error: ${err.message}`);
    process.exit(1);
  }
};

// module.exports = seedJobs;
seedJobs()