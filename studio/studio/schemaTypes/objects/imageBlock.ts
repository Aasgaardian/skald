// studio/studio/schemaTypes/objects/videoBlock.ts
export default {
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  fields: [
    {
      name: 'videoType',
      title: 'Video Type',
      type: 'string',
      options: {
        list: [
          {title: 'File Upload', value: 'file'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'Vimeo', value: 'vimeo'},
        ],
      },
      initialValue: 'file',
    },
    {
      name: 'video',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({parent}: {parent: {videoType: string}}) => parent?.videoType !== 'file',
      validation: (Rule: any) =>
        Rule.custom((value: any, context: any) => {
          const {parent} = context
          if (parent?.videoType === 'file' && !value) {
            return 'Required'
          }
          return true
        }),
    },
    {
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      hidden: ({parent}: {parent: {videoType: string}}) => parent?.videoType !== 'youtube',
      validation: (Rule: any) =>
        Rule.custom((value: any, context: any) => {
          const {parent} = context
          if (parent?.videoType === 'youtube' && !value) {
            return 'Required'
          }
          if (value && !value.includes('youtube.com') && !value.includes('youtu.be')) {
            return 'Must be a valid YouTube URL'
          }
          return true
        }),
    },
    {
      name: 'vimeoUrl',
      title: 'Vimeo URL',
      type: 'url',
      hidden: ({parent}: {parent: {videoType: string}}) => parent?.videoType !== 'vimeo',
      validation: (Rule: any) =>
        Rule.custom((value: any, context: any) => {
          const {parent} = context
          if (parent?.videoType === 'vimeo' && !value) {
            return 'Required'
          }
          if (value && !value.includes('vimeo.com')) {
            return 'Must be a valid Vimeo URL'
          }
          return true
        }),
    },
    {
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      description: 'Displayed while the video is loading or before it plays',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption to display below the video',
    },
    {
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: false,
      description:
        'Start playing automatically when the section appears (may be blocked by browsers)',
    },
    {
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'muted',
      title: 'Muted',
      type: 'boolean',
      initialValue: true,
      description: 'Start with sound off (recommended for autoplay)',
    },
    {
      name: 'controls',
      title: 'Show Controls',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'size',
      title: 'Video Size',
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
      hidden: ({parent}: {parent: {size: string}}) => parent?.size !== 'custom',
    },
    {
      name: 'customHeight',
      title: 'Custom Height (%, px, rem, auto)',
      type: 'string',
      hidden: ({parent}: {parent: {size: string}}) => parent?.size !== 'custom',
    },
    {
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          {title: '16:9', value: '16:9'},
          {title: '4:3', value: '4:3'},
          {title: '1:1', value: '1:1'},
          {title: '9:16', value: '9:16'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      initialValue: '16:9',
      hidden: ({parent}: {parent: {size: string}}) =>
        parent?.size === 'custom' && parent?.customHeight && parent?.customHeight !== 'auto',
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
      title: 'caption',
      videoType: 'videoType',
      media: 'poster',
    },
    prepare(selection: any) {
      const {title, videoType, media} = selection
      return {
        title: title || 'Video',
        subtitle: `Type: ${videoType || 'Unknown'}`,
        media: media || '🎬',
      }
    },
  },
}
