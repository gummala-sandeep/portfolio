import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "../data/resumeData";
import {
  FiMail, FiPhone, FiGithub, FiLinkedin,
  FiCopy, FiCheck, FiArrowUpRight,
} from "react-icons/fi";
import "./Contact.css";

const reveal = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: i * 0.12 },
  }),
};

const contactLinks = [
  { icon: FiMail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: FiPhone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
  { icon: FiGithub, label: "GitHub", value: personalInfo.github, href: personalInfo.githubUrl },
  { icon: FiLinkedin, label: "LinkedIn", value: personalInfo.linkedin, href: personalInfo.linkedinUrl },
];

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState("");

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">06 / Contact</span>
          <div className="section-line" />
        </div>

        <div className="contact-layout">
          {/* Left – big CTA */}
          <motion.div
            className="contact-cta"
            custom={0}
            variants={reveal}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h2 className="heading-lg">
              Let's work
              <br />
              <span className="accent-word">together.</span>
            </h2>
            <p className="body-text">
              I'm always open to new opportunities, freelance projects,
              or just a good conversation about tech.
            </p>
            <a href={`mailto:${personalInfo.email}`} className="btn-rounded contact-btn" data-cursor>
              <FiMail />
              Send me an email
              <FiArrowUpRight />
            </a>
          </motion.div>

          {/* Right – Contact Detail Card */}
          <motion.div
            className="contact-card"
            custom={1}
            variants={reveal}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="contact-card-header">
              <div className="card-avatar">
                <span className="avatar-letter">S</span>
              </div>
              <div>
                <h3 className="card-name">{personalInfo.shortName}</h3>
                <span className="card-title">{personalInfo.title}</span>
              </div>
              <div className="card-status">
                <span className="status-dot" />
                Available
              </div>
            </div>

            <div className="contact-card-divider" />

            <div className="contact-links-list">
              {contactLinks.map((link) => (
                <div key={link.label} className="contact-card-link" data-cursor>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="contact-link-main"
                  >
                    <link.icon className="contact-link-icon" />
                    <div className="contact-link-info">
                      <span className="contact-link-label mono">{link.label}</span>
                      <span className="contact-link-value">{link.value}</span>
                    </div>
                    <FiArrowUpRight className="contact-link-arrow" />
                  </a>
                  <button
                    className="copy-btn"
                    onClick={() => copyText(link.value, link.label)}
                    title="Copy"
                  >
                    {copied === link.label ? (
                      <FiCheck className="copied" />
                    ) : (
                      <FiCopy />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
