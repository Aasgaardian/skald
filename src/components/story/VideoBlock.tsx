// src/components/story/VideoBlock.tsx
import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { VideoBlock as VideoBlockType } from '@/types/sanity'
import { urlFor } from '@/lib/sanity'
import { twMerge } from 'tailwind-merge'

interface VideoBlockProps {
    block: VideoBlockType
    className?: string
    isActive?: boolean
    scrollVideoProgress?: boolean
}

export default function VideoBlock({
    block,
    className,
    isActive = false,
    scrollVideoProgress = false
}: VideoBlockProps) {
    const {
        videoType = 'file',
        video,
        youtubeUrl,
        vimeoUrl,
        poster,
        caption,
        autoplay = false,
        loop = false,
        muted = true,
        controls = true,
        size = 'medium',
        customWidth,
        customHeight,
        aspectRatio = '16:9',
        position = 'center',
        containerStyle
    } = block

    const videoRef = useRef<HTMLVideoElement>(null)

    // Handle scroll-based video playback
    useEffect(() => {
        if (!videoRef.current || !scrollVideoProgress) return

        const handleScroll = () => {
            if (!videoRef.current) return

            // Calculate how far down the page we've scrolled
            const scrollPosition = window.scrollY
            const windowHeight = window.innerHeight
            const documentHeight = document.body.scrollHeight
            const maxScroll = documentHeight - windowHeight

            // Calculate scroll percentage (0 to 1)
            const scrollPercentage = Math.min(Math.max(scrollPosition / maxScroll, 0), 1)

            // Set video currentTime based on scroll percentage
            if (videoRef.current.duration) {
                videoRef.current.currentTime = videoRef.current.duration * scrollPercentage
            }
        }

        // Only add the scroll listener if scrollVideoProgress is true
        if (scrollVideoProgress) {
            window.addEventListener('scroll', handleScroll)
            return () => window.removeEventListener('scroll', handleScroll)
        }
    }, [scrollVideoProgress])

    // Auto play/pause based on active state
    useEffect(() => {
        if (!videoRef.current || scrollVideoProgress) return

        if (isActive && autoplay) {
            videoRef.current.play().catch(error => {
                console.warn('Autoplay failed:', error)
            })
        } else if (!isActive && !loop) {
            videoRef.current.pause()
        }
    }, [isActive, autoplay, loop, scrollVideoProgress])

    // Position classes for alignment
    const positionClasses = {
        'center': 'mx-auto',
        'left': 'mr-auto',
        'right': 'ml-auto',
    }

    // Size classes
    const sizeClasses = {
        'small': 'max-w-sm',
        'medium': 'max-w-lg',
        'large': 'max-w-3xl',
        'full': 'w-full',
        'custom': '', // For custom size we'll use inline styles
    }

    // Apply container styles
    const getContainerStyles = () => {
        if (!containerStyle) return {}

        const styles: React.CSSProperties = {}

        if (containerStyle.backgroundColor?.hex) {
            styles.backgroundColor = containerStyle.backgroundColor.hex
            if (containerStyle.backgroundOpacity !== undefined) {
                styles.backgroundColor = `rgba(${parseInt(containerStyle.backgroundColor.rgb.r.toString())}, 
                                        ${parseInt(containerStyle.backgroundColor.rgb.g.toString())}, 
                                        ${parseInt(containerStyle.backgroundColor.rgb.b.toString())}, 
                                        ${containerStyle.backgroundOpacity})`
            }
        }

        if (containerStyle.textColor?.hex) {
            styles.color = containerStyle.textColor.hex
        }

        // Padding settings
        if (containerStyle.padding) {
            switch (containerStyle.padding) {
                case 'none':
                    styles.padding = '0';
                    break;
                case 'sm':
                    styles.padding = '0.5rem';
                    break;
                case 'md':
                    styles.padding = '1rem';
                    break;
                case 'lg':
                    styles.padding = '2rem';
                    break;
                case 'custom':
                    styles.padding = containerStyle.customPadding || '0';
                    break;
            }
        }

        // Apply margin settings
        if (containerStyle.margin) {
            switch (containerStyle.margin) {
                case 'none':
                    styles.margin = '0';
                    break;
                case 'sm':
                    styles.margin = '0.5rem';
                    break;
                case 'md':
                    styles.margin = '1rem';
                    break;
                case 'lg':
                    styles.margin = '2rem';
                    break;
                case 'auto':
                    styles.margin = 'auto';
                    break;
                case 'custom':
                    styles.margin = containerStyle.customMargin || '0';
                    break;
            }
        }

        // Border radius settings
        if (containerStyle.borderRadius) {
            switch (containerStyle.borderRadius) {
                case 'none':
                    styles.borderRadius = '0';
                    break;
                case 'sm':
                    styles.borderRadius = '0.25rem';
                    break;
                case 'md':
                    styles.borderRadius = '0.5rem';
                    break;
                case 'lg':
                    styles.borderRadius = '1rem';
                    break;
                case 'full':
                    styles.borderRadius = '9999px';
                    break;
                case 'custom':
                    styles.borderRadius = containerStyle.customBorderRadius || '0';
                    break;
            }
        }

        // Border styles
        if (containerStyle.borderWidth && containerStyle.borderWidth !== 'none') {
            switch (containerStyle.borderWidth) {
                case 'thin':
                    styles.borderWidth = '1px';
                    break;
                case 'medium':
                    styles.borderWidth = '2px';
                    break;
                case 'thick':
                    styles.borderWidth = '4px';
                    break;
                case 'custom':
                    styles.borderWidth = containerStyle.customBorderWidth || '0';
                    break;
            }

            if (containerStyle.borderColor?.hex) {
                styles.borderColor = containerStyle.borderColor.hex;
            }
        }

        // Box shadow
        if (containerStyle.boxShadow) {
            switch (containerStyle.boxShadow) {
                case 'sm':
                    styles.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                    break;
                case 'md':
                    styles.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                    break;
                case 'lg':
                    styles.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                    break;
            }
        }

        return styles;
    }

    // Get custom size styles
    const getSizeStyles = () => {
        if (size !== 'custom') return {}

        const styles: React.CSSProperties = {}

        if (customWidth) {
            styles.width = customWidth
        }

        if (customHeight && customHeight !== 'auto') {
            styles.height = customHeight
        } else if (aspectRatio && !customHeight) {
            // Handle aspect ratio
            const [ratioWidth, ratioHeight] = aspectRatio.split(':').map(Number)
            styles.aspectRatio = `${ratioWidth} / ${ratioHeight}`
        }

        return styles
    }

    // Handle different video sources
    const renderVideoSource = () => {
        switch (videoType) {
            case 'file':
                if (!video?.asset) return null

                return (
                    <video
                        ref={videoRef}
                        className="w-full h-auto"
                        poster={poster?.asset ? urlFor(poster).url() : undefined}
                        autoPlay={autoplay}
                        loop={loop}
                        muted={muted}
                        controls={controls}
                        playsInline
                        // Don't preload if scroll video progress is enabled (we'll control it)
                        preload={scrollVideoProgress ? 'auto' : 'metadata'}
                    >
                        {/* In a real implementation, you would get the video URL from Sanity */}
                        <source src={`/api/asset?id=${video.asset._ref}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )

            case 'youtube':
                if (!youtubeUrl) return null

                // Extract YouTube video ID
                const youtubeId = youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1]

                if (!youtubeId) return <div>Invalid YouTube URL</div>

                // Construct YouTube embed URL with parameters
                const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&controls=${controls ? 1 : 0}&loop=${loop ? 1 : 0}`

                return (
                    <div className="relative w-full" style={getSizeStyles()}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={youtubeEmbedUrl}
                            title={caption || "YouTube video"}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )

            case 'vimeo':
                if (!vimeoUrl) return null

                // Extract Vimeo video ID
                const vimeoId = vimeoUrl.match(/vimeo\.com\/(?:video\/)?([0-9]+)/)?.[1]

                if (!vimeoId) return <div>Invalid Vimeo URL</div>

                // Construct Vimeo embed URL with parameters
                const vimeoEmbedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=${autoplay ? 1 : 0}&muted=${muted ? 1 : 0}&controls=${controls ? 1 : 0}&loop=${loop ? 1 : 0}`

                return (
                    <div className="relative w-full" style={getSizeStyles()}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={vimeoEmbedUrl}
                            title={caption || "Vimeo video"}
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )

            default:
                return <div>Unsupported video type</div>
        }
    }

    // For YouTube and Vimeo, we need a container with the right aspect ratio
    const needsAspectRatioContainer = videoType === 'youtube' || videoType === 'vimeo'

    const aspectRatioStyle: React.CSSProperties = {}
    if (needsAspectRatioContainer) {
        if (customHeight && customHeight !== 'auto') {
            // Use custom height if provided
            aspectRatioStyle.height = customHeight
        } else {
            // Use aspect ratio for responsive sizing
            const [ratioWidth, ratioHeight] = aspectRatio.split(':').map(Number)
            aspectRatioStyle.paddingBottom = `${(ratioHeight / ratioWidth) * 100}%`
        }
    }

    return (
        <div
            className={twMerge(
                'relative',
                sizeClasses[size as keyof typeof sizeClasses],
                positionClasses[position as keyof typeof positionClasses],
                className
            )}
            style={getContainerStyles()}
        >
            {needsAspectRatioContainer ? (
                <div className="relative w-full" style={aspectRatioStyle}>
                    {renderVideoSource()}
                </div>
            ) : (
                renderVideoSource()
            )}

            {caption && (
                <div className="text-sm text-center mt-2 italic">
                    {caption}
                </div>
            )}
        </div>
    )
}