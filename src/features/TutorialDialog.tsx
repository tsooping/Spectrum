import { X } from "lucide-react";
import { useGameContext } from "./GameProvider";

function TutorialDialog() {
  const { dispatch } = useGameContext();

  return (
    <div
      className={`relative flex max-w-[1000px] flex-col items-center justify-center rounded-2xl bg-[#ffffffff] py-5 pr-3 text-center align-middle text-black`}
    >
      <button
        className="absolute right-5 top-5 bg-white"
        onClick={() => {
          dispatch({ type: "CLOSE_TUTORIAL" });
        }}
      >
        <X size={25} />
      </button>
      <div className="">
        <h1 className="text-[3rem] font-light">How to play Spectrum?</h1>
        <p className="mb-4 text-2xl font-light">
          Spectrum is a team game for 2+ players!
        </p>
      </div>
      <div className="flex max-h-[60vh] flex-col gap-14 overflow-y-auto px-20 py-5">
        <div className="text-center">
          <h3 className="mb-3 text-3xl">Your Team's Goal</h3>
          <img
            src="src/assets/tutorial-1.png"
            className="mx-auto mb-3 w-[40rem] rounded-xl"
          />
          <p className="text-xl font-light">
            Your team's goal is to slide the white slider as close to the center
            of the target (The green area) as you can, the green sections give
            points based on its color, with the center being the highest points.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-3xl">The Twist!</h3>
          <img
            src="src/assets/tutorial-2.png"
            className="mx-auto mb-3 w-[40rem] rounded-xl"
          />
          <p className="text-xl font-light">
            The twist is that the target is hidden from view! Only one player in
            the team is able to view where the target location is each round,
            and each round the target is randomized.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-3xl">How do you find the target?</h3>
          <img
            src="src/assets/tutorial-3.png"
            className="mx-auto mb-3 w-[40rem] rounded-xl"
          />
          <p className="text-xl font-light">
            Fortunately, your teammate is able to view the target location and
            provide hints to help you hit the target! Your teammate is able to
            "peek" at the answer, and provide hints with the randomised clue
            cards that has two opposing concepts on it, like “Underrated -
            Overrated” or “Hot - Cold.”
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-3xl">Try to get the high score!</h3>
          <img
            src="src/assets/tutorial-4.png"
            className="mx-auto mb-3 w-[40rem] rounded-xl"
          />
          <p className="text-xl font-light">
            Guess based on your teammate's clue and try to get as close as
            possible to the targeted area! The closer you are, the higher you'll
            score! Good luck and have fun!
          </p>
        </div>
      </div>
    </div>
  );
}

export default TutorialDialog;
