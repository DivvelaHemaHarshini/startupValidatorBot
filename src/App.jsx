import { useState, useRef, useEffect } from "react";

// ─── Validator Engine ────────────────────────────────────────────────────────

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const RISK_POOL = [
  "High customer acquisition cost in a crowded digital landscape",
  "Regulatory uncertainty may slow market entry",
  "Dependency on third-party infrastructure creates fragility",
  "Network effects required but hard to bootstrap cold-start",
  "Monetization clarity is weak at early stages",
  "Established incumbents have deep pockets for competitive response",
  "User behavior change required — adoption may be slow",
  "Technical complexity could inflate runway burn",
  "Market timing risk if macro conditions shift",
  "Talent sourcing in specialized domains is expensive",
  "Data privacy concerns may limit data collection",
  "Geographic scaling challenges outside home market",
];
const REVENUE_MODELS = [
  "SaaS subscription tiers (Freemium → Pro → Enterprise)",
  "Transaction-based commission on platform activity",
  "API licensing to developers and enterprise partners",
  "Marketplace listing fees plus premium placement",
  "White-label licensing to industry incumbents",
  "Data insights packages sold to B2B clients",
  "Advertising revenue from a targeted audience segment",
  "Professional services & onboarding retainers",
  "Usage-based pricing aligned with customer value delivery",
  "Hardware + recurring consumables / accessories model",
];
const COMPETITOR_PREFIXES = ["Nova","Apex","Pulse","Crest","Flux","Helio","Vero","Zynk","Omni","Sora","Koda","Axon"];
const COMPETITOR_SUFFIXES = ["Labs","AI","HQ","Works","Hub","Base","Sphere","Core","Nest","Stack","IO","Forge"];
const COMPETITOR_VERBS = ["streamlines","automates","connects","reimagines","simplifies","accelerates"];
const COMPETITOR_OBJECTS = [
  "the core workflow for similar audiences",
  "data aggregation in adjacent verticals",
  "onboarding and user activation",
  "supply-chain coordination for related industries",
  "the discovery layer in this space",
  "compliance and reporting for comparable markets",
];
const PROBLEM_TEMPLATES = [
  (idea) => `Many encounter friction when trying to ${idea.toLowerCase()}, especially where existing tools are slow or inaccessible.`,
  (idea) => `The challenge of handling "${idea}" arises daily for professionals and enthusiasts alike — existing solutions are inadequate.`,
  (idea) => `There is a visible gap for streamlined solutions around "${idea}" — current workarounds are inefficient and user-hostile.`,
];
const SUMMARY_TEMPLATES = [
  (idea) => `A platform designed to make "${idea}" seamless for a modern, digitally-native audience — addressing end-to-end friction with a focused, product-led approach.`,
  (idea) => `An innovative solution that tackles "${idea}" by rethinking the user journey from discovery to outcome. Built for speed, clarity, and real-world impact.`,
  (idea) => `A purpose-built tool helping users accomplish "${idea}" more effectively — removing complexity while unlocking meaningful productivity gains.`,
];
const UVP_TEMPLATES = [
  "Unlike existing players, this leads with simplicity-first UX while delivering enterprise-grade reliability — a combination rarely achieved.",
  "Core differentiation lies in niche audience focus: while competitors go broad, this product goes deep, delivering 10× more relevant features.",
  "A vertical-specific approach combined with an opinionated workflow means users see value in under 5 minutes, not 5 days.",
  "The integration of community + tool in a single surface creates compounding retention effects standalone utilities cannot replicate.",
  "AI-native from day one — not a retrofitted feature — giving structural edge in speed, personalization, and scale.",
];
const FEASIBILITY_REASONS = [
  "Strong product-market fit signals with identifiable, reachable audience.",
  "Core MVP can likely be shipped within 3–4 months by a lean team.",
  "Revenue path is clear, reducing investor risk and extending runway optionality.",
  "Existing toolchains lower the technical barrier to first version.",
  "Relies on behavior change, which tends to slow traction and inflate CAC.",
  "Market saturation is a concern; differentiation must be actively maintained.",
  "High infrastructure costs may compress margins before achieving scale.",
  "Regulatory headwinds in target vertical could delay go-to-market.",
];
const MARKET_AUDIENCE = {
  Small: "Early adopters, niche professionals, specialized hobbyists",
  Medium: "SMBs, mid-market enterprises, active consumer segment",
  Large: "Mass-market consumers, enterprise, cross-vertical B2B",
};

function generateCompetitors() {
  const count = rand(2, 3);
  const used = new Set();
  const result = [];
  while (result.length < count) {
    const name = `${pick(COMPETITOR_PREFIXES)}${pick(COMPETITOR_SUFFIXES)}`;
    if (!used.has(name)) {
      used.add(name);
      result.push({ name, desc: `${pick(COMPETITOR_VERBS)} ${pick(COMPETITOR_OBJECTS)}.` });
    }
  }
  return result;
}
function shuffleAndPick(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}
function generateReport(idea) {
  const markets = ["Small", "Medium", "Large"];
  const market = pick(markets);
  const score = rand(4, 9);
  const verdict = score >= 8 ? "Strong Idea" : score >= 6 ? "Needs Improvement" : "Weak Idea";
  return {
    summary: pick(SUMMARY_TEMPLATES)(idea),
    problem: pick(PROBLEM_TEMPLATES)(idea),
    market,
    audience: MARKET_AUDIENCE[market],
    competitors: generateCompetitors(),
    uvp: pick(UVP_TEMPLATES),
    revenues: shuffleAndPick(REVENUE_MODELS, 3),
    score,
    feasibilityReasons: shuffleAndPick(FEASIBILITY_REASONS, 2),
    risks: shuffleAndPick(RISK_POOL, 3),
    verdict,
  };
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --ink:#1e2a3a;
  --paper:#f4f1ea;
  --paper2:#ece9e1;
  --paper3:#e3dfd6;
  --line:#d0ccc2;
  --muted:#9a9690;
  --accent:#f97316;
  --accent-dim:#ea6c0a;
  --accent-glow:rgba(249,115,22,0.15);
  --red:#e53e3e;
  --amber:#d97706;
  --green:#16a34a;
  --user-bg:#2d3f54;
  --user-text:#f0ede6;
  --r:4px;
  --font:'Space Grotesk',sans-serif;
  --mono:'Space Mono',monospace;
}

body{background:#dfe8f0;font-family:var(--font);color:var(--ink);overflow:hidden}

.shell{
  display:flex;flex-direction:column;height:100vh;
  width:100%;max-width:100%;margin:0 auto;
  background:var(--paper);
  border-left:none;border-right:none;
  box-shadow:none;
}

/* ── Header ── */
.hdr{
  display:flex;align-items:center;gap:0;
  border-bottom:1.5px solid var(--ink);
  background:#1e2a3a;
  flex-shrink:0;
}
.hdr-logo{
  display:flex;align-items:center;gap:8px;
  padding:8px 16px;
  border-right:1px solid #2e3f54;
}
.hdr-logo .mark{
  width:24px;height:24px;border-radius:2px;
  background:var(--accent);
  display:flex;align-items:center;justify-content:center;
  font-size:12px;
}
.hdr-logo h1{
  font-family:var(--mono);font-size:0.7rem;font-weight:700;
  color:#fff;letter-spacing:0.08em;text-transform:uppercase;
}
.hdr-logo p{
  font-family:var(--mono);font-size:0.55rem;
  color:#6a8aaa;letter-spacing:0.05em;margin-top:1px;
}
.hdr-tone{
  display:flex;align-items:center;gap:0;
  margin-left:auto;border-left:1px solid #2e3f54;
}
.tone-btn{
  font-family:var(--mono);font-size:0.55rem;font-weight:700;
  letter-spacing:0.12em;text-transform:uppercase;
  padding:0 14px;height:40px;border:none;cursor:pointer;
  background:transparent;color:#4a6a8a;transition:all .15s;
}
.tone-btn:hover{color:#8aaaca;}
.tone-btn.active{background:var(--accent);color:#fff;}
.tone-btn:first-child{border-right:1px solid #2e3f54;}
.hdr-status{
  padding:0 14px;height:40px;display:flex;align-items:center;
  border-left:1px solid #2e3f54;
  font-family:var(--mono);font-size:0.55rem;color:#4a6a8a;letter-spacing:0.08em;
}
.pulse{
  width:5px;height:5px;border-radius:50%;
  background:var(--accent);margin-right:6px;
  animation:blink 2s ease-in-out infinite;
  display:inline-block;
}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}

/* ── Chat ── */
.chat{
  flex:1;overflow-y:auto;
  padding:24px 60px;
  display:flex;flex-direction:column;gap:18px;
  background:var(--paper);
}
.chat::-webkit-scrollbar{width:3px}
.chat::-webkit-scrollbar-thumb{background:var(--line)}

/* ── Welcome ── */
.welcome{
  margin:auto;text-align:center;max-width:680px;padding:36px 0;
}
.welcome-grid{
  display:grid;grid-template-columns:repeat(4,1fr);
  gap:2px;margin-bottom:24px;
  border:1px solid var(--line);
}
.welcome-stat{
  padding:14px 16px;background:var(--paper);
  border-right:1px solid var(--line);
  border-bottom:none;
}
.welcome-stat:last-child{border-right:none;}
.stat-n{
  font-family:var(--mono);font-size:1.4rem;font-weight:700;
  color:var(--ink);line-height:1;
}
.stat-l{font-size:0.68rem;color:var(--muted);margin-top:3px;letter-spacing:0.04em;}
.welcome h2{
  font-size:1.2rem;font-weight:700;color:var(--ink);
  line-height:1.2;margin-bottom:8px;letter-spacing:-0.02em;
}
.welcome p{font-size:0.8rem;color:var(--muted);line-height:1.6;margin-bottom:16px;}
.chips{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;}
.chip{
  font-family:var(--mono);font-size:0.62rem;letter-spacing:0.04em;
  padding:5px 11px;border:1px solid var(--line);background:var(--paper);
  color:var(--muted);cursor:pointer;border-radius:2px;
  transition:all .15s;
}
.chip:hover{border-color:var(--ink);color:var(--ink);background:var(--paper2);}

/* ── Messages ── */
.msg-user{display:flex;flex-direction:column;align-items:flex-end;gap:4px;}
.msg-bot{display:flex;flex-direction:column;align-items:flex-start;gap:4px;}
.msg-label{
  font-family:var(--mono);font-size:0.55rem;letter-spacing:0.1em;
  text-transform:uppercase;color:var(--muted);padding:0 2px;
}
.bubble-user{
  background:#2d3f54;color:#d8e8f4;
  padding:8px 14px;max-width:60%;
  font-size:0.82rem;line-height:1.5;
  border-radius:10px 10px 0 10px;
  border:1px solid #3a5068;
}
.bot-card{
  width:100%;border:1.5px solid var(--ink);border-radius:2px;
  overflow:hidden;background:var(--paper);
}

/* ── Bot thinking ── */
.thinking{
  padding:12px 18px;display:flex;align-items:center;gap:8px;
  border-bottom:1px solid var(--line);
}
.thinking-text{font-family:var(--mono);font-size:0.62rem;color:var(--muted);letter-spacing:0.08em;}
.dot{width:4px;height:4px;border-radius:50%;background:var(--ink);opacity:0.3;animation:bounce 1.1s infinite;}
.dot:nth-child(2){animation-delay:.15s}
.dot:nth-child(3){animation-delay:.3s}
@keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:.3}40%{transform:translateY(-4px);opacity:1}}

/* ── Report card ── */
.report-hdr{
  display:flex;align-items:stretch;
  border-bottom:1.5px solid var(--ink);
  background:#1e2a3a;
}
.report-hdr-main{
  flex:1;padding:10px 16px;
}
.report-hdr-main h3{
  font-family:var(--mono);font-size:0.58rem;font-weight:700;
  letter-spacing:0.12em;text-transform:uppercase;color:#4a6a8a;margin-bottom:3px;
}
.report-hdr-main .idea-text{
  font-size:0.85rem;font-weight:600;color:#fff;
  letter-spacing:-0.01em;line-height:1.3;
}
.report-score-box{
  padding:10px 18px;border-left:1px solid #2e3f54;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  min-width:80px;
}
.score-big{
  font-family:var(--mono);font-size:1.8rem;font-weight:700;
  line-height:1;color:var(--accent);
}
.score-sub{font-family:var(--mono);font-size:0.55rem;color:#4a6a8a;letter-spacing:0.08em;margin-top:2px;}

/* ── Section rows ── */
.report-body{
  display:grid;
  grid-template-columns:1fr 1fr;
}
.sec{
  padding:14px 18px;
  border-bottom:1px solid var(--line);
  border-right:1px solid var(--line);
  animation:fadeIn .25s ease both;
}
.sec:nth-child(even){border-right:none;}
.sec.full-width{
  grid-column:1 / -1;
  border-right:none;
}
@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}

.sec-head{
  display:flex;align-items:center;gap:0;margin-bottom:8px;
}
.sec-num{
  font-family:var(--mono);font-size:0.52rem;font-weight:700;
  color:#fff;background:#1e2a3a;
  padding:2px 6px;border-radius:2px;margin-right:8px;
  letter-spacing:0.08em;
}
.sec-label{
  font-family:var(--mono);font-size:0.56rem;font-weight:700;
  letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);
}
.sec-body{font-size:0.78rem;line-height:1.6;color:var(--ink);}
.sec-body.italic{font-style:italic;color:#666;}

/* Verdict badge */
.verdict-pill{
  display:inline-flex;align-items:center;gap:5px;
  font-family:var(--mono);font-size:0.62rem;font-weight:700;
  letter-spacing:0.08em;text-transform:uppercase;
  padding:4px 10px;border-radius:2px;
  border:1.5px solid;
}
.verdict-strong{background:rgba(22,163,74,0.1);color:var(--green);border-color:var(--green);}
.verdict-improve{background:rgba(217,119,6,0.1);color:var(--amber);border-color:var(--amber);}
.verdict-weak{background:rgba(229,62,62,0.1);color:var(--red);border-color:var(--red);}
.verdict-text{font-size:0.75rem;color:var(--muted);margin-top:8px;line-height:1.55;}

/* Competitors */
.comp-list{display:flex;flex-direction:column;gap:4px;}
.comp-row{
  display:flex;align-items:baseline;gap:10px;
  padding:7px 10px;
  background:var(--paper2);border:1px solid var(--line);border-radius:2px;
}
.comp-name{
  font-family:var(--mono);font-size:0.65rem;font-weight:700;
  color:var(--ink);white-space:nowrap;min-width:72px;
}
.comp-desc{font-size:0.74rem;color:var(--muted);line-height:1.45;}

/* Market size */
.market-row{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
.market-seg{display:flex;align-items:center;gap:4px;}
.mbox{
  width:22px;height:22px;border-radius:2px;
  border:1.5px solid var(--line);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--mono);font-size:0.52rem;font-weight:700;
  letter-spacing:0.06em;color:var(--muted);
  transition:all .2s;
}
.mbox.active{background:var(--ink);border-color:var(--ink);color:var(--paper);}
.market-tag{
  font-family:var(--mono);font-size:0.62rem;font-weight:700;
  letter-spacing:0.08em;text-transform:uppercase;
  padding:3px 8px;border-radius:2px;
  background:var(--ink);color:var(--accent);
}

/* Score bar */
.score-track{
  height:2px;background:var(--line);border-radius:0;margin:7px 0 8px;
  overflow:hidden;
}
.score-fill{
  height:100%;background:var(--accent);
  transition:width 1.2s cubic-bezier(.4,0,.2,1);border-radius:0;
}
.score-reasons{display:flex;flex-direction:column;gap:4px;}
.score-reason{
  display:flex;align-items:flex-start;gap:6px;
  font-size:0.72rem;color:var(--muted);line-height:1.45;
}
.sr-dot{
  width:3px;height:3px;border-radius:50%;
  background:var(--accent);flex-shrink:0;margin-top:6px;
}

/* Revenue / risk lists */
.item-list{display:flex;flex-direction:column;gap:3px;}
.item{
  display:flex;align-items:flex-start;gap:8px;
  padding:6px 10px;background:var(--paper2);
  border-left:2px solid var(--line);
  font-size:0.76rem;color:var(--ink);line-height:1.45;
}
.item-n{
  font-family:var(--mono);font-size:0.55rem;font-weight:700;
  color:var(--muted);padding-top:1px;min-width:14px;
}
.risk-item{border-left-color:var(--amber);}

/* ── Progress bar (during load) ── */
.progress-bar{
  height:2px;background:var(--line);overflow:hidden;
  border-bottom:1px solid var(--line);
}
.progress-fill{
  height:100%;background:var(--accent);
  animation:progress 2s ease-in-out infinite;
  transform-origin:left;
}
@keyframes progress{
  0%{width:0%;margin-left:0}
  50%{width:60%;margin-left:20%}
  100%{width:0%;margin-left:100%}
}

/* ── Input ── */
.input-row{
  border-top:1.5px solid var(--ink);background:#1e2a3a;
  padding:10px 60px;display:flex;gap:8px;align-items:flex-end;
  flex-shrink:0;
}
.input-wrap{
  flex:1;background:#2d3f54;border:1px solid #3a5068;
  border-radius:2px;transition:border-color .15s;
}
.input-wrap:focus-within{border-color:#6a9abf;}
textarea.chat-in{
  width:100%;background:transparent;border:none;outline:none;
  padding:8px 12px;font-family:var(--font);font-size:0.8rem;
  color:#d8e8f4;resize:none;max-height:90px;line-height:1.5;
  display:block;
}
textarea.chat-in::placeholder{color:#3a5570;}
.send-btn{
  width:36px;height:36px;flex-shrink:0;
  background:var(--accent);border:none;cursor:pointer;border-radius:2px;
  display:flex;align-items:center;justify-content:center;
  transition:opacity .15s,transform .1s;
}
.send-btn:hover:not(:disabled){opacity:0.85;transform:scale(1.04);}
.send-btn:disabled{opacity:0.3;cursor:not-allowed;}
.send-icon{width:13px;height:13px;fill:#fff;}

/* ── Verdict section special ── */
.verdict-sec{
  padding:14px 18px;
  background:var(--paper2);
  border-top:1.5px solid #1e2a3a;
}
`;

const EXAMPLES = [
  "AI tutor for rural students",
  "P2P solar energy trading",
  "Mental wellness for remote workers",
  "Hyperlocal grocery via drones",
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function MarketDisplay({ size }) {
  const sizes = ["S", "M", "L"];
  const idx = size === "Large" ? 2 : size === "Medium" ? 1 : 0;
  return (
    <div className="market-row">
      {sizes.map((s, i) => (
        <div className="market-seg" key={s}>
          <div className={`mbox ${i <= idx ? "active" : ""}`}>{s}</div>
        </div>
      ))}
      <span className="market-tag">{size}</span>
    </div>
  );
}

function AnimatedScore({ score }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = () => {
      start += 0.4;
      if (start >= score) { setDisplay(score); return; }
      setDisplay(Math.floor(start));
      requestAnimationFrame(step);
    };
    const t = setTimeout(() => requestAnimationFrame(step), 300);
    return () => clearTimeout(t);
  }, [score]);
  return <span className="score-big">{display}</span>;
}

function ReportCard({ idea, r, tone }) {
  const verdictClass =
    r.verdict === "Strong Idea" ? "verdict-strong"
    : r.verdict === "Needs Improvement" ? "verdict-improve"
    : "verdict-weak";

  const verdictIcon = r.verdict === "Strong Idea" ? "▲" : r.verdict === "Needs Improvement" ? "◆" : "▼";

  const now = new Date();
  const ts = `${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;

  return (
    <div className="bot-card">
      <div className="report-hdr">
        <div className="report-hdr-main">
          <h3>Validation Report · {ts}</h3>
          <div className="idea-text">"{idea}"</div>
        </div>
        <div className="report-score-box">
          <AnimatedScore score={r.score} />
          <div className="score-sub">/ 10 SCORE</div>
        </div>
      </div>

      {tone === "friendly" && (
        <div className="sec full-width" style={{ animationDelay: "0s", background: "rgba(249,115,22,0.05)", borderBottom: "1px solid rgba(249,115,22,0.2)" }}>
          <p className="sec-body italic">Hey! I've crunched your idea 🎉 Here's what I found — honest, structured, actionable.</p>
        </div>
      )}

      <div className="report-body">

        <div className="sec" style={{ animationDelay: ".05s" }}>
          <div className="sec-head">
            <span className="sec-num">01</span>
            <span className="sec-label">Idea Summary</span>
          </div>
          <p className="sec-body">{r.summary}</p>
        </div>

        <div className="sec" style={{ animationDelay: ".1s" }}>
          <div className="sec-head">
            <span className="sec-num">02</span>
            <span className="sec-label">Problem Validation</span>
          </div>
          <p className="sec-body">{r.problem}</p>
        </div>

        <div className="sec" style={{ animationDelay: ".15s" }}>
          <div className="sec-head">
            <span className="sec-num">03</span>
            <span className="sec-label">Target Market</span>
          </div>
          <MarketDisplay size={r.market} />
          <p className="sec-body" style={{ color: "#666", fontSize: "0.82rem" }}>{r.audience}</p>
        </div>

        <div className="sec" style={{ animationDelay: ".2s" }}>
          <div className="sec-head">
            <span className="sec-num">04</span>
            <span className="sec-label">Competition Analysis</span>
          </div>
          <div className="comp-list">
            {r.competitors.map((c) => (
              <div className="comp-row" key={c.name}>
                <span className="comp-name">{c.name}</span>
                <span className="comp-desc">{c.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sec full-width" style={{ animationDelay: ".25s" }}>
          <div className="sec-head">
            <span className="sec-num">05</span>
            <span className="sec-label">Unique Value Proposition</span>
          </div>
          <p className="sec-body">{r.uvp}</p>
        </div>

        <div className="sec" style={{ animationDelay: ".3s" }}>
          <div className="sec-head">
            <span className="sec-num">06</span>
            <span className="sec-label">Monetization Strategy</span>
          </div>
          <div className="item-list">
            {r.revenues.map((rev, i) => (
              <div className="item" key={i}>
                <span className="item-n">0{i+1}</span>
                {rev}
              </div>
            ))}
          </div>
        </div>

        <div className="sec" style={{ animationDelay: ".35s" }}>
          <div className="sec-head">
            <span className="sec-num">07</span>
            <span className="sec-label">Feasibility Score</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "1.2rem", fontWeight: 700, color: "var(--ink)" }}>{r.score}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.58rem", color: "var(--muted)" }}>/ 10</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em",
              padding: "3px 8px", borderRadius: 2,
              background: r.score >= 8 ? "rgba(22,163,74,0.12)" : r.score >= 6 ? "rgba(217,119,6,0.12)" : "rgba(229,62,62,0.12)",
              color: r.score >= 8 ? "var(--green)" : r.score >= 6 ? "var(--amber)" : "var(--red)",
              border: `1px solid ${r.score >= 8 ? "var(--green)" : r.score >= 6 ? "var(--amber)" : "var(--red)"}`,
              marginLeft: 4
            }}>
              {r.score >= 8 ? "HIGH" : r.score >= 6 ? "MEDIUM" : "LOW"}
            </span>
          </div>
          <div className="score-track">
            <div className="score-fill" style={{ width: `${r.score * 10}%` }} />
          </div>
          <div className="score-reasons">
            {r.feasibilityReasons.map((reason, i) => (
              <div className="score-reason" key={i}>
                <div className="sr-dot" />
                {reason}
              </div>
            ))}
          </div>
        </div>

        <div className="sec" style={{ animationDelay: ".4s" }}>
          <div className="sec-head">
            <span className="sec-num">08</span>
            <span className="sec-label">Risks & Challenges</span>
          </div>
          <div className="item-list">
            {r.risks.map((risk, i) => (
              <div className="item risk-item" key={i}>
                <span className="item-n" style={{ color: "var(--amber)" }}>0{i+1}</span>
                {risk}
              </div>
            ))}
          </div>
        </div>

      </div>{/* end report-body grid */}

      <div className="verdict-sec" style={{ animationDelay: ".45s" }}>
        <div className="sec-head" style={{ marginBottom: 12 }}>
          <span className="sec-num">09</span>
          <span className="sec-label">Final Verdict</span>
        </div>
        <span className={`verdict-pill ${verdictClass}`}>
          <span>{verdictIcon}</span>
          {r.verdict}
        </span>
        <p className="verdict-text">
          {r.score >= 8
            ? "Solid market potential with clear problem-solution fit. Recommended for prototype testing and early investor conversations."
            : r.score >= 6
            ? "Core concept shows promise but needs refinement in positioning or differentiation to stand out."
            : "Significant headwinds ahead. Consider pivoting the value proposition or targeting a more defined niche before investing further."}
        </p>
      </div>
    </div>
  );
}

function ThinkingCard() {
  return (
    <div className="bot-card">
      <div className="progress-bar"><div className="progress-fill" /></div>
      <div className="thinking">
        <div className="dot" /><div className="dot" /><div className="dot" />
        <span className="thinking-text">ANALYSING IDEA</span>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("serious");
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  const send = (text) => {
    const idea = (text || input).trim();
    if (!idea || loading) return;
    setInput("");
    setMessages((p) => [...p, { type: "user", text: idea, id: Date.now() }]);
    setLoading(true);
    setTimeout(() => {
      const report = generateReport(idea);
      setMessages((p) => [...p, { type: "bot", idea, report, id: Date.now() + 1 }]);
      setLoading(false);
    }, rand(1600, 2600));
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="shell">
        <header className="hdr">
          <div className="hdr-logo">
            <div className="mark">🚀</div>
            <div>
              <h1>Startup Validator</h1>
              <p>Idea Analysis Engine v2</p>
            </div>
          </div>
          <div className="hdr-tone">
            {["serious","friendly"].map(t => (
              <button key={t} className={`tone-btn ${tone === t ? "active" : ""}`} onClick={() => setTone(t)}>
                {t}
              </button>
            ))}
          </div>
          <div className="hdr-status">
            <span className="pulse" />READY
          </div>
        </header>

        <div className="chat" ref={chatRef}>
          {messages.length === 0 && !loading && (
            <div className="welcome">
              <div className="welcome-grid">
                {[["9","Sections"],["10","Max Score"],["100%","Free"],["∞","Ideas"]].map(([n,l]) => (
                  <div className="welcome-stat" key={l}>
                    <div className="stat-n">{n}</div>
                    <div className="stat-l">{l}</div>
                  </div>
                ))}
              </div>
              <h2>Validate your startup idea — instantly.</h2>
              <p>Enter any concept and receive a structured analysis: problem fit, market sizing, competitors, monetization, and a feasibility verdict.</p>
              <div className="chips">
                {EXAMPLES.map(ex => (
                  <button key={ex} className="chip" onClick={() => send(ex)}>{ex}</button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) =>
            msg.type === "user" ? (
              <div className="msg-user" key={msg.id}>
                <div className="msg-label">You</div>
                <div className="bubble-user">{msg.text}</div>
              </div>
            ) : (
              <div className="msg-bot" key={msg.id}>
                <div className="msg-label">Validator</div>
                <ReportCard idea={msg.idea} r={msg.report} tone={tone} />
              </div>
            )
          )}

          {loading && (
            <div className="msg-bot">
              <div className="msg-label">Validator</div>
              <ThinkingCard />
            </div>
          )}
        </div>

        <div className="input-row">
          <div className="input-wrap">
            <textarea
              className="chat-in"
              placeholder="Describe your startup idea…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              rows={1}
              disabled={loading}
            />
          </div>
          <button className="send-btn" onClick={() => send()} disabled={!input.trim() || loading}>
            <svg className="send-icon" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}