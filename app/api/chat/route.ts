import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: { message: "Gemini API Key not found on server." } }, { status: 500 });
    }

    // Map OpenAI-style messages to Gemini structure
    // messages: [{ role: 'system'|'user'|'assistant', content: string }]
    const geminiContents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: geminiContents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    const data = await response.json();
    
    // Extract text from Gemini response
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return NextResponse.json({
        choices: [
          {
            message: {
              content: data.candidates[0].content.parts[0].text
            }
          }
        ]
      });
    } else {
      return NextResponse.json(data); // Return full error if it failed
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: { message: error.message || "Internal Server Error" } }, { status: 500 });
  }
}
