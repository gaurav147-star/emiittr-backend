const express = require("express");
const router = express.Router();
const {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
  getExercisesByLanguage,
  evaluateAnswer,
} = require("../controllers/exerciseController");

// Get all exercises
router.get("/", getAllExercises);
router.get("/lang", getExercisesByLanguage); // Corrected route

router.post("/evaluate-answer", evaluateAnswer);
// Get exercise by ID
router.get("/:exerciseId", getExerciseById);

// Create a new exercise
router.post("/", createExercise);

// Update an existing exercise
router.put("/:exerciseId", updateExercise);

// Delete an exercise
router.delete("/:exerciseId", deleteExercise);

module.exports = router;
