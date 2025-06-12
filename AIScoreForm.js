import React, { useState } from "react";
import axios from "axios";

const AIScoreForm = () => {
  const [formData, setFormData] = useState({ name: "", age: "", transcript: "" });
  const [audioFile, setAudioFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleTranscribe = async () => {
    if (!audioFile) return setMessage("❌ Please upload an audio file.");
    const data = new FormData();
    data.append("audio", audioFile);
    try {
      const res = await axios.post("http://localhost:5000/api/hooks/transcribe", data);
      setTranscript(res.data.transcript);
      setFormData({ ...formData, transcript: res.data.transcript });
      setMessage("✅ Transcription complete.");
    } catch (err) {
      console.error(err);
      setMessage("❌ Transcription failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/hooks/score", formData);
      if (res.data.score) {
        setScore(res.data.score);
        setMessage("✅ Score submitted successfully!");
      } else {
        setMessage("❌ Failed to generate score.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Submission error.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>AI Scoring Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        /><br />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        /><br />
        <textarea
          name="transcript"
          placeholder="Transcript"
          value={formData.transcript || transcript}
          onChange={handleChange}
          rows={4}
          cols={50}
        /><br />
        <input type="file" accept="audio/*" onChange={handleAudioChange} /><br />
        <button type="button" onClick={handleTranscribe}>Transcribe Audio</button>
        <button type="submit">Submit for Scoring</button>
      </form>
      {message && <p>{message}</p>}
      {score !== null && <p>🧠 AI Score: <strong>{score}</strong></p>}
    </div>
  );
};

export default AIScoreForm;
