import type { Metadata } from 'next'
import { Anton, Space_Mono, Cormorant_Garamond, Instrument_Serif, Bodoni_Moda } from 'next/font/google'
import LenisProvider from '@/components/custom/LenisProvider'
import GrainOverlay from '@/components/custom/GrainOverlay'
import './globals.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
})
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
})
const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
})
const instrument = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument',
})
const bodoni = Bodoni_Moda({
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-bodoni',
})

export const metadata: Metadata = {
  title: 'Jharkhand | War of the Web',
  description: 'Phase 1: Scroll-Triggered Immersive Experience',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${spaceMono.variable} ${cormorant.variable} ${instrument.variable} ${bodoni.variable}`}
    >
      <body className="bg-white text-black overflow-x-hidden">
        <LenisProvider>
          <GrainOverlay />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
