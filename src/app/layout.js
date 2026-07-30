import { Inter, JetBrains_Mono, Libre_Baskerville } from "next/font/google";
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

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-baskerville",
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
      className={`${inter.variable} ${jetbrainsMono.variable} ${libreBaskerville.variable}`}
    >
      <body style={{ position: "relative", minHeight: "100vh" }}>
        <div className="grain-overlay" />
        <div className="glow-bg" />
        {children}
      </body>
    </html>
  );
}
