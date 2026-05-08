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
        {/* Mobile Blocker */}
        <div className="flex lg:hidden flex-col items-center justify-center h-screen w-screen bg-black text-white p-8 text-center z-[99999] relative">
          <h1 className="font-['Anton'] text-5xl mb-4 uppercase tracking-tight">Only available on desktop</h1>
          <p className="font-['Space_Mono'] text-[10px] tracking-[0.3em] uppercase text-white/50">Other devices coming soon.</p>
        </div>

        {/* Desktop Content */}
        <div className="hidden lg:block w-full h-full">
          <LenisProvider>
            <GrainOverlay />
            {children}
          </LenisProvider>
        </div>
      </body>
    </html>
  )
}
