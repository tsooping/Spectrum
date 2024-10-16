import AppContainer from "../components/ui/AppContainer";
import { useGameContext } from "../features/GameProvider";
import Button from "../components/ui/Button";
import TutorialDialog from "../features/TutorialDialog";

function Homepage() {
  const { state, dispatch } = useGameContext();
  const tutorialState = state.tutorial;

  return (
    <>
      <AppContainer>
        <div className="absolute top-4 flex w-full flex-row justify-between">
          <a
            className="ml-3 text-3xl font-thin text-white transition-all duration-500 hover:scale-[1.07] hover:text-white"
            href="https://tsooping.pages.dev/"
            target="none"
          >
            tsooping.
          </a>
          <p className="mr-4 text-3xl font-thin text-white transition-all ease-in-out hover:text-white md:block">
            High Score: {state.highScore}
          </p>
        </div>

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
                dispatch({ type: "START_GAME" });
              }}
            >
              Start Game
            </Button>
            <Button
              onClick={() => {
                dispatch({ type: "SHOW_TUTORIAL" });
              }}
            >
              How To Play?
            </Button>
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
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/50 ${tutorialState ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} z-[50] transition-opacity duration-1000 ease-in-out`}
      >
        <TutorialDialog />
      </div>
    </>
  );
}

export default Homepage;
