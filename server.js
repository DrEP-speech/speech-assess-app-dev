// Load environment variables from .env
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// MongoDB URI from .env
const mongoURI = process.env.MONGO_URI;
console.log("Using Mongo URI:", mongoURI);

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Define Mongoose schema and model
const scoreSchema = new mongoose.Schema({
  name: String,
  age: Number,
  score: Number,
  createdAt: { type: Date, default: Date.now }
});

const Score = mongoose.model("Score", scoreSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Speech Assessment API is running.");
const aiScoreRoute = require("./routes/scoreAI");
app.use("/api", aiScoreRoute);
});

// GET all scores
app.get("/api/scores", async (req, res) => {
  try {
    const scores = await Score.find().sort({ createdAt: -1 });
    res.json(scores);
const scoreSpeechHook = require('./api/hooks/scoreSpeech');
app.use('/api/hooks', scoreSpeechHook);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve scores" });
  }
});

// POST a new score
app.post("/api/scores", async (req, res) => {
  try {
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
    const { name, age, score } = req.body;
    const newScore = new Score({ name, age, score });
    const savedScore = await newScore.save();
const scoresRoute = require('./routes/scores');
app.use('/api/scores', scoresRoute);
    res.json(savedScore);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit score" });
  }
});

// Serve frontend (optional, for deployment)
app.use(express.static(path.join(__dirname, "public")));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
