import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { education, certifications } from "../data/resumeData";
import { FiAward, FiBookOpen } from "react-icons/fi";
import "./Education.css";

const reveal = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: i * 0.12 },
  }),
};

const Education = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="section education" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">05 / Education</span>
          <div className="section-line" />
        </div>

        <div className="edu-grid">
          {/* Degree */}
          <motion.div
            className="edu-card"
            custom={0}
            variants={reveal}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="edu-card-icon">
              <FiBookOpen />
            </div>
            <div className="edu-card-content">
              <h3 className="edu-degree">{education.degree}</h3>
              <p className="edu-institution">{education.institution}</p>
              <div className="edu-row">
                <span className="edu-cgpa">
                  <span className="cgpa-value">{education.cgpa}</span> CGPA
                </span>
                <span className="edu-period mono">{education.period}</span>
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            className="cert-card"
            custom={1}
            variants={reveal}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h4 className="cert-title">
              <FiAward className="cert-title-icon" />
              Certifications
            </h4>
            <div className="cert-list">
              {certifications.map((cert, i) => (
                <div key={i} className="cert-item">
                  <span className="cert-index mono">0{i + 1}</span>
                  <span className="cert-text">{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
