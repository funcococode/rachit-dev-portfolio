import { useLenis } from 'lenis/react'
import { useLocation, useNavigate } from 'react-router-dom'

// `id` → scroll to a section on the home page; `to` → a separate page.
export const NAV_LINKS = [
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Stack', id: 'stack' },
  { label: 'What else', to: '/else' },
  { label: 'Contact', to: '/contact' },
]

/** Scrolls to a section on the home page (or a page route) from anywhere. */
export function useGoToSection() {
  const lenis = useLenis()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  return (target) => {
    if (target.startsWith('/')) return navigate(target)
    if (target === 'contact' || pathname === '/') {
      const el = document.getElementById(target)
      if (el) return lenis?.scrollTo(el, { duration: 1.6 })
    }
    navigate(`/#${target}`)
  }
}
