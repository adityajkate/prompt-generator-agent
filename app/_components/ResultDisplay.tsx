'use client';

import { useState, useCallback } from 'react';
import { type RequestState } from '@/_lib/types';
import BongoCat from './BongoCat';

interface ResultDisplayProps {
  state: RequestState;
  onRetry: () => void;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="inline-flex h-8 sm:h-9 items-center gap-1.5 sm:gap-2 rounded-lg border border-zinc-700/50 bg-zinc-800/40 px-3 sm:px-4 text-[11px] sm:text-xs font-medium text-zinc-400 backdrop-blur-sm transition-all duration-200 hover:border-zinc-600 hover:bg-zinc-700/40 hover:text-zinc-200 active:scale-[0.97] shrink-0"
    >
      {copied ? (
        <>
          <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 4L6 12L3 9" />
          </svg>
          <span className="text-emerald-400">Copied</span>
        </>
      ) : (
        <>
          <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="12" height="12" rx="1.5" />
            <path d="M12 4V2.5A1.5 1.5 0 0 0 10.5 1h-8A1.5 1.5 0 0 0 1 2.5v8A1.5 1.5 0 0 0 2.5 12H4" />
          </svg>
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

export default function ResultDisplay({ state, onRetry }: ResultDisplayProps) {
  // IDLE
  if (state.status === 'idle') {
    return (
      <div className="mt-16 sm:mt-24 text-center">
        <div className="mx-auto mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50">
          <svg className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-600" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M10 3v14M3 10h14" />
          </svg>
        </div>
        <p className="text-xs sm:text-sm text-zinc-600 px-2">
          Enter a theme and select an aspect ratio to generate a professional diffusion prompt.
        </p>
      </div>
    );
  }

  // LOADING – bongo cat
  if (state.status === 'loading') {
    return (
      <section className="mt-6 sm:mt-10" aria-busy="true" aria-label="Generating prompt">
        <BongoCat />
        <p className="mt-4 text-center text-xs text-zinc-500">banging out your prompt...</p>
      </section>
    );
  }

  // ERROR
  if (state.status === 'error') {
    return (
      <section className="mt-12 sm:mt-16">
        <div className="rounded-xl sm:rounded-2xl border border-red-900/40 bg-gradient-to-br from-red-950/30 to-red-950/10 px-4 sm:px-6 py-5 sm:py-6 backdrop-blur-sm">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-red-900/30">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="8" cy="8" r="6" />
                <path d="M8 5v3M8 10.5v.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-red-300/90">{state.error}</p>
              <button
                onClick={onRetry}
                className="mt-3 inline-flex h-8 items-center justify-center rounded-lg border border-red-800/40 bg-red-950/40 px-3.5 sm:px-4 text-xs font-medium text-red-300/80 transition-colors hover:bg-red-900/40 hover:text-red-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // SUCCESS
  const data = (state as Extract<typeof state, { status: 'success' }>).data;

  return (
    <section className="mt-12 sm:mt-16 space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="h-px w-4 sm:w-8 bg-zinc-700/50 shrink-0" />
          <span className="text-[10px] sm:text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500 whitespace-nowrap">
            Your Prompt
          </span>
          <span className="h-px w-4 sm:w-8 bg-zinc-700/50 shrink-0" />
        </div>
        <CopyButton text={data.prompt} />
      </div>

      <div className="group relative">
        <div className="absolute -inset-px rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/10 via-zinc-500/10 to-sky-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/80 via-zinc-950/80 to-zinc-900/80 backdrop-blur-sm transition-all duration-300 group-hover:border-zinc-700/60">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-zinc-800/10 via-transparent to-transparent" />

          <div className="relative px-4 sm:px-6 py-4 sm:py-6">
            <p className="text-xs sm:text-sm leading-relaxed sm:leading-relaxed text-zinc-300/90 selection:bg-amber-500/20 selection:text-amber-200">
              {data.prompt}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-zinc-800/40 px-4 sm:px-6 py-2.5 sm:py-3">
            <span className="text-[10px] sm:text-[11px] text-zinc-600">
              {data.prompt.split(' ').length} words
            </span>
            <button
              onClick={onRetry}
              className="inline-flex h-7 sm:h-7 items-center gap-1.5 rounded-md border border-zinc-800/50 bg-zinc-800/30 px-2.5 sm:px-3 text-[10px] sm:text-[11px] font-medium text-zinc-500 transition-all duration-200 hover:border-zinc-700/50 hover:bg-zinc-700/30 hover:text-zinc-300 active:scale-[0.97]"
            >
              <svg className="h-2.5 w-2.5 sm:h-3 sm:w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 8a6 6 0 0 1 11.2-3M14 8a6 6 0 0 1-11.2 3" />
                <path d="M14 2v4h-4M2 14v-4h4" />
              </svg>
              Regenerate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
