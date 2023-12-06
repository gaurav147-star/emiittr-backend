const Progress = require("../models/progressModel");
const Exercise = require("../models/exerciseModel");

// Get user progress
const getAll = async (req, res) => {
  try {
    const allProgress = await Progress.find();
    res.json(allProgress);
  } catch (err) {
    res.status(500).json({
      error: "Error fetching all user progress",
      details: err.message,
    });
  }
};

const getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const userProgress = await Progress.find({ userId });
    res.json(userProgress);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user progress" });
  }
};

// Update user progress
const updateUserProgress = async (req, res) => {
  // console.log(req.body)
  try {
    const { userId, record } = req.body;

    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = new Progress({ userId, record });
    } else {
      for (const { lang, score } of record) {
        const foundLanguage = progress.record.find(
          (item) => item.lang === lang
        );

        if (foundLanguage) {
          // Update progress if exercise was completed or score improved
          if (score > foundLanguage.score) {
            foundLanguage.score = score;
          }
        } else {
          // Add new language record if it doesn't exist
          progress.record.push({ lang, score });
        }
      }
    }

    await progress.save();

    res.json({ message: "User progress updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error updating user progress" });
  }
};

exports.resetUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    // Logic to reset user progress
    res.json({ message: "User progress reset successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error resetting user progress" });
  }
};

// Get user's progress in a specific exercise
exports.getUserExerciseProgress = async (req, res) => {
  try {
    const { userId, exerciseId } = req.params;
    // Logic to fetch user's progress in a specific exercise
    res.json({ message: "User progress in the exercise fetched successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching user progress in the exercise" });
  }
};

// Other progress-related functionalities...

module.exports = {
  getUserProgress,
  getAll,
  updateUserProgress,
};
