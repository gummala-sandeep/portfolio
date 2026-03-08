import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "../data/resumeData";
import { FiArrowUpRight } from "react-icons/fi";
import "./Projects.css";

const reveal = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: i * 0.12 },
  }),
};

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">04 / Projects</span>
          <div className="section-line" />
        </div>

        <div className="projects-list">
          {projects.map((project, i) => {
            const isLast = i === projects.length - 1;
            return (
            <motion.div
              key={project.title}
              className={`project-row ${hoveredIdx === i ? "active" : ""} ${hoveredIdx !== null && hoveredIdx !== i ? "dimmed" : ""} ${isLast ? "project-row--last" : ""}`}
              custom={i}
              variants={reveal}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              data-cursor
              data-cursor-label="View"
            >
              {/* Floating description above for last project */}
              {isLast && hoveredIdx === i && (
                <motion.div
                  className="project-desc-float"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                >
                  <div className="project-desc-float-inner">
                    {project.points.map((p, j) => (
                      <p key={j} className="body-text">{p}</p>
                    ))}
                  </div>
                </motion.div>
              )}

              <div className="project-row-top">
                <div className="project-left">
                  <span className="project-index mono">0{i + 1}</span>
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-subtitle">{project.subtitle}</span>
                  </div>
                </div>
                <div className="project-right">
                  <div className="project-tech">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                  <FiArrowUpRight className="project-arrow" />
                </div>
              </div>

              {/* Description below for all except last */}
              {!isLast && (
                <motion.div
                  className="project-desc"
                  initial={false}
                  animate={{
                    height: hoveredIdx === i ? "auto" : 0,
                    opacity: hoveredIdx === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                >
                  <div className="project-desc-inner">
                    {project.points.map((p, j) => (
                      <p key={j} className="body-text">{p}</p>
                    ))}
                  </div>
                </motion.div>
              )}

              <div className="project-divider" />
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
