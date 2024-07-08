import { useState } from "react";
import AppContainer from "../components/ui/AppContainer";
import { useGameContext } from "../features/GameProvider";
import Button from "../components/ui/Button";
function Homepage() {
  const { state, dispatch } = useGameContext();
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <>
      <AppContainer>
        <p className="absolute left-0 top-0 ml-2 mt-2 text-3xl font-thin md:visible lg:hidden">
          tsooping.
        </p>
        <div className="flex flex-col">
          <h1 className="bg-gradient-to-b from-white/90 to-black/10 bg-clip-text font-thin tracking-widest text-white drop-shadow-2xl xl:text-[7rem]">
            Spectrum
          </h1>
          <p className="text-2xl font-extralight transition-all ease-in-out xl:text-2xl">
            A game to test your partners compatability, are you synced enough to
            win Spectrum?
          </p>
          <div className="my-4 flex flex-row items-center justify-center gap-3">
            <Button
              onClick={() => {
                setIsAnimating(true);
                dispatch({ type: "START_GAME" });
              }}
            >
              Start Game
            </Button>
            <Button>How To Play?</Button>
          </div>
        </div>
      </AppContainer>
      <div className="absolute bottom-0 z-50 mb-2 flex w-full justify-between text-xl font-thin">
        <p className="ml-2 hidden text-3xl lg:block"> tsooping.</p>
        <p className="mr-5">
          Spectrum was heavily inspired by the popular board game Wavelength,
          check them out{" "}
          <a
            className="font-light text-white transition-all ease-in-out hover:text-white/80"
            href="https://www.wavelength.zone/"
            target="_blank"
          >
            here.
          </a>
        </p>
      </div>
    </>
  );
}

export default Homepage;
