import type { Metadata } from "next";
import { Syne, Questrial } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import ContextProviders from "@/components/MyContext";


const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--syne",
});
const questrial = Questrial({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--questrial",
});

const lulo = localFont({
  src: "./fonts/Lulo Clean One.otf",
  variable: "--lulo-clean-one-bold",
  weight: "100 400",
});

export const metadata: Metadata = {
  title: "R8 My Trainers",
  description:
    "Discover and rate the latest trainers on the market! Share your thoughts, read reviews, and find the perfect pair for your style and comfort with R8 My Trainers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${questrial.className} ${syne.variable} ${questrial.variable} ${lulo.variable}`}
      >
        < ContextProviders>
          {children}
        </ContextProviders>

      </body>
    </html>
  );
}
