"use client";

  import { useState } from "react";
  import type { Analysis } from "./lib/types";
  import { analyzeResume } from "./lib/api";
  import ResumeInput from "./components/ResumeInput";
  import ScoreCard from "./components/ScoreCard";
  import SectionCard from "./components/SectionCard";

  const SECTIONS: { key: keyof Analysis; title: string; accent: string; icon: string }[] = [
    { key: "missing_skills", title: "Missing Skills", accent: "border-amber-500/30 bg-amber-500/5", icon: "🎯" },
    { key: "red_flags", title: "Red Flags", accent: "border-rose-500/30 bg-rose-500/5", icon: "🚩" },
    { key: "resume_improvements", title: "Resume Improvements", accent: "border-sky-500/30 bg-sky-500/5", icon: "✏️ " },
    { key: "interview_prep", title: "Interview Prep", accent: "border-emerald-500/30 bg-emerald-500/5", icon: "💬" },
  ];

  export default function Home() {
    const [mode, setMode] = useState<"pdf" | "text">("pdf");
    const [file, setFile] = useState<File | null>(null);
    const [resumeText, setResumeText] = useState("");
    const [jd, setJd] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState<Analysis | null>(null);

    const canSubmit = jd.trim() && (mode === "pdf" ? file : resumeText.trim()) && !loading;

    async function handleAnalyze() {
      setLoading(true);
      setError("");
      setResult(null);
      try {
        const resume = mode === "pdf" ? { pdf: file! } : { text: resumeText };
        setResult(await analyzeResume(jd, resume));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    return (
      <div className="min-h-screen w-full bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
          <header className="mb-10 text-center">
            <h1 className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
              CareerFit
            </h1>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400">
              Match your resume to a job. Get an honest fit score, gaps, and a prep plan.
            </p>
          </header>

          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <ResumeInput
              mode={mode} setMode={setMode}
              file={file} setFile={setFile}
              text={resumeText} setText={setResumeText}
            />

            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium">Job Description</label>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the full job description here…"
                className="h-40 w-full resize-y rounded-xl border border-zinc-300 bg-transparent p-3 text-sm outline-none focus:border-sky-400 focus:ring-1
  focus:ring-sky-400 dark:border-zinc-700"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!canSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 py-3 font-semibold text-white transition
  enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Analyzing…
                </>
              ) : (
                "Analyze Fit"
              )}
            </button>

            {error && (
              <p className="mt-3 rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-600 dark:text-rose-400">
                {error}
              </p>
            )}
          </section>

          {result && (
            <section className="mt-8 space-y-6">
              <ScoreCard score={result.fit_score} summary={result.fit_summary} />
              <div className="grid gap-4 sm:grid-cols-2">
                {SECTIONS.map(({ key, title, accent, icon }) => (
                  <SectionCard
                    key={key}
                    title={title}
                    icon={icon}
                    accent={accent}
                    items={result[key] as string[]}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }
