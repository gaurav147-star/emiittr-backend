const express = require("express");
const router = express.Router();
const {
  getUserProgress,
  updateUserProgress,
} = require("../controllers/progressController");

router.get("/:userId", getUserProgress);
router.post("/update", updateUserProgress);
// Other progress-related routes

module.exports = router;
