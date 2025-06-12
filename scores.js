const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');

// GET all scores with optional filters
router.get('/', async (req, res) => {
  try {
    const { name, minScore, maxScore } = req.query;

    let query = {};
    if (name) query.name = new RegExp(name, 'i');
    if (minScore) query.score = { ...query.score, $gte: Number(minScore) };
    if (maxScore) query.score = { ...query.score, $lte: Number(maxScore) };

    const scores = await QuizResult.find(query).sort({ createdAt: -1 });
    res.json(scores);
  } catch (err) {
    console.error('Error fetching scores:', err);
    res.status(500).json({ error: 'Server error fetching scores' });
  }
});

// POST a new score
router.post('/', async (req, res) => {
  try {
    const { name, age, score } = req.body;
    const result = new QuizResult({ name, age, score });
    await result.save();
    res.status(201).json(result);
  } catch (err) {
    console.error('Error submitting score:', err);
    res.status(500).json({ error: 'Failed to submit score' });
  }
});

module.exports = router;
