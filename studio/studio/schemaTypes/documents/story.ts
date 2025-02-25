// studio/schemaTypes/documents/story.ts
export default {
  name: 'story',
  title: 'Story',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{type: 'storySection'}],
    },
    {
      name: 'defaultTransition',
      title: 'Default Transition',
      type: 'string',
      options: {
        list: [
          {title: 'Fade', value: 'fade'},
          {title: 'Slide', value: 'slide'},
          {title: 'Zoom', value: 'zoom'},
          {title: 'None', value: 'none'},
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
}
