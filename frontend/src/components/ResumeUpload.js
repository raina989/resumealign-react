// frontend/src/components/ResumeUpload.js
import React, { useState } from 'react';

const ResumeUpload = ({ onTextExtracted }) => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    onTextExtracted(newText);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setText(content);
        onTextExtracted(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="upload-card">
      <h2>📄 Your Resume</h2>
      <div className="file-input-wrapper">
        <input type="file" accept=".txt,.pdf,.docx" onChange={handleFileUpload} />
      </div>
      <textarea
        className="text-input"
        placeholder="Paste your resume text here..."
        value={text}
        onChange={handleTextChange}
      />
    </div>
  );
};

export default ResumeUpload;