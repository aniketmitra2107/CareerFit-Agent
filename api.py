from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from agent import analyze, Analysis
from resume_parser import extract_resume_text

app = FastAPI(title="CareerFit")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["POST"],
    allow_headers=["*"],
)
@app.post("/analyze", response_model=Analysis)
async def analyze_endpoint(
        jd: str = Form(...),
        resume_text: str = Form(None),
        resume_pdf : UploadFile = None,

):
    if resume_pdf is not None:
        try:
            resume = extract_resume_text(await resume_pdf.read())
        except ValueError as e:
            raise HTTPException(status_code=422, detail=str(e))
    elif resume_text:
        resume = resume_text
    else:
        raise HTTPException(status_code=422, detail="Provide a resume PDF or pasted resume text.")
    
    return analyze(resume, jd)