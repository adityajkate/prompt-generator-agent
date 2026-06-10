<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adityajkate/prompt-generator-agent/master/.github/banner-dark.svg">
    <img src="https://raw.githubusercontent.com/adityajkate/prompt-generator-agent/master/.github/banner-light.svg" width="100%" height="auto" alt="Prompt Generator">
  </picture>
</p>

<p align="center">
  <a href="https://prompt-generator-agent.vercel.app">prompt-generator-agent.vercel.app</a>
</p>

<br>

Generate professional diffusion model prompts from a theme and aspect ratio. Built with Next.js 16, powered by NVIDIA Llama 3.3 70B.

<br>

## Usage

1. Enter a theme (e.g. "neon-lit cyberpunk city at dusk")
2. Select an aspect ratio (16:9, 4:3, 1:1, 9:16, 2:1, 3:2, 21:9)
3. Click generate

Output is a single cohesive prompt ready to paste into any diffusion model.

## Tech

- **Framework** - Next.js 16 (App Router)
- **Styling** - Tailwind CSS v4
- **AI** - NVIDIA Llama 3.3 70B via OpenAI-compatible API
- **Animation** - GSAP, Three.js
- **Font** - Geist

## Local

```bash
npm install
npm run dev
```

Requires `NVIDIA_API_KEY` in `.env` (get one free at build.nvidia.com).

## Deploy

Push to GitHub, import into Vercel, set `NVIDIA_API_KEY` in environment variables.

---

<p align="center">
  <a href="https://prompt-generator-agent.vercel.app">prompt-generator-agent.vercel.app</a>
</p>
