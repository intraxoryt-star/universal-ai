# Universal AI

A responsive multi-model AI workspace built with React, Vite, Supabase Auth, Supabase Edge Functions, and Vercel.

## Implemented
- Google OAuth and email magic-link sign-in
- Private conversation and message history in Supabase
- Model selection for the configured Groq, Gemini, and xAI routes
- Side-by-side model comparison
- Server-side provider API key handling in the `ai-chat` Edge Function
- Responsive creative dashboard, tool directory, and chat workspace
- External launch link for Google Flow

## Not yet implemented
These are visible as planned/preview features in the UI, not production integrations:
- Native AI image generation
- Native AI video generation
- TTS and speech-to-text workflows
- PDF/DOCX parsing, OCR, and structured extraction
- Translation workflow
- Credit wallet, metering, top-ups, invoices, and admin console
- Payment gateway checkout

Do not advertise these as available until the relevant provider, storage, security, and billing flows have been integrated and tested.

## Local setup
```bash
npm install
cp .env.example .env.local
npm run dev
``

Required browser-safe variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Never place provider API keys, Supabase secret keys, or service-role keys in frontend environment variables.

## Supabase
Project URL: https://gkwmnfebvfafkdlmqyyt.supabase.co

The `ai-chat` Edge Function requires provider secrets configured in Supabase Edge Function Secrets:
- Groq: `GROQ_API_KEY`
- xAI: `XAI_API_KEY` (or `GROK_API_KEY`)
- Gemini: `GEMINI_API_KEY` (or `GOOGLE_API_KEY`)

The function validates the requested model against its server-side allowlist. Keep JWT verification enabled. Configure Google OAuth and the production redirect URLs in Supabase Auth settings.

## Vercel
Connected repository: `intraxoryt-star/universal-ai`

- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite

Set the two browser-safe Supabase variables in Vercel Project Settings → Environment Variables.

## Billing and production readiness
Free provider quotas are limited and can change. A public service with real users may incur provider, database, storage, bandwidth, and hosting costs. Do not promise unlimited free usage.

Credit balances and payment confirmations must be calculated and verified server-side. Payment gateway onboarding, KYC, and merchant settlement require an eligible adult/legal guardian-owned account for a minor project owner. Do not collect or store raw card details in this application.

## Current deployment
The Vercel production project is connected to this repository. Check the Vercel project dashboard for the current production alias and build status.
