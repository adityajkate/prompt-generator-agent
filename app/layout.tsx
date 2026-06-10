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
    default: "Prompt Studio — Professional Diffusion Prompt Generator",
    template: "%s | Prompt Studio",
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
  authors: [{ name: "Prompt Studio" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Prompt Studio — Professional Diffusion Prompt Generator",
    description:
      "Generate professional, award-grade diffusion model prompts from a theme and aspect ratio.",
    url: "https://prompt-studio.vercel.app",
    siteName: "Prompt Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Studio",
    description:
      "Generate professional diffusion prompts from a theme and aspect ratio.",
  },
  icons: {
    icon: [
      { url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>✦</text></svg>", type: "image/svg+xml" },
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
        <link rel="canonical" href="https://prompt-studio.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Prompt Studio",
              description:
                "Generate professional diffusion model prompts from a theme and aspect ratio.",
              url: "https://prompt-studio.vercel.app",
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
