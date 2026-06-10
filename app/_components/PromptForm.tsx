'use client';

import { type AspectRatio, ASPECT_RATIOS } from '@/_lib/types';

interface PromptFormProps {
  theme: string;
  aspectRatio: AspectRatio;
  isLoading: boolean;
  onThemeChange: (val: string) => void;
  onAspectRatioChange: (val: AspectRatio) => void;
  onSubmit: () => void;
}

export default function PromptForm({
  theme,
  aspectRatio,
  isLoading,
  onThemeChange,
  onAspectRatioChange,
  onSubmit,
}: PromptFormProps) {
  const trimmed = theme.trim();
  const canSubmit = trimmed.length > 0 && trimmed.length <= 200 && !isLoading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div>
        <div className="flex items-baseline justify-between mb-1.5 sm:mb-2">
          <label
            htmlFor="theme"
            className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500"
          >
            Theme
          </label>
          <span
            className={`text-[10px] sm:text-[11px] tabular-nums ${
              theme.length > 200
                ? 'text-red-400'
                : theme.length > 180
                  ? 'text-amber-400'
                  : 'text-zinc-600'
            }`}
          >
            {theme.length}/200
          </span>
        </div>
        <div className="group relative">
          <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-zinc-700/20 via-zinc-600/10 to-zinc-700/20 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
          <input
            id="theme"
            type="text"
            value={theme}
            onChange={(e) => onThemeChange(e.target.value)}
            disabled={isLoading}
            placeholder="e.g. neon-lit cyberpunk city at dusk"
            className="relative block w-full rounded-xl border border-zinc-800/70 bg-zinc-900/70 px-4 sm:px-5 py-3 sm:py-3.5 text-sm text-zinc-100 placeholder-zinc-600 backdrop-blur-sm transition-all duration-200 focus:border-zinc-600/80 focus:bg-zinc-900/90 focus:outline-none focus:ring-2 focus:ring-zinc-700/30 disabled:pointer-events-none disabled:opacity-40"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="aspect-ratio"
          className="mb-1.5 sm:mb-2 block text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500"
        >
          Aspect Ratio
        </label>
        <div className="group relative">
          <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-zinc-700/20 via-zinc-600/10 to-zinc-700/20 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
          <select
            id="aspect-ratio"
            value={aspectRatio}
            onChange={(e) => onAspectRatioChange(e.target.value as AspectRatio)}
            disabled={isLoading}
            className="relative block w-full appearance-none rounded-xl border border-zinc-800/70 bg-zinc-900/70 px-4 sm:px-5 py-3 sm:py-3.5 pr-12 text-sm text-zinc-100 backdrop-blur-sm transition-all duration-200 focus:border-zinc-600/80 focus:bg-zinc-900/90 focus:outline-none focus:ring-2 focus:ring-zinc-700/30 disabled:pointer-events-none disabled:opacity-40"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2371717a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
              backgroundPosition: 'right 1rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.25rem',
            }}
          >
            {ASPECT_RATIOS.map((ar) => (
              <option key={ar} value={ar}>
                {ar}
              </option>
            ))}
          </select>
        </div>
      </div>


      <div className="btn-premium-wrap">
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-premium"
        >
          <span>
            {isLoading ? (
              <span>Generating</span>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 1v14M1 8h14" />
                  <circle cx="8" cy="8" r="3" />
                </svg>
                Generate Prompt
              </>
            )}
          </span>
        </button>
        <div className="btn-premium-shadow" />
      </div>
    </form>
  );
}
