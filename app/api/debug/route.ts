import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NVIDIA_API_KEY;
  return NextResponse.json({
    keyExists: !!apiKey,
    keyLength: apiKey ? apiKey.length : 0,
    keyPrefix: apiKey ? apiKey.slice(0, 8) + '...' : 'N/A',
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV || 'not set',
  });
}
