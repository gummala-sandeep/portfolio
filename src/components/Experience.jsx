import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "../data/resumeData";
import { FiArrowUpRight } from "react-icons/fi";
import "./Experience.css";

const reveal = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: i * 0.15 },
  }),
};

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section experience" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">03 / Experience</span>
          <div className="section-line" />
        </div>

        <div className="exp-list">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="exp-row"
              custom={i}
              variants={reveal}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              data-cursor
              data-cursor-label="View"
            >
              <div className="exp-row-top">
                <div className="exp-role-company">
                  <h3 className="exp-role">{exp.role}</h3>
                  <span className="exp-company">{exp.company}</span>
                </div>
                <div className="exp-meta">
                  <span className="exp-period mono">{exp.period}</span>
                  <span className="exp-type">{exp.type}</span>
                </div>
              </div>
              <div className="exp-points">
                {exp.points.map((point, j) => (
                  <p key={j} className="exp-point body-text">
                    <FiArrowUpRight className="exp-point-icon" />
                    {point}
                  </p>
                ))}
              </div>
              <div className="exp-divider" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
