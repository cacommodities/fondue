import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import {
  DEFAULT_DARK_THEME,
  DEFAULT_LIGHT_THEME,
  getTheme,
  setTheme,
} from "../theme";

export const ThemeSwitch = () => {
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    return getTheme() || DEFAULT_LIGHT_THEME;
  });

  // Listen for theme changes (from other instances or external changes)
  useEffect(() => {
    const updateTheme = () => {
      const theme =
        document.documentElement.getAttribute("data-theme") ||
        DEFAULT_LIGHT_THEME;
      setCurrentTheme(theme);
    };

    // Check theme on mount
    updateTheme();

    // Listen for storage changes (e.g., from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme") {
        updateTheme();
      }
    };

    // Listen for DOM changes (mutation observer for data-theme attribute)
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("storage", handleStorageChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleTheme = (): void => {
    const newTheme =
      currentTheme === DEFAULT_DARK_THEME
        ? DEFAULT_LIGHT_THEME
        : DEFAULT_DARK_THEME;
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  };

  const isDark = currentTheme === DEFAULT_DARK_THEME;

  return (
    <label className="swap swap-rotate">
      {/* Hidden checkbox that controls theme via daisyUI theme-controller */}
      <input
        type="checkbox"
        className="theme-controller"
        value={isDark ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME}
        checked={isDark}
        onChange={toggleTheme}
        aria-label="Toggle theme"
      />

      {/* Sun icon - shown when light theme (swap-off = unchecked) */}
      <Sun className="swap-off h-4 w-4" />

      {/* Moon icon - shown when dark theme (swap-on = checked) */}
      <Moon className="swap-on h-4 w-4" />
    </label>
  );
};
