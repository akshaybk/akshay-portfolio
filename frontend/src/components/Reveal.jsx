import { motion, useReducedMotion } from "framer-motion";

function Reveal({ children, delay = 0, direction = "up" }) {
  const shouldReduceMotion = useReducedMotion();
  const directions = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { y: 0, x: -24 },
    right: { y: 0, x: 24 }
  };

  const initialPosition = directions[direction] || directions.up;
  const animated = !shouldReduceMotion;

  return (
    <motion.div
      initial={animated ? { opacity: 0, ...initialPosition } : false}
      whileInView={animated ? { opacity: 1, x: 0, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.15 }}
      transition={animated ? {
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1]
      } : undefined}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
