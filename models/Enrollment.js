// /backend/models/Enrollment.js
const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  status: { type: String, enum: ["pending", "approved"], default: "pending" },
  instructorApproved: { type: Boolean, default: false },
  facultyApproved: { type: Boolean, default: false },
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);

