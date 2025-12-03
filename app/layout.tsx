import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { StructuredData } from "@/components/structured-data"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ashwinicomputer.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ACC Computer Center | Ashwini Computer Centre - Best Computer Training Institute in Deoghar",
    template: "%s | ACC Computer Center - Ashwini Computer Centre",
  },
  description:
    "ACC Computer Center (Ashwini Computer Centre) - Leading computer training institute in Deoghar, Jharkhand. ISO 9001:2015 certified. Courses: Basic Computer, Typing, Tally, DTP, Programming. Expert faculty, modern labs, flexible batches. Enroll now!",
  keywords: [
    "ACC computer",
    "ACC computer center",
    "ACC computer centre",
    "Ashwini Computer Center",
    "Ashwini Computer Centre",
    "computer training institute Deoghar",
    "computer classes Deoghar",
    "ACC Deoghar",
    "computer course Deoghar",
    "Tally course Deoghar",
    "DTP course Deoghar",
    "typing course Deoghar",
    "ISO certified computer institute",
    "computer training center Jharkhand",
    "best computer institute Deoghar",
    "computer education Deoghar",
    "ACC computer training",
    "Ashwini computer classes",
  ],
  authors: [{ name: "Ashwini Computer Center" }],
  creator: "Ashwini Computer Center",
  publisher: "Ashwini Computer Center",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "ACC Computer Center - Ashwini Computer Centre",
    title: "ACC Computer Center | Ashwini Computer Centre - Best Computer Training Institute",
    description:
      "ACC Computer Center (Ashwini Computer Centre) - ISO 9001:2015 certified computer training institute in Deoghar, Jharkhand. Expert faculty, modern labs, flexible batches. Enroll now!",
    images: [
      {
        url: "/acc-logo.png",
        width: 1200,
        height: 630,
        alt: "ACC Computer Center - Ashwini Computer Centre Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ACC Computer Center | Ashwini Computer Centre - Best Computer Training Institute",
    description:
      "ACC Computer Center (Ashwini Computer Centre) - ISO 9001:2015 certified computer training institute in Deoghar, Jharkhand.",
    images: ["/acc-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add your Google Search Console verification code here when available
    // google: "your-google-verification-code",
  },
  category: "Education",
  classification: "Computer Training Institute",
  generator: "Next.js",
  icons: {
    icon: [
      {
        url: "/acc-logo.png",
        type: "image/png",
      },
      {
        url: "/acc-logo.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/acc-logo.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/acc-logo.png",
    shortcut: "/acc-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <StructuredData />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
