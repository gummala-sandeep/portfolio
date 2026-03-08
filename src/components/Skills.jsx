import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "../data/resumeData";
import {
  SiFlutter, SiFirebase, SiDart, SiNodedotjs, SiJavascript,
  SiPython, SiGit, SiMongodb, SiHtml5, SiCss,
} from "react-icons/si";
import { FaJava, FaC } from "react-icons/fa6";
import "./Skills.css";

const iconMap = {
  Flutter: SiFlutter, Firebase: SiFirebase, Dart: SiDart,
  "Node.js": SiNodedotjs, JavaScript: SiJavascript,
  Python: SiPython, Java: FaJava, Git: SiGit,
  MongoDB: SiMongodb, HTML: SiHtml5, CSS: SiCss, C: FaC,
};

const allSkills = [
  ...skills.programming.map((s) => ({ name: s, category: "Language" })),
  ...skills.frameworks.map((s) => ({ name: s, category: "Framework" })),
];

const reveal = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: i * 0.06 },
  }),
};

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">02 / Skills</span>
          <div className="section-line" />
        </div>

        {/* Marquee */}
        <div className="skills-marquee">
          <motion.div
            className="marquee-track"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...allSkills, ...allSkills].map((skill, i) => {
              const Icon = iconMap[skill.name];
              return (
                <div key={i} className="marquee-item">
                  {Icon && <Icon className="marquee-icon" />}
                  <span>{skill.name}</span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Skill grid */}
        <div className="skills-grid">
          {allSkills.map((skill, i) => {
            const Icon = iconMap[skill.name];
            return (
              <motion.div
                key={skill.name}
                className="skill-card"
                custom={i}
                variants={reveal}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                data-cursor
              >
                <div className="skill-card-icon">
                  {Icon ? <Icon /> : <span className="skill-letter">{skill.name.charAt(0)}</span>}
                </div>
                <span className="skill-card-name">{skill.name}</span>
                <span className="skill-card-cat mono">{skill.category}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
