import React, {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";

type GameState = "Homepage" | "GameStart" | "GameEnd";

interface GameContextType {
  gameState: GameState;
  setGameState: (state: GameState) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>("Homepage");

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
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
