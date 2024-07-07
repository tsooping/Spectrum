import AppContainer from "../components/ui/AppContainer";
import { useGameContext } from "../features/GameProvider";
import { GlareCard } from "../components/ui/GlareCard";
import Button from "../components/ui/Button";
import { useState } from "react";
import { Eye } from "lucide-react";

function GamePage() {
  const { state, dispatch } = useGameContext();
  const { status, cards, round, score, selection, answer, highScore } = state;
  const { left: leftCard, right: rightCard } = cards;

  // Other Game State
  const [sliderSelection, setSliderSelection] = useState<number>(selection);
  const [isPeeking, setIsPeeking] = useState<boolean>(false);

  function handleSubmit() {
    setIsPeeking(true);
    dispatch({ type: "SUBMIT_ANSWER", payload: sliderSelection });
  }

  function handleShuffle() {
    dispatch({ type: "SHUFFLE_CARDS" });
  }

  function handleRange() {
    dispatch({ type: "UPDATE_RANGE" });
  }

  function startPeeking() {
    setIsPeeking(true);
  }

  function stopPeeking() {
    setIsPeeking(false);
  }

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
      <a className="absolute top-5 right-5 font-thin text-3xl text-white transition-all ease-in-out hover:text-white">
        High Score: {highScore}
        Answer: {answer}
        Selection: {sliderSelection}
      </a>
      <div className="flex flex-col gap-5 w-[70rem]">
        <div className="flex flex-row justify-between mb-3">
          <h2 className="font-thin text-4xl">Round {round}/6</h2>
          <h2 className="font-thin text-4xl">Score: {score}</h2>
        </div>
        <div className="relative w-full backdrop-blur-2xl bg-white/20 rounded-3xl flex items-center justify-center h-[10rem] overflow-hidden shadow-3xl">
          <input
            className={`answer-slider w-full ${isPeeking ? "block" : "hidden"}`}
            type="range"
            min="1"
            max="100"
            value={answer}
            readOnly
          />
          <div className="absolute w-full bg-white/10">
            <input
              className="slider w-full"
              type="range"
              min="1"
              max="100"
              defaultValue={sliderSelection}
              onChange={(e) => {
                setTimeout(() => {
                  setSliderSelection(parseInt(e.target.value));
                }, 1000);
              }}
            />
          </div>
        </div>
        <p className="font-thin text-xl my-2">
          Slide the slider to the left or right based on your hint!
        </p>

        <div className="flex flex-row justify-center font-light gap-5 mt-5 text-center items-center">
          <div className="-rotate-[7deg]">
            <GlareCard className="rounded-[22px] max-w-sm lg:text-4xl p-4 sm:p-10 bg-gradient-to-b from-blue-950 to-blue-900 flex flex-col justify-center">
              <span>{leftCard}</span>
              <span>⟵</span>
            </GlareCard>
          </div>
          <div className="rotate-[7deg]">
            <GlareCard className="rounded-[22px] max-w-sm lg:text-4xl p-4 sm:p-10 bg-gradient-to-b from-red-950 to-red-900 flex flex-col justify-center">
              <span>{rightCard}</span>
              <span>⟶</span>
            </GlareCard>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="bg-black/60 absolute rounded-full flex justify-center items-center p-3 gap-5 bottom-8 flex-1">
            <Button
              onMouseDown={startPeeking}
              onMouseUp={stopPeeking}
              onTouchStart={startPeeking}
              onTouchEnd={stopPeeking}
            >
              {isPeeking ? "Release to Hide" : "Peek Answer"}
            </Button>
            <Button onClick={handleRange}>Randomise Range</Button>
            <Button onClick={handleShuffle}>Shuffle Cards</Button>
            <Button onClick={handleSubmit}>Submit Selection</Button>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default GamePage;
