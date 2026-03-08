import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

/* Beautiful accent colors that pair with white — cycles every 30s in light mode */
const lightAccents = [
  { accent: "#6366f1", hover: "#4f46e5", dim: "rgba(99,102,241,0.08)" },   // Indigo
  { accent: "#ec4899", hover: "#db2777", dim: "rgba(236,72,153,0.08)" },   // Pink
  { accent: "#14b8a6", hover: "#0d9488", dim: "rgba(20,184,166,0.08)" },   // Teal
  { accent: "#f97316", hover: "#ea580c", dim: "rgba(249,115,22,0.08)" },   // Orange
  { accent: "#8b5cf6", hover: "#7c3aed", dim: "rgba(139,92,246,0.08)" },   // Violet
  { accent: "#06b6d4", hover: "#0891b2", dim: "rgba(6,182,212,0.08)" },    // Cyan
  { accent: "#e11d48", hover: "#be123c", dim: "rgba(225,29,72,0.08)" },    // Rose
  { accent: "#10b981", hover: "#059669", dim: "rgba(16,185,129,0.08)" },   // Emerald
];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const [accentIdx, setAccentIdx] = useState(0);
  const intervalRef = useRef(null);

  /* Apply theme attribute */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* Cycle accent colors in light mode */
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (theme === "light") {
      applyLightAccent(accentIdx);
      intervalRef.current = setInterval(() => {
        setAccentIdx((prev) => {
          const next = (prev + 1) % lightAccents.length;
          applyLightAccent(next);
          return next;
        });
      }, 30000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [theme]);

  const applyLightAccent = (idx) => {
    const { accent, hover, dim } = lightAccents[idx];
    const root = document.documentElement;
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--accent-hover", hover);
    root.style.setProperty("--accent-dim", dim);
    root.style.setProperty("--border-hover", `${accent}40`);
    root.style.setProperty("--shadow", `0 10px 60px ${accent}14`);
    root.style.setProperty("--bg-glass", `${accent}08`);
  };

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (next === "dark") {
        /* Reset inline overrides so CSS vars take over */
        const root = document.documentElement;
        root.style.removeProperty("--accent");
        root.style.removeProperty("--accent-hover");
        root.style.removeProperty("--accent-dim");
        root.style.removeProperty("--border-hover");
        root.style.removeProperty("--shadow");
        root.style.removeProperty("--bg-glass");
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accentIdx }}>
      {children}
    </ThemeContext.Provider>
  );
};
