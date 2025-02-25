// studio/schemaTypes/objects/animationSettings.ts
export default {
  name: 'animationSettings',
  title: 'Animation Settings',
  type: 'object',
  fields: [
    {
      name: 'effect',
      title: 'Animation Effect',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Fade In', value: 'fadeIn'},
          {title: 'Slide Up', value: 'slideUp'},
          {title: 'Slide Down', value: 'slideDown'},
          {title: 'Slide Left', value: 'slideLeft'},
          {title: 'Slide Right', value: 'slideRight'},
          {title: 'Zoom In', value: 'zoomIn'},
          {title: 'Zoom Out', value: 'zoomOut'},
        ],
      },
      initialValue: 'none',
    },
    {
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      validation: (Rule: any) => Rule.positive(),
      initialValue: 0.5,
      hidden: ({parent}: {parent: {effect: string}}) => parent?.effect === 'none',
    },
    {
      name: 'delay',
      title: 'Delay (seconds)',
      type: 'number',
      validation: (Rule: any) => Rule.min(0),
      initialValue: 0,
      hidden: ({parent}: {parent: {effect: string}}) => parent?.effect === 'none',
    },
  ],
}
