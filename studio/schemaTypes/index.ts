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

// The order here is crucial - dependencies must be registered before
// the types that use them
export const schemaTypes = [
  // Base types first
  containerStyle,
  animationSettings,
  backgroundSettings,

  // Content blocks next
  textBlock,
  imageBlock,
  videoBlock,
  customBlock,

  // Section type that depends on content blocks
  storySection,

  // Document type that depends on sections
  story,
]
