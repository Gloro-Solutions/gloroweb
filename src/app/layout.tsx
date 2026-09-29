import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://glorosolutions.com"),
  title: "Gloro Solutions — Modern Digital Engineering & Creative Technology",
  description:
    "Gloro Solutions is a modern digital engineering and creative technology startup engineering high-performance web systems, cloud architectures, and autonomous AI pipelines.",
  icons: {
    icon: "/brand/Logo.png",
    apple: "/brand/Logo.png",
  },
  openGraph: {
    title: "Gloro Solutions — Digital Engineering Studio",
    description: "Engineering Next-Generation Digital Systems, Cloud Architecture, and Intelligent Automation.",
    url: "https://glorosolutions.com",
    siteName: "Gloro Solutions",
    images: [
      {
        url: "/brand/LinkedIn Cover.png",
        width: 1200,
        height: 630,
        alt: "Gloro Solutions Cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gloro Solutions — Digital Engineering Studio",
    description: "Engineering Next-Generation Digital Systems, Cloud Architecture, and Intelligent Automation.",
    images: ["/brand/Twitter header - 1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased light ${inter.variable} ${kanit.variable}`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
