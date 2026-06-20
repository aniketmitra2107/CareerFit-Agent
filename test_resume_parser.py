from resume_parser import extract_resume_text

def test_real_pdf():
    with open("resume.pdf", "rb") as f:
        text = extract_resume_text(f.read())
    assert "experience" in text.lower()

    print("ok:", len(text), "chars")

if __name__ == "__main__":
    test_real_pdf()