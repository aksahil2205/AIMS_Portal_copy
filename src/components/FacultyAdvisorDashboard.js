// /frontend/src/components/FacultyAdvisorDashboard.js
import React, { useState, useEffect } from "react";
import { getPendingApprovals, approveRequest, rejectRequest } from "../services/api";

const FacultyAdvisorDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Example Logout Function
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/";
};

  useEffect(() => {
    // Fetch pending approvals when the component mounts
    const fetchPendingApprovals = async () => {
      try {
        const response = await getPendingApprovals();
        setPendingRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load pending approvals");
        setLoading(false);
      }
    };

    fetchPendingApprovals();
  }, []);

  const handleApprove = async (enrollmentId) => {
    try {
      await approveRequest(enrollmentId);
      alert("Request approved successfully!");
      setPendingRequests(
        pendingRequests.filter((req) => req._id !== enrollmentId)
      );
    } catch (err) {
      alert("Failed to approve the request. Please try again.");
    }
  };

  const handleReject = async (enrollmentId) => {
    try {
      await rejectRequest(enrollmentId);
      alert("Request rejected successfully!");
      setPendingRequests(
        pendingRequests.filter((req) => req._id !== enrollmentId)
      );
    } catch (err) {
      alert("Failed to reject the request. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Faculty Advisor Dashboard</h1>
      <h2>Pending Enrollment Approvals</h2>
      <ul>
        {pendingRequests.map((request) => (
          <li key={request._id}>
            <p>
              <strong>Student:</strong> {request.student.name} ({request.student.email})
            </p>
            <p>
              <strong>Course:</strong> {request.course.title}
            </p>
            <button onClick={() => handleApprove(request._id)}>Approve</button>
            <button onClick={() => handleReject(request._id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default FacultyAdvisorDashboard;

