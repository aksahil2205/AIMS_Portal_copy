// /backend/app.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const adminRoute = require("./routes/adminRoute");
const authRoute = require("./routes/authRoute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/admin", adminRoute);
app.use("/auth", authRoute);

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/yourDatabaseName", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

