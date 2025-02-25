// src/components/story/TextBlock.tsx
import React from 'react'
import { TextBlock as TextBlockType } from '@/types/sanity'
import { twMerge } from 'tailwind-merge'

// A simple renderer for Sanity block content
// For more complex applications, you might want to use @portabletext/react
const renderBlockContent = (content: any[]) => {
    if (!content) return null

    return content.map((block) => {
        if (block._type !== 'block') return null

        const { style = 'normal', _key, children } = block

        // Extract text from spans
        const text = children
            ?.filter((child: any) => child._type === 'span')
            .map((span: any) => span.text)
            .join('') || ''

        // Render different heading styles
        switch (style) {
            case 'h1':
                return <h1 key={_key} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{text}</h1>
            case 'h2':
                return <h2 key={_key} className="text-3xl md:text-4xl font-bold mb-3">{text}</h2>
            case 'h3':
                return <h3 key={_key} className="text-2xl md:text-3xl font-semibold mb-2">{text}</h3>
            case 'blockquote':
                return (
                    <blockquote key={_key} className="border-l-4 border-gray-300 pl-4 italic my-4">
                        {text}
                    </blockquote>
                )
            case 'normal':
            default:
                return <p key={_key} className="mb-4 text-lg">{text}</p>
        }
    })
}

// Map Sanity position values to Tailwind classes
const positionClasses: Record<string, string> = {
    'center': 'items-center justify-center text-center',
    'top-left': 'items-start justify-start text-left',
    'top-center': 'items-start justify-center text-center',
    'top-right': 'items-start justify-end text-right',
    'center-left': 'items-center justify-start text-left',
    'center-right': 'items-center justify-end text-right',
    'bottom-left': 'items-end justify-start text-left',
    'bottom-center': 'items-end justify-center text-center',
    'bottom-right': 'items-end justify-end text-right'
}

interface TextBlockProps {
    block: TextBlockType
    className?: string
}

export default function TextBlock({ block, className }: TextBlockProps) {
    const { content, position = 'center', containerStyle, animation } = block

    // Apply container styles if provided
    const getContainerStyles = () => {
        if (!containerStyle) return {}

        // These are placeholders until we define the actual structure
        const styles: React.CSSProperties = {}

        if (containerStyle.backgroundColor?.hex) {
            styles.backgroundColor = containerStyle.backgroundColor.hex
        }

        if (containerStyle.textColor?.hex) {
            styles.color = containerStyle.textColor.hex
        }

        if (containerStyle.maxWidth) {
            styles.maxWidth = containerStyle.maxWidth
        }

        if (containerStyle.padding) {
            styles.padding = containerStyle.padding
        }

        if (containerStyle.margin) {
            styles.margin = containerStyle.margin
        }

        if (containerStyle.borderRadius) {
            styles.borderRadius = containerStyle.borderRadius
        }

        return styles
    }

    return (
        <div
            className={twMerge(
                'flex flex-col p-6 max-w-prose mx-auto relative z-10',
                positionClasses[position] || positionClasses['center'],
                className
            )}
            style={getContainerStyles()}
        // Animation settings will be implemented later
        >
            {renderBlockContent(content)}
        </div>
    )
}