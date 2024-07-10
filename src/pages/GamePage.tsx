import AppContainer from "../components/ui/AppContainer";
import { useGameContext } from "../features/GameProvider";
import { GlareCard } from "../components/ui/GlareCard";
import Button from "../components/ui/Button";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  LeftCardVariant,
  RightCardVariant,
  sliderVariants,
} from "../data/animations";
import { getRandomColor } from "../utils/helpers";

function GamePage() {
  const { state, dispatch } = useGameContext();
  const {
    status,
    cards,
    round,
    score,
    points,
    selection,
    answer,
    highScore,
    positions,
  } = state;
  const { outerPosition, middlePosition, innerPosition } = positions;
  const { left: leftCard, right: rightCard } = cards;

  // Other Game State
  const [sliderSelection, setSliderSelection] = useState<number>(selection);
  const [isPeeking, setIsPeeking] = useState<boolean>(false);
  const [isRoundEnd, setIsRoundEnd] = useState<boolean>(false);

  // Animation States
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRandomising, setIsRandomising] = useState(false);
  const [leftCardColor, setLeftCardColor] = useState(getRandomColor);
  const [rightCardColor, setRightCardColor] = useState(getRandomColor);

  // Setting Colour
  const { from: leftFromColour, to: leftToColour } = leftCardColor;
  const { from: rightFromColour, to: rightToColour } = rightCardColor;

  // Button Handlers
  function handleSubmit() {
    setIsRoundEnd(true);
    dispatch({ type: "SUBMIT_ANSWER", payload: sliderSelection });
  }

  function handleShuffle() {
    setIsShuffling(true);

    setTimeout(() => {
      dispatch({ type: "SHUFFLE_CARDS" });
      setLeftCardColor(getRandomColor());
      setRightCardColor(getRandomColor());
      setIsShuffling(false);
    }, 500);
  }

  function handleRange() {
    setIsRandomising(true);
    setTimeout(() => {
      dispatch({ type: "UPDATE_RANGE" });
      setIsRandomising(false);
    }, 200);
  }

  function handleNextRound() {
    setIsShuffling(true);
    setSliderSelection(50);
    setIsRoundEnd(false);
    setTimeout(() => {
      dispatch({ type: "NEXT_ROUND" });
      setIsShuffling(false);
    }, 500);
  }

  function handleEndGame() {
    dispatch({ type: "HOME" });
  }

  // Peeking Range Handlers
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
        className="absolute left-5 top-4 hidden cursor-pointer text-3xl font-thin text-white transition-all ease-in-out hover:text-white/80 md:block"
      >
        Spectrum
      </a>
      <a className="absolute right-5 top-4 hidden text-3xl font-thin text-white transition-all ease-in-out hover:text-white md:block">
        High Score: {highScore}
      </a>
      <div className="rotate-90 scale-[0.5] sm:scale-[0.8] md:rotate-0 md:scale-[1]">
        <a
          onClick={() => {
            dispatch({ type: "HOME" });
          }}
          className="absolute left-5 top-5 block cursor-pointer text-3xl font-thin text-white transition-all ease-in-out hover:text-white/80 md:hidden"
        >
          Spectrum
        </a>
        <a className="absolute right-5 top-5 block text-3xl font-thin text-white transition-all ease-in-out hover:text-white md:hidden">
          High Score: {highScore}
        </a>
        <div className="flex w-[70rem] flex-col gap-5 md:w-[45rem] lg:w-[60rem] xl:w-[70rem]">
          <div className="mb-3 flex flex-row justify-between">
            <h2 className="text-4xl font-thin opacity-0 md:opacity-100">
              Round {round}/6
            </h2>
            <h2 className="text-4xl font-thin">
              {isRoundEnd && `Points +${points}`}
            </h2>
            <h2 className="text-4xl font-thin opacity-0 md:opacity-100">
              Score: {score}
            </h2>
          </div>
          <motion.div
            className="relative flex h-[10rem] w-full items-center justify-center overflow-hidden rounded-3xl bg-white/10 shadow-md backdrop-blur-2xl"
            variants={sliderVariants}
            initial="default"
            animate={isRandomising ? "randomiseRange" : "default"}
          >
            <div
              style={{ left: `${outerPosition}%` }}
              className={`absolute h-full w-[15%] bg-green-700 transition-all duration-500 ease-in-out ${
                isPeeking || isRoundEnd ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              style={{ left: `${middlePosition}%` }}
              className={`absolute h-full w-[9%] bg-green-600 transition-all duration-300 ease-in-out ${
                isPeeking || isRoundEnd ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              style={{ left: `${innerPosition}%` }}
              className={`absolute h-full w-[3%] bg-green-500 transition-all duration-300 ease-in-out ${
                isPeeking || isRoundEnd ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`absolute w-full bg-white/10 transition-all ease-in-out`}
            >
              <input
                className="slider w-full"
                type="range"
                min="0"
                max="99"
                value={sliderSelection}
                disabled={isRoundEnd}
                onChange={(e) => {
                  setSliderSelection(parseInt(e.target.value));
                  // setTimeout(() => {
                  //   setSliderSelection(parseInt(e.target.value));
                  // }, 1000);
                }}
              />
            </div>
          </motion.div>
          <p className="my-2 text-xl font-thin">
            Slide the slider to the left or right based on your hint!
          </p>

          <div className="mt-5 flex flex-row items-center justify-center gap-5 text-center font-light">
            <div className="-rotate-[7deg]">
              <motion.div
                variants={LeftCardVariant}
                initial="visible"
                animate={isShuffling ? "hidden" : "visible"}
              >
                <GlareCard
                  className={`max-w-sm rounded-[22px] bg-gradient-to-b p-4 sm:p-10 lg:text-4xl ${leftFromColour} ${leftToColour} flex flex-col justify-center`}
                >
                  <span>{leftCard}</span>
                  <span>⟵</span>
                </GlareCard>
              </motion.div>
            </div>

            <div className="rotate-[7deg]">
              <motion.div
                variants={RightCardVariant}
                initial="visible"
                animate={isShuffling ? "hidden" : "visible"}
              >
                <GlareCard
                  className={`max-w-sm rounded-[22px] bg-gradient-to-b p-4 sm:p-10 lg:text-4xl ${rightFromColour} ${rightToColour} flex flex-col justify-center`}
                >
                  <span>{rightCard}</span>
                  <span>⟶</span>
                </GlareCard>
              </motion.div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <div className="absolute bottom-8 flex flex-1 items-center justify-center gap-5 rounded-full bg-black/60 p-3 md:hidden">
              {!isRoundEnd ? (
                <>
                  <p className="ml-4 text-2xl font-light md:hidden">
                    Round {round}/6
                  </p>
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
                  <Button onClick={handleSubmit}>Submit Answer</Button>
                  <p className="mr-4 text-2xl font-light md:hidden">
                    Score: {score}
                  </p>
                </>
              ) : round !== 6 ? (
                <Button onClick={handleNextRound}>Next Round</Button>
              ) : (
                <Button onClick={handleEndGame}>End Game</Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 hidden flex-1 items-center justify-center gap-5 rounded-full bg-black/60 p-3 md:flex">
        {!isRoundEnd ? (
          <>
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
            <Button onClick={handleSubmit}>Submit Answer</Button>
          </>
        ) : round !== 6 ? (
          <Button onClick={handleNextRound}>Next Round</Button>
        ) : (
          <Button onClick={handleEndGame}>End Game</Button>
        )}
      </div>
    </AppContainer>
  );
}

export default GamePage;
