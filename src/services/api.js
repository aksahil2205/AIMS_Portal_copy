// /frontend/src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Backend API base URL

// Axios instance with token header
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add Authorization header if the token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Course-related endpoints
export const getCourses = () => api.get("/courses");
export const requestEnrollment = (courseId) =>
  api.post("/enrollments/request", { courseId });

export default api;
// /frontend/src/services/api.js
export const createCourse = (title, description) =>
  api.post("/courses", { title, description });

export const deleteCourse = (courseId) => api.delete(`/courses/${courseId}`);

export const getEnrollmentRequests = () => api.get("/enrollments/requests");

export const approveEnrollment = (enrollmentId) =>
  api.patch(`/enrollments/approve/${enrollmentId}`);


// /frontend/src/services/api.js
export const getPendingApprovals = () =>
  api.get("/enrollments/pending-approvals"); // Fetch pending approvals for the faculty advisor

export const approveRequest = (enrollmentId) =>
  api.patch(`/enrollments/final-approve/${enrollmentId}`); // Approve a request

export const rejectRequest = (enrollmentId) =>
  api.patch(`/enrollments/reject/${enrollmentId}`); // Reject a request

