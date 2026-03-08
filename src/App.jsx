import { useEffect } from "react";
import Lenis from "lenis";
import { ThemeProvider } from "./context/ThemeContext";
import MagneticCursor from "./components/MagneticCursor";
import LightBulbToggle from "./components/LightBulbToggle";
import CardPage from "./components/CardPage";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import ContactFlipCard from "./components/ContactFlipCard";
import "./styles/globals.css";

const App = () => {
  /* Lenis smooth scroll */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <ThemeProvider>
      <MagneticCursor />
      <Navbar />

      {/* Fixed light bulb toggle — always visible on right side */}
      <div className="fixed-bulb-wrapper">
        <LightBulbToggle />
      </div>

      <main>
        <CardPage index={1} total={7}>
          <Hero />
        </CardPage>
        <CardPage index={2} total={7}>
          <About />
        </CardPage>
        <CardPage index={3} total={7} bgAlt>
          <Skills />
        </CardPage>
        <CardPage index={4} total={7}>
          <Experience />
        </CardPage>
        <CardPage index={5} total={7} bgAlt>
          <Projects />
        </CardPage>
        <CardPage index={6} total={7}>
          <Education />
        </CardPage>
        <CardPage index={7} total={7} bgAlt>
          <ContactFlipCard />
        </CardPage>
      </main>
    </ThemeProvider>
  );
};

export default App;
