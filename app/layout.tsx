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
    icon: [
      { url: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Cdefs%3E%3ClinearGradient id=%27g%27 x1=%270%25%27 y1=%270%25%27 x2=%27100%25%27 y2=%27100%25%27%3E%3Cstop offset=%270%25%27 stop-color=%27%23f59e0b%27/%3E%3Cstop offset=%27100%25%27 stop-color=%27%23ef4444%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%27100%27 height=%27100%27 rx=%2720%27 fill=%27%2318181b%27/%3E%3Ctext x=%2750%27 y=%2772%27 font-family=%27system-ui%27 font-weight=%27700%27 font-size=%2748%27 fill=%27url(%23g)%27 text-anchor=%27middle%27%3EPG%3C/text%3E%3C/svg%3E', type: 'image/svg+xml' },
    ],
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
