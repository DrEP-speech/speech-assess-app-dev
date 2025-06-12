import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ScoreForm from "./components/ScoreForm";
import ScoreDashboard from "./components/ScoreDashboard";
import AIScoreForm from "./components/AIScoreForm";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>Speech Assessment App</h1>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "10px" }}>
            Submit Score
          </Link>
          <Link to="/dashboard" style={{ marginRight: "10px" }}>
            View Score Dashboard
          </Link>
          <Link to="/ai-score">AI Scoring</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ScoreForm />} />
          <Route path="/dashboard" element={<ScoreDashboard />} />
          <Route path="/ai-score" element={<AIScoreForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
