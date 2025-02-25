// src/types/sanity.ts
import { SanityImageAsset } from "@sanity/image-url/lib/types/types";

// Base types
type SanityDocument = {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
};

type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
};

type SanityFile = {
  _type: "file";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

type SanitySlug = {
  _type: "slug";
  current: string;
};

type SanityColor = {
  _type: "color";
  hex: string;
  alpha: number;
  hsl: { h: number; s: number; l: number; a: number };
  hsv: { h: number; s: number; v: number; a: number };
  rgb: { r: number; g: number; b: number; a: number };
};

// Block content types
type SanitySpan = {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
};

type SanityBlock = {
  _key: string;
  _type: "block";
  style: "normal" | "h1" | "h2" | "h3" | "blockquote";
  children: SanitySpan[];
};

// Object types from schema
export type AnimationSettings = {
  _type: "animationSettings";
  // These fields will be filled in once we've defined the animation settings schema
  // For now, we'll use a placeholder structure based on common animation properties
  animationType?: "fade" | "slide" | "zoom" | "bounce" | "custom";
  delay?: number;
  duration?: number;
  easing?: string;
  // Additional animation properties will be added as needed
};

export type ContainerStyle = {
  _type: "containerStyle";
  // These fields will be filled in once we've defined the container style schema
  // For now, we'll use a placeholder structure based on common styling properties
  maxWidth?: string;
  padding?: string;
  margin?: string;
  backgroundColor?: SanityColor;
  textColor?: SanityColor;
  borderRadius?: string;
  // Additional style properties will be added as needed
};

export type BackgroundSettings = {
  _type: "backgroundSettings";
  type: "color" | "image" | "video" | "gradient";
  color?: SanityColor;
  gradientTo?: SanityColor;
  gradientDirection?:
    | "to-b"
    | "to-t"
    | "to-l"
    | "to-r"
    | "to-br"
    | "to-bl"
    | "to-tr"
    | "to-tl";
  image?: SanityImage;
  video?: SanityFile;
  opacity: number;
  backgroundPosition?: "center" | "top" | "bottom" | "left" | "right";
  backgroundSize?: "cover" | "contain" | "auto";
};

export type TextBlock = {
  _key: string;
  _type: "textBlock";
  content: SanityBlock[];
  position:
    | "center"
    | "top-left"
    | "top-center"
    | "top-right"
    | "center-left"
    | "center-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  containerStyle?: ContainerStyle;
  animation?: AnimationSettings;
};

export type ImageBlock = {
  _key: string;
  _type: "imageBlock";
  // Based on your schema structure, we're adding placeholder fields
  // These will be updated once you define the imageBlock schema
  image?: SanityImage;
  caption?: string;
  alt?: string;
  width?: string;
  height?: string;
  position?: string;
  containerStyle?: ContainerStyle;
  animation?: AnimationSettings;
};

export type VideoBlock = {
  _key: string;
  _type: "videoBlock";
  // Based on your schema structure, we're adding placeholder fields
  // These will be updated once you define the videoBlock schema
  video?: SanityFile;
  poster?: SanityImage;
  caption?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  position?: string;
  containerStyle?: ContainerStyle;
  animation?: AnimationSettings;
};

export type CustomBlock = {
  _key: string;
  _type: "customBlock";
  // Based on your schema structure, we're adding placeholder fields
  // These will be updated once you define the customBlock schema
  code?: string;
  language?: string;
  description?: string;
  containerStyle?: ContainerStyle;
  animation?: AnimationSettings;
};

export type ContentBlock = TextBlock | ImageBlock | VideoBlock | CustomBlock;

export type StorySection = {
  _key: string;
  _type: "storySection";
  sectionId?: string;
  background?: BackgroundSettings;
  content: ContentBlock[];
  transitionEffect: "" | "fade" | "slide" | "zoom" | "parallax" | "none";
  scrollVideoProgress?: boolean;
};

// Document type
export type Story = SanityDocument & {
  _type: "story";
  title: string;
  slug: SanitySlug;
  description?: string;
  sections: StorySection[];
  defaultTransition: "fade" | "slide" | "zoom" | "none";
};
