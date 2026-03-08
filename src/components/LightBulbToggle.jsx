import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, useAnimation } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import "./LightBulbToggle.css";

const LightBulbToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const controls = useAnimation();
  const y = useMotionValue(0);

  const wireLength = useTransform(y, [0, 50], [32, 82]);
  const wireOpacity = useSpring(useTransform(y, [0, 30, 50], [0.5, 0.8, 1]), { stiffness: 300, damping: 20 });

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 35) {
      toggleTheme();
    }
    controls.start({
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 12 },
    });
  };

  return (
    <div className="bulb-toggle" data-cursor data-cursor-label="Pull">
      {/* Wire */}
      <motion.div className="bulb-wire" style={{ height: wireLength, opacity: wireOpacity }} />

      {/* 3D Bulb */}
      <div className={`bulb-3d ${isDark ? "off" : "on"}`}>
        {/* Glass bulb with 3D shading */}
        <div className="bulb-glass-3d">
          <div className="glass-highlight" />
          <div className="glass-reflection" />
          <div className="filament-container">
            <div className="filament-coil" />
            <div className="filament-coil filament-coil-2" />
          </div>
        </div>

        {/* Metal screw base with ridges */}
        <div className="bulb-screw-base">
          <div className="screw-ridge" />
          <div className="screw-ridge" />
          <div className="screw-ridge" />
          <div className="screw-tip" />
        </div>

        {/* Light glow layers */}
        <div className="bulb-glow-inner" />
        <div className="bulb-glow-outer" />
        <div className="bulb-glow-ambient" />
      </div>

      {/* Pull chain */}
      <div className="bulb-chain-zone">
        <motion.div
          className="bulb-pull-chain"
          drag="y"
          dragConstraints={{ top: 0, bottom: 55 }}
          dragElastic={0.12}
          style={{ y }}
          animate={controls}
          onDragEnd={handleDragEnd}
          whileTap={{ scale: 1.15 }}
        >
          <div className="chain-link" />
          <div className="chain-link" />
          <div className="chain-bead" />
        </motion.div>
      </div>
    </div>
  );
};

export default LightBulbToggle;
