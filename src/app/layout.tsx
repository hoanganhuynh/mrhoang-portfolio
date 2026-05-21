import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cv.williens.space"),
  title: "Williens Hoang Nguyen — Psychology-led Project Management",
  description:
    "PhD Psychology, Project Manager, and Creative-Business Leader. Bridging psychology, business strategy, creative direction, and digital product delivery.",
  keywords: [
    "Williens Hoang Nguyen",
    "Project Management",
    "Psychology",
    "Digital Product",
    "Creative Direction",
    "UX/UI",
    "Business Administration",
  ],
  openGraph: {
    title: "Williens Hoang Nguyen — Psychology-led Project Management",
    description:
      "PhD Psychology, Project Manager, and Creative-Business Leader.",
    type: "website",
    url: "https://cv.williens.space",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg text-text-primary antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
