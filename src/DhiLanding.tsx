import { useState } from "react";
import {
  ArrowRight, ArrowUpRight, AudioLines, BrainCircuit, Check,
  Clock3, Layers3, Menu, MessageSquare, ShieldCheck, Sparkles, X
} from "lucide-react";
import "./DhiLaunch.css";

const modelNames = ["GPT-OSS 20B", "GPT-OSS 120B", "Qwen 3.8 27B"];

function BrandMark() {
  return <span className="launch-mark" aria-hidden="true"><svg viewBox="0 0 40 40" fill="none"><path d="M20 3.5 35.5 12.3v15.4L20 36.5 4.5 27.7V12.3L20 3.5Z" stroke="currentColor" strokeWidth="1.5"/><path d="m12.5 27 7.5-15 7.5 15M16 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="20" cy="3.5" r="1.8" fill="#76DCEB"/></svg></span>;
}

export default function DhiLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return <main className="launch-site">
    <header className="launch-header">
      <a className="launch-brand" href="#top" onClick={closeMenu}><BrandMark/><span>DHI <b>AI</b><small>ONE INTELLIGENT WORKSPACE</small></span></a>
      <button className="launch-menu-toggle" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? "launch-nav open" : "launch-nav"}>
        <a href="#features" onClick={closeMenu}>Features</a>
        <a href="#how-it-works" onClick={closeMenu}>How it works</a>
        <a href="#faq" onClick={closeMenu}>FAQ</a>
        <a className="launch-nav-cta" href="/app" onClick={closeMenu}>Explore workspace <ArrowUpRight/></a>
      </nav>
    </header>

    <section className="launch-hero" id="top">
      <div className="launch-hero-glow" aria-hidden="true"/>
      <div className="launch-hero-copy">
        <div className="launch-eyebrow"><i/> INTRODUCING DHI AI <span>·</span> EARLY ACCESS</div>
        <h1>Think clearly.<br/><em>Create freely.</em></h1>
        <p className="launch-lead">A simpler AI workspace for conversations, ideas and problem-solving. Switch between available models, compare answers and keep your chats in one place.</p>
        <div className="launch-actions"><a className="launch-button primary" href="/app">Explore the workspace <ArrowRight/></a><a className="launch-text-link" href="#features">See what you can do <span>↓</span></a></div>
        <div className="launch-proofline"><span><Check/> Multiple model options</span><span><Check/> Side-by-side comparison</span><span><Check/> Saved conversations</span></div>
      </div>

      <div className="launch-product" aria-label="Illustrative preview of the DHI AI workspace">
        <div className="launch-product-top"><div className="launch-window-dots"><i/><i/><i/></div><span>DHI AI <b>/ WORKSPACE</b></span><span className="launch-preview-label">INTERFACE PREVIEW</span></div>
        <div className="launch-product-body">
          <aside className="launch-mini-sidebar"><div className="launch-mini-logo"><BrandMark/></div><span className="active"><MessageSquare/> Chat</span><span><Layers3/> Models</span><span><Clock3/> History</span><div className="launch-mini-user"><i>U</i><span>Workspace</span></div></aside>
          <div className="launch-mini-chat">
            <div className="launch-mini-greeting"><span><Sparkles/> YOUR AI WORKSPACE</span><h2>What would you<br/>like to work on?</h2><p>Start with a question, an idea or a task.</p></div>
            <div className="launch-mini-message user"><span>YOU</span>Help me plan a new project.</div>
            <div className="launch-mini-answer"><div><span className="launch-mini-avatar"><BrainCircuit/></span><b>DHI AI</b><small>MODEL RESPONSE</small></div><p>Let's turn your idea into a clear plan. We can start with the goal, key steps and what you need to get moving.</p></div>
            <div className="launch-mini-composer"><span>Message DHI AI…</span><i><ArrowUpRight/></i></div>
            <div className="launch-mini-foot">ILLUSTRATIVE UI · NOT A LIVE MODEL RESPONSE</div>
          </div>
        </div>
      </div>
      <div className="launch-hero-bottom"><span>BUILT FOR CURIOUS MINDS</span><span>ONE WORKSPACE · MULTIPLE MODEL OPTIONS</span></div>
    </section>

    <section className="launch-intro" id="features">
      <div className="launch-section-tag">01 / THE WORKSPACE</div>
      <div className="launch-intro-main"><div><p className="launch-kicker">LESS SWITCHING. MORE THINKING.</p><h2>Your AI tools,<br/><em>in one clear place.</em></h2></div><p className="launch-section-copy">DHI AI brings the essentials together in a focused interface. No complicated setup to understand — just choose a model, ask your question and keep working.</p></div>
      <div className="launch-feature-grid">
        <article><span className="launch-feature-icon"><MessageSquare/></span><small>01 · CONVERSATION</small><h3>One simple chat</h3><p>Ask questions, develop ideas and work through tasks in a clean conversation space.</p></article>
        <article><span className="launch-feature-icon"><Layers3/></span><small>02 · MODEL CHOICE</small><h3>Choose your model</h3><p>Switch between the currently connected model options without changing your workflow.</p></article>
        <article><span className="launch-feature-icon"><AudioLines/></span><small>03 · COMPARISON</small><h3>Compare responses</h3><p>Request side-by-side answers from two selected models when you want another perspective.</p></article>
        <article><span className="launch-feature-icon"><Clock3/></span><small>04 · CONTINUITY</small><h3>Pick up where you left off</h3><p>Sign in to save conversations to your account and return to them later.</p></article>
      </div>
    </section>

    <section className="launch-how" id="how-it-works">
      <div className="launch-section-tag">02 / GET STARTED</div>
      <div className="launch-how-heading"><p className="launch-kicker">A SHORTER PATH TO YOUR FIRST CHAT</p><h2>Three steps.<br/><em>Then you're creating.</em></h2></div>
      <div className="launch-steps">
        <article><span>01</span><div><h3>Open your workspace</h3><p>Choose Explore workspace and continue to the secure sign-in screen.</p></div><ArrowUpRight/></article>
        <article><span>02</span><div><h3>Choose a model</h3><p>Select one of the currently connected model options in the chat workspace.</p></div><ArrowUpRight/></article>
        <article><span>03</span><div><h3>Ask, compare and save</h3><p>Start a conversation, compare responses when useful and revisit saved chats.</p></div><ArrowUpRight/></article>
      </div>
      <a className="launch-button primary launch-how-cta" href="/app">Go to DHI AI <ArrowRight/></a>
    </section>

    <section className="launch-models">
      <div className="launch-models-copy"><div className="launch-section-tag">03 / CONNECTED MODELS</div><p className="launch-kicker">A CHOICE OF MODELS</p><h2>Different models.<br/><em>One workflow.</em></h2><p>These are the model options currently shown in the workspace. Availability and usage limits depend on the connected provider.</p><a href="/app" className="launch-text-link">View the workspace <ArrowUpRight/></a></div>
      <div className="launch-model-list">{modelNames.map((name, i) => <div key={name}><span>0{i + 1}</span><b>{name}</b><small>CONNECTED OPTION</small><Check/></div>)}</div>
    </section>

    <section className="launch-trust" id="faq">
      <div className="launch-trust-icon"><ShieldCheck/></div>
      <div><p className="launch-kicker">CLEAR BY DESIGN</p><h2>Know what’s ready.<br/><em>Know what’s next.</em></h2><p>DHI AI is actively evolving. The workspace currently supports AI chat, model selection, response comparison and saved chat history. Image, video, voice generation and additional integrations are still in development.</p><div className="launch-status"><span><i/> AVAILABLE NOW</span><span>CHAT · MODEL SWITCHING · COMPARISON · HISTORY</span></div></div>
    </section>

    <section className="launch-final">
      <div className="launch-final-glow" aria-hidden="true"/>
      <p className="launch-kicker">YOUR NEXT IDEA STARTS HERE</p><h2>Make space for<br/><em>better thinking.</em></h2><p>Step into the DHI AI workspace and explore the features currently available.</p><a className="launch-button primary" href="/app">Explore DHI AI <ArrowRight/></a>
      <small>Sign-in required · Provider usage limits may apply</small>
    </section>

    <footer className="launch-footer"><a className="launch-brand" href="#top"><BrandMark/><span>DHI <b>AI</b><small>ONE INTELLIGENT WORKSPACE</small></span></a><div className="launch-footer-links"><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#faq">What's available</a><a href="/app">Workspace</a></div><div className="launch-footer-bottom"><span>© 2026 DHI AI</span><span>BUILT FOR THE NEXT IDEA.</span><a href="mailto:hello@dhi-ai.com">Contact</a></div></footer>
  </main>;
}
