import os
from google import genai
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv(override=True)
client = genai.Client()

class Analysis(BaseModel):
    fit_score: int
    fit_summary: str
    missing_skills: list[str]
    red_flags: list[str]
    resume_improvements: list[str]
    interview_prep: list[str]


PROMPT = """You are a blunt, experienced technical recruiter and hiring manager. Compare the candidates'
RESUME against the JOB DESCRIPTION and produce an honest fit analysis.

Be specific and grounded ONLY in what the documents say. Do not invent skills or experience.
- fit_score: 0-100. Be realistic, not generous. 70+ means genuinely competitive.
- missing_skills: skills the JD requires that the resume lacks or barely shows.
- red_flags: things that would make a recruiter hesitate (emplyment gaps, vague impact, title/seniority mismatch, missing must-have).
  Empty list if none.
- resume_improvements: concrete, actionable edits tied to THIS job.
- interview_prep: what this candidate should drill before interviewing for THIS role.

RESUME:
{resume}

JOB DESCRIPTION:
{jd}
"""

def analyze(resume_text: str, jd_text: str) -> Analysis:
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=PROMPT.format(resume=resume_text, jd=jd_text),
        config={
            "response_mime_type": "application/json",
            "response_schema": Analysis
        }
    )
    return response.parsed


if __name__ == "__main__":
    from resume_parser import extract_resume_text
    with open("resume.pdf", "rb") as f:
        resume = extract_resume_text(f.read())
    jd = open("JD.txt", encoding="utf-8").read()

    result = analyze(resume, jd)
    print(f"\nFIT: {result.fit_score}/100 - {result.fit_summary}\n")
    for field in ["missing_skills", "red_flags", "resume_improvements", "interview_prep"]:
        print(f"## {field}")
        for item in getattr(result, field):
            print(f" - {item}")
        print()