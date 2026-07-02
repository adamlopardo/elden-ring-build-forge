import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elden Ring Build Forge — OP Build Generator",
  description:
    "Design end-to-end Elden Ring builds: exact stat allocation, weapons, talismans, and an AI route planner that tells you how to get there. Patch 1.16 / Shadow of the Erdtree.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <NavBar />
        <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6 sm:px-6">{children}</main>
        <footer className="border-t border-obsidian-600 py-6 text-center text-xs text-stone-500">
          <p>
            Elden Ring Build Forge · Fan-made theorycrafting tool · Targets Calibration Patch 1.16
            (Shadow of the Erdtree).
          </p>
          <p className="mt-1">
            Not affiliated with or endorsed by FromSoftware or Bandai Namco. No copyrighted assets
            used.
          </p>
        </footer>
      </body>
    </html>
  );
}
