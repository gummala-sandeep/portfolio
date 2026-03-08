import { motion } from "framer-motion";
import { personalInfo } from "../data/resumeData";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import "./Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <a href="#home" className="footer-logo">
            <span className="logo-accent">S</span>andeep
          </a>
          <p className="footer-copy">
            © {new Date().getFullYear()} Sandeep Kumar. All rights reserved.
          </p>
        </div>

        <div className="footer-center">
          <div className="footer-socials">
            <a href={personalInfo.githubUrl} target="_blank" rel="noreferrer" data-cursor>
              <FiGithub />
            </a>
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noreferrer" data-cursor>
              <FiLinkedin />
            </a>
            <a href={`mailto:${personalInfo.email}`} data-cursor>
              <FiMail />
            </a>
          </div>
        </div>

        <div className="footer-right">
          <button className="back-to-top" onClick={scrollToTop} data-cursor data-cursor-label="Top">
            <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
