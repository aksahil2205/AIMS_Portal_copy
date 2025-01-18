// /frontend/src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, otp); // Login API call
      const { token, user } = response.data;

      // Save token and role to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      // Redirect based on user role
      switch (user.role) {
        case "student":
          navigate("/student/dashboard");
          break;
        case "instructor":
          navigate("/instructor/dashboard");
          break;
        case "facultyAdvisor":
          navigate("/faculty/dashboard");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        default:
          alert("Invalid role");
      }
    } catch (err) {
      setError("Login failed. Please check your email and OTP.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;

