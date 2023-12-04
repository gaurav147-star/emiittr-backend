const Exercise = require("../models/exerciseModel");

// Get all exercises
const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: "Error fetching exercises" });
  }
};

const getExercisesByLanguage = async (req, res) => {
  try {
    const { language } = req.query;
    const exercises = await Exercise.find({ language }).select(
      "-correctAnswer"
    );
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: "Error fetching exercises by language" });
  }
};

const evaluateAnswer = async (req, res) => {
  const { userAnswer, exerciseId } = req.body;
  const exercise = await Exercise.findById(exerciseId);
  if (!exercise) {
    return { success: false, message: "Exercise not found" };
  }

  const correctAnswer = exercise.correctAnswer;
  const isCorrect = userAnswer === correctAnswer;
  res.json({ success: isCorrect, isCorrect, correctAnswer });
};

// Get exercise by ID
const getExerciseById = async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    res.json(exercise);
  } catch (err) {
    res.status(500).json({ error: "Error fetching exercise" });
  }
};

// Create a new exercise
const createExercise = async (req, res) => {
  try {
    const { language, difficulty, question, options, correctAnswer } = req.body;
    const exercise = new Exercise({
      language,
      difficulty,
      question,
      options,
      correctAnswer,
    });
    await exercise.save();
    res.status(201).json({ message: "Exercise created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error creating exercise" });
  }
};

// Update an existing exercise
const updateExercise = async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const { language, difficulty, question, options, correctAnswer } = req.body;
    const exercise = await Exercise.findByIdAndUpdate(exerciseId, {
      language,
      difficulty,
      question,
      options,
      correctAnswer,
    });
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    res.json({ message: "Exercise updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error updating exercise" });
  }
};

// Delete an exercise
const deleteExercise = async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const exercise = await Exercise.findByIdAndDelete(exerciseId);
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    res.json({ message: "Exercise deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting exercise" });
  }
};

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
  getExercisesByLanguage,
  evaluateAnswer,
};
