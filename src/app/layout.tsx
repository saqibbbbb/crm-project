import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "../index.css";

export const metadata: Metadata = {
  title: "CRM",
};

const themeInitScript = `
(function () {
  var stored = localStorage.getItem("theme");
  var theme = stored === "light" || stored === "dark" ? stored : "dark";
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#f1efe9" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#131319" media="(prefers-color-scheme: dark)" />
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
