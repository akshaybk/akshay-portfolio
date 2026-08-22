import { motion } from "framer-motion";

function Reveal({ children, delay = 0, direction = "up" }) {
  const directions = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { y: 0, x: -24 },
    right: { y: 0, x: 24 }
  };

  const initialPosition =
    directions[direction] || directions.up;

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initialPosition
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0
      }}
      viewport={{
        once: true,
        amount: 0.15
      }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;