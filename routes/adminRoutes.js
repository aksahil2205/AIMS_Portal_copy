// /backend/routes/adminRoute.js
const express = require("express");
const { getAllUsers, addUser, removeUser } = require("../controllers/adminController");
const router = express.Router();

// Get all users
router.get("/users", getAllUsers);

// Add a new user
router.post("/users", addUser);

// Remove a user
router.delete("/users/:userId", removeUser);

module.exports = router;

