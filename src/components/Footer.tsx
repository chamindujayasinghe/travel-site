import { Compass } from 'lucide-react'
import { Link } from 'react-router'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-teal-900 text-sand-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:gap-16 lg:px-8">
        <div className="max-w-sm md:mr-auto">
          <Link to="/" className="flex items-center gap-2 text-white">
            <Compass className="size-6 text-coral-400" aria-hidden="true" />
            <span className="text-lg font-bold">Ceylon Trails</span>
          </Link>
          <p className="mt-3 text-sm text-sand-200">
            Hand-picked journeys across Sri Lanka — from misty hill country to golden southern beaches.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-coral-400">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/destinations" className="hover:text-white hover:underline">All destinations</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-coral-400">Company</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-white hover:underline">About us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white hover:underline">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-teal-800 py-4 text-center text-xs text-sand-300">
        © {year} Ceylon Trails. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
