'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex items-center justify-between px-8 py-4 ${
        scrolled ? 'bg-white/10 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="flex-1">
        <Link href="/" className="font-['Anton'] text-[22px] text-black">
          JH
        </Link>
      </div>

      <div className="hidden md:flex flex-1 justify-center gap-12">
        {['EXPLORE', 'CULTURE', 'WILDLIFE', 'CONTACT'].map((item) => (
          <Link 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="group relative font-['Space_Mono'] text-[10px] tracking-[0.2em] uppercase text-black"
          >
            {item}
            <span className="absolute left-0 -bottom-2 w-0 h-px bg-black transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>

      <div className="flex-1 flex justify-end">
        {/* Removed pulse hint */}
      </div>
    </motion.nav>
  )
}
