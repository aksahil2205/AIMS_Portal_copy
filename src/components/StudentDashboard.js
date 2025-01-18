// /frontend/src/components/StudentDashboard.js
import React, { useState, useEffect } from "react";
import { getCourses, requestEnrollment } from "../services/api";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Example Logout Function
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/";
};


  useEffect(() => {
    // Fetch courses when the component mounts
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load courses");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleRequestEnrollment = async (courseId) => {
    try {
      await requestEnrollment(courseId);
      alert("Enrollment request submitted successfully!");
    } catch (err) {
      alert("Failed to submit enrollment request. Please try again.");
    }
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Available Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <button onClick={() => handleRequestEnrollment(course._id)}>
              Request Enrollment
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;

