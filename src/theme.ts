import { useEffect, useMemo, useState } from "react";
import { DARK_COLORS, LIGHT_COLORS, type ThemeColors } from "./themeColors";

const THEME_KEY = "theme_3";

// ALSO UPDATE IN THE index.css IN DAISYUI PLUGIN
export const DEFAULT_LIGHT_THEME = "light";
export const DEFAULT_DARK_THEME = "luxury";

export const getTheme = (): string | null => {
  return localStorage.getItem(THEME_KEY);
};

export const setTheme = (theme: string): void => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
};

export const initializeTheme = (): string => {
  const savedTheme = getTheme();

  if (savedTheme) {
    setTheme(savedTheme);
    return savedTheme;
  }

  // Detect system preference
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)",
  ).matches;
  const defaultTheme = prefersDark ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
  setTheme(defaultTheme);
  return defaultTheme;
};

type Theme = "light" | "dark";

export const useSimpleThemeListener = (): Theme => {
  const [themeRaw, setThemeRaw] = useState(
    document.documentElement.getAttribute("data-theme") ?? DEFAULT_LIGHT_THEME,
  );

  const theme: Theme = useMemo(() => {
    if (themeRaw == DEFAULT_DARK_THEME) {
      return "dark";
    }
    if (themeRaw == DEFAULT_LIGHT_THEME) {
      return "light";
    }
    return "light";
  }, [themeRaw]);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          const target = mutation.target as HTMLElement;
          const newTheme =
            target.getAttribute("data-theme") ?? DEFAULT_LIGHT_THEME;
          setThemeRaw(newTheme);
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => {
      observer.disconnect();
    };
  }, []);

  return theme;
};

export const useThemeListener = <T>(
  { light: extraLight, dark: extraDark }: { light: T; dark: T } = {
    light: {} as T,
    dark: {} as T,
  },
): { theme: Theme; colors: ThemeColors & T } => {
  const theme = useSimpleThemeListener();
  const colors = theme === "dark" ? DARK_COLORS : LIGHT_COLORS;
  const extraColors = theme === "dark" ? extraDark : extraLight;
  const finalColors: ThemeColors & T = { ...colors, ...extraColors };
  // this allows us to use the colors object as a dependency in other hooks
  const finalColorsMemo = useMemo(
    () => finalColors,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(finalColors)],
  );
  return {
    theme,
    colors: finalColorsMemo,
  };
};
