import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ScoreForm from "./components/ScoreForm";
import AIScoreForm from "./components/AIScoreForm";
import ScoreDashboard from "./components/ScoreDashboard";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Speech Assessment App</h1>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "15px" }}>➕ Submit Score</Link>
          <Link to="/ai-score" style={{ marginRight: "15px" }}>🤖 AI Score</Link>
          <Link to="/dashboard">📊 View Score Dashboard</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ScoreForm />} />
          <Route path="/ai-score" element={<AIScoreForm />} />
          <Route path="/dashboard" element={<ScoreDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
