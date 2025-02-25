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
    },
    {
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for SEO and accessibility',
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Top Left', value: 'top-left'},
          {title: 'Top Center', value: 'top-center'},
          {title: 'Top Right', value: 'top-right'},
          {title: 'Center Left', value: 'center-left'},
          {title: 'Center Right', value: 'center-right'},
          {title: 'Bottom Left', value: 'bottom-left'},
          {title: 'Bottom Center', value: 'bottom-center'},
          {title: 'Bottom Right', value: 'bottom-right'},
        ],
      },
      initialValue: 'center',
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
  ],
  preview: {
    select: {
      media: 'image',
      title: 'alt',
    },
  },
}
