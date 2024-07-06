import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";

type GameState = "Homepage" | "GameStart" | "GameEnd";

type GameState2 = {
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
  | { type: "NEXT_ROUND" }
  | { type: "PEEK_CARDS" }
  | { type: "SHUFFLE_CARDS" }
  | { type: "RESTART" }
  | { type: "UPDATE_SCORE"; payload: number };

const initialState = {
  status: "Homepage",
  cards: { left: "empty", right: "empty" },
  round: 1,
  score: 0,
  selection: 50,
  answer: 0,
  highScore: 0,
};

function reducer(state: GameState2, action: Action) {
  switch (action.type) {
    case "HOME":
      return { ...initialState };
    case "START_GAME":
      return {
        ...initialState,
        status: "GameStart",
      };
    default:
      return state;
  }
}

interface GameContextType {
  gameState: GameState;
  setGameState: (state: GameState) => void;
}

export const GameContext = createContext<
  { state: GameState2; dispatch: Dispatch<Action> } | undefined
>(undefined);
// const GameContext = createContext<GameContextType | undefined>(undefined);

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
