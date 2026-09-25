import { useLenis } from 'lenis/react'
import { useLocation, useNavigate } from 'react-router-dom'

export const NAV_LINKS = [
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Stack', id: 'stack' },
  { label: 'Music', id: 'music' },
  { label: 'Contact', id: 'contact' },
]

/** Hook that scrolls to a section on the home page, from anywhere. */
export function useGoToSection() {
  const lenis = useLenis()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  return (id) => {
    if (pathname === '/') lenis?.scrollTo(`#${id}`, { duration: 1.6 })
    else navigate(`/#${id}`)
  }
}

