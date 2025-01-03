const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().select('-correctAnswer');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new question (admin only)
router.post('/', async (req, res) => {
  const question = new Question({
    id: req.body.id,
    text: req.body.text
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Submit correct answers (admin only)
router.post('/correct-answers', async (req, res) => {
  try {
    const updates = req.body.answers.map(answer => ({
      updateOne: {
        filter: { id: answer.questionId },
        update: { correctAnswer: answer.answer }
      }
    }));

    await Question.bulkWrite(updates);
    res.status(200).json({ message: 'Correct answers updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get questions with correct answers (admin only)
router.get('/with-answers', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
