import { CalendarCheck, Headset, Hotel, UserRoundCheck } from 'lucide-react'

const features = [
  {
    icon: UserRoundCheck,
    title: 'Local expert guides',
    text: 'Born-and-raised Sri Lankan guides who know the hidden viewpoints and the best time to visit.',
  },
  {
    icon: CalendarCheck,
    title: 'Flexible free cancellation',
    text: 'Plans change. Cancel for free up to 7 days before your trip starts.',
  },
  {
    icon: Hotel,
    title: 'Handpicked stays',
    text: 'From tea-estate bungalows to beachfront villas, every stay is checked by our team.',
  },
  {
    icon: Headset,
    title: '24/7 support on the road',
    text: 'One number to call at any hour, wherever you are on the island.',
  },
]

function WhyUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold tracking-widest text-coral-700 uppercase">Why Ceylon Trails</p>
        <h2 className="mt-2 text-3xl font-bold text-teal-900 sm:text-4xl">Travel with people who know the island</h2>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
          <li key={title} className="rounded-2xl bg-white p-6 shadow-md shadow-teal-950/5">
            <div className="inline-flex rounded-xl bg-teal-50 p-3">
              <Icon className="size-6 text-teal-700" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-teal-900">{title}</h3>
            <p className="mt-2 text-sm text-teal-900/70">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default WhyUs
