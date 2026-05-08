'use client'

import { DraggableContainer, GridBody, GridItem } from '@/components/infinite-drag-scroll'
import { useRouter } from 'next/navigation'
import { JHARKHAND_IMAGES } from '@/data/images.data'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import CurtainTransition from '@/components/custom/CurtainTransition'

const ALL_IMAGES = [...JHARKHAND_IMAGES, ...JHARKHAND_IMAGES]

export default function InfiniteEntry() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleEnter = async () => {
    setIsLoading(true)
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsExiting(true)
    setTimeout(() => {
      router.push('/home')
    }, 800)
  }

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden">
      <CurtainTransition isExiting={isExiting} onComplete={() => {}} />

      {/* Removed coordinates and hint tags */}

      {/* ─── Centered hollow JHARKHAND — always on top ─────────────── */}
      <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none select-none">
        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-['Anton'] leading-none tracking-tighter whitespace-nowrap"
          style={{
            fontSize: 'clamp(5rem, 20vw, 22rem)',
            WebkitTextStroke: '3px rgba(255,255,255,0.6)',
            color: 'transparent',
            textShadow: '0 0 80px rgba(255,255,255,0.04)',
          }}
        >
          JHARKHAND
        </motion.h1>
      </div>

      {/* ─── Enter button ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50"
      >
        <button
          onClick={handleEnter}
          disabled={isLoading}
          className="group relative border border-white/70 text-white bg-transparent px-12 py-4 font-['Space_Mono'] text-[11px] tracking-[0.3em] uppercase overflow-hidden transition-all duration-300 hover:border-white disabled:opacity-50"
        >
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                INITIATING...
              </span>
            ) : 'ENTER JHARKHAND'}
          </span>
          <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        </button>
      </motion.div>

      {/* ─── Draggable image grid — sits behind hollow text ──────────── */}
      <div className="absolute inset-0 z-10">
        <DraggableContainer variant="masonry" className="bg-black w-full h-full">
          <GridBody className="w-full h-full">
            {ALL_IMAGES.map((src, i) => (
              <GridItem key={i} className="w-[200px] h-[240px]">
                <motion.img
                  src={src}
                  alt="Jharkhand"
                  loading="eager"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: Math.min(i * 0.018, 0.9),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full h-full object-cover pointer-events-none hover:scale-105 transition-all duration-500"
                />
              </GridItem>
            ))}
          </GridBody>
        </DraggableContainer>
      </div>

    </div>
  )
}
