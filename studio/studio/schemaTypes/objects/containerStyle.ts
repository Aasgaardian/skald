// studio/schemaTypes/objects/containerStyle.ts
export default {
  name: 'containerStyle',
  title: 'Container Style',
  type: 'object',
  fields: [
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
    },
    {
      name: 'opacity',
      title: 'Background Opacity',
      type: 'number',
      validation: (Rule: any) => Rule.min(0).max(1).precision(1),
      initialValue: 1,
    },
    {
      name: 'padding',
      title: 'Padding',
      type: 'string',
      description: 'Format: "top right bottom left" in pixels (e.g., "20px 40px 20px 40px")',
      initialValue: '20px',
    },
    {
      name: 'borderRadius',
      title: 'Border Radius',
      type: 'string',
      description: 'Format: pixels (e.g., "8px")',
      initialValue: '0px',
    },
    {
      name: 'borderWidth',
      title: 'Border Width',
      type: 'string',
      description: 'Format: pixels (e.g., "1px")',
      initialValue: '0px',
    },
    {
      name: 'borderColor',
      title: 'Border Color',
      type: 'color',
    },
    {
      name: 'backdropFilter',
      title: 'Backdrop Filter',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Blur', value: 'blur(4px)'},
          {title: 'Strong Blur', value: 'blur(10px)'},
        ],
      },
      initialValue: 'none',
    },
    {
      name: 'width',
      title: 'Width',
      type: 'string',
      description: 'Format: pixels or percentage (e.g., "300px" or "50%")',
      initialValue: 'auto',
    },
    {
      name: 'maxWidth',
      title: 'Max Width',
      type: 'string',
      description: 'Format: pixels or percentage (e.g., "600px" or "80%")',
      initialValue: '100%',
    },
  ],
}
