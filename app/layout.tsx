import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cinestra - Intelligent Movie Recommendations",
  description:
    "Discover perfect movies based on your mood, time, weather, and preferences. Advanced AI-powered recommendations with voice input and story mode.",
  keywords: "movies, recommendations, mood, AI, film, entertainment, voice input, personalized",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
