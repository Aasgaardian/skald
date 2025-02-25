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
  story,
  storySection,
  backgroundSettings,
  textBlock,
  imageBlock,
  videoBlock,
  customBlock,
  containerStyle,
  animationSettings,
]
