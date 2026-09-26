import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { summary, skills } from "../data/resumeData";
import "./About.css";

const reveal = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: i * 0.1 },
  }),
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">01 / About</span>
          <div className="section-line" />
        </div>

        <div className="about-grid">
          {/* Left – big statement */}
          <motion.div
            className="about-statement"
            custom={0}
            variants={reveal}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h2 className="heading-lg">
              I build apps that
              <span className="accent-word"> work beautifully</span> — from
              pixel to production.
            </h2>
          </motion.div>

          {/* Right – description + stats */}
          <div className="about-details">
            <motion.p
              className="body-text"
              custom={1}
              variants={reveal}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {summary}
            </motion.p>

            <motion.div
              className="about-stats"
              custom={2}
              variants={reveal}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <div className="stat-item">
                <span className="stat-value">5+</span>
                <span className="stat-label">Projects Shipped</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">9.06</span>
                <span className="stat-label">CGPA</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">150+</span>
                <span className="stat-label">Problems Solved</span>
              </div>
            </motion.div>

            <motion.div
              className="about-expertise"
              custom={3}
              variants={reveal}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <h4 className="expertise-title mono">Core Expertise</h4>
              <div className="expertise-tags">
                {skills.expertise.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
