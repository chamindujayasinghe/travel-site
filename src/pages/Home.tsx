import CategoryGrid from '../components/home/CategoryGrid'
import FeaturedDestinations from '../components/home/FeaturedDestinations'
import Hero from '../components/home/Hero'
import Testimonials from '../components/home/Testimonials'
import WhyUs from '../components/home/WhyUs'

function Home() {
  return (
    <>
      <Hero />
      <FeaturedDestinations />
      <CategoryGrid />
      <WhyUs />
      <Testimonials />
    </>
  )
}

export default Home
