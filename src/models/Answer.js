const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true
  },
  answers: [{
    questionId: {
      type: Number,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }],
  score: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Answer', answerSchema);
