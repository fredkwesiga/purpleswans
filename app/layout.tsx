import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Bricolage_Grotesque } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Purple Swans | Graphic Design Portfolio',
  description: 'Explore exceptional graphic design work including flyers, brochures, branding, and posters. Hire a creative designer for your next project.',
  generator: 'v0.app',
  keywords: 'graphic design, portfolio, flyers, brochures, branding, posters, designer',
  openGraph: {
    title: 'Purple Swans | Graphic Design Portfolio',
    description: 'Exceptional graphic design work and creative services',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#702c8a',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground">{children}</body>
    </html>
  )
}
