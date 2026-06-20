import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
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

const syne = Syne({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cv.williens.space"),
  title: "Williens Hoang Nguyen — Digital Product Consultant",
  description:
    "PhD Psychology and Digital Product Consultant. Designing UIUX systems, product journeys, and digital experiences shaped by human behavior.",
  keywords: [
    "Williens Hoang Nguyen",
    "Product Design",
    "Digital Product Consultant",
    "Psychology",
    "Digital Product",
    "Creative Direction",
    "UX/UI",
    "UIUX Designer",
    "Design Systems",
    "Business Administration",
  ],
  openGraph: {
    title: "Williens Hoang Nguyen — Digital Product Consultant",
    description:
      "PhD Psychology and Digital Product Consultant designing UIUX systems and product experiences.",
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
    <html lang="en" className={`dark ${plusJakartaSans.variable} ${jetbrainsMono.variable} ${syne.variable}`}>
      <body className="bg-bg text-text-primary antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
