const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');

// Submit player answers
router.post('/', async (req, res) => {
  const answer = new Answer({
    playerName: req.body.playerName,
    answers: req.body.answers
  });

  try {
    const newAnswer = await answer.save();
    res.status(201).json(newAnswer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Calculate scores after admin submits correct answers
router.post('/calculate-scores', async (req, res) => {
  try {
    const questions = await Question.find();
    const answers = await Answer.find();
    
    // Calculate score for each player
    for (let playerAnswer of answers) {
      let score = 0;
      for (let answer of playerAnswer.answers) {
        const question = questions.find(q => q.id === answer.questionId);
        if (question && question.correctAnswer === answer.answer) {
          score++;
        }
      }
      
      await Answer.findByIdAndUpdate(
        playerAnswer._id,
        { score: score }
      );
    }

    res.status(200).json({ message: 'Scores calculated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get results/leaderboard
router.get('/results', async (req, res) => {
  try {
    const results = await Answer.find()
      .sort({ score: -1 })
      .select('playerName score');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
