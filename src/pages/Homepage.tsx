import AppContainer from "../components/ui/AppContainer";
import { useGameContext } from "../features/GameProvider";

function Homepage() {
  const { state, dispatch } = useGameContext();

  return (
    <>
      <AppContainer>
        <p className="absolute top-0 left-0 font-thin text-3xl mt-2 ml-2 lg:hidden md:visible">
          tsooping.
        </p>
        <div className="flex flex-col">
          <h1 className="bg-clip-text text-white drop-shadow-2xl bg-gradient-to-b from-white/90 to-black/10 font-thin pointer-events-none tracking-wider">
            Spectrum
          </h1>
          <p className="font-extralight text-4xl transition-all ease-in-out">
            A game to test your partners compatability, are you synced enough to
            win Spectrum?
          </p>
          <div className="flex flex-row gap-3 items-center justify-center my-8">
            <button
              onClick={() => {
                dispatch({ type: "START_GAME" });
              }}
              className="rounded-full backdrop-blur-2xl bg-white/20 text-2xl font-bold"
            >
              Start Game
            </button>
            <button className="rounded-full backdrop-blur-2xl bg-white/20 text-2xl font-bold">
              How To Play?
            </button>
          </div>
        </div>
      </AppContainer>
      <div className="absolute bottom-0 w-full flex justify-between font-thin text-xl mb-2 z-50">
        <p className="hidden lg:block ml-2 text-3xl"> tsooping.</p>
        <p className="mr-5">
          Spectrum was heavily inspired by the popular board game Wavelength,
          check them out{" "}
          <a
            className="text-white font-light hover:text-white/80 transition-all ease-in-out"
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
