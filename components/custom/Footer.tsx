import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-white min-h-[60vh] flex flex-col justify-between px-8 md:px-16 py-16 border-t border-black/10">
      {/* Top half */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24">
        <h2 className="font-['Anton'] text-[15vw] md:text-[9vw] leading-none text-black">
          JHARKHAND
        </h2>
        <h2 className="font-['Playfair_Display'] italic text-[15vw] md:text-[9vw] leading-none text-black/5">
          TOURISM
        </h2>
      </div>

      {/* Middle: 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
        <div className="flex flex-col gap-4">
          <span className="font-['Space_Mono'] text-[10px] text-black/50 tracking-widest uppercase mb-4">Explore</span>
          <Link href="#" className="font-['Space_Mono'] text-[10px] text-black hover:text-black/70 tracking-widest uppercase">Forests</Link>
          <Link href="#" className="font-['Space_Mono'] text-[10px] text-black hover:text-black/70 tracking-widest uppercase">Waterfalls</Link>
          <Link href="#" className="font-['Space_Mono'] text-[10px] text-black hover:text-black/70 tracking-widest uppercase">Wildlife</Link>
          <Link href="#" className="font-['Space_Mono'] text-[10px] text-black hover:text-black/70 tracking-widest uppercase">Culture</Link>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-['Space_Mono'] text-[10px] text-black/50 tracking-widest uppercase mb-4">Plan</span>
          <Link href="#" className="font-['Space_Mono'] text-[10px] text-black hover:text-black/70 tracking-widest uppercase">Best Time to Visit</Link>
          <Link href="#" className="font-['Space_Mono'] text-[10px] text-black hover:text-black/70 tracking-widest uppercase">How to Reach</Link>
          <Link href="#" className="font-['Space_Mono'] text-[10px] text-black hover:text-black/70 tracking-widest uppercase">Accommodation</Link>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-['Space_Mono'] text-[10px] text-black/50 tracking-widest uppercase mb-4">Contact</span>
          <p className="font-['Space_Mono'] text-[10px] text-black/70 tracking-widest leading-relaxed">
            Jharkhand Tourism Development Corporation<br />
            Birsa Munda Rajpath<br />
            Ranchi, Jharkhand 834001
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <p className="font-['Space_Mono'] text-[9px] text-black/30 tracking-widest w-full md:w-auto text-center md:text-left">
          © 2026 JHARKHAND TOURISM
        </p>
        <div className="hidden md:block h-px bg-black/10 flex-1 mx-8" />
        <p className="font-['Space_Mono'] text-[9px] text-black/20 tracking-widest w-full md:w-auto text-center md:text-right">
          CRAFTED FOR WAR OF THE WEB
        </p>
      </div>
    </footer>
  )
}
