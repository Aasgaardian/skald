// src/app/stories/page.tsx
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity'
import { Story } from '@/types/sanity'
import { groq } from 'next-sanity'
import { Metadata } from 'next'

// Metadata for the page
export const metadata: Metadata = {
    title: 'Stories | Skald',
    description: 'Explore our collection of immersive scrollytelling stories',
}

// GROQ query to get all stories with basic info
const storiesQuery = groq`
  *[_type == "story"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description
  }
`

export default async function StoriesIndexPage() {
    try {
        const stories = await sanityFetch<Story[]>({
            query: storiesQuery,
            tags: ['stories'],
        })

        return (
            <main className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8">Stories</h1>

                {stories.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                            No stories found.
                        </p>
                        <p className="text-gray-500 dark:text-gray-500">
                            Check back soon for new content!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stories.map((story) => (
                            <Link
                                key={story._id}
                                href={`/stories/${story.slug.current}`}
                                className="group"
                            >
                                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                                    <div className="bg-gray-100 dark:bg-gray-800 h-48 flex items-center justify-center">
                                        <span className="text-6xl text-gray-400 dark:text-gray-600 font-bold">
                                            {story.title.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {story.title}
                                        </h2>
                                        {story.description && (
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {story.description.length > 120
                                                    ? `${story.description.substring(0, 120)}...`
                                                    : story.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        )
    } catch (error) {
        console.error('Error fetching stories:', error)

        return (
            <main className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8">Stories</h1>
                <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-xl text-red-600 dark:text-red-400 mb-4">
                        Error loading stories.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        Please try again later.
                    </p>
                </div>
            </main>
        )
    }
}