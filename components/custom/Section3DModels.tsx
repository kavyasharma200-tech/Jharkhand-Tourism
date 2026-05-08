'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Hotspot {
  x: number;
  y: number;
  label: string;
  info: string;
}

interface Attraction {
  id: string;
  title: string;
  location: string;
  description: string;
  embedCode: string;
  image: string;
  hotspots: Hotspot[];
}

const attractions: Attraction[] = [
  {
    id: "baidyanath",
    title: "Baidyanath Temple",
    location: "Deoghar, Jharkhand",
    description: "One of the 12 sacred Jyotirlingas of Lord Shiva",
    embedCode: `<div class="sketchfab-embed-wrapper w-full h-full"> <iframe class="w-full h-full border-none" title="baidyanath temple model" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/a15887b38f244f478165ae02086db49e/embed?autostart=1"> </iframe></div>`,
    image: "/assets/Deoghar/Baidynath Temple.jpg",
    hotspots: [
      { x: 45, y: 30, label: "Main Shikhar", info: "The central spire rises 72 feet, built in 7th century Nagara architectural style" },
      { x: 50, y: 75, label: "Sanctum Entrance", info: "Ancient stone carvings adorn the entrance, depicting scenes from Shiva Purana" }
    ]
  },
  {
    id: "forest",
    title: "Betla Forest",
    location: "Palamu, Jharkhand",
    description: "Dense sal forests home to tigers, elephants and over 200 bird species",
    embedCode: `<div class="sketchfab-embed-wrapper w-full h-full"> <iframe class="w-full h-full border-none" title="Forest" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/9153c2b370934758bf14c395abe36b27/embed?autostart=1"> </iframe></div>`,
    image: "/assets/Netarhat/Betla National Park.webp",
    hotspots: [
      { x: 50, y: 25, label: "Sal Tree Canopy", info: "Sal trees dominate 80% of Jharkhand's forests, some over 200 years old" },
      { x: 35, y: 70, label: "Wildlife Trail", info: "This trail leads to the core zone of Betla National Park, India's first tiger reserve" }
    ]
  },
  {
    id: "waterfall",
    title: "Hundru Falls",
    location: "Ranchi, Jharkhand",
    description: "One of the highest waterfalls in Jharkhand, plunging 98 meters into a rocky gorge",
    embedCode: `<div class="sketchfab-embed-wrapper w-full h-full"> <iframe class="w-full h-full border-none" title="Waterfall display at Hilton, Waikiki Hawaii" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/bd4fb9aaf01043a29591ac9dc4a0ead8/embed?autostart=1"> </iframe></div>`,
    image: "/assets/Ranchi/Hundru Falls.webp",
    hotspots: [
      { x: 50, y: 20, label: "Waterfall Crest", info: "The Subarnarekha river dramatically drops 98m here, best visited post-monsoon (Oct–Nov)" },
      { x: 55, y: 75, label: "Gorge Basin", info: "The natural pool at the base is a popular swimming and picnic spot for locals" }
    ]
  },
  {
    id: "jagannath",
    title: "Jagannath Temple, Ranchi",
    location: "Ranchi, Jharkhand",
    description: "A replica of the Puri Jagannath Temple, built atop a scenic hillock in Ranchi",
    embedCode: `<div class="sketchfab-embed-wrapper w-full h-full"> <iframe class="w-full h-full border-none" title="The Ranchi Jagannath Temple architecture." frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/ae1add510f8745c484ef23e1413a52a6/embed?autostart=1"> </iframe></div>`,
    image: "/assets/Ranchi/Tagore hill.jpg",
    hotspots: [
      { x: 48, y: 25, label: "Temple Hillock", info: "Situated 300 feet above the city, offering a panoramic view of Ranchi" },
      { x: 62, y: 68, label: "Rath Yatra Route", info: "Every year thousands gather here for the grand chariot festival (Rath Yatra)" }
    ]
  }
];

export default function Section3DModels() {
  const [activeModel, setActiveModel] = useState<Attraction | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModel(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="relative w-full py-24 bg-white border-t border-black text-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header section matching brutalist/monochrome aesthetic */}
        <div className="mb-16">
          <h2 className="leading-[0.85] tracking-tight flex items-baseline flex-wrap uppercase mb-4">
            <span className="font-['Anton'] text-[11vw] md:text-[6vw] text-black tracking-[-0.02em]">IMMER</span>
            <span className="font-['var(--font-bodoni)'] italic text-[8vw] md:text-[4.5vw] text-black font-light ml-4">
              sive Exhibits
            </span>
          </h2>
          <p className="text-lg md:text-xl font-['Space_Mono'] uppercase tracking-widest text-black/60 max-w-2xl">
            Explore the heritage and nature of Jharkhand through interactive 360° models.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {attractions.map((attr) => (
            <div 
              key={attr.id}
              className="group relative flex flex-col h-full bg-white border border-black transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0_0_#000] cursor-pointer"
              onClick={() => {
                setActiveModel(attr);
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('guideTalk', { detail: attr.id }));
                }
              }}
            >
              {/* Thumbnail */}
              <div className="h-48 border-b border-black relative overflow-hidden bg-zinc-100">
                <img 
                  src={attr.image} 
                  alt={attr.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-white border border-black px-2 py-1 text-[10px] font-['Space_Mono'] font-bold uppercase tracking-widest shadow-[2px_2px_0_0_#000]">
                  3D View
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold font-['Space_Mono'] mb-2 uppercase leading-tight">
                  {attr.title}
                </h3>
                <div className="text-xs uppercase font-bold tracking-widest text-black/50 mb-4">
                  [ {attr.location} ]
                </div>
                <p className="text-sm font-sans mb-6 flex-grow">
                  {attr.description}
                </p>
                
                <button className="mt-auto w-full border border-black bg-white text-black py-3 font-['Space_Mono'] text-xs uppercase tracking-widest font-bold group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  Explore in 3D &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal Viewer */}
      <AnimatePresence>
        {activeModel && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-white flex flex-col"
          >
            {/* Viewer Header */}
            <div className="h-20 border-b border-black flex items-center justify-between px-6 bg-white z-20">
              <div className="font-['Space_Mono'] font-bold uppercase tracking-widest">
                <span className="text-xl">{activeModel.title}</span>
                <span className="hidden md:inline ml-4 text-sm text-black/50 border-l border-black pl-4">
                  Jharkhand Tourism 360&deg;
                </span>
              </div>
              <button 
                onClick={() => {
                  setActiveModel(null);
                  setActiveTooltip(null);
                }}
                className="w-12 h-12 flex items-center justify-center border border-black bg-white hover:bg-black hover:text-white transition-colors"
              >
                <span className="text-2xl leading-none">&times;</span>
              </button>
            </div>

            {/* Model Container */}
            <div className="relative flex-grow w-full bg-zinc-100">
              {/* The Iframe Embed */}
              <div 
                className="absolute inset-0 w-full h-full"
                dangerouslySetInnerHTML={{ __html: activeModel.embedCode }}
              />

              {/* Hotspots Layer */}
              <div 
                className="absolute inset-0 pointer-events-none z-10"
                onClick={(e) => {
                  // If clicking the background layer (not a pin), close active tooltip
                  if (e.target === e.currentTarget) {
                    setActiveTooltip(null);
                  }
                }}
              >
                {activeModel.hotspots.map((hs, index) => (
                  <div 
                    key={index}
                    className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  >
                    {/* The Dot */}
                    <div 
                      className="relative w-full h-full bg-black rounded-full cursor-pointer flex items-center justify-center group"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTooltip(activeTooltip === index ? null : index);
                        if (typeof window !== 'undefined') {
                          window.dispatchEvent(new CustomEvent('guideTalk', { detail: 'hotspot' }));
                        }
                      }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      
                      {/* Pulsing rings */}
                      <div className="absolute inset-0 rounded-full border-2 border-black animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                    </div>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {activeTooltip === index && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-10 left-1/2 -translate-x-1/2 w-max max-w-[250px] bg-white border-2 border-black p-4 shadow-[6px_6px_0_0_#000] pointer-events-none"
                        >
                          <div className="font-['Space_Mono'] font-bold text-sm uppercase mb-1">
                            {hs.label}
                          </div>
                          <div className="text-xs font-sans">
                            {hs.info}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
