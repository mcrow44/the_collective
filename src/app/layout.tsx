import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Bebas_Neue } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"


const MyFont = Bebas_Neue({
  variable: '--font-bebas-neue', 
  subsets: ['latin'],
  weight: '400'
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cromatic Collective",
  description: "Graphic and Web design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={MyFont.variable}>{children}</body>
    </html>
  );
}



