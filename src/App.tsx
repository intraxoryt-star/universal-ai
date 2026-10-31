import { useEffect, useMemo, useState, type FormEvent } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import { ArrowUp, Bot, ChevronDown, CircleHelp, Cpu, LogOut, MessageSquare, Plus, Sparkles, Zap } from "lucide-react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

type Role = "user" | "assistant";
type ChatMessage = { role: Role; content: string };
type Model = { id: string; name: string; tag: string };
const MODELS: Model[] = [
  { id: "openai/gpt-oss-20b", name: "GPT-OSS 20B", tag: "Fast" },
  { id: "openai/gpt-oss-120b", name: "GPT-OSS 120B", tag: "Advanced" },
  { id: "qwen/qwen3.8-27b", name: "Qwen 3.8 27B", tag: "Reasoning" },
  { id: "grok-4.7", name: "Grok 4.7", tag: "xAI" },
  { id: "gemini-3.8-flash", name: "Gemini Flash", tag: "Google" },
];

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [email, setEmail] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [authNotice, setAuthNotice] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [model, setModel] = useState(MODELS[0].id);
  const [compareModel, setCompareModel] = useState(MODELS[1].id);
  const [compare, setCompare] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [compareAnswer, setCompareAnswer] = useState("");
  const [notice, setNotice] = useState("");
  const [showTools, setShowTools] = useState(true);
  const [toolNotice, setToolNotice] = useState("");
  const selectedModel = useMemo(() => MODELS.find((item) => item.id === model) ?? MODELS[0], [model]);
  const secondModel = useMemo(() => MODELS.find((item) => item.id === compareModel) ?? MODELS[1], [compareModel]);

  useEffect(() => {
    if (!supabase) { setAuthReady(true); return; }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setAuthReady(true); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);

  async function signInGoogle() {
    if (!supabase) return;
    setAuthBusy(true); setAuthNotice("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) setAuthNotice(error.message);
    setAuthBusy(false);
  }

  async function signInEmail(event: FormEvent) {
    event.preventDefault();
    if (!supabase || !email.trim()) return;
    setAuthBusy(true); setAuthNotice("");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin },
    });
    setAuthNotice(error ? error.message : "Magic link sent. Check your email inbox.");
    setAuthBusy(false);
  }

  async function signOut() {
    await supabase?.auth.signOut();
    setMessages([]); setAnswer(""); setCompareAnswer("");
  }

  async function sendMessage(event: FormEvent) {
    event.preventDefault();
    const prompt = draft.trim();
    if (!prompt || !supabase || !session || loading) return;
    const history = [...messages, { role: "user" as const, content: prompt }];
    setMessages(history);
    setDraft(""); setLoading(true); setNotice(""); setAnswer(""); setCompareAnswer("");

    const request = async (chosenModel: string) => {
      const { data, error } = await supabase!.functions.invoke("ai-chat", {
        body: { messages: history, model: chosenModel },
      });
      if (error) throw new Error(error.message);
      if (!data?.success || typeof data.reply !== "string") throw new Error(data?.error ?? "AI request failed");
      return data as { reply: string; model_label?: string; fallback_used?: boolean };
    };

    try {
      if (compare && compareModel !== model) {
        const [first, second] = await Promise.allSettled([request(model), request(compareModel)]);
        if (first.status === "fulfilled") setAnswer(first.value.reply);
        if (second.status === "fulfilled") setCompareAnswer(second.value.reply);
        const failures = [first, second].filter((item) => item.status === "rejected");
        if (failures.length === 2) throw new Error("Both model requests failed. Please check your connection and try again.");
        if (failures.length === 1) setNotice("One model did not respond. The other result is available.");
        setMessages((current) => [...current, { role: "assistant", content: first.status === "fulfilled" ? first.value.reply : second.status === "fulfilled" ? second.value.reply : "No response." }]);
      } else {
        const result = await request(model);
        setAnswer(result.reply);
        setMessages((current) => [...current, { role: "assistant", content: result.reply }]);
        if (result.fallback_used) setNotice("The selected model was unavailable; a backup model answered instead.");
      }
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (!authReady) return <div className="center-screen"><div className="loader" /><span>Preparing your workspace…</span></div>;

  if (!session) return (
    <main className="auth-screen">
      <div className="auth-glow" />
      <section className="auth-card">
        <div className="brand-mark"><Sparkles size={22} /></div>
        <div className="eyebrow">ONE WORKSPACE. MULTIPLE MODELS.</div>
        <h1>Meet your <span>Universal AI.</span></h1>
        <p className="muted">A focused workspace to chat with powerful AI models and compare their answers side by side.</p>
        {!supabase && <div className="alert">Setup required: add your Supabase URL and publishable key to the environment variables.</div>}
        <button className="google-button" onClick={signInGoogle} disabled={!supabase || authBusy}>
          <span className="google-g">G</span> Continue with Google
        </button>
        <div className="or"><span />OR<span /></div>
        <form onSubmit={signInEmail} className="email-form">
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button className="primary-button" disabled={!supabase || authBusy || !email.trim()}>{authBusy ? "Please wait…" : "Send magic link"}</button>
        </form>
        {authNotice && <div className="notice">{authNotice}</div>}
        <p className="fine-print">Secure sign-in powered by Supabase Auth.</p>
      </section>
    </main>
  );

  if (showTools) return (
    <main className="tools-home">
      <div className="tools-backdrop" />
      <header className="tools-header">
        <div className="tools-brand"><div className="brand-mark small"><Sparkles size={17} /></div><span>Universal AI</span></div>
        <button className="tools-account" onClick={signOut}><div className="avatar">{(session.user.email ?? "U")[0].toUpperCase()}</div><LogOut size={15} /></button>
      </header>
      <section className="tools-content">
        <div className="tools-eyebrow">YOUR PERSONAL AI WORKSPACE</div>
        <h1>AI Tools</h1>
        <p className="tools-subtitle">All your favourite AI tools, in one place.</p>
        <div className="tools-grid">
          {[
            { name: "Claude", symbol: "✳", tone: "claude", state: "Coming soon", action: () => setToolNotice("Claude integration is not connected yet.") },
            { name: "ChatGPT", symbol: "◎", tone: "chatgpt", state: "Ready", action: () => { setModel("openai/gpt-oss-20b"); setShowTools(false); setToolNotice(""); } },
            { name: "Gemini", symbol: "✦", tone: "gemini", state: "Ready", action: () => { setModel("gemini-3.8-flash"); setShowTools(false); setToolNotice(""); } },
            { name: "Perplexity", symbol: "◇", tone: "perplexity", state: "Coming soon", action: () => setToolNotice("Perplexity integration is not connected yet.") },
            { name: "Grok", symbol: "𝕏", tone: "grok", state: "Ready", action: () => { setModel("grok-4.7"); setShowTools(false); setToolNotice(""); } },
            { name: "Flow", symbol: "▶", tone: "flow", state: "External tool", action: () => window.open("https://labs.google/fx/tools/flow", "_blank", "noopener,noreferrer") },
            { name: "Flow Music", symbol: "♫", tone: "flowmusic", state: "Coming soon", action: () => setToolNotice("Flow Music shortcut will be added after its destination is confirmed.") },
          ].map((tool) => (
            <button className="tool-tile" key={tool.name} onClick={tool.action}>
              <span className={`tool-icon ${tool.tone}`}>{tool.symbol}</span>
              <span className="tool-name">{tool.name}</span>
              <span className={`tool-state ${tool.state === "Ready" ? "ready" : ""}`}>{tool.state}</span>
            </button>
          ))}
        </div>
        {toolNotice && <div className="tool-notice">{toolNotice}</div>}
        <div className="tools-footer">One workspace. Multiple AI models.</div>
      </section>
    </main>
  );

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark small"><Sparkles size={18} /></div><span>Universal<span className="brand-light">AI</span></span></div>
        <button className="new-chat" onClick={() => { setMessages([]); setAnswer(""); setCompareAnswer(""); setNotice(""); }}><Plus size={17} /> New chat</button>
        <div className="side-label">WORKSPACE</div>
        <div className="side-item active"><MessageSquare size={16} /> AI Chat</div>
        <div className="side-item"><Cpu size={16} /> Model studio <span className="soon">SOON</span></div>
        <div className="side-bottom">
          <div className="plan-chip"><Zap size={15} /><div><b>Multi-model workspace</b><small>Powered by Groq</small></div></div>
          <button className="account" onClick={signOut}><div className="avatar">{(session.user.email ?? "U")[0].toUpperCase()}</div><div className="account-copy"><b>{session.user.email ?? "Signed in"}</b><small>Sign out</small></div><LogOut size={15} /></button>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div><div className="crumb">WORKSPACE <span>/</span> AI CHAT</div><h2>AI Chat</h2></div><button className="back-tools" onClick={() => setShowTools(true)}>← AI Tools</button>
          <div className="top-status"><span className="live-dot" /> Systems online</div>
        </header>

        <section className={`conversation ${messages.length ? "has-messages" : ""}`}>
          {messages.length === 0 ? (
            <div className="welcome">
              <div className="welcome-icon"><Sparkles size={24} /></div>
              <div className="eyebrow">YOUR AI WORKSPACE</div>
              <h1>What are we <span>building</span> today?</h1>
              <p>Ask a question, explore an idea, or compare two models to see different perspectives.</p>
              <div className="suggestions">
                {["Explain a complex topic simply", "Help me plan a new project", "Write and improve an idea"].map((item) => <button key={item} onClick={() => setDraft(item)}>{item}<ArrowUp size={14} /></button>)}
              </div>
            </div>
          ) : (
            <div className="thread">
              {messages.map((item, index) => <div className={`message-row ${item.role}`} key={`${index}-${item.role}`}><div className="message-avatar">{item.role === "user" ? "U" : <Bot size={17} />}</div><div className="message-content"><div className="message-role">{item.role === "user" ? "YOU" : "UNIVERSAL AI"}</div><div className="message-text">{item.content}</div></div></div>)}
              {(answer || compareAnswer) && <div className={`response-grid ${compare && compareAnswer ? "two" : ""}`}>
                {answer && <article className="response-card"><div className="response-head"><span><Bot size={16} /> {selectedModel.name}</span><small>RESPONSE 01</small></div><div className="response-body">{answer}</div></article>}
                {compareAnswer && <article className="response-card"><div className="response-head"><span><Bot size={16} /> {secondModel.name}</span><small>RESPONSE 02</small></div><div className="response-body">{compareAnswer}</div></article>}
              </div>}
              {loading && <div className="thinking"><span className="loader" /> {compare ? "Comparing model responses…" : "Thinking…"}</div>}
            </div>
          )}
        </section>

        <div className="composer-wrap">
          {notice && <div className="notice inline-notice"><CircleHelp size={15} />{notice}</div>}
          <div className="model-toolbar">
            <label className="model-select"><span>MODEL</span><select value={model} onChange={(e) => setModel(e.target.value)}>{MODELS.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.tag}</option>)}</select><ChevronDown size={14} /></label>
            <label className="compare-toggle"><input type="checkbox" checked={compare} onChange={(e) => setCompare(e.target.checked)} /><span className="toggle-ui" /><span>Compare models</span></label>
            {compare && <label className="model-select second-select"><span>WITH</span><select value={compareModel} onChange={(e) => setCompareModel(e.target.value)}>{MODELS.filter((item) => item.id !== model).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><ChevronDown size={14} /></label>}
          </div>
          <form className="composer" onSubmit={sendMessage}>
            <textarea value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(e as unknown as FormEvent); } }} placeholder="Message Universal AI…" rows={2} />
            <div className="composer-foot"><span>↵ Enter to send · Shift + Enter for new line</span><button className="send-button" type="submit" disabled={!draft.trim() || loading}><ArrowUp size={18} /></button></div>
          </form>
          <div className="disclaimer">AI can make mistakes. Verify important information. Side-by-side mode uses two model requests.</div>
        </div>
      </main>
    </div>
  );
}
