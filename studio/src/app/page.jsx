// src/app/page.jsx
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <section className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-6">
          Skald: Create Immersive Scrollytelling Experiences
        </h1>
        <p className="text-xl mb-8">
          Build engaging stories with dynamic, scroll-based animations and interactions.
        </p>
        <Link
          href="/stories"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          View Stories
        </Link>
      </section>
    </Layout>
  )
}
