import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Team Task Board',
  description: 'A small team task tracker.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
