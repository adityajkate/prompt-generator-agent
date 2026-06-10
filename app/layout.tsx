import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./_components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#f5f5f0" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Prompt Generator — Professional Diffusion Prompt Generator",
    template: "%s | Prompt Generator",
  },
  description:
    "Generate professional, award-grade diffusion model prompts from a theme and aspect ratio. Minimalist, aesthetic, 8K-ready image briefs for creators.",
  keywords: [
    "diffusion prompt generator",
    "AI image prompt tool",
    "stable diffusion prompts",
    "prompt engineering",
    "image generation briefs",
    "NVIDIA prompt generator",
    "professional image prompts",
  ],
  authors: [{ name: "Prompt Generator" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Prompt Generator — Professional Diffusion Prompt Generator",
    description:
      "Generate professional, award-grade diffusion model prompts from a theme and aspect ratio.",
    url: "https://prompt-generator-agent.vercel.app",
    siteName: "Prompt Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Generator",
    description:
      "Generate professional diffusion prompts from a theme and aspect ratio.",
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='5' fill='%23a1a1aa'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`} data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://prompt-generator-agent.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Prompt Generator",
              description:
                "Generate professional diffusion model prompts from a theme and aspect ratio.",
              url: "https://prompt-generator-agent.vercel.app",
              applicationCategory: "Multimedia",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
