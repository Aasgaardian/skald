// src/lib/sanity.js
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const config = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2023-05-03', // Use the latest API version
    useCdn: process.env.NODE_ENV === 'production', // Use CDN for production builds
}

// Create a Sanity client
export const client = createClient(config)

// Helper function for Sanity image URLs
const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)