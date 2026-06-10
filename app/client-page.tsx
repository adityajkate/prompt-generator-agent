'use client';

import { useState, useCallback } from 'react';
import type { AspectRatio, GenerateResult, RequestState } from '@/_lib/types';
import PromptForm from './_components/PromptForm';
import ResultDisplay from './_components/ResultDisplay';
import ThemeToggle from './_components/ThemeToggle';

export default function ClientPage() {
  const [theme, setTheme] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [state, setState] = useState<RequestState>({ status: 'idle' });

  const handleSubmit = useCallback(async (themeVal: string, ar: AspectRatio) => {
    setState({ status: 'loading' });

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: themeVal, aspectRatio: ar }),
      });

      const data = await res.json();

      if (!res.ok) {
        setState({
          status: 'error',
          error: data.error || 'Generation failed. Please try again.',
        });
        return;
      }

      setState({ status: 'success', data: data as GenerateResult });
    } catch {
      setState({
        status: 'error',
        error: 'Network error. Check your connection and try again.',
      });
    }
  }, []);

  const handleRetry = useCallback(() => {
    handleSubmit(theme, aspectRatio);
  }, [theme, aspectRatio, handleSubmit]);

  return (
    <>
      <ThemeToggle />
      <main className="mx-auto w-full max-w-2xl px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-24">
        <div className="mb-10 sm:mb-14">
          <h1 className="text-xl sm:text-2xl font-medium tracking-tight" style={{ color: 'var(--fg)' }}>
            Prompt Generator
          </h1>
          <p className="mt-1 text-xs sm:text-sm" style={{ color: 'var(--muted)' }}>
            Generate professional image prompts from a theme and aspect ratio.
          </p>
        </div>

        <PromptForm
          theme={theme}
          aspectRatio={aspectRatio}
          isLoading={state.status === 'loading'}
          onThemeChange={setTheme}
          onAspectRatioChange={setAspectRatio}
          onSubmit={() => handleSubmit(theme, aspectRatio)}
        />

        <ResultDisplay
          state={state}
          onRetry={handleRetry}
        />
      </main>
    </>
  );
}
