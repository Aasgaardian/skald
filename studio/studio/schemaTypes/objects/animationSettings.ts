// studio/studio/schemaTypes/objects/animationSettings.ts
export default {
  name: 'animationSettings',
  title: 'Animation Settings',
  type: 'object',
  fields: [
    {
      name: 'animationType',
      title: 'Animation Type',
      type: 'string',
      options: {
        list: [
          {title: 'Fade', value: 'fade'},
          {title: 'Slide', value: 'slide'},
          {title: 'Zoom', value: 'zoom'},
          {title: 'Bounce', value: 'bounce'},
          {title: 'Reveal', value: 'reveal'},
          {title: 'None', value: 'none'},
        ],
      },
      initialValue: 'fade',
    },
    {
      name: 'direction',
      title: 'Direction',
      type: 'string',
      options: {
        list: [
          {title: 'From Top', value: 'from-top'},
          {title: 'From Right', value: 'from-right'},
          {title: 'From Bottom', value: 'from-bottom'},
          {title: 'From Left', value: 'from-left'},
        ],
      },
      hidden: ({parent}: {parent: {animationType: string}}) =>
        parent?.animationType !== 'slide' && parent?.animationType !== 'reveal',
    },
    {
      name: 'delay',
      title: 'Delay (seconds)',
      type: 'number',
      validation: (Rule: any) => Rule.min(0).precision(1),
      initialValue: 0,
    },
    {
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      validation: (Rule: any) => Rule.min(0.1).precision(1),
      initialValue: 1,
    },
    {
      name: 'easing',
      title: 'Easing',
      type: 'string',
      options: {
        list: [
          {title: 'Linear', value: 'linear'},
          {title: 'Ease', value: 'ease'},
          {title: 'Ease In', value: 'ease-in'},
          {title: 'Ease Out', value: 'ease-out'},
          {title: 'Ease In-Out', value: 'ease-in-out'},
        ],
      },
      initialValue: 'ease-out',
    },
    {
      name: 'scrollTrigger',
      title: 'Trigger Animation on Scroll',
      type: 'boolean',
      initialValue: true,
      description: 'When enabled, the animation will trigger when the element enters the viewport',
    },
    {
      name: 'scrollOffset',
      title: 'Scroll Trigger Offset (%)',
      type: 'number',
      hidden: ({parent}: {parent: {scrollTrigger: boolean}}) => !parent?.scrollTrigger,
      validation: (Rule: any) => Rule.min(0).max(100).precision(0),
      initialValue: 25,
      description: 'Percentage of viewport from the bottom that triggers the animation',
    },
    {
      name: 'repeat',
      title: 'Repeat Animation',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'repeatDelay',
      title: 'Repeat Delay (seconds)',
      type: 'number',
      hidden: ({parent}: {parent: {repeat: boolean}}) => !parent?.repeat,
      validation: (Rule: any) => Rule.min(0).precision(1),
      initialValue: 0,
    },
  ],
}
