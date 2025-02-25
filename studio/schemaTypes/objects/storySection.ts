// studio/schemaTypes/objects/storySection.ts
export default {
  name: 'storySection',
  title: 'Story Section',
  type: 'object',
  fields: [
    {
      name: 'sectionId',
      title: 'Section ID (for internal reference)',
      type: 'string',
    },
    {
      name: 'background',
      title: 'Background',
      type: 'backgroundSettings',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'textBlock'}, {type: 'imageBlock'}, {type: 'videoBlock'}, {type: 'customBlock'}],
    },
    {
      name: 'transitionEffect',
      title: 'Transition Effect (overrides story default)',
      type: 'string',
      options: {
        list: [
          {title: 'Story Default', value: ''},
          {title: 'Fade', value: 'fade'},
          {title: 'Slide', value: 'slide'},
          {title: 'Zoom', value: 'zoom'},
          {title: 'Parallax', value: 'parallax'},
          {title: 'None', value: 'none'},
        ],
      },
    },
    {
      name: 'scrollVideoProgress',
      title: 'Enable Scroll-based Video Progress',
      type: 'boolean',
      description:
        'If enabled and a video is present, video playback will be controlled by scroll position',
    },
  ],
  preview: {
    select: {
      title: 'sectionId',
    },
    prepare(selection: {title: string}) {
      return {
        title: selection.title || 'Untitled Section',
      }
    },
  },
}
