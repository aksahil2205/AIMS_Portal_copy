// /backend/controllers/enrollmentController.js
const Enrollment = require("../models/Enrollment");

exports.requestEnrollment = async (req, res) => {
  const { courseId } = req.body;
  const studentId = req.user.id;

  try {
    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
    });

    res.status(201).json({ message: "Enrollment requested", enrollment });
  } catch (err) {
    res.status(500).json({ message: "Error requesting enrollment", error: err.message });
  }
};

exports.getEnrollmentRequests = async (req, res) => {
  const { role, id } = req.user;

  try {
    let filter = {};

    if (role === "instructor") {
      filter = { instructorApproved: false };
    } else if (role === "faculty") {
      filter = { instructorApproved: true, facultyApproved: false };
    }

    const enrollments = await Enrollment.find(filter)
      .populate("student", "name email")
      .populate("course", "title");

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching enrollment requests", error: err.message });
  }
};

exports.approveEnrollment = async (req, res) => {
  const { enrollmentId } = req.params;

  try {
    const enrollment = await Enrollment.findById(enrollmentId);

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    if (req.user.role === "instructor") {
      enrollment.instructorApproved = true;
    } else if (req.user.role === "faculty") {
      enrollment.facultyApproved = true;
    }

    if (enrollment.instructorApproved && enrollment.facultyApproved) {
      enrollment.status = "approved";
    }

    await enrollment.save();
    res.json({ message: "Enrollment approved", enrollment });
  } catch (err) {
    res.status(500).json({ message: "Error approving enrollment", error: err.message });
  }
};

// /backend/controllers/enrollmentController.js

// Fetch pending enrollment requests for faculty advisor
exports.getPendingRequestsForFaculty = async (req, res) => {
  try {
    const requests = await Enrollment.find({ status: "Instructor Approved" }).populate("student").populate("course");
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};

// Approve or reject an enrollment request
exports.updateRequestStatus = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body; // Accepts "Approved" or "Rejected"
  try {
    const request = await Enrollment.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    request.status = status;
    await request.save();

    res.status(200).json({ message: `Request ${status.toLowerCase()} successfully!` });
  } catch (err) {
    res.status(500).json({ error: "Failed to update request status" });
  }
};
