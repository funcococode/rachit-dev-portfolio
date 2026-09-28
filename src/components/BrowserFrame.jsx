/** Ruled browser chrome around a screenshot or artwork. */
export default function BrowserFrame({ url, children, className = '' }) {
  const host = url?.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return (
    <div className={`overflow-hidden border border-current ${className}`}>
      <div className="flex items-stretch border-b border-current">
        <div className="flex items-center gap-1.5 border-r border-current px-4 py-3">
          <span className="h-2.5 w-2.5 border border-current" />
          <span className="h-2.5 w-2.5 border border-current" />
          <span className="h-2.5 w-2.5 bg-current" />
        </div>
        <div className="flex flex-1 items-center truncate px-4 font-mono text-[11px]">{host}</div>
      </div>
      {children}
    </div>
  )
}
