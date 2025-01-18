// /backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

// /backend/server.js
const courseRoutes = require("./routes/courseRoutes");

// Add this line
app.use("/api/courses", courseRoutes);

const enrollmentRoutes = require("./routes/enrollmentRoutes");

// Add this line to link the enrollment routes
app.use("/api/enrollments", enrollmentRoutes);



// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

