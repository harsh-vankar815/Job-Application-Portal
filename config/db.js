const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  const MONGODB_URI =
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/JobApplicaionPortalDB";
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB Connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
