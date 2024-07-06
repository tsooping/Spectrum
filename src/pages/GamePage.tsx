import AppContainer from "../components/ui/AppContainer";
import { useGameContext } from "../features/GameProvider";
import { GlareCard } from "../components/ui/GlareCard";
import Button from "../components/ui/Button";

function GamePage() {
  const { state, dispatch } = useGameContext();

  return (
    <AppContainer className="bg-black/30">
      <a
        onClick={() => {
          dispatch({ type: "HOME" });
        }}
        className="absolute top-5 left-5 font-thin text-3xl text-white hover:text-white/80 transition-all ease-in-out cursor-pointer"
      >
        Spectrum
      </a>
      <div className="flex flex-col gap-5 w-[70rem]">
        <h2 className="font-thin text-4xl">Round 1/6</h2>
        <div className="relative w-full backdrop-blur-2xl bg-white/20 rounded-3xl flex items-center justify-center h-[10rem] overflow-hidden shadow-3xl">
          <div className="absolute w-full bg-white/10">
            <input className="slider w-full" type="range" min="1" max="100" />
          </div>
        </div>
        <p className="font-thin text-xl my-2">
          Slide the slider to the left or right based on your hint!
        </p>

        <div className="flex flex-row justify-center font-light gap-5 mt-5 text-center items-center">
          <div className="-rotate-[7deg]">
            <GlareCard className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-gradient-to-b from-blue-950 to-blue-900 flex flex-col justify-center">
              <span>Hot</span>
              <span>⟵</span>
            </GlareCard>
          </div>
          <div className="rotate-[7deg]">
            <GlareCard className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-gradient-to-b from-red-950 to-red-900 flex flex-col justify-center">
              <span>Cold</span>
              <span>⟶</span>
            </GlareCard>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="bg-black/60 absolute rounded-full flex justify-center items-center p-3 gap-5 bottom-8 ">
            <Button>Peek Answer</Button>
            <Button>Shuffle Cards</Button>
            <Button>Submit Selection</Button>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default GamePage;
