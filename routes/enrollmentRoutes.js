// /backend/routes/enrollmentRoutes.js
const express = require("express");
const {
  requestEnrollment,
  getEnrollmentRequests,
  approveEnrollment,
  getPendingRequestsForFaculty,
  updateRequestStatus,
} = require("../controllers/enrollmentController");
const { authenticate, authorizeRole } = require("../middlewares/authMiddleware");

const router = express.Router();

// Student requests enrollment in a course
router.post("/request", authenticate, authorizeRole("student"), requestEnrollment);

// Instructors and faculty advisors view enrollment requests
router.get("/requests", authenticate, getEnrollmentRequests);

// Approve an enrollment request
router.patch("/approve/:enrollmentId", authenticate, authorizeRole(["instructor", "faculty"]), approveEnrollment);

router.get("/faculty/pending-requests", getPendingRequestsForFaculty);

// Update enrollment request status
router.put("/faculty/update-request/:requestId", updateRequestStatus);


module.exports = router;

