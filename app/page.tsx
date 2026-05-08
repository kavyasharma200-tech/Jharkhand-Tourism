'use client'

import { DraggableContainer, GridBody, GridItem } from '@/components/infinite-drag-scroll'
import { useRouter } from 'next/navigation'
import { JHARKHAND_IMAGES } from '@/data/images.data'

export default function InfiniteEntry() {
  const router = useRouter()

  return (
    <div className="relative w-full h-[100dvh] bg-white overflow-hidden">

      {/* Top-left: coordinates */}
      <div className="absolute top-8 left-8 z-20 pointer-events-none">
        <p className="font-['Space_Mono'] text-[10px] text-black/40 tracking-widest">
          23.6102° N / 85.2799° E
        </p>
      </div>

      {/* Top-right: hint */}
      <div className="absolute top-8 right-8 z-20 pointer-events-none">
        <p className="font-['Space_Mono'] text-[9px] text-black/30 tracking-[0.25em] uppercase">
          Drag or scroll to explore
        </p>
      </div>

      {/* Centered hollow JHARKHAND — main hero text */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none">
        <h1
          className="font-['Anton'] leading-none tracking-tighter whitespace-nowrap"
          style={{
            fontSize: 'clamp(4rem, 18vw, 18rem)',
            WebkitTextStroke: '1.5px rgba(0,0,0,0.15)',
            color: 'transparent',
          }}
        >
          JHARKHAND
        </h1>
      </div>

      {/* Enter button */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={() => router.push('/home')}
          className="border border-black/70 text-black bg-transparent px-12 py-4 font-['Space_Mono'] text-[11px] tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-colors duration-300"
        >
          ENTER JHARKHAND
        </button>
      </div>

      {/* Draggable image grid — z-10, sits behind the hollow text overlay */}
      <div className="absolute inset-0 z-10">
        <DraggableContainer variant="masonry" className="bg-white w-full h-full">
          <GridBody className="w-full h-full">
            {JHARKHAND_IMAGES.map((src, i) => (
              <GridItem key={i} className="w-[280px] h-[380px]">
                <img
                  src={src}
                  alt="Jharkhand"
                  loading="eager"
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
