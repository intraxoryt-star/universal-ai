import { useState, type FormEvent } from "react";
import {
  ArrowRight, ArrowUpRight, AudioLines, BrainCircuit, Check,
  CircleDot, Cpu, Database, Eye, Globe2, Layers3, LockKeyhole, Menu,
  Network, ShieldCheck, Sparkles, Video, X, Zap
} from "lucide-react";

const models = [
  { id: "core", name: "DHI Core", size: "1–3B · V1", stage: "Research target", desc: "The first independently trained language foundation model, built to establish the training pipeline and multilingual foundations.", tags: ["Text", "Hindi", "English", "Bengali"] },
  { id: "reason", name: "DHI Reason", size: "7–14B · V2", stage: "Planned", desc: "A next-generation model programme focused on deeper reasoning, coding, tool use and reliable instruction following.", tags: ["Reasoning", "Coding", "Tools", "Long context"] },
  { id: "multimodal", name: "DHI Multimodal", size: "30–70B · V3 research", stage: "Long-term research", desc: "A research direction combining language with vision and audio, followed by video understanding as capabilities mature.", tags: ["Vision", "Audio", "Video research", "Multilingual"] },
];

const pillars = [
  { icon: BrainCircuit, title: "Foundation models", text: "Independently trained model weights, original research and a reproducible training pipeline." },
  { icon: Eye, title: "Vision intelligence", text: "A roadmap for image, chart and document understanding through specialist vision systems." },
  { icon: AudioLines, title: "Speech and audio", text: "Speech understanding, multilingual audio workflows and natural voice research." },
  { icon: Video, title: "Video understanding", text: "Long-term research into temporal understanding, scenes and multimodal video context." },
  { icon: Network, title: "Reasoning and agents", text: "Structured reasoning, coding, tool use and controlled task execution." },
  { icon: ShieldCheck, title: "Responsible AI", text: "Privacy, security, evaluation, transparency and dataset provenance built into development." },
];

const phases = [
  { time: "01–03 months", title: "Research foundation", desc: "Architecture specification, research leadership, compute feasibility, dataset governance and training pipeline design.", deliverable: "Technical feasibility report" },
  { time: "04–08 months", title: "First research prototype", desc: "Tokenizer, data pipeline, small-scale pre-training experiments, reproducibility and benchmark baselines.", deliverable: "First independently trained prototype" },
  { time: "09–14 months", title: "DHI Core V1", desc: "Target a 1–3B language model, instruction tuning, multilingual evaluation and safety testing.", deliverable: "V1 research release, subject to quality gates" },
  { time: "15–21 months", title: "DHI Core V2", desc: "Target a 7–14B generation, improve reasoning and coding, and advance vision and audio research.", deliverable: "Next-generation research model" },
  { time: "22–28 months", title: "Global product preview", desc: "Developer API, web and mobile experiences, regional inference design and security reviews.", deliverable: "Controlled product launch target" },
  { time: "29–36 months", title: "Scale and improve", desc: "Larger-model experiments, video understanding research, reliability improvements and global ecosystem development.", deliverable: "V3 research programme" },
];

function Mark({ small = false }: { small?: boolean }) {
  return <span className={"dhi-mark" + (small ? " small" : "")} aria-hidden="true">
    <svg viewBox="0 0 48 48" fill="none">
      <path d="M24 4.5 41 14.2v19.6L24 43.5 7 33.8V14.2L24 4.5Z" stroke="currentColor" strokeWidth="1.6"/>
      <path d="m15.5 31 8.5-17 8.5 17M19.5 25h9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="24" cy="4.5" r="2" fill="#67D5E8"/>
      <circle cx="41" cy="33.8" r="2" fill="#67D5E8"/>
      <circle cx="7" cy="33.8" r="2" fill="#67D5E8"/>
    </svg>
  </span>;
}

export default function DhiLanding() {
  const [activeModel, setActiveModel] = useState("core");
  const [prompt, setPrompt] = useState("Explain how multilingual AI can support education in India.");
  const [demoResult, setDemoResult] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const selected = models.find((item) => item.id === activeModel) ?? models[0];

  function showPreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!prompt.trim()) return;
    setDemoResult("DHI Core is under development. This is an interactive interface preview only — no AI model has processed your prompt, and the text has not been sent to a server or saved.");
  }

  const closeMenu = () => setMobileOpen(false);

  return <main className="dhi-site">
    <div className="dhi-topline"><span><i /> INDEPENDENT AI RESEARCH INITIATIVE</span><span>INDIA ROOTED <b>·</b> GLOBALLY BUILT</span></div>
    <header className="dhi-header">
      <a className="dhi-brand" href="#top" onClick={closeMenu}><Mark/><span>DHI <b>AI</b><small>INTELLIGENCE WITHOUT BOUNDARIES</small></span></a>
      <button className="dhi-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">{mobileOpen ? <X/> : <Menu/>}</button>
      <nav className={mobileOpen ? "open" : ""}>
        <a href="#models" onClick={closeMenu}>Models</a><a href="#research" onClick={closeMenu}>Research</a><a href="#architecture" onClick={closeMenu}>Architecture</a><a href="#roadmap" onClick={closeMenu}>Roadmap</a>
        <a className="dhi-nav-cta" href="#preview" onClick={closeMenu}>Explore preview <ArrowUpRight/></a>
      </nav>
    </header>

    <section className="dhi-hero" id="top">
      <div className="dhi-hero-grid" aria-hidden="true"/>
      <div className="dhi-hero-copy">
        <div className="dhi-eyebrow"><span/> BUILDING INDEPENDENT INTELLIGENCE <span className="dhi-eyebrow-line"/></div>
        <h1>Intelligence<br/><em>without</em> boundaries.</h1>
        <p className="dhi-hero-lead">An India-rooted AI research initiative building original foundation models and globally accessible intelligent technology.</p>
        <div className="dhi-hero-actions"><a href="#research" className="dhi-button primary">Discover our vision <ArrowRight/></a><a href="#roadmap" className="dhi-button secondary">View the roadmap</a></div>
        <div className="dhi-hero-note"><span className="dhi-status-dot"/> <b>COMING SOON</b><span>Research and product development are in progress.</span></div>
      </div>
      <div className="dhi-hero-visual" aria-label="Abstract DHI AI intelligence network illustration">
        <div className="dhi-orbit orbit-one"/><div className="dhi-orbit orbit-two"/><div className="dhi-orbit orbit-three"/>
        <div className="dhi-glow"/>
        <div className="dhi-core-symbol"><Mark/></div>
        <div className="dhi-node node-a"><BrainCircuit/><span>REASONING</span></div>
        <div className="dhi-node node-b"><Eye/><span>VISION</span></div>
        <div className="dhi-node node-c"><AudioLines/><span>AUDIO</span></div>
        <div className="dhi-node node-d"><Network/><span>RESEARCH</span></div>
        <div className="dhi-visual-caption">A NEW GENERATION OF INTELLIGENCE <i>01 / 04</i></div>
      </div>
      <div className="dhi-hero-bottom"><span>01 — OUR AMBITION</span><span>ADVANCING AI THROUGH ORIGINAL RESEARCH</span><a href="#mission">SCROLL TO EXPLORE ↓</a></div>
    </section>

    <section className="dhi-manifesto" id="mission">
      <div className="dhi-section-label">01 / PURPOSE</div>
      <div className="dhi-manifesto-content"><p className="dhi-kicker">A DIFFERENT KIND OF AI COMPANY</p><h2>Built on research.<br/><span>Designed for everyone.</span></h2><p className="dhi-body">DHI AI aims to develop independent AI technology from the foundations up — combining original model research, responsible engineering and products designed for people everywhere.</p>
        <div className="dhi-mission-grid"><article><span>OUR MISSION</span><p>Advance independent artificial intelligence through original research, responsible engineering and globally accessible technology.</p></article><article><span>OUR VISION</span><p>Build an Indian-origin AI research organisation that contributes meaningful advances to global artificial intelligence.</p></article><article><span>OUR PHILOSOPHY</span><p>Intelligence should expand human capability, improve knowledge and make technology accessible across borders.</p></article></div>
      </div>
    </section>

    <section className="dhi-capabilities" id="research">
      <div className="dhi-section-heading"><div><div className="dhi-section-label">02 / RESEARCH DOMAINS</div><p className="dhi-kicker">THE TECHNOLOGY WE AIM TO ADVANCE</p><h2>One research vision.<br/><span>Multiple frontiers.</span></h2></div><p className="dhi-heading-aside">Our research programme is designed as a connected ecosystem. Each capability will be developed, evaluated and released only when it meets defined quality and safety standards.</p></div>
      <div className="dhi-capability-grid">{pillars.map((item, index) => <article className="dhi-capability" key={item.title}><div className="dhi-cap-top"><item.icon/><span>0{index + 1}</span></div><h3>{item.title}</h3><p>{item.text}</p><div className="dhi-cap-line"/></article>)}</div>
    </section>

    <section className="dhi-models" id="models">
      <div className="dhi-section-label">03 / MODEL PROGRAMME</div>
      <div className="dhi-section-heading model-heading"><div><p className="dhi-kicker">OUR FOUNDATION MODEL ROADMAP</p><h2>Meet the <span>DHI Core</span> family.</h2></div><p className="dhi-heading-aside">A staged research strategy: establish a strong language foundation first, then expand into reasoning and multimodal intelligence.</p></div>
      <div className="dhi-model-layout">
        <div className="dhi-model-list">{models.map((model) => <button key={model.id} className={activeModel === model.id ? "dhi-model-option active" : "dhi-model-option"} onClick={() => { setActiveModel(model.id); setDemoResult(""); }}><span className="dhi-model-index">0{models.indexOf(model) + 1}</span><span className="dhi-model-option-copy"><b>{model.name}</b><small>{model.size}</small></span><span className="dhi-model-stage">{model.stage}</span><ArrowUpRight/></button>)}</div>
        <article className="dhi-model-detail"><div className="dhi-model-detail-top"><span className="dhi-chip">RESEARCH ROADMAP</span><span className="dhi-model-stage">{selected.stage.toUpperCase()}</span></div><div className="dhi-model-art"><div className="dhi-model-rings"/><div className="dhi-model-orb"><Mark/></div><span className="dhi-art-label">DHI / {selected.id.toUpperCase()}</span></div><p className="dhi-kicker">{selected.size}</p><h3>{selected.name}</h3><p className="dhi-body">{selected.desc}</p><div className="dhi-tags">{selected.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a href="#preview" className="dhi-text-link">Explore the model preview <ArrowRight/></a></article>
      </div>
      <p className="dhi-disclaimer">Model sizes and capabilities shown are research targets, not released products or verified performance claims. Progress depends on compute, data, evaluation and funding milestones.</p>
    </section>

    <section className="dhi-preview" id="preview">
      <div className="dhi-preview-copy"><div className="dhi-section-label">04 / INTERACTIVE PREVIEW</div><p className="dhi-kicker">A FIRST LOOK AT THE EXPERIENCE</p><h2>Explore how<br/><span>DHI AI could feel.</span></h2><p className="dhi-body">The DHI Core model is not live yet. Use this local interface preview to see the planned interaction flow — without sending your prompt to a model or storing it.</p><div className="dhi-preview-status"><span className="dhi-status-dot"/> DHI CORE · IN DEVELOPMENT</div></div>
      <div className="dhi-playground"><div className="dhi-playground-head"><span><Mark small/> DHI AI <small>MODEL PREVIEW</small></span><span className="dhi-preview-pill"><i/> UI DEMO</span></div><div className="dhi-playground-model"><div className="dhi-avatar"><BrainCircuit/></div><div><b>DHI Core</b><small>Foundation model · Planned V1</small></div><span className="dhi-coming-tag">COMING SOON</span></div><form onSubmit={showPreview}><label htmlFor="dhi-prompt">YOUR PROMPT</label><textarea id="dhi-prompt" rows={3} value={prompt} onChange={event => { setPrompt(event.target.value); setDemoResult(""); }} placeholder="Ask a question..."/><div className="dhi-playground-bottom"><span><LockKeyhole/> Local preview · Not transmitted</span><button type="submit">Try preview <ArrowRight/></button></div></form>{demoResult && <div className="dhi-demo-response"><span><Sparkles/> PREVIEW NOTICE</span><p>{demoResult}</p></div>}<div className="dhi-sample-prompts"><span>IDEAS TO EXPLORE</span><button onClick={() => { setPrompt("How can AI support learning in multiple Indian languages?"); setDemoResult(""); }}>Multilingual learning</button><button onClick={() => { setPrompt("Explain the difference between reasoning and retrieval."); setDemoResult(""); }}>AI reasoning</button></div><p className="dhi-playground-foot">Illustrative interface only. No live DHI model inference is available at this stage.</p></div>
    </section>

    <section className="dhi-architecture" id="architecture">
      <div className="dhi-section-label">05 / SYSTEM ARCHITECTURE</div><div className="dhi-section-heading"><div><p className="dhi-kicker">A CONNECTED TECHNOLOGY STACK</p><h2>From research<br/><span>to real-world impact.</span></h2></div><p className="dhi-heading-aside">A modular architecture keeps model training, product experiences, infrastructure and safety independently governed — while working together as one platform.</p></div>
      <div className="dhi-stack">
        <div className="dhi-stack-row stack-product"><span>01</span><div><b>Global AI products</b><small>Web · Mobile · Developer API · Enterprise</small></div><Globe2/></div>
        <div className="dhi-stack-connector"/>
        <div className="dhi-stack-row stack-gateway"><span>02</span><div><b>AI gateway and orchestration</b><small>Authentication · Model routing · Rate limits · Observability</small></div><Network/></div>
        <div className="dhi-stack-connector"/>
        <div className="dhi-stack-grid"><article><BrainCircuit/><b>Foundation models</b><small>Language · Reasoning · Coding</small></article><article><Eye/><b>Multimodal systems</b><small>Vision · Audio · Video research</small></article><article><Database/><b>Knowledge and memory</b><small>Retrieval · Context · Data governance</small></article><article><Zap/><b>Agent runtime</b><small>Tools · Planning · Controlled actions</small></article></div>
        <div className="dhi-stack-connector"/>
        <div className="dhi-stack-row stack-training"><span>03</span><div><b>Research and training platform</b><small>Datasets · Pre-training · Post-training · Evaluation · Model registry</small></div><Layers3/></div>
        <div className="dhi-stack-connector"/>
        <div className="dhi-stack-row stack-infra"><span>04</span><div><b>Hybrid compute infrastructure</b><small>Owned research cluster · Rented GPU capacity · Storage · Networking</small></div><Cpu/></div>
      </div>
      <div className="dhi-architecture-foot"><span><Check/> Independent model weights</span><span><Check/> Versioned datasets</span><span><Check/> Security and safety gates</span><span><Check/> Regional deployment strategy</span></div>
    </section>

    <section className="dhi-compute">
      <div className="dhi-section-label">06 / COMPUTE STRATEGY</div><div className="dhi-compute-heading"><p className="dhi-kicker">HYBRID BY DESIGN</p><h2>Build what matters.<br/><span>Scale when ready.</span></h2><p className="dhi-body">Begin with rented GPU capacity for flexible experiments, while building a focused owned cluster for continuous research, testing and inference. Expand only after utilisation and cost are measured.</p></div>
      <div className="dhi-compute-cards"><article><div className="dhi-compute-icon"><Globe2/></div><span>FLEXIBLE CAPACITY</span><h3>Rented GPU compute</h3><p>Large training runs, experiments and burst workloads through qualified cloud and shared compute providers.</p><ul><li>Elastic capacity</li><li>Lower initial capital commitment</li><li>Multiple supplier options</li></ul></article><article><div className="dhi-compute-icon"><Cpu/></div><span>LONG-TERM CONTROL</span><h3>Owned research cluster</h3><p>A measured, expandable on-premise or colocation cluster for research continuity and selected inference workloads.</p><ul><li>Dedicated research access</li><li>Controlled environment</li><li>Capacity expansion by evidence</li></ul></article></div>
      <div className="dhi-gpu-band"><div><span>CAPACITY PLANNING</span><b>8–16 → 64–128 → 128–512 accelerators</b><small>Indicative staged planning bands, subject to workload benchmarking and procurement.</small></div><a href="https://compute.indiaai.gov.in/pricelist" target="_blank" rel="noreferrer">Explore IndiaAI compute <ArrowUpRight/></a></div>
    </section>

    <section className="dhi-roadmap" id="roadmap">
      <div className="dhi-section-label">07 / EXECUTION ROADMAP</div><div className="dhi-section-heading"><div><p className="dhi-kicker">A GATED 36-MONTH PLAN</p><h2>Ambition, translated<br/><span>into milestones.</span></h2></div><p className="dhi-heading-aside">Each stage has a measurable deliverable. The next investment gate depends on technical feasibility, model quality, safety and operating cost — not the calendar alone.</p></div>
      <div className="dhi-timeline">{phases.map((phase, index) => <article className="dhi-phase" key={phase.time}><div className="dhi-phase-marker"><span>0{index + 1}</span></div><div className="dhi-phase-content"><span className="dhi-phase-time">{phase.time}</span><h3>{phase.title}</h3><p>{phase.desc}</p><div><Check/> <b>Deliverable:</b> {phase.deliverable}</div></div></article>)}</div>
    </section>

    <section className="dhi-investment">
      <div className="dhi-section-label">08 / FUNDING FRAMEWORK</div><div className="dhi-investment-layout"><div><p className="dhi-kicker">THREE-YEAR PLANNING SCENARIO</p><h2>Invest with<br/><span>discipline.</span></h2><p className="dhi-body">A preliminary funding target for an ambitious independent research and product programme. Funding would be released in stages against technical and commercial milestones.</p><div className="dhi-budget-number">₹200–300 <small>crore</small></div><p className="dhi-budget-caption">Indicative three-year planning range · Not a raised amount or confirmed valuation</p></div><div className="dhi-budget-breakdown">{[{name:"GPU training and compute",share:"30%"},{name:"Research and engineering",share:"22%"},{name:"Data and licensing",share:"10%"},{name:"Owned infrastructure",share:"14%"},{name:"Multimodal development",share:"8%"},{name:"Global deployment",share:"6%"},{name:"Safety and compliance",share:"4%"},{name:"Contingency",share:"6%"}].map(item => <div className="dhi-budget-row" key={item.name}><span>{item.name}</span><b>{item.share}</b><i style={{width:item.share}}/></div>)}</div></div>
      <p className="dhi-disclaimer">Budget allocation percentages are illustrative planning assumptions. Actual costs depend on model size, training tokens, GPU type and utilisation, team, data rights, deployment volume, taxes and financing conditions. Frontier-level performance is not guaranteed.</p>
    </section>

    <section className="dhi-principles">
      <div className="dhi-section-label">09 / TRUST AND RESPONSIBILITY</div><div><p className="dhi-kicker">ENGINEERED WITH RESPONSIBILITY</p><h2>Trust is part of<br/><span>the architecture.</span></h2></div><div className="dhi-principle-grid"><article><ShieldCheck/><b>Safety by design</b><p>Evaluation gates, misuse testing and clear release criteria.</p></article><article><LockKeyhole/><b>Privacy and security</b><p>Access controls, encryption and responsible data handling.</p></article><article><Database/><b>Data provenance</b><p>Documented sources, licence tracking and dataset governance.</p></article><article><Globe2/><b>Global readiness</b><p>Regional compliance and transparent product capabilities.</p></article></div>
    </section>

    <section className="dhi-final-cta"><div className="dhi-cta-orb"/><div className="dhi-section-label">10 / THE NEXT CHAPTER</div><Mark/><p className="dhi-kicker">INDIA ROOTED · GLOBALLY BUILT</p><h2>The future is<br/><span>under research.</span></h2><p>We are building the foundations for a new generation of independent intelligence.</p><div className="dhi-coming-large"><CircleDot/> DHI AI — COMING SOON</div></section>

    <footer className="dhi-footer"><a className="dhi-brand" href="#top"><Mark small/><span>DHI <b>AI</b><small>INTELLIGENCE WITHOUT BOUNDARIES</small></span></a><div className="dhi-footer-links"><a href="#mission">Our purpose</a><a href="#models">Models</a><a href="#research">Research</a><a href="#roadmap">Roadmap</a></div><div className="dhi-footer-bottom"><span>© 2026 DHI AI · INDIA</span><span>INDEPENDENT AI RESEARCH INITIATIVE</span><a href="https://indiaai.gov.in/" target="_blank" rel="noreferrer">INDIA AI ECOSYSTEM <ArrowUpRight/></a></div><p className="dhi-legal-note">DHI AI is a proposed brand identity for an AI research initiative. Company registration, trademark clearance, model development and product availability are subject to completion. All model sizes, timelines and budgets are forward-looking planning targets, not claims of existing capabilities.</p></footer>
  </main>;
}
