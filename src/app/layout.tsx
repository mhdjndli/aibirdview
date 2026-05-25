import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans-app",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display-app",
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI BirdView — The premium directory of AI tools",
  description:
    "Discover, compare, and launch with the best AI tools. A curated, human-reviewed directory built for builders, marketers, and creators.",
  metadataBase: new URL(process.env.SITE_URL || "https://aibirdview.com"),
  openGraph: {
    title: "AI BirdView — The premium directory of AI tools",
    description:
      "Discover, compare, and launch with the best AI tools. Curated by humans, ranked by quality.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-ink-0 text-ink-800">
        {children}
      </body>
    </html>
  );
}
