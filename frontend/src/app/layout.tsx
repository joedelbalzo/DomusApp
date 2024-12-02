// frontend/src/app/layout.tsx
"use client"; // Important for using client-side features like Redux

import { Provider } from "react-redux";
import store from "../store/index";
import ThemeToggle from "./ThemeToggle";
import { ThemeProvider } from "./ThemeProvider";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ThemeToggle />
          <Provider store={store}>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
