// frontend/src/app/layout.tsx
"use client"; // Important for using client-side features like Redux

import { Provider } from "react-redux";
import store from "../store/index";
// import "../styles/globals.css"; // Adjust the path as needed

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
