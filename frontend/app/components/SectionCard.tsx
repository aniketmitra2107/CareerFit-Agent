export default function SectionCard({
    title, icon, accent, items,
  }: { title: string; icon: string; accent: string; items: string[] }) {
    return (
      <div className={`rounded-2xl border p-5 ${accent}`}>
        <h3 className="mb-3 flex items-center gap-2 font-semibold">
          <span>{icon}</span> {title}
          <span className="ml-auto text-xs font-normal text-zinc-400">{items.length}</span>
        </h3>
        {items.length === 0 ? (
          <p className="text-sm text-zinc-400">None found 🎉</p>
        ) : (
          <ul className="space-y-2 text-sm leading-relaxed">
            {items.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-40" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
