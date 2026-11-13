export interface Testimonial {
  id: number
  name: string
  country: string
  rating: number
  quote: string
  destinationId: string
  destinationName: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Emma Clarke',
    country: 'United Kingdom',
    rating: 5,
    quote:
      'Watching the blue train cross Nine Arch Bridge was magical. Our guide knew exactly when to arrive so we had the best spot — the whole trip felt effortless.',
    destinationId: 'ella',
    destinationName: 'Ella',
  },
  {
    id: 2,
    name: 'Lukas Weber',
    country: 'Germany',
    rating: 5,
    quote:
      'We saw two leopards on our sunrise safari in Yala! The jeep was comfortable and the tracker had incredible eyes. Easily the highlight of our holiday.',
    destinationId: 'yala',
    destinationName: 'Yala National Park',
  },
  {
    id: 3,
    name: 'Priya Nair',
    country: 'India',
    rating: 4,
    quote:
      'Climbing Sigiriya early in the morning beat the heat and the crowds. The view from the top is unreal. Booking was simple and the itinerary was well paced.',
    destinationId: 'sigiriya',
    destinationName: 'Sigiriya',
  },
]
