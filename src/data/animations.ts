// Card Animation

import { color } from "framer-motion";
import { BackgroundGradientAnimation } from "../components/ui/BackgroundGradient";

export const LeftCardVariant = {
  hidden: {
    opacity: 0,
    y: 750,
    x: 200,
    scale: 0.7,
    rotate: 720,
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export const RightCardVariant = {
  hidden: {
    opacity: 0,
    y: 750,
    x: -200,
    scale: 0.7,
    rotate: -720,
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

// Slider Animation
export const sliderVariants = {
  randomiseRange: {
    scale: 1.03,
    backgroundColor: "#FFFFFF55",
    transition: {
      duration: 0.2,
    },
  },
  default: {
    scale: 1.0,
  },
};
