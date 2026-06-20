from pypdf import PdfReader
import io

def extract_resume_text(pdf_bytes: bytes) -> str:
    """
        PDF bytes -> plain text. Raises if the PDF has no extractable text.
    """
    reader = PdfReader(io.BytesIO(pdf_bytes))
    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    text = text.strip()

    if len(text) < 50:
        raise ValueError("Couldn't read this PDF (it may be scanned). Paste the text instead.")
    return text
