import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/*
 * Dennis Snellenberg–style stacking cards.
 *
 * Each card is a direct child of <main>, with:
 *   position: sticky; top: 0; z-index: ascending
 *
 * As you scroll, each card sticks at the top. The NEXT card
 * (higher z-index) slides up from below and covers the current one.
 * The covered card scales down, fades slightly, and gains border-radius
 * for a dramatic pushed-back-in-stack feel.
 */

const CardPage = ({ children, index = 1, total = 7, bgAlt }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Direct scroll-linked transforms — no spring delay */
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.55]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 24]);

  const isLast = index === total;

  return (
    <motion.div
      ref={ref}
      className={`card-page ${
        index === 1 ? "card-page--hero" : "card-page--content"
      } ${bgAlt ? "card-page--alt" : ""}`}
      style={{
        zIndex: index,
        scale: isLast ? undefined : scale,
        opacity: isLast ? undefined : opacity,
        borderRadius: isLast ? undefined : borderRadius,
      }}
    >
      {children}
    </motion.div>
  );
};

export default CardPage;
