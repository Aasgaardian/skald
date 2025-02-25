// src/components/story/Background.tsx
import React from 'react'
import Image from 'next/image'
import { BackgroundSettings } from '@/types/sanity'
import { urlFor } from '@/lib/sanity'
import { twMerge } from 'tailwind-merge'

interface BackgroundProps {
    settings: BackgroundSettings
    className?: string
}

export default function Background({ settings, className }: BackgroundProps) {
    // Early return if no background settings provided
    if (!settings) return null

    const { type, opacity = 1 } = settings

    // Set base styles for the background
    const baseStyles = twMerge(
        'absolute inset-0 w-full h-full transition-opacity duration-500',
        className
    )

    // Helper to convert opacity value (0-1) to a suitable className or style
    const getOpacityStyle = () => {
        // We'll use inline style for more precise opacity control
        return { opacity: opacity }
    }

    // Render appropriate background based on type
    switch (type) {
        case 'color':
            return (
                <div
                    className={baseStyles}
                    style={{
                        backgroundColor: settings.color?.hex || 'transparent',
                        ...getOpacityStyle()
                    }}
                />
            )

        case 'gradient':
            // Use CSS variables for gradient colors to work with Tailwind
            return (
                <div
                    className={baseStyles}
                    style={{
                        background: `linear-gradient(to ${settings.gradientDirection?.replace('to-', '') || 'bottom'}, ${settings.color?.hex || 'transparent'}, ${settings.gradientTo?.hex || 'transparent'})`,
                        ...getOpacityStyle()
                    }}
                />
            )

        case 'image':
            if (!settings.image?.asset) return null

            return (
                <div className={baseStyles} style={getOpacityStyle()}>
                    <Image
                        src={urlFor(settings.image).url()}
                        alt=""
                        fill
                        className={`object-${settings.backgroundSize || 'cover'} object-${settings.backgroundPosition || 'center'}`}
                        priority
                    />
                </div>
            )

        case 'video':
            if (!settings.video?.asset) return null

            // In a real implementation, you would get the video URL from Sanity
            // We'll create a placeholder approach for now
            const videoRef = settings.video.asset._ref

            return (
                <div className={baseStyles} style={getOpacityStyle()}>
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className={`w-full h-full object-${settings.backgroundSize || 'cover'} object-${settings.backgroundPosition || 'center'}`}
                    >
                        {/* This path would need to be adjusted to how you actually serve video assets */}
                        <source src={`/api/asset?id=${videoRef}`} type="video/mp4" />
                    </video>
                </div>
            )

        default:
            return null
    }
}