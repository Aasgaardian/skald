// studio/schemaTypes/objects/backgroundSettings.ts
export default {
  name: 'backgroundSettings',
  title: 'Background Settings',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Background Type',
      type: 'string',
      options: {
        list: [
          {title: 'Color', value: 'color'},
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
          {title: 'Gradient', value: 'gradient'},
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'color',
      title: 'Background Color',
      type: 'color',
      hidden: ({parent}: {parent: {type: string}}) =>
        parent?.type !== 'color' && parent?.type !== 'gradient',
    },
    {
      name: 'gradientTo',
      title: 'Gradient To Color',
      type: 'color',
      hidden: ({parent}: {parent: {type: string}}) => parent?.type !== 'gradient',
    },
    {
      name: 'gradientDirection',
      title: 'Gradient Direction',
      type: 'string',
      options: {
        list: [
          {title: 'To Bottom', value: 'to-b'},
          {title: 'To Top', value: 'to-t'},
          {title: 'To Left', value: 'to-l'},
          {title: 'To Right', value: 'to-r'},
          {title: 'To Bottom Right', value: 'to-br'},
          {title: 'To Bottom Left', value: 'to-bl'},
          {title: 'To Top Right', value: 'to-tr'},
          {title: 'To Top Left', value: 'to-tl'},
        ],
      },
      hidden: ({parent}: {parent: {type: string}}) => parent?.type !== 'gradient',
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({parent}: {parent: {type: string}}) => parent?.type !== 'image',
    },
    {
      name: 'video',
      title: 'Background Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({parent}: {parent: {type: string}}) => parent?.type !== 'video',
    },
    {
      name: 'opacity',
      title: 'Background Opacity',
      type: 'number',
      validation: (Rule: any) => Rule.min(0).max(1).precision(1),
      initialValue: 1,
    },
    {
      name: 'backgroundPosition',
      title: 'Background Position',
      type: 'string',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Top', value: 'top'},
          {title: 'Bottom', value: 'bottom'},
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
      },
      hidden: ({parent}: {parent: {type: string}}) =>
        parent?.type !== 'image' && parent?.type !== 'video',
    },
    {
      name: 'backgroundSize',
      title: 'Background Size',
      type: 'string',
      options: {
        list: [
          {title: 'Cover', value: 'cover'},
          {title: 'Contain', value: 'contain'},
          {title: 'Auto', value: 'auto'},
        ],
      },
      hidden: ({parent}: {parent: {type: string}}) =>
        parent?.type !== 'image' && parent?.type !== 'video',
    },
  ],
}
