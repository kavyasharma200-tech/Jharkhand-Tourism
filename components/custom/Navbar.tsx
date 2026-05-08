'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const NAV_ITEMS = [
  { label: 'CITIES',     href: '#cities' },
  { label: 'WONDERS',   href: '#wonders' },
  { label: 'LANDSCAPE', href: '#landscapes' },
  { label: 'CULTURE',   href: '#culture' },
  { label: 'WILD',      href: '#wild' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 flex items-center justify-between px-8 md:px-16 py-5 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-black/5'
          : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <Link
        href="/home"
        className={`font-['Anton'] text-[18px] tracking-[0.15em] uppercase leading-none transition-colors duration-500 ${
          scrolled ? 'text-black' : 'text-white'
        }`}
      >
        JH
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-10">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={`group relative font-mono text-[9px] tracking-[0.35em] uppercase leading-none transition-colors duration-500 ${
              scrolled ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white'
            }`}
          >
            {item.label}
            <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${scrolled ? 'bg-black' : 'bg-white'}`} />
          </a>
        ))}
      </div>

      {/* Right — language/index mark */}
      <div className={`font-mono text-[8px] tracking-[0.4em] transition-colors duration-500 ${scrolled ? 'text-black/25' : 'text-white/25'}`}>
        IND
      </div>
    </nav>
  )
}
