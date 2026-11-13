import { Compass, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/destinations', label: 'Explore' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-coral-500 text-teal-950' : 'text-teal-900 hover:bg-sand-200'
  }`
}

function Navbar() {
  const { pathname } = useLocation()
  // Remember which page the menu was opened on, so it closes automatically on navigation
  const [openedOn, setOpenedOn] = useState<string | null>(null)
  const menuOpen = openedOn === pathname
  const closeMenu = () => setOpenedOn(null)

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200 bg-sand-50/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 text-teal-800">
          <Compass className="size-7 text-coral-500" aria-hidden="true" />
          <span className="text-xl font-bold tracking-tight">Ceylon Trails</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className={navLinkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpenedOn(menuOpen ? null : pathname)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="rounded-full p-2 text-teal-900 hover:bg-sand-200 focus-visible:outline-2 focus-visible:outline-coral-500 md:hidden"
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <ul id="mobile-menu" className="flex flex-col gap-1 border-t border-sand-200 px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                onClick={closeMenu}
                className={(state) => `block ${navLinkClass(state)}`}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

export default Navbar
