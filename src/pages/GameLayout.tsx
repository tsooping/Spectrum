import { useGameContext } from "../features/GameProvider";
import GamePage from "./GamePage";
import Homepage from "./Homepage";
import ScorePage from "./ScorePage";

function GameLayout() {
  const { state } = useGameContext();
  const { status, cards, round, score, selection, answer, highScore } = state;

  if (status === "Homepage") {
    return <Homepage />;
  } else if (status === "Active") {
    return <GamePage />;
  } else if (status === "Finished") {
    return <ScorePage />;
  }
}

export default GameLayout;
