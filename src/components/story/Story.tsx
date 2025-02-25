// src/components/story/Story.tsx
import React, { useState, useEffect, useRef } from 'react'
import { Story as StoryType } from '@/types/sanity'
import StorySection from './StorySection'

interface StoryProps {
    story: StoryType
}

export default function Story({ story }: StoryProps) {
    const [activeSection, setActiveSection] = useState<string | null>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)
    const storyRef = useRef<HTMLDivElement>(null)

    const { title, sections, defaultTransition } = story

    // Set up intersection observer to track which section is currently visible
    useEffect(() => {
        // Clean up any existing observer
        if (observerRef.current) {
            observerRef.current.disconnect()
        }

        // Find all section elements within our story container
        const sectionElements = storyRef.current?.querySelectorAll('section[id]') || []

        if (sectionElements.length === 0) return

        // Create a new observer that will track which sections are in view
        observerRef.current = new IntersectionObserver(
            (entries) => {
                // Find the entry with the highest intersection ratio
                const visibleEntries = entries.filter(entry => entry.isIntersecting)

                if (visibleEntries.length > 0) {
                    // Sort by intersection ratio to find the most visible section
                    const mostVisibleEntry = visibleEntries.sort(
                        (a, b) => b.intersectionRatio - a.intersectionRatio
                    )[0]

                    if (mostVisibleEntry && mostVisibleEntry.target.id) {
                        setActiveSection(mostVisibleEntry.target.id)
                    }
                }
            },
            {
                // These options can be adjusted based on your needs
                root: null, // Use the viewport
                rootMargin: '-10% 0px -10% 0px', // Adjust when sections become "active"
                threshold: [0.1, 0.3, 0.5, 0.7, 0.9], // Multiple thresholds for better accuracy
            }
        )

        // Observe all section elements
        sectionElements.forEach((element) => {
            if (observerRef.current) {
                observerRef.current.observe(element)
            }
        })

        // Clean up on unmount
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [sections]) // Re-run when sections change

    // Handle section activation
    const handleSectionInView = (sectionId: string) => {
        setActiveSection(sectionId)
    }

    return (
        <div className="story-container relative" ref={storyRef}>
            {/* Story title could be shown here if needed */}

            {/* Render all story sections */}
            {sections?.map((section) => (
                <StorySection
                    key={section._key}
                    section={section}
                    defaultTransition={defaultTransition}
                    isActive={section.sectionId === activeSection}
                    onSectionInView={handleSectionInView}
                />
            ))}
        </div>
    )
}