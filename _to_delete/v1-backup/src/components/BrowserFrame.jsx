/** Minimal browser chrome around a screenshot or artwork. */
export default function BrowserFrame({ url, children, className = '' }) {
  const host = url?.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-ink-2 shadow-2xl shadow-black/50 ${className}`}>
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-bone/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-bone/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-bone/20" />
        </div>
        <div className="mx-auto max-w-xs flex-1 truncate rounded-md bg-ink-3 px-3 py-1 text-center font-mono text-[11px] text-ash">
          {host}
        </div>
        <div className="w-10" />
      </div>
      {children}
    </div>
  )
}
