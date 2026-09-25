/**
 * Letters roll up and are replaced by a copy on hover (parent needs `group`).
 * Pure CSS transitions — cheap enough to use on every link.
 */
export default function RollText({ children, className = '' }) {
  const chars = [...String(children)]
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`} aria-label={children}>
      {chars.map((c, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="relative inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
          style={{ transitionDelay: `${i * 18}ms` }}
        >
          <span className="inline-block">{c === ' ' ? ' ' : c}</span>
          <span className="absolute left-0 top-full inline-block">{c === ' ' ? ' ' : c}</span>
        </span>
      ))}
    </span>
  )
}
