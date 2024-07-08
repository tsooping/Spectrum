import AppContainer from "../components/ui/AppContainer";
import { useGameContext } from "../features/GameProvider";
import { GlareCard } from "../components/ui/GlareCard";
import Button from "../components/ui/Button";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LeftCardVariant,
  RightCardVariant,
  sliderVariants,
} from "../data/animations";
import { cardColours } from "../data/cards";
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
        className="absolute top-5 left-5 font-thin text-3xl text-white hover:text-white/80 transition-all ease-in-out cursor-pointer"
      >
        Spectrum
      </a>
      <a className="absolute top-5 right-5 font-thin text-3xl text-white transition-all ease-in-out hover:text-white">
        High Score: {highScore}
      </a>
      <div className="flex flex-col gap-5 w-[70rem]">
        <div className="flex flex-row justify-between mb-3">
          <h2 className="font-thin text-4xl">Round {round}/6</h2>
          <h2 className="font-thin text-4xl">
            {isRoundEnd && `Points +${points}`}
          </h2>
          <h2 className="font-thin text-4xl">Score: {score}</h2>
        </div>
        <motion.div
          className="relative w-full backdrop-blur-2xl bg-white/20 rounded-3xl flex items-center justify-center h-[10rem] overflow-hidden shadow-3xl"
          variants={sliderVariants}
          initial="default"
          animate={isRandomising ? "randomiseRange" : "default"}
        >
          <div
            style={{ left: `${outerPosition}%` }}
            className={`absolute w-[15%] h-full bg-green-700 transition-all ease-in-out duration-500 ${
              isPeeking || isRoundEnd ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            style={{ left: `${middlePosition}%` }}
            className={`absolute w-[9%] h-full bg-green-600 transition-all ease-in-out duration-300 ${
              isPeeking || isRoundEnd ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            style={{ left: `${innerPosition}%` }}
            className={`absolute w-[3%] h-full bg-green-500 transition-all ease-in-out duration-300 ${
              isPeeking || isRoundEnd ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="absolute w-full bg-white/10">
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
        <p className="font-thin text-xl my-2">
          Slide the slider to the left or right based on your hint!
        </p>

        <div className="flex flex-row justify-center font-light gap-5 mt-5 text-center items-center">
          <div className="-rotate-[7deg]">
            <motion.div
              variants={LeftCardVariant}
              initial="visible"
              animate={isShuffling ? "hidden" : "visible"}
            >
              <GlareCard
                className={`rounded-[22px] max-w-sm lg:text-4xl p-4 sm:p-10 bg-gradient-to-b ${leftFromColour} ${leftToColour} flex flex-col justify-center`}
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
                className={`rounded-[22px] max-w-sm lg:text-4xl p-4 sm:p-10 bg-gradient-to-b ${rightFromColour} ${rightToColour} flex flex-col justify-center`}
              >
                <span>{rightCard}</span>
                <span>⟶</span>
              </GlareCard>
            </motion.div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="bg-black/60 absolute rounded-full flex justify-center items-center p-3 gap-5 bottom-8 flex-1">
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
        </div>
      </div>
    </AppContainer>
  );
}

export default GamePage;
