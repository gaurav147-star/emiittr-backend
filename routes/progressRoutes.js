const express = require("express");
const router = express.Router();
const {
  getUserProgress,
  updateUserProgress,
  getAll,
} = require("../controllers/progressController");

router.get("/all", getAll);
router.get("/:userId", getUserProgress);
router.post("/update", updateUserProgress);

// Other progress-related routes

module.exports = router;
