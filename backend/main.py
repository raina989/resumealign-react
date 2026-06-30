# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.matcher import calculate_detailed_match, get_match_interpretation
import traceback

app = FastAPI()

# CORS - Allow all origins (for testing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    resume: str
    job_description: str

@app.get("/")
def read_root():
    return {"message": "Resume Matcher API is running"}

@app.post("/analyze")
async def analyze(request: AnalyzeRequest):
    try:
        result = calculate_detailed_match(request.resume, request.job_description)
        
        return {
            "score": result["overall"],
            "breakdown": result["breakdown"],
            "matched_skills": result["details"]["matched_skills"],
            "missing_skills": result["details"]["missing_skills"],
            "matched_keywords": result["details"]["matched_keywords"],
            "missing_keywords": result["details"]["missing_keywords"],
            "interpretation": get_match_interpretation(result["overall"])
        }
    except Exception as e:
        print("=" * 50)
        print("ERROR IN ANALYZE ENDPOINT:")
        print(traceback.format_exc())
        print("=" * 50)
        raise HTTPException(status_code=500, detail=str(e))