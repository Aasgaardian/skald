// studio/schemaTypes/objects/videoBlock.ts
export default {
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  fields: [
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    },
    {
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
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
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'muted',
      title: 'Muted',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'controls',
      title: 'Show Controls',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      media: 'thumbnailImage',
      title: 'video.asset.originalFilename',
    },
    prepare(selection: {title: string; media: any}) {
      return {
        title: selection.title || 'Video',
        media: selection.media,
      }
    },
  },
}
