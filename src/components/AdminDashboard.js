// /frontend/src/components/AdminDashboard.js
import React, { useState, useEffect } from "react";
import { fetchUsers, addUser, removeUser } from "../services/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all users
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (err) {
        setError("Failed to load users");
      }
    };
    getUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      await addUser(newUser);
      setUsers([...users, newUser]);
      setNewUser({ name: "", email: "", role: "" });
      alert("User added successfully!");
    } catch (err) {
      setError("Failed to add user");
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      await removeUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
      alert("User removed successfully!");
    } catch (err) {
      setError("Failed to remove user");
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Add New User</h2>
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <select
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
      >
        <option value="">Select Role</option>
        <option value="student">Student</option>
        <option value="instructor">Instructor</option>
        <option value="facultyAdvisor">Faculty Advisor</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleAddUser}>Add User</button>

      <h2>Manage Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.role})
            <button onClick={() => handleRemoveUser(user._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

