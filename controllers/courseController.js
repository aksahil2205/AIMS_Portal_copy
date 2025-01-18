// /backend/controllers/courseController.js
const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  const { title, description } = req.body;
  const instructorId = req.user.id;

  try {
    const newCourse = await Course.create({
      title,
      description,
      instructor: instructorId,
    });

    res.status(201).json({ message: "Course created", course: newCourse });
  } catch (err) {
    res.status(500).json({ message: "Error creating course", error: err.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses", error: err.message });
  }
};

exports.removeCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this course" });
    }

    await course.remove();
    res.json({ message: "Course removed" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting course", error: err.message });
  }
};

