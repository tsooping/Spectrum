import { useState } from "react";
import { GameProvider } from "./features/GameProvider";
import GameLayout from "./pages/GameLayout";
import { BackgroundGradientAnimation } from "./components/ui/BackgroundGradient";
import Slider from "./components/ui/Testing";

function App() {
  const [count, sssdsdsdssssssdssssss] = useState(1);

  return (
    <GameProvider>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(36, 36, 36)"
        gradientBackgroundEnd="rgb(0, 0, 0)"
        firstColor="249, 65, 68"
        secondColor="248, 150, 30"
        thirdColor="249, 199, 79"
        fourthColor="67, 170, 139"
        fifthColor="39, 125, 161"
      >
        <GameLayout />
      </BackgroundGradientAnimation>
    </GameProvider>
  );
}

export default App;
