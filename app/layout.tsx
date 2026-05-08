import type { Metadata } from 'next'
import { Anton, Playfair_Display, Space_Mono, DM_Serif_Display, Inter } from 'next/font/google'
import LenisProvider from '@/components/custom/LenisProvider'
import GrainOverlay from '@/components/custom/GrainOverlay'
import CustomCursor from '@/components/custom/CustomCursor'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-space-mono' })
const dmSerif = DM_Serif_Display({ weight: '400', subsets: ['latin'], variable: '--font-dm-serif' })

export const metadata: Metadata = {
  title: 'Jharkhand | War of the Web',
  description: "Phase 1: Scroll-Triggered Immersive Website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${anton.variable} ${playfair.variable} ${spaceMono.variable} ${dmSerif.variable} ${inter.variable}`}>
      <body className="bg-white text-black overflow-x-hidden">
        <LenisProvider>
          <GrainOverlay />
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
