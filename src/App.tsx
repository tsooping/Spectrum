import { GameProvider } from "./features/GameProvider";
import GameLayout from "./pages/GameLayout";
import { BackgroundGradientAnimation } from "./components/ui/BackgroundGradient";

function App() {
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
