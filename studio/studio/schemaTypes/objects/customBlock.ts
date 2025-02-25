// studio/studio/schemaTypes/objects/customBlock.ts
export default {
  name: 'customBlock',
  title: 'Custom Block',
  type: 'object',
  fields: [
    {
      name: 'blockType',
      title: 'Block Type',
      type: 'string',
      options: {
        list: [
          {title: 'Code Snippet', value: 'code'},
          {title: 'Embed', value: 'embed'},
          {title: 'Custom HTML', value: 'html'},
          {title: 'Interactive Element', value: 'interactive'},
        ],
      },
      initialValue: 'code',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title for the custom block',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Optional description of what this block does',
    },
    {
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 10,
      hidden: ({parent}: {parent: {blockType: string}}) => parent?.blockType !== 'code',
    },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'JavaScript', value: 'javascript'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'JSON', value: 'json'},
          {title: 'Python', value: 'python'},
          {title: 'Ruby', value: 'ruby'},
          {title: 'Shell', value: 'shell'},
        ],
      },
      initialValue: 'javascript',
      hidden: ({parent}: {parent: {blockType: string}}) => parent?.blockType !== 'code',
    },
    {
      name: 'embedCode',
      title: 'Embed Code',
      type: 'text',
      rows: 5,
      description: 'Paste embed code from external services like CodePen, Figma, etc.',
      hidden: ({parent}: {parent: {blockType: string}}) => parent?.blockType !== 'embed',
    },
    {
      name: 'html',
      title: 'Custom HTML',
      type: 'text',
      rows: 10,
      description: 'Write custom HTML code (use with caution)',
      hidden: ({parent}: {parent: {blockType: string}}) => parent?.blockType !== 'html',
    },
    {
      name: 'interactiveType',
      title: 'Interactive Element Type',
      type: 'string',
      options: {
        list: [
          {title: 'Quiz', value: 'quiz'},
          {title: 'Poll', value: 'poll'},
          {title: 'Slideshow', value: 'slideshow'},
          {title: 'Timeline', value: 'timeline'},
          {title: 'Map', value: 'map'},
          {title: 'Chart', value: 'chart'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      initialValue: 'quiz',
      hidden: ({parent}: {parent: {blockType: string}}) => parent?.blockType !== 'interactive',
    },
    {
      name: 'interactiveConfig',
      title: 'Interactive Configuration',
      type: 'text',
      rows: 10,
      description: 'JSON configuration for the interactive element',
      hidden: ({parent}: {parent: {blockType: string}}) => parent?.blockType !== 'interactive',
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
      title: 'title',
      blockType: 'blockType',
    },
    prepare(selection: any) {
      const {title, blockType} = selection
      const icon =
        {
          code: '💻',
          embed: '🔌',
          html: '🔧',
          interactive: '🎮',
        }[blockType] || '📦'

      return {
        title: title || `Custom ${blockType || 'Block'}`,
        subtitle: `Type: ${blockType || 'Unknown'}`,
        media: icon,
      }
    },
  },
}
