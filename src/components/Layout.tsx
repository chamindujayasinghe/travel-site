import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout() {
  const { pathname } = useLocation()

  // Start each new page at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
