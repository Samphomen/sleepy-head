import type { Metadata } from "next";
import { Bodoni_Moda, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
    subsets: ["latin"],
    variable: "--font-bodoni",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

const greatVibes = Great_Vibes({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-great-vibes",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Valentine V2 - A Romantic Experience",
    description: "A beautiful romantic web experience with password protection",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${bodoni.variable} ${playfair.variable} ${greatVibes.variable}`}>
            <body>{children}</body>
        </html>
    );
}
