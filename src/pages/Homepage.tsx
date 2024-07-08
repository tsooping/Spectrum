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
        <p className="absolute left-0 top-0 ml-2 mt-2 text-3xl font-thin">
          tsooping.
        </p>
        <div className="flex flex-col gap-5">
          <h1 className="bg-gradient-to-b from-white/90 to-black/10 bg-clip-text text-7xl font-thin tracking-widest text-white drop-shadow-2xl md:text-8xl lg:text-9xl xl:text-[10rem]">
            Spectrum
          </h1>
          <p className="text-lg font-extralight transition-all ease-in-out md:text-xl xl:text-2xl">
            A game to test your partners compatability, are you synced enough to
            win Spectrum?
          </p>
          <div className="my-4 grid grid-cols-2 items-center justify-center gap-3 sm:mx-9 lg:mx-0">
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
      <div className="absolute bottom-0 z-50 mb-4 w-full items-center justify-between justify-self-center px-4 text-xl font-thin lg:flex-row">
        <p className="text-center text-base lg:text-lg">
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
