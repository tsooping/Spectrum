import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { gameCards } from "../data/cards";

type Status =
  | "Homepage"
  | "Active"
  | "Finished"
  | "NextRound"
  | "Shuffling"
  | "Errors";

type GameState = {
  status: string;
  cards: { left: string; right: string };
  round: number;
  score: number;
  selection: number;
  answer: number;
  highScore: number;
};

type Action =
  | { type: "HOME" }
  | { type: "START_GAME" }
  | { type: "END_GAME" }
  | { type: "NEXT_ROUND" }
  | { type: "SHUFFLE_CARDS" }
  | { type: "UPDATE_RANGE" }
  | { type: "SUBMIT_ANSWER"; payload: number };

const initialState = {
  status: "Homepage",
  cards: { left: "empty", right: "empty" },
  round: 1,
  score: 0,
  selection: 51,
  answer: 0,
  highScore: 0,
};

const calculateScore = (selection: number, answer: number): number => {
  // Calculate the distance between the selection and the answer
  const distance = Math.abs(selection - answer);

  // Calculate the score based on the distance with exponential decay
  // The closer the selection to the answer, the higher the score
  const maxScore = 100;
  const score = Math.floor(maxScore * Math.exp(-distance / 10));

  // Ensure the score is non-negative
  return Math.max(score, 0);
};

export default calculateScore;

function reducer(state: GameState, action: Action) {
  switch (action.type) {
    case "HOME":
      return { ...initialState };
    case "START_GAME":
      return {
        ...initialState,
        answer: Math.floor(Math.random() * 100),
        cards: gameCards[Math.floor(Math.random() * gameCards.length)],
        status: "Active",
      };
    case "END_GAME":
      return {
        ...state,
        status: "Finished",
      };
    case "SHUFFLE_CARDS":
      return {
        ...state,
        cards: gameCards[Math.floor(Math.random() * gameCards.length)],
      };
    case "UPDATE_RANGE":
      return {
        ...state,
        answer: Math.floor(Math.random() * 100),
      };
    case "SUBMIT_ANSWER":
      const finalScore = calculateScore(state.answer, action.payload);
      return {
        ...state,
        score: (state.score += finalScore),
        round: state.round + 1,
      };
    default:
      return state;
  }
}

export const GameContext = createContext<
  { state: GameState; dispatch: Dispatch<Action> } | undefined
>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

function useGameContext() {
  const context = useContext(GameContext);

  if (context === undefined)
    throw new Error("useGameContext was used outside of GameProvider");

  return context;
}

export { GameProvider, useGameContext };
