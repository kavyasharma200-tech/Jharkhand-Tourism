'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CurtainTransition({ isExiting, onComplete }: { isExiting: boolean, onComplete: () => void }) {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] flex pointer-events-none"
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Two panels meeting in the middle */}
          <motion.div
            className="w-1/2 h-full bg-black"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="w-1/2 h-full bg-black"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
