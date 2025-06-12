const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/score-audio", async (req, res) => {
  try {
    const { audioBase64, prompt } = req.body;

    // Send audio to a transcription/AI API (example: Whisper or custom model)
    const response = await axios.post("https://api.openai.com/v1/audio/transcriptions", {
      file: audioBase64,
      model: "whisper-1",
      prompt,
      response_format: "text"
    }, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const transcription = response.data;
    // TODO: Add your logic to calculate score based on expected vs actual transcription

    res.json({
      transcription,
      score: 95 // placeholder score
    });

  } catch (error) {
    console.error("❌ AI Scoring Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Scoring failed." });
  }
});

module.exports = router;
