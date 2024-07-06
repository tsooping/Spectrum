import { useGameContext } from "../features/GameProvider";
import GamePage from "./GamePage";
import Homepage from "./Homepage";
import ScorePage from "./ScorePage";

function GameLayout() {
  const { state } = useGameContext();

  if (state.status === "Homepage") {
    return <Homepage />;
  } else if (state.status === "GameStart") {
    return <GamePage />;
  } else if (state.status === "GameEnd") {
    return <ScorePage />;
  }
}

export default GameLayout;
