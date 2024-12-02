"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>Switch to {theme === "light" ? "Dark" : "Light"} Mode</button>;
}
