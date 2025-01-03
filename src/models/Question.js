const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  text: {
    type: String,
    required: true
  },
  correctAnswer: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);
