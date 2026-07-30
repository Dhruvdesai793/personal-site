import { Inter, JetBrains_Mono, Newsreader, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  title: "Dhruv Desai · ML Infrastructure & Deep Learning Systems",
  description: "Building ML Infrastructure & Deep Learning Systems from First Principles.",
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${jetbrainsMono.variable} ${newsreader.variable} ${spaceGrotesk.variable}`}
    >
      <body style={{ position: "relative", minHeight: "100vh" }}>
        <div className="grain-overlay" />
        <div className="glow-bg" />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
