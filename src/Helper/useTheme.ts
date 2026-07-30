import { useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

// Must match the server-rendered default so the first client render (used for
// hydration) doesn't mismatch. The inline script in layout.tsx already applies
// the real stored theme to <html> before hydration, so there's no visual flash;
// this just corrects the React state to match once mounted.
const DEFAULT_THEME: Theme = "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const mounted = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    setTheme(stored === "light" || stored === "dark" ? stored : DEFAULT_THEME);
    mounted.current = true;
  }, []);

  useEffect(() => {
    if (!mounted.current) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
};
