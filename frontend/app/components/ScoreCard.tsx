function color(s: number) {
    if (s >= 70) return "text-emerald-500";
    if (s >= 45) return "text-amber-500";
    return "text-rose-500";
  }
  function ring(s: number) {
    if (s >= 70) return "#10b981";
    if (s >= 45) return "#f59e0b";
    return "#f43f5e";
  }

  export default function ScoreCard({ score, summary }: { score: number; summary: string }) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row dark:border-zinc-800 dark:bg-zinc-900">
        <div className="relative h-28 w-28 shrink-0">
          <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-200 dark:text-zinc-800" />
            <circle
              cx="50" cy="50" r="42" fill="none" strokeWidth="8" strokeLinecap="round"
              stroke={ring(score)}
              strokeDasharray={`${(score / 100) * 264} 264`}
            />
          </svg>
          <div className={`absolute inset-0 flex items-center justify-center text-3xl font-bold ${color(score)}`}>
            {score}
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Fit Score</h2>
          <p className="mt-1 leading-relaxed text-zinc-700 dark:text-zinc-300">{summary}</p>
        </div>
      </div>
    );
  }
