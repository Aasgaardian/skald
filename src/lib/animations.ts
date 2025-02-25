// src/lib/animations.ts
import { AnimationSettings } from "@/types/sanity";

// Types for animation properties
export interface AnimationProps {
  animationType?: string;
  direction?: string;
  delay?: number;
  duration?: number;
  easing?: string;
  scrollTrigger?: boolean;
  scrollOffset?: number;
  repeat?: boolean;
  repeatDelay?: number;
}

// Base class for CSS animations
export const getAnimationClasses = (
  settings: AnimationSettings | undefined,
  isActive: boolean = true
): string => {
  if (!settings || settings.animationType === "none") {
    return "";
  }

  const {
    animationType = "fade",
    direction = "from-bottom",
    duration = 1,
    easing = "ease-out",
  } = settings;

  // Base animation classes
  let classes = "transition-all";

  // Set duration
  if (duration) {
    const durationMs = duration * 1000;
    classes += ` duration-${Math.min(Math.round(durationMs / 100) * 100, 1000)}`;
  }

  // Set easing
  if (easing) {
    classes += ` ${easing}`;
  }

  // Apply different animation types
  switch (animationType) {
    case "fade":
      classes += ` ${isActive ? "opacity-100" : "opacity-0"}`;
      break;

    case "slide":
      classes += ` transform ${isActive ? "translate-y-0 opacity-100" : ""}`;
      if (!isActive) {
        switch (direction) {
          case "from-top":
            classes += " -translate-y-12 opacity-0";
            break;
          case "from-right":
            classes += " translate-x-12 opacity-0";
            break;
          case "from-bottom":
            classes += " translate-y-12 opacity-0";
            break;
          case "from-left":
            classes += " -translate-x-12 opacity-0";
            break;
          default:
            classes += " translate-y-12 opacity-0";
        }
      }
      break;

    case "zoom":
      classes += ` transform ${isActive ? "scale-100 opacity-100" : "scale-95 opacity-0"}`;
      break;

    case "bounce":
      if (isActive) {
        classes += " animate-bounce";
      } else {
        classes += " opacity-0";
      }
      break;

    case "reveal":
      classes += " overflow-hidden";
      if (isActive) {
        classes += " max-h-screen opacity-100";
      } else {
        classes += " max-h-0 opacity-0";
      }
      break;

    default:
      classes += ` ${isActive ? "opacity-100" : "opacity-0"}`;
  }

  return classes;
};

// Get inline animation styles (for properties not easily handled by Tailwind)
export const getAnimationStyles = (
  settings: AnimationSettings | undefined,
  isActive: boolean = true
): React.CSSProperties => {
  if (!settings) {
    return {};
  }

  const { delay = 0, duration = 1 } = settings;

  const styles: React.CSSProperties = {};

  // Set delay
  if (delay) {
    styles.transitionDelay = `${delay}s`;
  }

  // Handle custom transition durations beyond what Tailwind provides
  if (duration && duration > 10) {
    styles.transitionDuration = `${duration}s`;
  }

  return styles;
};

// For components that want to use framer-motion or GSAP
export const getAnimationProps = (
  settings: AnimationSettings | undefined
): AnimationProps => {
  if (!settings) {
    return {};
  }

  return {
    animationType: settings.animationType,
    direction: settings.direction,
    delay: settings.delay,
    duration: settings.duration,
    easing: settings.easing,
    scrollTrigger: settings.scrollTrigger,
    scrollOffset: settings.scrollOffset,
    repeat: settings.repeat,
    repeatDelay: settings.repeatDelay,
  };
};

// Helper to apply animations to story sections
export const getScrollBasedAnimations = (
  element: HTMLElement | null,
  settings: AnimationSettings | undefined,
  onInView: () => void,
  onOutOfView?: () => void
): (() => void) => {
  if (!element || !settings || !settings.scrollTrigger) {
    return () => {};
  }

  // Create an intersection observer to trigger animations on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onInView();
        } else if (onOutOfView) {
          onOutOfView();
        }
      });
    },
    {
      rootMargin: `0px 0px -${settings.scrollOffset || 25}% 0px`,
      threshold: 0.1,
    }
  );

  // Start observing the element
  observer.observe(element);

  // Return cleanup function
  return () => {
    observer.disconnect();
  };
};

// Advanced: For future integration with GSAP or Framer Motion
export const initializeAdvancedAnimations = () => {
  // This would be where you initialize any global animation libraries
  // For example, setting up GSAP plugins or Framer Motion context
  console.log("Animation libraries initialized");
};
