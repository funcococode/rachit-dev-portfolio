import { forwardRef } from 'react'

/**
 * The signature hover: a solid block rises from the bottom and the text
 * flips to the background colour. Works on any section because it uses
 * the stage's --fg / --bg variables.
 *
 * <FillBox as="a" href="...">Get in touch</FillBox>
 * <FillBox as={Link} to="/work/x">Open</FillBox>
 */
const FillBox = forwardRef(function FillBox({ as: Tag = 'button', children, className = '', fillClassName = '', ...rest }, ref) {
  return (
    <Tag ref={ref} className={`group relative isolate flex overflow-hidden ${className}`} {...rest}>
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 translate-y-full bg-[var(--fg)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 ${fillClassName}`}
      />
      <span className="relative flex h-full w-full items-center justify-between gap-4 transition-colors duration-500 group-hover:text-[var(--bg)]">
        {children}
      </span>
    </Tag>
  )
})

export default FillBox
