import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://glorosolutions.com"),
  title: "Gloro Solutions — Under Development",
  description: "Engineering Next-Generation Digital Systems, Cloud Architecture, and Intelligent Automation. Our full platform is under active development.",
  icons: {
    icon: "/brand/Logo.png",
    apple: "/brand/Logo.png",
  },
  openGraph: {
    title: "Gloro Solutions — Under Development",
    description: "Engineering the Next Era of Intelligent Digital Platforms.",
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
    title: "Gloro Solutions — Under Development",
    description: "Engineering the Next Era of Intelligent Digital Platforms.",
    images: ["/brand/Twitter header - 1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased light">
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900">{children}</body>
    </html>
  );
}
