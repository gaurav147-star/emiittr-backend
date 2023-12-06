const express = require("express");
const router = express.Router();
const { register, login,getUserById } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

// Route to find a user by ID
router.get("/:userId", getUserById);

module.exports = router;
