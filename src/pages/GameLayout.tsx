import { useGameContext } from "../features/GameProvider";
import GamePage from "./GamePage";
import Homepage from "./Homepage";
import ScorePage from "./ScorePage";

function GameLayout() {
  const { gameState } = useGameContext();

  if (gameState === "Homepage") {
    return <Homepage />;
  } else if (gameState === "GameStart") {
    return <GamePage />;
  } else if (gameState === "GameEnd") {
    return <ScorePage />;
  }
}

export default GameLayout;
