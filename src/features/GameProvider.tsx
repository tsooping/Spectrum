import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { gameCards } from "../data/cards";

// type Status =
//   | "Homepage"
//   | "Active"
//   | "Finished"
//   | "NextRound"
//   | "Shuffling"
//   | "Errors";

type GameState = {
  status: string;
  cards: { left: string; right: string };
  round: number;
  score: number;
  points: number;
  selection: number;
  answer: number;
  highScore: number;
  positions: {
    outerPosition: number;
    middlePosition: number;
    innerPosition: number;
  };
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
  points: 0,
  selection: 50,
  answer: 0,
  highScore: 0,
  positions: {
    outerPosition: 43,
    middlePosition: 46,
    innerPosition: 49,
  },
};

const calculateScore = (answer: number, selection: number): number => {
  const difference = Math.abs(answer - selection);

  if (difference <= 1) {
    console.log("4 points");
    return 4;
  } else if (difference <= 4) {
    console.log("3 points");
    return 3;
  } else if (difference <= 7) {
    console.log("2 points");
    return 2;
  } else {
    return 0;
  }
};

function reducer(state: GameState, action: Action) {
  let answerValue = Math.floor(Math.random() * 100);

  switch (action.type) {
    case "HOME":
      return { ...initialState };
    case "START_GAME":
      return {
        ...initialState,
        answer: answerValue,
        cards: gameCards[Math.floor(Math.random() * gameCards.length)],
        positions: {
          outerPosition: answerValue - 7,
          middlePosition: answerValue - 4,
          innerPosition: answerValue - 1,
        },
        status: "Active",
      };
    case "NEXT_ROUND":
      answerValue = Math.floor(Math.random() * 100);
      return {
        ...state,
        round: state.round + 1,
        answer: answerValue,
        cards: gameCards[Math.floor(Math.random() * gameCards.length)],
        positions: {
          outerPosition: answerValue - 7,
          middlePosition: answerValue - 4,
          innerPosition: answerValue - 1,
        },
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
      answerValue = Math.floor(Math.random() * 100);
      return {
        ...state,
        answer: answerValue,
        positions: {
          outerPosition: answerValue - 7,
          middlePosition: answerValue - 4,
          innerPosition: answerValue - 1,
        },
      };
    case "SUBMIT_ANSWER":
      const finalScore = calculateScore(state.answer, action.payload);
      return {
        ...state,
        points: finalScore,
        score: (state.score += finalScore),
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
