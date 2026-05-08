'use client'

import { DraggableContainer, GridBody, GridItem } from '@/components/infinite-drag-scroll'
import { useRouter } from 'next/navigation'
import { JHARKHAND_IMAGES } from '@/data/images.data'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Double the image pool so the grid is denser
const ALL_IMAGES = [...JHARKHAND_IMAGES, ...JHARKHAND_IMAGES]

export default function InfiniteEntry() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative w-full h-[100dvh] bg-white overflow-hidden">

      {/* Top-left: coordinates */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-8 left-8 z-50 pointer-events-none"
      >
        <p className="font-['Space_Mono'] text-[10px] text-black/40 tracking-widest">
          23.6102° N / 85.2799° E
        </p>
      </motion.div>

      {/* Top-right: hint */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-8 right-8 z-50 pointer-events-none"
      >
        <p className="font-['Space_Mono'] text-[9px] text-black/30 tracking-[0.25em] uppercase">
          Drag or scroll to explore
        </p>
      </motion.div>

      {/* ─── Centered hollow JHARKHAND — always on top ─────────────── */}
      <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none select-none">
        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-['Anton'] leading-none tracking-tighter whitespace-nowrap"
          style={{
            fontSize: 'clamp(5rem, 20vw, 22rem)',
            WebkitTextStroke: '3px rgba(0,0,0,0.55)',
            color: 'transparent',
            textShadow: '0 0 80px rgba(0,0,0,0.04)',
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
          onClick={() => router.push('/home')}
          className="group relative border border-black/70 text-black bg-transparent px-12 py-4 font-['Space_Mono'] text-[11px] tracking-[0.3em] uppercase overflow-hidden transition-colors duration-300 hover:border-black"
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            ENTER JHARKHAND
          </span>
          <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        </button>
      </motion.div>

      {/* ─── Draggable image grid — sits behind hollow text ──────────── */}
      <div className="absolute inset-0 z-10">
        <DraggableContainer variant="masonry" className="bg-white w-full h-full">
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
                  className="w-full h-full object-cover pointer-events-none"
                />
              </GridItem>
            ))}
          </GridBody>
        </DraggableContainer>
      </div>

    </div>
  )
}
