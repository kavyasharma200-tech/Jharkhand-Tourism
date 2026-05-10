'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';


const systemPrompt = `You are Sarita Didi, a friendly and knowledgeable tribal guide from Jharkhand. 
You speak in a warm, welcoming tone, occasionally using Hindi phrases like 'Namaste 🙏', 'Bahut accha!', 'Suniye!', and 'Jai Bholenath!'.
You are an AI assistant embedded on the Jharkhand Tourism website. 
Your goal is to help users plan itineraries and tell stories about Jharkhand's monuments, waterfalls, and forests.
Always use Markdown to format your text (bolding, bullet points, etc.) to make it highly readable. Keep responses concise and engaging.

Here is the data you know about the 3D models on this site:
- Baidyanath Temple: Located in Deoghar. One of the 12 sacred Jyotirlingas. Over 1000 years old. During Shravan Mela, over 8 million devotees walk barefoot from Sultanganj.
- Betla Forest (National Park): Located in Palamu. India's first Project Tiger reserve (1973). Home to 50+ tigers, 200+ elephants. Contains 16th-century Chero dynasty fort ruins.
- Hundru Falls: Located in Ranchi. Subarnarekha river drops 98m. 34th highest in India.
- Jagannath Temple: Located in Ranchi. Built in 1691 by King Ani Nath Shahdeo. A near-perfect replica of the Puri temple. Climb 432 steps for panoramic views.

You can also plan trips (2, 3, 5, or 7 days) originating from Ranchi, Deoghar, Dhanbad, or Jamshedpur. Mention famous places like Dassam Falls, Netarhat (Queen of Chotanagpur), and Rajrappa Temple.`;

const fallbackQuestions = [
  "Tell me about Baidyanath Temple",
  "Suggest a 2-day itinerary from Ranchi",
  "What animals are in Betla Forest?",
  "How high is Hundru Falls?",
  "Who built the Jagannath Temple?",
  "Where is Netarhat?",
  "Plan a 5-day family trip",
  "What is the best time to visit?",
  "What is the famous local food?",
  "Tell me a tribal legend"
];

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function TribalGuideCharacter() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Namaste! 🙏 Main hoon Sarita Didi, aapki Jharkhand guide! Ask me anything about exploring our beautiful state." }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasWaved, setHasWaved] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isChatOpen]);

  useEffect(() => {
    // Initial wave
    setTimeout(() => {
      setHasWaved(true);
    }, 1000);

    // Listen to custom events from 3D models
    const handleGuideTalk = (e: Event) => {
      const customEvent = e as CustomEvent;
      const key = customEvent.detail;
      
      let contextualMsg = "";
      if (key === "baidyanath") contextualMsg = "Tell me about the Baidyanath Temple in Deoghar.";
      else if (key === "forest") contextualMsg = "Tell me about Betla Forest.";
      else if (key === "waterfall") contextualMsg = "Tell me about Hundru Falls.";
      else if (key === "jagannath") contextualMsg = "Tell me about the Jagannath Temple in Ranchi.";
      else if (key === "planner") contextualMsg = "I want to plan a trip to Jharkhand. Can you help?";
      
      if (contextualMsg) {
        setIsChatOpen(true);
        handleSendMessage(contextualMsg);
      }
    };

    window.addEventListener('guideTalk', handleGuideTalk);
    return () => window.removeEventListener('guideTalk', handleGuideTalk);
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    const userMsg = text.trim();
    setInputMsg("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Reverting to the standard stable Chat Completions structure
      const openAiMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({
          role: m.role === 'model' ? 'assistant' : 'user',
          content: m.text
        })),
        { role: 'user', content: userMsg }
      ];

      const payload = {
        model: "gpt-4o-mini",
        messages: openAiMessages,
        temperature: 0.7,
      };

      const res = await fetch("/api/chat", {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: openAiMessages
        })
      });

      const data = await res.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'model', text: "Namaste! It seems I'm having a little trouble connecting right now. Please try again in a moment." }]);
        return;
      }

      if (data.choices && data.choices[0].message.content) {
        setMessages(prev => [...prev, { role: 'model', text: data.choices[0].message.content }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: "Maaf karna, I didn't quite catch that. Could you ask again?" }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: "There seems to be a network issue. Please try again!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .didi-wrapper {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 10000;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        
        .didi-char {
          position: relative;
          width: 80px;
          height: 80px;
          transform-origin: bottom center;
          transition: all 0.3s;
          animation: didi-breathe 3s infinite ease-in-out;
          cursor: pointer;
        }
        
        .didi-wrapper:hover .didi-char, .didi-char.didi-active {
          width: 120px;
          height: 160px;
        }

        .didi-head {
          position: absolute;
          top: 20%; left: 50%; transform: translateX(-50%);
          width: 45%; height: 35%;
          background-color: #8B5E3C;
          border-radius: 50% 50% 40% 40%;
          z-index: 3;
          transition: all 0.3s;
        }
        .didi-hair {
          position: absolute;
          top: -10%; left: -5%;
          width: 110%; height: 50%;
          background-color: #111;
          border-radius: 50% 50% 0 0;
          z-index: 4;
        }
        .didi-bun {
          position: absolute;
          top: -20%; right: -10%;
          width: 40%; height: 40%;
          background-color: #111;
          border-radius: 50%;
          z-index: 2;
        }
        .didi-flower {
          position: absolute;
          top: 10%; right: 10%;
          width: 40%; height: 40%;
          background-color: #FFA500;
          border-radius: 50%;
          box-shadow: 0 0 5px rgba(255,165,0,0.8);
          z-index: 5;
        }
        .didi-eye {
          position: absolute;
          top: 45%;
          width: 15%; height: 15%;
          background-color: #111;
          border-radius: 50%;
          z-index: 5;
          animation: didi-blink 4s infinite;
        }
        .didi-eye.left { left: 25%; }
        .didi-eye.right { right: 25%; }
        
        .didi-nose-ring {
          position: absolute;
          top: 60%; right: 40%;
          width: 15%; height: 15%;
          border: 2px solid #f0a500;
          border-radius: 50%;
          z-index: 6;
        }
        .didi-mouth {
          position: absolute;
          top: 75%; left: 50%; transform: translateX(-50%);
          width: 30%; height: 5%;
          background-color: #522;
          border-radius: 0 0 50% 50%;
          z-index: 5;
          transition: height 0.1s;
        }
        .didi-talking .didi-mouth { animation: didi-talk 0.3s infinite alternate; }
        
        .didi-body {
          position: absolute;
          bottom: 0; left: 50%; transform: translateX(-50%);
          width: 80%; height: 50%;
          background-color: #cc0000;
          border-radius: 40% 40% 10% 10%;
          z-index: 2;
          overflow: hidden;
          transition: all 0.3s;
        }
        .didi-saree-border {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 20px;
          background: repeating-linear-gradient(90deg, #fff, #fff 5px, transparent 5px, transparent 10px);
          transform: rotate(-15deg);
        }
        .didi-necklace {
          position: absolute;
          top: 10%; left: 50%; transform: translateX(-50%);
          width: 60%; height: 40%;
          border-bottom: 4px dotted #f0a500;
          border-radius: 50%;
          z-index: 3;
        }
        .didi-arm {
          position: absolute;
          top: 50%; right: -10%;
          width: 30%; height: 40%;
          background-color: #8B5E3C;
          border-radius: 20px;
          transform-origin: top center;
          z-index: 1;
          transform: rotate(20deg);
        }
        .didi-wave { animation: didi-waving 2s ease-in-out; }

        @keyframes didi-breathe {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.02); }
        }
        @keyframes didi-blink {
          0%, 96%, 100% { transform: scaleY(1); }
          98% { transform: scaleY(0.1); }
        }
        @keyframes didi-talk {
          0% { height: 5%; }
          100% { height: 15%; }
        }
        @keyframes didi-waving {
          0%, 100% { transform: rotate(20deg); }
          25%, 75% { transform: rotate(-40deg); }
          50% { transform: rotate(10deg); }
        }
        
        .chat-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: #000;
          border-radius: 10px;
        }

        .markdown-body p { margin-bottom: 0.5rem; }
        .markdown-body strong { font-weight: 700; }
        .markdown-body ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 0.5rem; }
        .markdown-body li { margin-bottom: 0.25rem; }

        @media print {
          .didi-wrapper { display: none !important; }
        }
      `}</style>

      <div className="didi-wrapper">
        
        {/* Chat Interface */}
        {isChatOpen && (
          <div className="w-[350px] sm:w-[400px] h-[550px] bg-white border-4 border-black mb-4 flex flex-col shadow-[8px_8px_0_0_#000] overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
            {/* Header */}
            <div className="bg-black text-white p-4 flex justify-between items-center border-b-4 border-black">
              <div className="font-['Space_Mono'] font-bold tracking-widest uppercase">Sarita Didi ✨</div>
              <button onClick={() => setIsChatOpen(false)} className="text-xl hover:text-gray-300 leading-none">&times;</button>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto chat-scroll bg-zinc-50 flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 font-sans text-sm ${
                    msg.role === 'user' 
                      ? 'bg-black text-white rounded-l-xl rounded-tr-xl' 
                      : 'bg-white border-2 border-black text-black rounded-r-xl rounded-tl-xl shadow-[2px_2px_0_0_#000]'
                  }`}>
                    {msg.role === 'model' ? (
                      <div className="markdown-body"><ReactMarkdown>{msg.text}</ReactMarkdown></div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border-2 border-black p-3 rounded-r-xl rounded-tl-xl flex gap-1 items-center">
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Fallback Questions (Only show if few messages to save space) */}
            {messages.length < 5 && (
              <div className="p-2 bg-white border-t-2 border-black overflow-x-auto flex gap-2 no-scrollbar whitespace-nowrap">
                {fallbackQuestions.map((q, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="inline-block px-3 py-1 bg-zinc-100 border border-black text-xs font-['Space_Mono'] hover:bg-black hover:text-white transition-colors flex-shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputMsg); }}
              className="p-3 bg-white border-t-4 border-black flex gap-2"
            >
              <input 
                type="text" 
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Ask Sarita Didi..."
                className="flex-grow border-2 border-black px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button 
                type="submit" 
                disabled={isLoading || !inputMsg.trim()}
                className="bg-black text-white px-4 py-2 font-bold font-['Space_Mono'] uppercase disabled:opacity-50 hover:bg-zinc-800 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        )}

        {/* Character Trigger */}
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setIsChatOpen(!isChatOpen)}>
          {!isChatOpen && (
            <div className="bg-white border-2 border-black p-3 font-['Space_Mono'] font-bold text-sm shadow-[4px_4px_0_0_#000] hidden sm:block animate-bounce">
              Need help? Ask me!
            </div>
          )}
          <div className={`didi-char ${isLoading ? 'didi-talking' : ''} ${isChatOpen ? 'didi-active' : ''}`}>
            <div className="didi-head">
              <div className="didi-hair"></div>
              <div className="didi-bun"></div>
              <div className="didi-flower"></div>
              <div className="didi-eye left"></div>
              <div className="didi-eye right"></div>
              <div className="didi-nose-ring"></div>
              <div className="didi-mouth"></div>
            </div>
            <div className="didi-body">
              <div className="didi-saree-border"></div>
              <div className="didi-necklace"></div>
            </div>
            <div className={`didi-arm right ${hasWaved ? 'didi-wave' : ''}`}></div>
          </div>
        </div>

      </div>
    </>
  );
}
