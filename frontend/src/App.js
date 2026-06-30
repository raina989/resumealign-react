// frontend/src/App.js
import React, { useState } from 'react';
import ResumeUpload from './components/ResumeUpload';
import JDUpload from './components/JDUpload';
import Results from './components/Results';
import { analyzeResume } from './services/api';
import './App.css';

function App() {
  const [resumeText, setResumeText] = useState('');
  const [jdText, setJdText] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText || !jdText) {
      alert('Please provide both resume and job description');
      return;
    }

    setLoading(true);
    try {
      const data = await analyzeResume(resumeText, jdText);
      setResults(data);
    } catch (error) {
      alert('Analysis failed. Make sure the backend is running.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎯 ResumeAlign</h1>
        <p>Align your skills to your next role — intelligently.</p>
      </header>

      <div className="upload-grid">
        <ResumeUpload onTextExtracted={setResumeText} />
        <JDUpload onTextExtracted={setJdText} />
      </div>

      <div className="button-section">
        <button
          onClick={handleAnalyze}
          disabled={!resumeText || !jdText || loading}
          className="analyze-btn"
        >
          {loading ? '🔬 Analyzing...' : '🔍 Analyze Match'}
        </button>
      </div>

      {results && <Results data={results} />}
    </div>
  );
}

export default App;