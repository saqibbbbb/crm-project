import { useTheme } from "../../Helper/useTheme";
import { IconSun, IconMoon } from "./Icons";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      aria-label="Toggle theme"
      className="glass w-8 h-8 rounded-full text-zinc-600 dark:text-zinc-300 flex items-center justify-center hover:bg-white/75 dark:hover:bg-white/10 transition-colors shrink-0"
    >
      {theme === "dark" ? (
        <IconSun className="w-4 h-4" />
      ) : (
        <IconMoon className="w-4 h-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
