'use client'

import { DraggableContainer, GridBody, GridItem } from '@/components/infinite-drag-scroll'
import { useRouter } from 'next/navigation'
import { JHARKHAND_IMAGES } from '@/data/images.data'

export default function InfiniteEntry() {
  const router = useRouter()

  return (
    <div className="relative w-full h-[100dvh] bg-white overflow-hidden">
      {/* Fixed Overlays */}
      <div className="absolute top-8 left-8 z-20 pointer-events-none">
        <h1 className="font-['Anton'] text-[11vw] text-black leading-none tracking-[-0.02em]">
          JHARKHAND
        </h1>
      </div>
      
      <div className="absolute top-8 right-8 z-20 pointer-events-none text-right">
        <p className="font-['Space_Mono'] text-[10px] text-black tracking-widest">
          23.6102° N / 85.2799° E
        </p>
      </div>
      
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <p className="font-['Space_Mono'] text-[9px] text-black/40 tracking-[0.25em] uppercase">
          Drag or Scroll to explore
        </p>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30">
        <button 
          onClick={() => router.push('/home')}
          className="border border-black text-black bg-transparent px-[48px] py-[16px] font-['Space_Mono'] text-[11px] tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-colors duration-300"
          data-cursor-grow
        >
          ENTER JHARKHAND
        </button>
      </div>

      {/* Draggable Grid */}
      <DraggableContainer variant="masonry" className="bg-white w-full h-full">
        <GridBody className="w-full h-full">
          {JHARKHAND_IMAGES.map((src, i) => (
            <GridItem key={i} className="w-[300px] h-[400px]">
              <img 
                src={src} 
                alt="Jharkhand Preview" 
                loading="eager" 
                className="w-full h-full object-cover contrast-110 pointer-events-none rounded-none" 
              />
            </GridItem>
          ))}
        </GridBody>
      </DraggableContainer>
    </div>
  )
}

