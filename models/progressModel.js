const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  record: [
    {
      lang: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;
