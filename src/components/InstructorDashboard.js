// /frontend/src/components/InstructorDashboard.js
import React, { useState, useEffect } from "react";
import {
  createCourse,
  deleteCourse,
  getEnrollmentRequests,
  approveEnrollment,
} from "../services/api";

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrollmentRequests, setEnrollmentRequests] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch enrollment requests when the component mounts
    const fetchEnrollmentRequests = async () => {
      try {
        const response = await getEnrollmentRequests();
        setEnrollmentRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load enrollment requests");
        setLoading(false);
      }
    };

    fetchEnrollmentRequests();
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    try {
      const response = await createCourse(newCourse.title, newCourse.description);
      alert("Course created successfully!");
      setCourses([...courses, response.data]);
      setNewCourse({ title: "", description: "" });
    } catch (err) {
      alert("Failed to create course. Please try again.");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourse(courseId);
      setCourses(courses.filter((course) => course._id !== courseId));
      alert("Course deleted successfully!");
    } catch (err) {
      alert("Failed to delete course. Please try again.");
    }
  };

  const handleApproveEnrollment = async (enrollmentId) => {
    try {
      await approveEnrollment(enrollmentId);
      alert("Enrollment approved!");
      setEnrollmentRequests(
        enrollmentRequests.filter((req) => req._id !== enrollmentId)
      );
    } catch (err) {
      alert("Failed to approve enrollment. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Instructor Dashboard</h1>

      {/* Course Creation */}
      <div>
        <h2>Create a New Course</h2>
        <form onSubmit={handleCreateCourse}>
          <input
            type="text"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Course Description"
            value={newCourse.description}
            onChange={(e) =>
              setNewCourse({ ...newCourse, description: e.target.value })
            }
            required
          />
          <button type="submit">Create Course</button>
        </form>
      </div>

      {/* Course List */}
      <div>
        <h2>Your Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              <h3>{course.title}</h3>
              <button onClick={() => handleDeleteCourse(course._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Enrollment Requests */}
      <div>
        <h2>Enrollment Requests</h2>
        <ul>
          {enrollmentRequests.map((request) => (
            <li key={request._id}>
              <p>
                <strong>Student:</strong> {request.student.name} ({request.student.email})
              </p>
              <p>
                <strong>Course:</strong> {request.course.title}
              </p>
              <button onClick={() => handleApproveEnrollment(request._id)}>
                Approve
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InstructorDashboard;

