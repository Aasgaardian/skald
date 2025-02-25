// studio/schemaTypes/objects/customBlock.ts
export default {
  name: 'customBlock',
  title: 'Custom Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'customType',
      title: 'Custom Block Type',
      type: 'string',
      options: {
        list: [
          {title: 'Chart', value: 'chart'},
          {title: 'Interactive Element', value: 'interactive'},
          {title: 'Custom HTML', value: 'html'},
        ],
      },
    },
    {
      name: 'chartData',
      title: 'Chart Data (JSON)',
      type: 'text',
      hidden: ({parent}: {parent: {customType: string}}) => parent?.customType !== 'chart',
    },
    {
      name: 'htmlContent',
      title: 'Custom HTML',
      type: 'text',
      hidden: ({parent}: {parent: {customType: string}}) => parent?.customType !== 'html',
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'customType',
    },
    prepare(selection: {title: string; subtitle: string}) {
      return {
        title: selection.title || 'Custom Block',
        subtitle: selection.subtitle ? `Type: ${selection.subtitle}` : '',
      }
    },
  },
}
