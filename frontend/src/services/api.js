// API service for communicating with backend
import axios from 'axios';

const API_BASE = 'https://resumealign-api-x6l6y27biq-uc.a.run.app';

export const analyzeResume = async (resumeText, jdText) => {
  try {
    const response = await axios.post(`${API_BASE}/analyze`, {
      resume: resumeText,
      job_description: jdText
    });
    return response.data;
  } catch (error) {
    console.error('Analysis failed:', error);
    throw error;
  }
};