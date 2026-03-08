import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { personalInfo } from "../data/resumeData";
import {
  FiMail, FiPhone, FiGithub, FiLinkedin,
  FiArrowUpRight, FiArrowUp,
} from "react-icons/fi";
import "./ContactFlipCard.css";

const links = [
  { icon: FiMail, label: "Email", href: `mailto:${personalInfo.email}`, value: personalInfo.email },
  { icon: FiPhone, label: "Phone", href: `tel:${personalInfo.phone}`, value: personalInfo.phone },
  { icon: FiGithub, label: "GitHub", href: personalInfo.githubUrl, value: personalInfo.github },
  { icon: FiLinkedin, label: "LinkedIn", href: personalInfo.linkedinUrl, value: personalInfo.linkedin },
];

const ContactFlipCard = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);

  /* Motion values for cursor-tracking 3D tilt */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [12, -12]);
  const rotateY = useTransform(mouseX, [0, 1], [-12, 12]);

  /* Glare coordinates for the shine layer */
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);

  /* Listen on the entire section so tilt reacts as soon as cursor enters */
  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const onMove = (e) => {
      if (isFlipped) return;
      const rect = card.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const onLeave = () => {
      mouseX.set(0.5);
      mouseY.set(0.5);
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [isFlipped, mouseX, mouseY]);

  const handleFlip = () => setIsFlipped((prev) => !prev);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section id="contact" className="flip-card-section" ref={sectionRef}>
      {/* Section header */}
      <div className="container">
        <div className="section-header">
          <span className="section-label">06 / Contact</span>
          <div className="section-line" />
        </div>
      </div>

      {/* 3D Card wrapper */}
      <div className="flip-card-perspective">
        <motion.div
          ref={cardRef}
          className={`flip-card-body ${isFlipped ? "flipped" : ""}`}
          style={{ rotateX: isFlipped ? 0 : rotateX, rotateY: isFlipped ? 0 : rotateY }}
          onClick={handleFlip}
          whileTap={{ scale: 0.97 }}
          data-cursor
        >
          {/* ── FRONT FACE ── */}
          <div className="flip-face flip-front">
            {/* Glare overlay */}
            <motion.div
              className="flip-card-glare"
              style={{
                background: useTransform(
                  [glareX, glareY],
                  ([gx, gy]) =>
                    `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.18) 0%, transparent 60%)`
                ),
              }}
            />

            {/* Avatar ring with pulse */}
            <div className="flip-avatar-wrapper">
              <div className="flip-avatar-ring" />
              <img
                src="/avatar-3d.png"
                alt={personalInfo.shortName}
                className="flip-avatar"
              />
            </div>

            <h2 className="flip-name">{personalInfo.shortName}</h2>
            <p className="flip-designation">{personalInfo.title}</p>

            <div className="flip-status">
              <span className="flip-status-dot" />
              Available for work
            </div>

            <div className="flip-cta">
              <FiMail className="flip-cta-icon" />
              <span>Tap to contact</span>
            </div>
          </div>

          {/* ── BACK FACE ── */}
          <div className="flip-face flip-back">
            <h3 className="flip-back-title">Get in Touch</h3>
            <p className="flip-back-subtitle">Let's build something great together</p>

            <div className="flip-links">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flip-link-row"
                  onClick={(e) => e.stopPropagation()}
                  data-cursor
                >
                  <l.icon className="flip-link-icon" />
                  <div className="flip-link-text">
                    <span className="flip-link-label mono">{l.label}</span>
                    <span className="flip-link-value">{l.value}</span>
                  </div>
                  <FiArrowUpRight className="flip-link-arrow" />
                </a>
              ))}
            </div>

            <span className="flip-back-hint">Tap to flip back</span>
          </div>
        </motion.div>
      </div>

      {/* Minimal footer */}
      <div className="flip-footer">
        <p className="flip-footer-copy">
          © {new Date().getFullYear()} {personalInfo.shortName} Kumar. All rights reserved.
        </p>
        <button className="flip-back-top" onClick={scrollToTop} data-cursor>
          <FiArrowUp />
        </button>
      </div>
    </section>
  );
};

export default ContactFlipCard;
