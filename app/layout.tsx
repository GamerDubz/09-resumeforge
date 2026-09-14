import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ResumeForge — Local-First Executive Resume Builder',
  description:
    'Create, customize, and export professional resumes directly in your browser. Local-first, private, with instant one-page PDF export.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-slate-100 text-slate-900 antialiased selection:bg-amber-500/20 selection:text-amber-900`}>
        {children}
      </body>
    </html>
  )
}
