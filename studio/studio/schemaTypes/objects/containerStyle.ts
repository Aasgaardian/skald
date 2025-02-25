// studio/studio/schemaTypes/objects/containerStyle.ts
export default {
  name: 'containerStyle',
  title: 'Container Style',
  type: 'object',
  fields: [
    {
      name: 'maxWidth',
      title: 'Max Width',
      type: 'string',
      options: {
        list: [
          {title: 'Small (640px)', value: 'sm'},
          {title: 'Medium (768px)', value: 'md'},
          {title: 'Large (1024px)', value: 'lg'},
          {title: 'Extra Large (1280px)', value: 'xl'},
          {title: 'Full Width', value: 'full'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      initialValue: 'md',
    },
    {
      name: 'customMaxWidth',
      title: 'Custom Max Width (px, rem, etc.)',
      type: 'string',
      hidden: ({parent}: {parent: {maxWidth: string}}) => parent?.maxWidth !== 'custom',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
    },
    {
      name: 'backgroundOpacity',
      title: 'Background Opacity',
      type: 'number',
      validation: (Rule: any) => Rule.min(0).max(1).precision(1),
      initialValue: 1,
      hidden: ({parent}: {parent: {backgroundColor: any}}) => !parent?.backgroundColor,
    },
    {
      name: 'textColor',
      title: 'Text Color',
      type: 'color',
    },
    {
      name: 'padding',
      title: 'Padding',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      initialValue: 'md',
    },
    {
      name: 'customPadding',
      title: 'Custom Padding (px, rem, etc.)',
      type: 'string',
      hidden: ({parent}: {parent: {padding: string}}) => parent?.padding !== 'custom',
    },
    {
      name: 'margin',
      title: 'Margin',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
          {title: 'Auto', value: 'auto'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      initialValue: 'none',
    },
    {
      name: 'customMargin',
      title: 'Custom Margin (px, rem, etc.)',
      type: 'string',
      hidden: ({parent}: {parent: {margin: string}}) => parent?.margin !== 'custom',
    },
    {
      name: 'borderRadius',
      title: 'Border Radius',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
          {title: 'Full', value: 'full'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      initialValue: 'none',
    },
    {
      name: 'customBorderRadius',
      title: 'Custom Border Radius (px, rem, etc.)',
      type: 'string',
      hidden: ({parent}: {parent: {borderRadius: string}}) => parent?.borderRadius !== 'custom',
    },
    {
      name: 'borderWidth',
      title: 'Border Width',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Thin', value: 'thin'},
          {title: 'Medium', value: 'medium'},
          {title: 'Thick', value: 'thick'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      initialValue: 'none',
    },
    {
      name: 'customBorderWidth',
      title: 'Custom Border Width (px)',
      type: 'string',
      hidden: ({parent}: {parent: {borderWidth: string}}) => parent?.borderWidth !== 'custom',
    },
    {
      name: 'borderColor',
      title: 'Border Color',
      type: 'color',
      hidden: ({parent}: {parent: {borderWidth: string}}) => parent?.borderWidth === 'none',
    },
    {
      name: 'boxShadow',
      title: 'Box Shadow',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
        ],
      },
      initialValue: 'none',
    },
  ],
}
