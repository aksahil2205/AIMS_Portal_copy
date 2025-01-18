// /backend/routes/courseRoutes.js
const express = require("express");
const { createCourse, getCourses, removeCourse } = require("../controllers/courseController");
const { authenticate, authorizeRole } = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes
router.post("/create", authenticate, authorizeRole("instructor"), createCourse);
router.get("/", authenticate, getCourses);
router.delete("/:courseId", authenticate, authorizeRole("instructor"), removeCourse);

module.exports = router;

