import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, tone } = body;

    if (!text || typeof text !== 'string' || !tone || typeof tone !== 'string') {
      return NextResponse.json(
        { error: 'Valid text and tone are required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert copywriter. Rewrite the user's text in a ${tone} tone. Preserve the original meaning. Only change the style/tone. Keep the output clear and natural.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.7,
    });

    const result = completion.choices[0]?.message?.content || '';

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error generating AI text:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred during generation';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
