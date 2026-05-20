import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="dark">
      <body className="bg-bg text-text-primary antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
