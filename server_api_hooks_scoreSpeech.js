const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
require("dotenv").config();

// Multer config for audio upload
const upload = multer({ dest: "uploads/" });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// POST /api/hooks/transcribe
router.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    const response = await openai.createTranscription(
      fs.createReadStream(req.file.path),
      "whisper-1"
    );
    res.json({ transcript: response.data.text });
  } catch (error) {
    console.error("Transcription error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to transcribe audio" });
  }
});

// POST /api/hooks/score
router.post("/score", async (req, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript) return res.status(400).json({ error: "Missing transcript" });

    // Simple scoring logic: score = number of words
    const score = transcript.trim().split(" ").length;

    res.json({ score });
  } catch (error) {
    console.error("Score error:", error.message);
    res.status(500).json({ error: "Failed to score" });
  }
});

module.exports = router;
