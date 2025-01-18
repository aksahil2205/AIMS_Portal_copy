// /backend/controllers/adminController.js
const User = require("../models/userModel");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email role");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Add a new user
exports.addUser = async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({ name, email, role });
    await newUser.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add user" });
  }
};

// Remove a user
exports.removeUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User removed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove user" });
  }
};

