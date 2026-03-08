import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "../data/resumeData";
import { FiArrowDown } from "react-icons/fi";
import {
  SiFlutter, SiFirebase, SiDart, SiNodedotjs, SiMongodb,
} from "react-icons/si";
import "./Hero.css";

/* Staggered line reveal with dramatic slide-up + slight rotate */
const lineVariants = {
  hidden: { y: "120%", rotate: 4, opacity: 0 },
  visible: (i) => ({
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.4 + i * 0.15,
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.33, 1, 0.68, 1], delay: 1.4 + i * 0.12 },
  }),
};

const scaleIn = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 1.8 + i * 0.1 },
  }),
};

const nameLines = [
  { text: "Gummala", variant: "filled" },
  { text: "Sandeep", variant: "accent" },
  { text: "Kumar", variant: "outline" },
];

/* Bouncing skill icons — only the most-used techs from projects */
const floatingIcons = [
  { Icon: SiFlutter,   x: "7%",  y: "16%", size: 64, delay: 0,   color: "#02569B" },
  { Icon: SiFirebase,  x: "88%", y: "20%", size: 60, delay: 0.5, color: "#FFCA28" },
  { Icon: SiDart,      x: "85%", y: "72%", size: 58, delay: 1.0, color: "#0175C2" },
  { Icon: SiNodedotjs, x: "8%",  y: "76%", size: 58, delay: 0.3, color: "#339933" },
  { Icon: SiMongodb,   x: "50%", y: "90%", size: 56, delay: 0.7, color: "#47A248" },
];

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="home" className="hero" ref={ref}>
      {/* Grid background */}
      <div className="hero-grid" />

      {/* Bouncing skill icons — always visible, branded colors */}
      <div className="hero-floating-icons">
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            className="hero-float-icon"
            style={{ left: item.x, top: item.y, color: item.color }}
            initial={{ opacity: 0, y: 20 }}
            animate={
              isInView
                ? {
                    opacity: 0.6,
                    y: [0, -20, 0],
                  }
                : {}
            }
            transition={{
              opacity: { duration: 0.8, delay: item.delay + 1.2 },
              y: {
                duration: 2.5 + i * 0.3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: item.delay + 1.5,
              },
            }}
          >
            <item.Icon size={item.size} />
          </motion.div>
        ))}
      </div>

      <div className="container hero-content">
        {/* Top row with animated counter */}
        <div className="hero-top">
          <motion.div
            className="hero-eyebrow-group"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <span className="hero-eyebrow-dot" />
            <p className="hero-eyebrow mono">Application Developer</p>
          </motion.div>

          <motion.p
            className="hero-eyebrow mono hero-eyebrow-right"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Based in India &#8212; {personalInfo.title.split("—")[1]?.trim()}
          </motion.p>
        </div>

        {/* Full name — 3 dramatic lines with 3D shadow */}
        <div className="hero-name-block">
          {nameLines.map((line, i) => (
            <div key={line.text} className="hero-name-line">
              <div className="hero-line-mask">
                <motion.span
                  className={`hero-name-text hero-name-3d ${
                    line.variant === "outline"
                      ? "hero-name-outline"
                      : line.variant === "accent"
                      ? "hero-name-accent"
                      : ""
                  }`}
                  custom={i}
                  variants={lineVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {line.text}
                </motion.span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="hero-bottom">
          <motion.p
            className="hero-description body-text"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Flutter & Frontend developer crafting clean,
            <br className="hide-mobile" />
            scalable, and delightful digital experiences.
          </motion.p>

          <motion.div
            className="hero-scroll-cta"
            custom={0}
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.a
              href="#about"
              className="scroll-circle"
              data-cursor
              data-cursor-label="Scroll"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FiArrowDown size={18} />
              <svg className="scroll-circle-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Decorative accent line */}
      <motion.div
        className="hero-accent-line"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 1.8 }}
      />
    </section>
  );
};

export default Hero;
