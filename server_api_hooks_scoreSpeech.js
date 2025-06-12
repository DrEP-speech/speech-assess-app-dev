const express = require('express');
const router = express.Router();

// Mock AI scoring logic (replace with real model/API later)
router.post('/score', (req, res) => {
  const { transcript } = req.body;

  if (!transcript) {
    return res.status(400).json({ error: "Transcript is required" });
  }

  // Example: mock score logic
  const clean = transcript.toLowerCase().includes('s') ? 90 : 60;
  const feedback = clean > 80 ? "Great use of /s/ sounds!" : "Needs improvement in articulation.";

  res.json({
    transcript,
    score: clean,
    feedback
  });
});

module.exports = router;
