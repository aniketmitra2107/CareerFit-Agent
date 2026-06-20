import type { Analysis } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function analyzeResume(
    jd: string,
    resume: { pdf: File } | { text: string } 
): Promise<Analysis> {
    const form = new FormData();
    form.append("jd", jd);
    if ("pdf" in resume) form.append("resume_pdf", resume.pdf);
    else form.append("resume_text", resume.text);

    const response = await fetch(`${API_URL}/analyze`, {method: "POST", body: form });

    if(!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.detail ?? `Request failed (${response.status})`);
    }
    return response.json();
}