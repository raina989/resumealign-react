# backend/test_matcher.py
from src.matcher import calculate_detailed_match

resume = "Python developer with 5 years experience in Django and React"
jd = "Looking for a Python developer with Django experience"

result = calculate_detailed_match(resume, jd)
print("Score:", result["overall"])
print("Matched Skills:", result["details"]["matched_skills"])
print("Missing Skills:", result["details"]["missing_skills"])