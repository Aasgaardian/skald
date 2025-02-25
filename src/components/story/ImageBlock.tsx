// src/components/story/ImageBlock.tsx
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ImageBlock as ImageBlockType } from '@/types/sanity'
import { urlFor } from '@/lib/sanity'
import { twMerge } from 'tailwind-merge'

interface ImageBlockProps {
    block: ImageBlockType
    className?: string
}

export default function ImageBlock({ block, className }: ImageBlockProps) {
    const {
        image,
        alt = 'Image',
        caption,
        size = 'medium',
        customWidth,
        customHeight,
        position = 'center',
        objectFit = 'cover',
        containerStyle,
        link,
        openInNewTab
    } = block

    if (!image?.asset) {
        return null
    }

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

    // Apply container styles if provided
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

        // Apply various padding settings
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

        // Apply border radius settings
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

        // Apply border styles
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

        // Apply box shadow
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

    // Get custom size styles if needed
    const getSizeStyles = () => {
        if (size !== 'custom') return {}

        const styles: React.CSSProperties = {}

        if (customWidth) {
            styles.width = customWidth
        }

        if (customHeight) {
            styles.height = customHeight
        }

        return styles
    }

    // Generate image component
    const imageComponent = (
        <div
            className={twMerge(
                'relative overflow-hidden',
                sizeClasses[size as keyof typeof sizeClasses],
                positionClasses[position as keyof typeof positionClasses],
                className
            )}
            style={{
                ...getSizeStyles(),
                ...getContainerStyles()
            }}
        >
            <Image
                src={urlFor(image).url()}
                alt={alt}
                width={500}
                height={300}
                className={`w-full h-auto object-${objectFit}`}
                // Set priority for images that might be visible in the viewport on load
                priority={true}
            // Add animation classes here if needed
            />

            {caption && (
                <div className="text-sm text-center mt-2 italic">
                    {caption}
                </div>
            )}
        </div>
    )

    // If there's a link, wrap the image in an anchor
    if (link) {
        return (
            <Link
                href={link}
                target={openInNewTab ? "_blank" : "_self"}
                rel={openInNewTab ? "noopener noreferrer" : ""}
            >
                {imageComponent}
            </Link>
        )
    }

    return imageComponent
}