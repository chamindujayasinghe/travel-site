import { Link } from 'react-router'
import { destinations } from '../../data/destinations'
import { CATEGORIES } from '../../types/destination'

// One tile per category, using the first matching destination's photo and a live count
const categoryTiles = CATEGORIES.map((category) => {
  const matches = destinations.filter((d) => d.category === category)
  return { category, count: matches.length, image: matches[0]?.images[0] }
})

function CategoryGrid() {
  return (
    <section className="bg-sand-100 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-widest text-coral-700 uppercase">Travel styles</p>
        <h2 className="mt-2 text-3xl font-bold text-teal-900 sm:text-4xl">Browse by travel style</h2>
        <p className="mt-3 max-w-2xl text-teal-900/70">
          Whether you want history, hills, wildlife or waves — pick a style and we’ll show you where to go.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categoryTiles.map(({ category, count, image }) => (
            <Link
              key={category}
              to={`/destinations?category=${encodeURIComponent(category)}`}
              className="group relative isolate flex aspect-[3/4] items-end overflow-hidden rounded-2xl p-4 shadow-md shadow-teal-950/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500"
            >
              <img
                src={image}
                alt=""
                loading="lazy"
                className="absolute inset-0 -z-10 size-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-teal-950/85 via-teal-950/20 to-transparent" />
              <div>
                <h3 className="text-lg font-bold text-white">{category}</h3>
                <p className="text-sm text-sand-100/90">
                  {count} {count === 1 ? 'place' : 'places'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid
