import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ashwini Computer Center | ISO Certified Computer Training Institute",
  description:
    "Join Ashwini Computer Center (ACC) for quality computer education. We offer courses in Basic Computer, Typing, Tally, DTP, and more. ISO 9001:2015 Certified Institute in Deoghar, Jharkhand.",
  generator: "v0.app",
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
