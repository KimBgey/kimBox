import type { Metadata } from "next";
import localFont from "next/font/local";
import { Syne } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";

const sunroll = localFont({
  src: "../public/fonts/Sunroll.ttf",
  variable: "--font-sunroll",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "André Kim — Designer & Développeur",
  description: "Studio créatif : design, branding, développement web.",
  openGraph: {
    title: "André Kim — Designer & Développeur",
    description: "Studio créatif : design, branding, développement web.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sunroll.variable} ${syne.variable}`}>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
