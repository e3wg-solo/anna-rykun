import type { Metadata, Viewport } from 'next'
import { Fraunces, Outfit, JetBrains_Mono, Amiri, IBM_Plex_Sans_Arabic } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'opsz'],
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jbmono',
  display: 'swap',
})

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
})

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plex-ar',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://annarykun.art'),
  title: 'Anna Rykun — Visual Artist, Art Educator & Fashion Art Director',
  description:
    'Portfolio of Anna Rykun — visual artist, art educator and fashion art director working across fine art, visual storytelling, colour, styling and creative education.',
  keywords: [
    'Anna Rykun',
    'art educator',
    'visual artist',
    'oil painting',
    'acrylic',
    'CLIL',
    'art teacher',
    'portfolio',
    'fashion art direction',
    'fashion visual storytelling',
  ],
  authors: [{ name: 'Anna Rykun' }],
  openGraph: {
    title: 'Anna Rykun — Visual Artist & Fashion Art Director',
    description:
      'Fine art, fashion visual storytelling, art direction, creative education and award-winning painting.',
    type: 'website',
    images: ['/portrait.jpg'],
  },
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = {
  themeColor: '#fafafa',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${fraunces.variable} ${outfit.variable} ${jetbrains.variable} ${amiri.variable} ${plexArabic.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  )
}
