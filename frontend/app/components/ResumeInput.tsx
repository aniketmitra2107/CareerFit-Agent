"use client";

type Props = {
    mode: "pdf" | "text";
    setMode: (m: "pdf" | "text") => void;
    file: File | null;
    setFile: (f: File | null) => void;
    text: string;
    setText: (t: string) => void;
};

export default function ResumeInput({ mode, setMode, file, setFile, text, setText }: Props) {
    return (
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium">Your Resume</label>
          <div className="flex rounded-lg bg-zinc-100 p-0.5 text-xs dark:bg-zinc-800">
            {(["pdf", "text"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-md px-3 py-1 font-medium transition ${
                  mode === m
                    ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                {m === "pdf" ? "Upload PDF" : "Paste text"}
              </button>
            ))}
          </div>
        </div>

        {mode === "pdf" ? (
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 px-4 py-8 text-center transition
  hover:border-sky-400 hover:bg-sky-50/50 dark:border-zinc-700 dark:hover:border-sky-500 dark:hover:bg-sky-950/20">
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <span className="text-2xl">📄</span>
            <span className="mt-2 text-sm font-medium">
              {file ? file.name : "Click to upload your resume PDF"}
            </span>
            <span className="mt-1 text-xs text-zinc-400">PDF only · scanned files won&apos;t work</span>
          </label>
        ) : (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your resume text here…"
            className="h-40 w-full resize-y rounded-xl border border-zinc-300 bg-transparent p-3 text-sm outline-none focus:border-sky-400 focus:ring-1
  focus:ring-sky-400 dark:border-zinc-700"
          />
        )}
      </div>
    );
  }