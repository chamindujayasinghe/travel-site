import { Link } from 'react-router'

function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl font-bold text-coral-500">404</p>
      <h1 className="mt-4 text-2xl font-bold text-teal-800 sm:text-3xl">Looks like you've wandered off the trail</h1>
      <p className="mt-3 text-teal-900/80">The page you're looking for doesn't exist or has moved.</p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-teal-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-800"
      >
        Back to home
      </Link>
    </section>
  )
}

export default NotFound
