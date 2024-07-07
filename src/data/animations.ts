export const LeftCardVariant = {
  hidden: {
    opacity: 0,
    y: 500,
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
    y: 500,
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
