import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ResumeForge — Local-First Professional Resume Builder',
  description: 'Create, customize, and export professional resumes directly in your browser. Local-first, privacy focused, with instant PDF export.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-neutral-950 text-neutral-100 min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  )
}
