import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata = {
  title: "Dhruv Desai — Deep Learning Engineer",
  description:
    "Deep learning, tensor infrastructure, computer vision, and systems projects by Dhruv Desai.",
  openGraph: {
    title: "Dhruv Desai — Deep Learning Engineer",
    description:
      "Deep learning, tensor infrastructure, computer vision, and systems projects by Dhruv Desai.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
