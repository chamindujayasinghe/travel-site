import { useParams } from 'react-router'

function DestinationDetails() {
  const { id } = useParams<{ id: string }>()

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-teal-800 sm:text-4xl">Destination details</h1>
      <p className="mt-4 text-teal-900/80">
        Destination: <span className="font-semibold text-coral-600">{id}</span>
      </p>
    </section>
  )
}

export default DestinationDetails
