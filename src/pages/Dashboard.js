import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/scores")
      .then(res => setScores(res.data))
      .catch(() => setScores([]));
  }, []);

  return (
    <div>
      <h2>Score Dashboard</h2>
      {scores.length === 0 ? <p>No scores found.</p> : (
        <ul>
          {scores.map((item, index) => (
            <li key={index}>{item.name}: {item.score}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
