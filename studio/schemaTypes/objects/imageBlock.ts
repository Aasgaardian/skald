// studio/schemaTypes/objects/imageBlock.ts
export default {
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for SEO and accessibility. Describe the image in a few words.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption to display below the image',
    },
    {
      name: 'size',
      title: 'Image Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
          {title: 'Full Width', value: 'full'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      initialValue: 'medium',
    },
    {
      name: 'customWidth',
      title: 'Custom Width (%, px, rem)',
      type: 'string',
      hidden: ({parent}) => parent?.size !== 'custom',
    },
    {
      name: 'customHeight',
      title: 'Custom Height (%, px, rem, auto)',
      type: 'string',
      hidden: ({parent}) => parent?.size !== 'custom',
      initialValue: 'auto',
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'center',
    },
    {
      name: 'objectFit',
      title: 'Object Fit',
      type: 'string',
      options: {
        list: [
          {title: 'Cover', value: 'cover'},
          {title: 'Contain', value: 'contain'},
          {title: 'Fill', value: 'fill'},
          {title: 'None', value: 'none'},
        ],
      },
      initialValue: 'cover',
    },
    {
      name: 'containerStyle',
      title: 'Container Style',
      type: 'containerStyle',
    },
    {
      name: 'animation',
      title: 'Animation',
      type: 'animationSettings',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Optional link when the image is clicked',
    },
    {
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: true,
      hidden: ({parent}) => !parent?.link,
    },
  ],
  preview: {
    select: {
      title: 'caption',
      alt: 'alt',
      media: 'image',
    },
    prepare(selection) {
      const {title, alt, media} = selection
      return {
        title: title || alt || 'Image',
        subtitle: title && alt ? `Alt: ${alt}` : alt ? 'Image' : 'No alt text',
        media,
      }
    },
  },
}
