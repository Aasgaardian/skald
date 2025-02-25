// src/components/story/StorySection.tsx
import React, { useRef, useEffect } from 'react'
import { StorySection as StorySectionType, ContentBlock } from '@/types/sanity'
import Background from './Background'
import TextBlock from './TextBlock'
import ImageBlock from './ImageBlock'
import VideoBlock from './VideoBlock'
import CustomBlock from './CustomBlock'
import { twMerge } from 'tailwind-merge'
import { getAnimationClasses, getAnimationStyles } from '@/lib/animations'

interface StorySectionProps {
    section: StorySectionType
    defaultTransition?: string
    isActive?: boolean
    onSectionInView?: (sectionId: string) => void
}

export default function StorySection({
    section,
    defaultTransition = 'fade',
    isActive = false,
    onSectionInView
}: StorySectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { sectionId, background, content, transitionEffect } = section

    // Set up an effect to call onSectionInView when this section comes into view
    // This would be used with an Intersection Observer in a real implementation
    useEffect(() => {
        if (sectionId && onSectionInView && sectionRef.current && isActive) {
            onSectionInView(sectionId)
        }
    }, [sectionId, onSectionInView, isActive])

    // Determine which transition effect to use (section-specific or default)
    const transition = transitionEffect || defaultTransition

    // Handle content blocks based on their type
    const renderContentBlock = (block: ContentBlock) => {
        switch (block._type) {
            case 'textBlock':
                return <TextBlock key={block._key} block={block} />

            case 'imageBlock':
                return <ImageBlock key={block._key} block={block} />

            case 'videoBlock':
                return <VideoBlock
                    key={block._key}
                    block={block}
                    isActive={isActive}
                    scrollVideoProgress={scrollVideoProgress}
                />

            case 'customBlock':
                return <CustomBlock key={block._key} block={block} />

            default:
                // For unknown block types, render a placeholder
                return (
                    <div key={block._key} className="p-4 bg-gray-100 dark:bg-gray-800 rounded my-4 mx-auto max-w-2xl">
                        <p className="text-center">[Unknown Block Type: {block._type}]</p>
                    </div>
                )
        }
    }

    // Define transition classes based on the selected transition type
    const transitionClasses = {
        'fade': 'transition-opacity duration-1000',
        'slide': 'transition-transform duration-1000',
        'zoom': 'transition-transform duration-1000',
        'parallax': 'transition-transform duration-1000',
        'none': ''
    }

    // Visibility classes and styles based on active state and transition type
    const getTransitionStyles = (): React.CSSProperties => {
        switch (transition) {
            case 'fade':
                return {
                    opacity: isActive ? 1 : 0
                }
            case 'slide':
                return {
                    transform: isActive ? 'translateY(0)' : 'translateY(100px)'
                }
            case 'zoom':
                return {
                    transform: isActive ? 'scale(1)' : 'scale(0.9)'
                }
            case 'parallax':
                return {
                    transform: isActive ? 'translateY(0)' : 'translateY(50px)'
                }
            default:
                return {}
        }
    }

    return (
        <section
            ref={sectionRef}
            id={sectionId}
            className={twMerge(
                'relative min-h-screen flex flex-col overflow-hidden',
                transitionClasses[transition as keyof typeof transitionClasses] || ''
            )}
            style={getTransitionStyles()}
        >
            {/* Render the background component with the section's background settings */}
            {background && <Background settings={background} />}

            {/* Content container */}
            <div className="relative z-10 flex flex-col flex-grow p-4 sm:p-6 md:p-8">
                {/* Render all content blocks */}
                {content?.map(renderContentBlock)}
            </div>
        </section>
    )
}