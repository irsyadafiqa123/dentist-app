import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interSans = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Dentist App",
    default: "Dentist App",
  },
  description:
    "A simple dentist appointment booking application built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className={`${interSans.className} antialiased`}>{children}</body>
    </html>
  );
}
