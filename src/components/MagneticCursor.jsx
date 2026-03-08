import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./MagneticCursor.css";

const MagneticCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 15, mass: 0.2 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 15, mass: 0.2 });

  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const scaleSpring = useSpring(1, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const checkTouch = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    checkTouch();

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const over = (e) => {
      const el = e.target.closest("a, button, [data-cursor], .project-row, .contact-card-link, .nav-link, .bulb-toggle");
      if (el) {
        setIsHovering(true);
        scaleSpring.set(2.5);
        const lbl = el.getAttribute("data-cursor-label");
        if (lbl) setLabel(lbl);
      } else {
        setIsHovering(false);
        scaleSpring.set(1);
        setLabel("");
      }
    };

    const down = () => scaleSpring.set(0.8);
    const up = () => scaleSpring.set(isHovering ? 2.5 : 1);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("resize", checkTouch);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("resize", checkTouch);
    };
  }, [cursorX, cursorY, scaleSpring, isHovering]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div
        className={`cursor-ring ${isHovering ? "hovering" : ""}`}
        style={{ x: ringX, y: ringY, scale: scaleSpring }}
      >
        {label && <span className="cursor-label">{label}</span>}
      </motion.div>
    </>
  );
};

export default MagneticCursor;
