'use client';

import { useState, useEffect, useRef } from 'react';

const rawItineraries: any = {
  "2": [
    {
      day: 1, 
      acts: [
        { time: "8AM", title: "Jagannath Temple Hill", loc: "Ranchi", desc: "Climb 432 steps at sunrise. Nearby breakfast: Durga Hotel (try Litti Chokha ₹60)", tip: "Reach before 7:30 AM to avoid crowds. The sunrise view is unforgettable." },
        { time: "12PM", title: "Hundru Falls", loc: "Ranchi", desc: "45 km from Ranchi, 1.5hr drive. Stay at the base for 2–3 hours.", tip: "Carry packed lunch. No good restaurants near the falls." },
        { time: "5PM", title: "Return to Ranchi", loc: "Ranchi", desc: "Dinner at Kaveri Restaurant. Try: Rugra mushroom curry, Mahua kheer, Handia rice beer", tip: "Best tribal thali in Ranchi!" }
      ]
    },
    {
      day: 2,
      acts: [
        { time: "7AM", title: "Dassam Falls", loc: "Ranchi", desc: "144-foot waterfall on Kanchi river, less crowded than Hundru.", tip: "This is Jharkhand's best kept secret!" },
        { time: "1PM", title: "Ranchi Lake & Tribal Museum", loc: "Ranchi", desc: "See Santali, Munda, Ho tribe artifacts." },
        { time: "4PM", title: "Pahari Mandir & Shopping", loc: "Ranchi", desc: "Shop Tribal handicrafts at Ranchi Market.", tip: "Buy Dokra metal craft, Tussar silk sarees, bamboo products" }
      ]
    }
  ],
  "3": [
    {
      day: 1, 
      acts: [
        { time: "8AM", title: "Jagannath Temple Hill", loc: "Ranchi", desc: "Climb 432 steps at sunrise.", tip: "Reach before 7:30 AM to avoid crowds." },
        { time: "12PM", title: "Hundru Falls", loc: "Ranchi", desc: "45 km from Ranchi, 1.5hr drive.", tip: "Carry packed lunch." }
      ]
    },
    {
      day: 2,
      acts: [
        { time: "6AM", title: "Drive to Deoghar", loc: "Deoghar", desc: "250 km, 5 hrs. En route stop: Giridih — Parasnath Hill.", tip: "Highest peak in Jharkhand at 1350m, stunning views" },
        { time: "2PM", title: "Baidyanath Temple", loc: "Deoghar", desc: "Go for evening aarti at 5:30 PM.", tip: "The evening aarti is absolutely mesmerising — arrive 30 min early." },
        { time: "7PM", title: "Naulakha Mandir", loc: "Deoghar", desc: "Beautiful white marble temple. Local dinner: khaja sweets, tilkut." }
      ]
    },
    {
      day: 3,
      acts: [
        { time: "7AM", title: "Trikuta Parvat", loc: "Deoghar", desc: "3-peaked hill with ropeway.", tip: "Take the ropeway for aerial views of entire Deoghar" },
        { time: "1PM", title: "Satsang Ashram", loc: "Deoghar", desc: "Peaceful spiritual retreat. Drive back to Ranchi." }
      ]
    }
  ],
  "5": [
    { day: 1, acts: [{ time: "All Day", title: "Ranchi City Tour", loc: "Ranchi", desc: "Jagannath Temple + Pahari Mandir + Tribal Museum + Ranchi Lake" }] },
    { day: 2, acts: [{ time: "All Day", title: "Waterfall Trail", loc: "Ranchi", desc: "Hundru Falls + Dassam Falls + Jonha Falls", tip: "Carry a picnic lunch!" }] },
    { day: 3, acts: [
        { time: "Morning", title: "Drive to Betla", loc: "Palamu", desc: "160 km, 4 hrs. Jeep safari morning (6–9 AM).", tip: "Book jeep safari in advance at betlanationalpark.in" },
        { time: "Afternoon", title: "Betla Fort Ruins", loc: "Palamu", desc: "Explore the ancient ruins. Night stay inside forest at Forest Guest House." }
    ]},
    { day: 4, acts: [{ time: "All Day", title: "Elephants & Transit", loc: "Deoghar", desc: "Early morning elephant safari in Betla. Drive to Deoghar. Evening aarti at Baidyanath." }] },
    { day: 5, acts: [{ time: "All Day", title: "Deoghar Sights", loc: "Deoghar", desc: "Baidyanath Temple darshan + Trikuta Parvat ropeway. Drive back." }] }
  ],
  "7": [
    { day: 1, acts: [{ time: "All Day", title: "Ranchi City Tour", loc: "Ranchi", desc: "City highlights" }] },
    { day: 2, acts: [{ time: "All Day", title: "Waterfalls", loc: "Ranchi", desc: "Hundru & Dassam Falls" }] },
    { day: 3, acts: [{ time: "All Day", title: "Betla National Park", loc: "Palamu", desc: "Tiger Safari & Fort Ruins" }] },
    { day: 4, acts: [{ time: "All Day", title: "Drive to Netarhat", loc: "Netarhat", desc: "Queen of Chotanagpur at 3700 feet. Magnolia Point sunset. Lodh Falls nearby.", tip: "Magnolia Point sunset is rated one of India's top 10 sunsets" }] },
    { day: 5, acts: [{ time: "All Day", title: "Netarhat to Deoghar", loc: "Deoghar", desc: "6 hr drive. Evening — Baidyanath Temple aarti" }] },
    { day: 6, acts: [{ time: "All Day", title: "Deoghar & Basukinath", loc: "Deoghar", desc: "Deoghar sightseeing + Basukinath Temple.", tip: "Basukinath is less crowded, more peaceful — the locals' favourite" }] },
    { day: 7, acts: [{ time: "All Day", title: "Return via Hazaribagh", loc: "Rajrappa", desc: "Rajrappa Temple (confluence of Damodar & Bhairavi rivers).", tip: "Rajrappa is Jharkhand's most visited temple after Baidyanath — don't miss it!" }] }
  ]
};

export default function SectionTripPlanner() {
  const [days, setDays] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<any | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const itineraryRef = useRef<HTMLDivElement>(null);

  // Intersection observer to trigger guide talking about planner
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('guideTalk', { detail: 'planner' }));
          }
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleGenerate = () => {
    if (!days || !city || !type) return;

    let data = rawItineraries[days] || rawItineraries["2"];
    let modifiedData = JSON.parse(JSON.stringify(data));

    if (city === "Deoghar") {
      modifiedData[0].acts.unshift({ time: "6AM", title: "Baidyanath Temple Darshan", loc: "Deoghar", desc: "Start the trip auspiciously." });
    } else if (city === "Dhanbad") {
      modifiedData[0].acts.unshift({ time: "8AM", title: "Maithon & Panchet Dam", loc: "Dhanbad", desc: "Beautiful reservoirs.", tip: "Dhanbad is the coal capital but Maithon is a hidden gem" });
    } else if (city === "Jamshedpur") {
      modifiedData[0].acts.unshift({ time: "9AM", title: "Jubilee Park & Dimna Lake", loc: "Jamshedpur", desc: "Tata Steel's gift.", tip: "India's cleanest industrial city." });
    }

    setItinerary(modifiedData);

    setTimeout(() => {
      itineraryRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('guideTalk', { detail: 'hotspot' }));
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="w-full py-24 bg-white border-t border-black text-black"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="leading-[0.85] tracking-tight flex items-baseline flex-wrap uppercase mb-12 justify-center text-center w-full border-b-[8px] border-black pb-4">
          <span className="font-['Anton'] text-[10vw] md:text-[5vw] text-black tracking-[-0.02em]">PLAN</span>
          <span className="font-['var(--font-bodoni)'] italic text-[8vw] md:text-[4vw] text-black font-light ml-4">
            Your Journey
          </span>
        </h2>

        {/* Planner Form */}
        <div className="bg-white border-2 border-black p-8 shadow-[12px_12px_0_0_#000] mb-12 print:hidden">
          
          <div className="mb-8">
            <h3 className="text-lg font-bold font-['Space_Mono'] uppercase tracking-widest mb-4">How many days?</h3>
            <div className="flex flex-wrap gap-4">
              {['2', '3', '5', '7'].map(val => (
                <button
                  key={val}
                  onClick={() => setDays(val)}
                  className={`border-2 border-black px-6 py-2 font-bold font-['Space_Mono'] transition-all ${days === val ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                >
                  {val} Days
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold font-['Space_Mono'] uppercase tracking-widest mb-4">Starting City?</h3>
            <div className="flex flex-wrap gap-4">
              {['Ranchi', 'Deoghar', 'Dhanbad', 'Jamshedpur'].map(val => (
                <button
                  key={val}
                  onClick={() => setCity(val)}
                  className={`border-2 border-black px-6 py-2 font-bold font-['Space_Mono'] transition-all ${city === val ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold font-['Space_Mono'] uppercase tracking-widest mb-4">Travel Type?</h3>
            <div className="flex flex-wrap gap-4">
              {['Solo', 'Family', 'Couple', 'Group'].map(val => (
                <button
                  key={val}
                  onClick={() => setType(val)}
                  className={`border-2 border-black px-6 py-2 font-bold font-['Space_Mono'] transition-all ${type === val ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                >
                  {val === 'Group' ? 'Group/Friends' : val}
                </button>
              ))}
            </div>
          </div>

          {days && city && type && (
            <button 
              onClick={handleGenerate}
              className="w-full bg-white border-2 border-black py-4 font-bold font-['Space_Mono'] text-xl uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Generate My Itinerary &rarr;
            </button>
          )}
        </div>

        {/* Generated Itinerary */}
        {itinerary && (
          <div ref={itineraryRef} className="print:m-0 print:p-0">
            <div className="border-l-4 border-black pl-8 ml-4 print:border-gray-400">
              {itinerary.map((dayInfo: any, idx: number) => (
                <div key={idx} className="relative mb-12">
                  <div className="absolute -left-[3.5rem] top-0 w-12 h-12 bg-black text-white flex items-center justify-center rounded-full font-bold font-['Space_Mono'] border-4 border-white print:bg-white print:text-black print:border-black">
                    D{dayInfo.day}
                  </div>
                  
                  <div className="bg-zinc-50 border-2 border-black p-6 print:border-gray-300">
                    {dayInfo.acts.map((act: any, actIdx: number) => (
                      <div key={actIdx} className="mb-6 last:mb-0">
                        <div className="font-['Space_Mono'] font-bold uppercase tracking-widest text-sm mb-1">
                          {act.time}
                        </div>
                        <h4 className="text-xl font-bold font-sans flex items-center gap-2 mb-1">
                          {act.title}
                          <span className="text-xs uppercase bg-black text-white px-2 py-1 ml-2 print:bg-white print:text-black print:border print:border-black">
                            {act.loc}
                          </span>
                        </h4>
                        <p className="text-gray-700 font-sans leading-relaxed">
                          {act.desc}
                        </p>
                        {act.tip && (
                          <div className="mt-3 bg-zinc-200 border-l-4 border-black p-3 text-sm font-medium print:bg-white print:border-l-2 print:border-gray-400">
                            💡 {act.tip}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-white border-2 border-black p-8 print:border-none print:p-0">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-['Space_Mono'] font-bold text-lg uppercase mb-4 border-b-2 border-black pb-2">💰 Budget Estimate</h4>
                  <ul className="space-y-2 text-sm font-sans">
                    <li><strong className="font-bold">Budget (₹):</strong> Stay ₹800–1500/night, Food ₹200–400/day</li>
                    <li><strong className="font-bold">Mid-range (₹₹):</strong> Stay ₹2000–4000/night, Food ₹600–1000/day</li>
                    <li><strong className="font-bold">Premium (₹₹₹):</strong> Stay ₹6000+/night, Food ₹1500+/day</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-['Space_Mono'] font-bold text-lg uppercase mb-4 border-b-2 border-black pb-2">✈️ Travel & Best Time</h4>
                  <ul className="space-y-2 text-sm font-sans">
                    <li><strong className="font-bold">Best Time:</strong> Oct–Feb (cool, clear)</li>
                    <li><strong className="font-bold">Air:</strong> Birsa Munda Airport, Ranchi</li>
                    <li><strong className="font-bold">Rail:</strong> Ranchi, Dhanbad, Deoghar connected</li>
                  </ul>
                </div>
              </div>
            </div>

            <button 
              onClick={() => window.print()}
              className="mt-8 w-full bg-black text-white py-4 font-bold font-['Space_Mono'] uppercase tracking-widest hover:bg-zinc-800 transition-colors print:hidden"
            >
              🖨️ Save / Print My Itinerary
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
