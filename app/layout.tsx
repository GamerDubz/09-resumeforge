import type { Metadata, Viewport } from 'next'
import { Fraunces, Archivo, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT', 'WONK'],
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ResumeForge — Typeset Your Resume Like Print',
  description:
    'A local-first resume builder that composes your career onto a real print-ready page: edit on one side, watch a letterpress-quality resume take shape on the other. No account, no server, instant PDF export.',
}

export const viewport: Viewport = {
  themeColor: '#f6f0e4',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${archivo.variable} ${plexMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
