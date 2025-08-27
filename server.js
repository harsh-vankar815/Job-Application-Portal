const express = require("express");
const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const jobRoutes = require("./routes/jobRoutes");
const auth = require("./middlewares/authMiddleware");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const PORT = process.env.PORT || "5000";

require("dotenv").config();

// serving static file
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(helmet()); // adds all default security headers

// Log requests in 'dev' format
app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/jobs", jobRoutes);

// Example protected route
app.get("/api/protected", auth, (req, res) => {
  res.json({ message: `Hello user ${req.user.id}, you are authorized!` });
});

// Database connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
