import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/scores", { name, score });
      alert("Score submitted!");
      setName("");
      setScore("");
    } catch (error) {
      alert("Error submitting score");
    }
  };

  return (
    <div>
      <h2>Submit a New Score</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Score" type="number" value={score} onChange={(e) => setScore(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
