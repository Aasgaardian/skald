// src/lib/sanity.ts
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Environment variables with defaults for safety
// Using the project ID from your sanity.cli.ts as a fallback
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'c6jr14gi'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'

// Configuration options
export const config = {
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === 'production', // Use CDN for production builds
}

// Create a Sanity client
export const client = createClient(config)

// Create a preview client for draft content with the same config
export const previewClient = createClient({
    ...config,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
})

// Helper to determine which client to use
export const getClient = (usePreview = false) => (usePreview ? previewClient : client)

// Helper function for Sanity image URLs
const builder = imageUrlBuilder(client)
export const urlFor = (source: SanityImageSource) => builder.image(source)

// Typed sanity fetch helper with cache options
export async function sanityFetch<QueryResponse>({
    query,
    params = {},
    tags = [],
    usePreview = false,
}: {
    query: string
    params?: Record<string, any>
    tags?: string[]
    usePreview?: boolean
}): Promise<QueryResponse> {
    return getClient(usePreview).fetch < QueryResponse > (query, params, {
        next: { tags }
    })
}