// studio/schemaTypes/index.ts
import story from './documents/story'
import storySection from './objects/storySection'
import backgroundSettings from './objects/backgroundSettings'
import textBlock from './objects/textBlock'
import imageBlock from './objects/imageBlock'
import videoBlock from './objects/videoBlock'
import customBlock from './objects/customBlock'
import containerStyle from './objects/containerStyle'
import animationSettings from './objects/animationSettings'

export const schemaTypes = [
  // First register basic types that others depend on
  animationSettings,
  containerStyle,
  backgroundSettings,

  // Then register content blocks
  textBlock,
  imageBlock,
  videoBlock,
  customBlock,

  // Then register section type that uses content blocks
  storySection,

  // Finally register document types that use sections
  story,
]
