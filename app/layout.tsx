import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import ClientProviders from '@/components/client-providers'
import './globals.css'

// Polices système pour éviter les erreurs de téléchargement Google Fonts
const inter = { variable: '--font-inter' }
const spaceMono = { variable: '--font-space-mono' }

export const metadata: Metadata = {
  title: 'SmartRH Mauritanie',
  description: 'Systeme de gestion des ressources humaines - Mauritanie',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  themeColor: '#0d9488',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${spaceMono.variable} font-sans antialiased`}>
        <ClientProviders>
          {children}
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  )
}
