import { NextResponse } from 'next/server';

const MOCK_REWRITES: Record<string, string> = {
  Professional: "Thank you for reaching out. I wanted to follow up regarding the matter we discussed. Please let me know if you require any additional information or clarification at your earliest convenience.",
  Friendly: "Hey! Just wanted to check in and see how things are going on your end. Feel free to reach out anytime — happy to help!",
  Casual: "Hey, just circling back on this. Let me know what you think when you get a chance!",
  diplomatic: "I appreciate your perspective on this matter. Perhaps we could explore a solution that addresses both of our concerns in a mutually beneficial way.",
  assertive: "I need this resolved by end of week. Please confirm receipt and provide a clear timeline for completion.",
  direct: "Here's the situation: we need a decision now. What's your answer?",
  bold: "This is a game-changer. We move forward — no second-guessing, no delays. Let's make it happen.",
};

const SYSTEM_PROMPT = (tone: string) => `You are "TonePilot AI", a world-class strategic communications consultant and linguistic expert with high emotional intelligence. 

Your goal is NOT just to rewrite text, but to optimize it for the highest possible positive impact while adhering strictly to the requested ${tone} tone.

CRITICAL GUIDELINES:
1. Contextual Intelligence: Analyze the user's draft and any provided image (e.g., a screenshot of a conversation). Look for the hidden intent, relationship dynamics, and desired outcome.
2. Emotional Nuance: Ensure the result respects the recipient's perspective while firmly achieving the user's goal.
3. Sophisticated Vocabulary: Use clear, modern, and professional terminology. Avoid clichés.
4. Strategic Structure: If the message is a request, make it clear and actionable. If it's a response, make it empathetic yet purposeful.
5. No Fluff: Every sentence must add value. 
6. Preserved Meaning: Never change the underlying facts or core message, only the "vibe" and effectiveness.

Tone Profile for "${tone}":
- Ensure every word reflects the nuances of being ${tone}. 
- If ${tone} is "Professional", be polished and authoritative yet approachable. 
- If ${tone} is "Direct", be punchy and clear without being rude.
- If ${tone} is "Friendly", be warm and authentic.

Return ONLY the optimized message. Do not include "Here is your rewrite" or any conversational filler.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, tone, imageData } = body;

    if (!text || typeof text !== 'string' || !tone || typeof tone !== 'string') {
      return NextResponse.json(
        { error: 'Valid text and tone are required' },
        { status: 400 }
      );
    }

    // Use real OpenAI when API key is present
    if (process.env.OPENAI_API_KEY) {
      const { default: OpenAI } = await import('openai');
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const userContent: any[] = [{ type: 'text', text: text }];
      
      if (imageData) {
        userContent.push({
          type: 'image_url',
          image_url: {
            url: imageData, // base64 data:image/png;base64,...
          },
        });
      }

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT(tone),
          },
          { 
            role: 'user', 
            content: userContent 
          },
        ],
        temperature: 0.7,
      });

      const result = completion.choices[0]?.message?.content || '';
      return NextResponse.json({ result });
    }

    // --- Mock fallback (no API key) ---
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockBase = MOCK_REWRITES[tone] ?? `[${tone} rewrite] ${text}`;
    const result = `${mockBase}\n\n(Mock response — add OPENAI_API_KEY for real AI & Vision output.)`;

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error generating AI text:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred during generation';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

