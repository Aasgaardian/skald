// src/components/story/CustomBlock.tsx
import React, { useEffect, useRef } from 'react'
import { CustomBlock as CustomBlockType } from '@/types/sanity'
import { twMerge } from 'tailwind-merge'

interface CustomBlockProps {
    block: CustomBlockType
    className?: string
}

export default function CustomBlock({ block, className }: CustomBlockProps) {
    const {
        blockType = 'code',
        title,
        description,
        code,
        language = 'javascript',
        embedCode,
        html,
        interactiveType,
        interactiveConfig,
        containerStyle
    } = block

    const customBlockRef = useRef<HTMLDivElement>(null)

    // Handle embedding custom HTML or JavaScript
    useEffect(() => {
        // Only run for html block types
        if (blockType !== 'html' || !html || !customBlockRef.current) return

        try {
            // Clear previous content
            customBlockRef.current.innerHTML = ''

            // Insert the custom HTML
            customBlockRef.current.innerHTML = html

            // Execute any script tags
            const scriptTags = customBlockRef.current.querySelectorAll('script')
            scriptTags.forEach(oldScript => {
                const newScript = document.createElement('script')

                // Copy all attributes
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value)
                })

                // Copy the content
                newScript.appendChild(document.createTextNode(oldScript.textContent || ''))

                // Replace the old script with the new one
                oldScript.parentNode?.replaceChild(newScript, oldScript)
            })
        } catch (error) {
            console.error('Error rendering custom HTML:', error)
            if (customBlockRef.current) {
                customBlockRef.current.innerHTML = '<p class="text-red-500">Error rendering custom HTML</p>'
            }
        }
    }, [html, blockType])

    // Handle interactive element rendering (optional implementation)
    useEffect(() => {
        if (blockType !== 'interactive' || !interactiveConfig || !customBlockRef.current) return

        try {
            const config = JSON.parse(interactiveConfig)

            // This would be where you integrate with a visualization or interactive element library
            // For example, rendering charts, maps, quizzes, etc.
            // For now, we'll just display a placeholder

            customBlockRef.current.innerHTML = `<div class="p-4 bg-gray-100 dark:bg-gray-800 rounded text-center">
        <p class="font-bold">${interactiveType} (Interactive Element)</p>
        <p class="text-sm">Configuration loaded, but renderer not implemented</p>
      </div>`
        } catch (error) {
            console.error('Error parsing interactive config:', error)
            if (customBlockRef.current) {
                customBlockRef.current.innerHTML = '<p class="text-red-500">Error rendering interactive element</p>'
            }
        }
    }, [interactiveType, interactiveConfig, blockType])

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

        // Set max width based on selection
        if (containerStyle.maxWidth) {
            switch (containerStyle.maxWidth) {
                case 'sm':
                    styles.maxWidth = '640px';
                    break;
                case 'md':
                    styles.maxWidth = '768px';
                    break;
                case 'lg':
                    styles.maxWidth = '1024px';
                    break;
                case 'xl':
                    styles.maxWidth = '1280px';
                    break;
                case 'full':
                    styles.maxWidth = '100%';
                    break;
                case 'custom':
                    styles.maxWidth = containerStyle.customMaxWidth || '100%';
                    break;
            }
        }

        // Apply padding settings
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

    // Render function based on block type
    const renderContent = () => {
        switch (blockType) {
            case 'code':
                if (!code) return <p>No code provided</p>

                return (
                    <div className="overflow-x-auto">
                        <pre className={`language-${language} p-4 rounded bg-gray-100 dark:bg-gray-800`}>
                            <code>{code}</code>
                        </pre>
                    </div>
                )

            case 'embed':
                if (!embedCode) return <p>No embed code provided</p>

                return (
                    <div
                        ref={customBlockRef}
                        className="embed-container"
                        dangerouslySetInnerHTML={{ __html: embedCode }}
                    />
                )

            case 'html':
                // The useEffect hook will handle rendering HTML content into the ref
                return <div ref={customBlockRef} className="custom-html-container" />

            case 'interactive':
                // The useEffect hook will handle rendering interactive elements into the ref
                return <div ref={customBlockRef} className="interactive-container" />

            default:
                return <p>Unknown block type: {blockType}</p>
        }
    }

    return (
        <div
            className={twMerge(
                'custom-block mx-auto my-6',
                className
            )}
            style={getContainerStyles()}
        >
            {title && (
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
            )}

            {description && (
                <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
            )}

            {renderContent()}
        </div>
    )
}