import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import DestinationDetails from './pages/DestinationDetails'
import Explore from './pages/Explore'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="destinations" element={<Explore />} />
        <Route path="destinations/:id" element={<DestinationDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
