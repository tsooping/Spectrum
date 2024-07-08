import { cardColours } from "../data/cards";

export const getRandomColor = () => {
  return cardColours[Math.floor(Math.random() * cardColours.length)];
};
