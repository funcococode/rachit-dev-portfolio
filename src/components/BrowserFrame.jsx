/** Chunky browser chrome around a screenshot or artwork. */
export default function BrowserFrame({ url, children, className = '' }) {
  const host = url?.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return (
    <div className={`card-pop overflow-hidden bg-cream text-ink ${className}`}>
      <div className="flex items-center gap-3 border-b-2 border-ink px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full border-2 border-ink bg-tang" />
          <span className="h-3 w-3 rounded-full border-2 border-ink bg-lime" />
          <span className="h-3 w-3 rounded-full border-2 border-ink bg-sky" />
        </div>
        <div className="mx-auto max-w-xs flex-1 truncate rounded-full border-2 border-ink px-3 py-0.5 text-center font-mono text-[11px]">
          {host}
        </div>
        <div className="w-12" />
      </div>
      {children}
    </div>
  )
}
