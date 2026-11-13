import { useState } from 'react'

interface ImageGalleryProps {
  images: string[]
  name: string
}

function ImageGallery({ images, name }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div>
      <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-sand-200 shadow-md shadow-teal-950/10">
        <img
          src={images[activeIndex]}
          alt={`${name} — photo ${activeIndex + 1} of ${images.length}`}
          className="size-full object-cover"
        />
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((image, index) => {
          const isActive = index === activeIndex
          return (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show photo ${index + 1} of ${images.length}`}
              aria-pressed={isActive}
              className={`aspect-[4/3] overflow-hidden rounded-xl transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500 ${
                isActive ? 'ring-3 ring-coral-500' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img src={image} alt="" loading="lazy" className="size-full object-cover" />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
