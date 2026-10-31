# Universal AI

A multi-model AI workspace built with React, Vite, Supabase Auth, and Supabase Edge Functions.

## Features
- Google OAuth and email magic-link sign-in
- GPT-OSS 20B, GPT-OSS 120B, and Qwen 3.8 model selection
- Side-by-side responses from two models
- Server-side Groq API key handling
- Automatic model fallback in the Edge Function
- Responsive dark interface

## Local setup
```bash
npm install
cp .env.example .env
npm run dev
```
The included `.env.example` contains this project URL and its browser-safe publishable key. Copy it to `.env.local` for local development. For Vercel, add the same two variables in Project Settings → Environment Variables.
Never put a Groq key or Supabase secret/service-role key in frontend variables.

## Supabase
Project URL: https://gkwmnfebvfafkdlmqyyt.supabase.co

The `ai-chat` Edge Function requires the server-side `GROQ_API_KEY` secret. Keep JWT verification enabled.
For Google sign-in, enable the Google provider in Supabase Authentication, add the deployed site's URL to allowed redirects, and keep the Google client secret only in Supabase provider settings.

## Vercel
Import `intraxoryt-star/universal-ai` into Vercel and set:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Build command: `npm run build`
Output directory: `dist`

Side-by-side mode sends two separate provider requests and uses more quota than a single response.


## Current scope
The current build implements Google OAuth, email magic-link authentication, single-model chat, and two-model comparison through the deployed `ai-chat` Edge Function. Conversation history persistence, saved projects, shared memory, and provider self-service key management are not implemented in this frontend yet.
