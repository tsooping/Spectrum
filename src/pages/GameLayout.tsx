import { motion, AnimatePresence } from "framer-motion";
import { useGameContext } from "../features/GameProvider";
import GamePage from "./GamePage";
import Homepage from "./Homepage";
import ScorePage from "./ScorePage";

// const pageVariants = {
//   initial: { opacity: 0 },
//   animate: { opacity: 1 },
//   exit: { opacity: 0 },
// };

const pageVariants = {
  initial: {
    opacity: 0,
    filter: "blur(64px)",
    transition: {
      duration: 1,
    },
  }, // Initial state: blurred and transparent
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
    },
  }, // Animated state: clear and fully opaque
  exit: {
    opacity: 0,
    filter: "blur(64px)",
    transition: {
      duration: 1,
    },
  }, // Exit state: blurred and transparent
};

function GameLayout() {
  const { state } = useGameContext();
  const { status } = state;

  return (
    <AnimatePresence mode="wait">
      {status === "Homepage" && (
        <motion.div
          className="absolute z-50 h-screen w-full"
          key="Homepage"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <Homepage />
        </motion.div>
      )}
      {status === "Active" && (
        <motion.div
          className="absolute z-50 h-screen w-full"
          key="GamePage"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <GamePage />
        </motion.div>
      )}
      {status === "Finished" && (
        <motion.div
          className="absolute z-50 h-screen w-full"
          key="ScorePage"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <ScorePage />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GameLayout;
