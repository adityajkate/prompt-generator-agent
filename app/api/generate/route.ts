import { NextRequest, NextResponse } from 'next/server';
import { validateGenerateRequest } from '@/_lib/validation';
import { generatePrompt } from '@/_lib/nvidia';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json', code: 'INVALID_INPUT' },
        { status: 415 }
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body', code: 'INVALID_INPUT' },
        { status: 400 }
      );
    }

    
    const parsed = validateGenerateRequest(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error, code: 'INVALID_INPUT' },
        { status: 400 }
      );
    }

    
    const result = await generatePrompt(
      parsed.data.theme,
      parsed.data.aspectRatio
    );

    return NextResponse.json(result);
  } catch (error) {
    
    if (error instanceof Error) {
      if (error.message === 'CONFIG_ERROR') {
        console.error('[/api/generate] NVIDIA_API_KEY is not configured');
        return NextResponse.json(
          {
            error: 'Service configuration error. Please contact support.',
            code: 'API_ERROR',
          },
          { status: 500 }
        );
      }

      if (error.message === 'RATE_LIMITED') {
        console.error('[/api/generate] NVIDIA API rate limit hit');
        return NextResponse.json(
          {
            error:
              'Service is temporarily unavailable due to high demand. Please try again.',
            code: 'RATE_LIMITED',
          },
          { status: 429 }
        );
      }

      if (error.message === 'API_ERROR') {
        console.error('[/api/generate] NVIDIA API error:', error.message);
        return NextResponse.json(
          {
            error: 'Failed to generate prompt. Please try again.',
            code: 'API_ERROR',
          },
          { status: 500 }
        );
      }

      if (error.message === 'TIMEOUT') {
        console.error('[/api/generate] NVIDIA API request timed out');
        return NextResponse.json(
          {
            error: 'Request timed out. Please try again.',
            code: 'API_ERROR',
          },
          { status: 504 }
        );
      }

      if (error.message === 'NETWORK_ERROR') {
        console.error('[/api/generate] Network error calling NVIDIA API');
        return NextResponse.json(
          {
            error: 'Network error. Please try again.',
            code: 'API_ERROR',
          },
          { status: 502 }
        );
      }

      if (error.message.startsWith('No JSON')) {
        console.error('[/api/generate] Invalid model response:', error.message);
        return NextResponse.json(
          {
            error: 'Failed to generate prompt. Please try again.',
            code: 'API_ERROR',
          },
          { status: 500 }
        );
      }
    }

    
    console.error('[/api/generate] Unexpected error:', error);
    return NextResponse.json(
      {
        error: 'An unexpected error occurred. Please try again.',
        code: 'API_ERROR',
      },
      { status: 500 }
    );
  }
}
