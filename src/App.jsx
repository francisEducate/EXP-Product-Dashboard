import { useState } from "react";
import "./index.css";

/* ─── Design tokens ─── */
const C = {
  bg: "#f4f3ef", card: "#fff", dark: "#141414", mid: "#374151",
  muted: "#6b7280", light: "#9ca3af", line: "#e5e7eb", faint: "#f9fafb",
  g: "#16a34a", gBg: "#dcfce7", gBd: "#86efac",
  a: "#d97706", aBg: "#fef3c7", aBd: "#fcd34d",
  r: "#dc2626", rBg: "#fee2e2", rBd: "#fca5a5",
  b: "#2563eb", bBg: "#eff6ff", bBd: "#93c5fd",
  p: "#7c3aed", pBg: "#f5f3ff", pBd: "#c4b5fd",
  t: "#0d9488", tBg: "#f0fdfa",
};
const RAG = {
  green: { c: C.g, bg: C.gBg, bd: C.gBd, l: "On Track" },
  amber: { c: C.a, bg: C.aBg, bd: C.aBd, l: "Watch" },
  red: { c: C.r, bg: C.rBg, bd: C.rBd, l: "At Risk" },
  pending: { c: C.light, bg: C.faint, bd: C.line, l: "Pending" },
};

/* ─── Shared UI ─── */
function Badge({ s, small }) {
  const r = RAG[s] || RAG.amber;
  return <span style={{ fontSize: small ? "var(--fs-xs)" : "var(--fs-sm)", fontWeight: 700, padding: small ? "1px 6px" : "2px 10px", borderRadius: 99, color: r.c, background: r.bg, border: `1px solid ${r.bd}`, whiteSpace: "nowrap" }}>{r.l}</span>;
}
function Bar({ pct, s }) {
  const r = RAG[s] || RAG.amber;
  return <div style={{ height: "var(--sp-xs)", background: "#e5e7eb", borderRadius: 99, width: "100%", marginTop: "var(--sp-sm)" }}><div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: r.c, borderRadius: 99, transition: "width 0.5s" }} /></div>;
}
function Tag({ children, color = C.muted, bg = C.faint }) {
  return <span style={{ fontSize: "var(--fs-xs)", fontWeight: 700, padding: "2px 7px", borderRadius: "var(--rad-sm)", color, background: bg, letterSpacing: 0.3 }}>{children}</span>;
}
function MetricCard({ m }) {
  return (
    <div style={{ background: C.faint, borderRadius: "var(--rad-md)", padding: "var(--sp-lg)", border: `1px solid ${C.line}` }} className="metric-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "var(--sp-md)", gap: "var(--sp-sm)", flexWrap: "wrap" }} className="metric-header">
        <span style={{ fontSize: "var(--fs-sm)", fontWeight: 700, color: C.mid }} className="metric-label">{m.label}</span>
        <Badge s={m.status} small />
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "var(--sp-sm)", marginBottom: "var(--sp-md)", flexWrap: "wrap" }} className="metric-value">
        <span style={{ fontSize: "var(--fs-xl)", fontWeight: 800, color: C.dark }} className="metric-value-main">{m.value}</span>
        <span style={{ fontSize: "var(--fs-xs)", color: C.light }} className="metric-value-target">target: {m.target}</span>
      </div>
      {m.pct > 0 && <Bar pct={m.pct} s={m.status} />}
      <div style={{ fontSize: "var(--fs-xs)", color: C.muted, marginTop: "var(--sp-md)", lineHeight: 1.5 }} className="metric-note">{m.note}</div>
      {m.source && <div style={{ fontSize: "var(--fs-xs)", color: C.b, marginTop: "var(--sp-sm)", fontWeight: 600 }} className="metric-source">Source: {m.source}</div>}
    </div>
  );
}
function DiagBox({ title, text, color = "#854d0e", bg = "#fefce8", bd = "#fef08a" }) {
  return (
    <div style={{ background: bg, border: `1px solid ${bd}`, borderRadius: "var(--rad-lg)", padding: "var(--sp-lg)", marginBottom: "var(--sp-lg)" }} className="info-box">
      <div style={{ fontSize: "var(--fs-xs)", fontWeight: 800, color, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: "var(--sp-md)" }} className="info-box-title">{title}</div>
      <div style={{ fontSize: "var(--fs-sm)", color, lineHeight: 1.6 }} className="info-box-text">{text}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   DIMENSION DATA
   ════════════════════════════════════════════════════════════════ */
const DIMS = [
  {
    id: "df", title: "Delivery Fidelity", icon: "▣",
    q: "Is the product being delivered consistently as designed?",
    status: "green", note: "Strong structural fidelity across all activity types",
    top: { label: "LECs Delivered", value: "5/5", target: "5 of 21 (T1)", status: "green" },
    metrics: [
      { label: "LEC Sessions (cumulative)", value: "5 / 5", target: "5 by end-T1 · 13 by end-T2 · 21 by end-T3", pct: 100, status: "green", note: "All 5 T1 LECs delivered across 825 schools. LEC 1: 36,702 scholars → LEC 5: 35,944. LEC 4 consistently lowest (96.1% of target) — mid-term dip, likely exam pressure. All sessions GREEN (≥95%).", source: "BQ Mentor Reports" },
      { label: "Session Duration Fidelity", value: "89%", target: "≥85% at 80 min", pct: 100, status: "green", note: "89.3% of 3,672 Skills Lab sessions ran at exactly 80 minutes. Only 8.8% outside the 75-85 min window, mostly deviations to 60 min (time pressure, not disengagement). Strong structural signal.", source: "BQ session_duration field" },
      { label: "Session Delivery Quality", value: "No T1 data", target: "≥80% rated good/excellent", pct: 0, status: "pending", note: "No mentor quality observation scores collected in T1 BQ data. This is a gap — session delivery quality is the primary pedagogical fidelity indicator. LEC observations planned for T2. FOA observation forms recommended.", source: "Planned: LEC Observation Rubric" },
      { label: "Group Mentoring Sessions", value: "1 / 1", target: "1 per term · 4 per year", pct: 100, status: "green", note: "821 schools reporting (98.9% coverage). 36,067 scholars reached, avg 44/session. GM reach mirrors LEC 2 in lockstep — strong coordination.", source: "BQ Mentor Reports" },
      { label: "Passbook Completion", value: "99.4%", target: "≥95% completion", pct: 100, status: "green", note: "Near-total completion. Milestone 1 assessed in 806 schools (35,549 scholars). Milestone 2 assessed in only 12 schools (527 scholars) — very early. Quality metrics tracked separately under Experiments tab.", source: "BQ pb_total_scholars" },
      { label: "Community Day Attendance", value: "88.7%", target: "≥95%", pct: 93, status: "amber", note: "Below target. 1,638 CD activities reported. Qualitative signals strong — scholars describe CD as 'our day,' take initiative unprompted. But attendance gap needs investigation: school-driven or scholar-driven?", source: "BQ CD reports" },
      { label: "Skills Day Delivery", value: "89.3%", target: "≥90% at correct length", pct: 99, status: "green", note: "89.3% of sessions delivered at correct duration. Aligned with the LEC duration fidelity signal. Skills Day is Term 2/3 focused — T1 data is early.", source: "BQ session data" },
      { label: "BQ Reporting Completeness", value: "97.6%", target: "≥95%", pct: 100, status: "green", note: "825 schools reporting. Dual-channel: field_hub (57%) and texit_2026 (43%). No quality difference between channels. Strong operational discipline.", source: "BQ system" },
    ],
    diag: "Structural fidelity is strong across every activity type. Sessions run on time, at prescribed length, with near-complete reporting and passbook completion. The one amber signal is CD attendance at 88.7% — worth investigating but qualitative signals suggest high quality when scholars do attend. The critical gap is pedagogical fidelity: we have zero LEC observation data from T1. We know sessions HAPPEN but we don't know if they're being FACILITATED well. This must be addressed in T2 through the planned observation rubric.",
    insight: "The absence of LEC observation data is the single biggest measurement gap in Delivery Fidelity. Without it, we're measuring the container (sessions delivered) but not the content (how they're facilitated). Prioritize FOA observation forms for T2.",
    assumptions: ["P2", "E2"],
  },
  {
    id: "mve", title: "Mentor Value Exchange", icon: "⬡",
    q: "Are mentors delivering value to scholars while getting value from the fellowship?",
    status: "amber", note: "Delivery strong but fellowship value and coaching quality uncertain",
    top: { label: "Mentor Retention (T1)", value: "TBD", target: "≥80% T1 · ≥75% full year", status: "amber" },
    metrics: [
      { label: "Mentor Retention Rate", value: "T1 data pending", target: "≥80% complete T1 · ≥75% full year", pct: 0, status: "pending", note: "L&M Map P1 metric. Track by term. Critical question: what is minimum fellowship offer to retain mentors? Compare scholar alumni vs. short course mentors.", source: "L&M Map: Learning Q3 — Attrition reports" },
      { label: "Fellowship Value Score", value: "TBD", target: "≥75% mid · ≥80% end", pct: 0, status: "pending", note: "% of mentors rating fellowship as valuable for professional growth. Baseline TBC. This is the 'getting value' headline. If mentors don't see the fellowship as career-building, retention will erode.", source: "L&M Map: Learning Q3 — Pre-post survey" },
      { label: "Mentor Milestone Achievement", value: "TBD", target: "≥80% mid · ≥85% end", pct: 0, status: "pending", note: "Mentors have their own 6 milestones (mirror scholar milestones). 6hrs advanced content + milestone deliverables. Do mentor milestones strengthen the fellowship experience?", source: "L&M Map: Learning Q3 — Mentor assessments" },
      { label: "Professional Growth Perception", value: "TBD", target: "≥75% mid · ≥80% end", pct: 0, status: "pending", note: "% mentors reporting career growth from fellowship. Key for the 'getting value' side. If <70%, need to add professional development sessions.", source: "L&M Map: Impl Q3 — Exit surveys" },
      { label: "Mentor Persona Match", value: "TBD", target: "≥75% mid · ≥80% end", pct: 0, status: "pending", note: "% new mentors matching target persona (scholar alumni + career-focused). Are we attracting the right profile? If <70%, refine recruitment messaging.", source: "L&M Map: Impl Q3 — Recruitment reports" },
      { label: "Patron Quality Mentor Rating", value: "8.6/10", target: "≥9/10", pct: 86, status: "amber", note: "Admin/patron rating of mentor quality from T1 patron feedback survey. 221 schools responded. Adjumani CU rated lower. This is the external view of 'delivering value.'", source: "L&M Map: Termly Patron Feedback Survey" },
      { label: "Recruitment Fill Rate", value: "TBD", target: "≥95% mid · 100% end", pct: 0, status: "pending", note: "% open positions filled within recruitment window. Is value prop strong enough? If <90%, increase stipend or benefits.", source: "L&M Map: Impl Q3 — Recruitment data" },
    ],
    diag: "This is the dimension with the most pending data — which is itself a finding. We have strong indirect evidence that mentors are delivering (97% scholar retention, 99.4% passbook completion, patron rating of 8.6/10), but almost no direct data on whether mentors are getting value from the fellowship. Retention rate, fellowship value score, and professional growth perception are all TBD. The L&M Map correctly identifies these as priority metrics. Until we have this data, we're assuming the mentor value exchange is working based on output proxies rather than direct evidence. The BML data showing some mentors in 'checklist mode' suggests the exchange may be breaking for a subset — they're delivering mechanically, not growing from the work.",
    insight: "The mentor value exchange is the least-measured dimension despite being one of the most important. The 62.6% new-mentor composition makes this urgent — if new mentors don't experience the fellowship as valuable, next year's recruitment gets harder.",
    assumptions: ["M1", "M3"],
  },
  {
    id: "ce", title: "Cost Efficiency", icon: "◇",
    q: "Is the delivery model financially sustainable?",
    status: "amber", note: "CPY above target; transport cost structure under review",
    top: { label: "Cost Per Youth", value: "$30.6", target: "$27", status: "amber" },
    metrics: [
      { label: "Cost Per Youth (CPY)", value: "$30.6", target: "$27 budgeted", pct: 88, status: "amber", note: "Above target. Includes field salaries, materials, transport, and operational overhead. The gap is primarily structural (field team cost) rather than per-school variable cost.", source: "Finance / BVA reports" },
      { label: "Transport Budget Variance", value: "TBD", target: "±10% of budget", pct: 0, status: "pending", note: "Transport actual vs. budget variance. If >15%, revise cost mapping. The common cost model may not reflect true regional cost differences.", source: "L&M Map: Impl Q4 — BVA reports" },
      { label: "Transport Complaint Rate", value: "TBD", target: "<15 per 100 mentors", pct: 0, status: "pending", note: "Number of transport complaints per 100 mentors per term. If >20 complaints, common cost needs upward adjustment. Directly connects cost to mentor satisfaction.", source: "L&M Map: Impl Q4 — Complaint tracker" },
      { label: "Transport-Driven Attrition", value: "TBD", target: "<5%", pct: 0, status: "pending", note: "% attrition attributable to transport inadequacy. If >7%, need to increase common cost or subsidize. This is where cost connects directly to product health.", source: "L&M Map: Impl Q4 — Exit interviews" },
    ],
    diag: "CPY at $30.6 vs. $27 budget is a structural overshoot. The transport cost model is the most likely lever — if the common cost doesn't reflect true regional variation, mentors absorb the gap, which drives complaints and eventually attrition. This dimension is lean by design: the product team's role is to flag when cost creates product friction, not to manage the budget.",
    insight: "Watch transport-driven attrition as the leading indicator. If mentors are leaving because of transport costs, that's a product health issue masquerading as a finance issue.",
    assumptions: [],
  },
  {
    id: "tc", title: "Team & Culture Health", icon: "◈",
    q: "Is the team culture positive, empowering, and high-performing?",
    status: "amber", note: "Mentor culture strong; FOA/PO data is a gap; structural reform in transition",
    top: { label: "Mentor Culture Score", value: "93%", target: "95% meeting+", status: "amber" },
    metrics: [
      { label: "Mentor Culture Assessment", value: "93% meeting+", target: "95% meeting or exceeding", pct: 93, status: "amber", note: "Of 324 mentors assessed: 284 exceeding (87.7%), 30 meeting (9.3%), 3 below expectations (0.9%). Strong — but only covers mentors. No equivalent for FOAs or POs.", source: "Midterm Mentor Culture Assessment T1" },
      { label: "Brand Hallmark Index (Mentors)", value: "67.3%", target: "77.3% (baseline +10%)", pct: 67, status: "amber", note: "67.3% scored 'Correct Only' across all sections. 26% showed 'Mixed' understanding. Priority gaps: fellowship understanding, facilitation mindset, passion for scholars. These informed Pre-T2 induction design. Endline at end-T3.", source: "EXP 2026 Mentor Baseline Analysis" },
      { label: "FOA / PO Assessment", value: "No data", target: "Assessment deployed", pct: 0, status: "red", note: "No assessment exists for FOAs or POs. This is a critical gap — you are restructuring roles for people with no baseline performance data. POs could assess FOAs; PMs could assess officers. Needs urgent action.", source: "Gap identified in mid-year review" },
      { label: "Role Clarity Index", value: "No data", target: "≥85% clear on role (post-restructure)", pct: 0, status: "pending", note: "Survey planned post-structural transition. PO/PQO matrix removal aims to resolve 'persistent role confusion and decision ambiguity.' Pre-restructure qualitative: significant confusion reported.", source: "L&M Map: Impl Q1 — FGDs with mentors" },
      { label: "Team Cohesion Score", value: "No data", target: "≥75% mid · ≥80% end", pct: 0, status: "pending", note: "Quarterly culture survey for frontline teams. New structure (matrix removal) aims to improve this. If <70%, need to address microcultures or role conflicts.", source: "L&M Map: Impl Q2 — Culture audit" },
      { label: "Admin/Patron Satisfaction", value: "8.6/10", target: "≥9/10", pct: 86, status: "amber", note: "From patron feedback survey, 221 schools responding. Overall strong, but Adjumani CU notably lower. School satisfaction feeds team health because schools that don't value the program create friction for mentors.", source: "Termly Patron Feedback Survey" },
    ],
    regional: [
      { region: "East", mentorCulture: "93%+", hallmark: "TBD", patronSat: "TBD", note: "Lowest acquisition conversion (43%)" },
      { region: "South", mentorCulture: "93%+", hallmark: "TBD", patronSat: "TBD", note: "97% LEC retention" },
      { region: "North", mentorCulture: "93%+", hallmark: "TBD", patronSat: "TBD", note: "Lowest acquisition conversion alongside East" },
      { region: "West", mentorCulture: "93%+", hallmark: "TBD", patronSat: "TBD", note: "Existing mentors show higher passbook completion" },
      { region: "Central", mentorCulture: "93%+", hallmark: "TBD", patronSat: "TBD", note: "92% conversion — trust-based recruitment" },
    ],
    diag: "Mentor culture looks strong on paper (93% meeting+), but three things temper confidence. First, the brand hallmark baseline shows 26% with 'mixed' understanding of the fellowship, facilitation mindset, and passion for scholars — this is the quality-beneath-the-surface issue. Second, there is zero data on FOA and PO performance or culture, which is a critical blind spot during a major structural reform. Third, the patron satisfaction score of 8.6/10 from only 221 of 825 schools is a partial picture. Regional disaggregation is essential — Adjumani CU is flagged as lower, and the regions with lowest acquisition (East, North) may also have cultural challenges.",
    insight: "The FOA/PO assessment gap is the most urgent action item in this dimension. Get a baseline deployed before T2 ends or you'll have restructured roles with no way to measure whether the restructure worked.",
    assumptions: ["M3", "M4"],
  },
  {
    id: "pmf", title: "Product-Market Fit", icon: "◎",
    q: "Do scholars love it, do schools want it, and does transformation happen?",
    status: "amber", note: "Strong retention and school coverage; transformation evidence mixed; NPS pending",
    top: { label: "Scholar Retention", value: "97%", target: "≥95%", status: "green" },
    metrics: [
      { label: "Scholar NPS", value: "Pending", target: ">50 NPS", pct: 0, status: "pending", note: "Scholar Centricity Survey planned for next week. This is the single most important direct measure of scholar demand. Proportion scoring 9-10 minus proportion scoring <7.", source: "L&M Map: Termly Scholar Centricity Survey" },
      { label: "Scholar LX Usability", value: "Pending", target: ">80% report LX helps take action", pct: 0, status: "pending", note: "% of scholars reporting the LX helps them take action in their lives. Direct measure of perceived value beyond attendance.", source: "L&M Map: Termly Scholar Centricity Survey" },
      { label: "LEC Retention (LEC2→5)", value: "97%", target: "≥95%", pct: 100, status: "green", note: "Only 317 scholars lost across 4 sessions. By region: East 98%, South 97%, North 99%, West 97%, Central 99%. All GREEN. Remarkable given 62.6% new mentors.", source: "BQ LEC attendance data" },
      { label: "Acquisition Conversion", value: "79%", target: "100%", pct: 79, status: "red", note: "36,664 enrolled of 46,200 target. Awareness at 103% (67,809/66,000) but enrollment conversion at 52% vs. 70% target. East and North lowest (43%). Central at 92% — correlates with existing-to-school mentors.", source: "BQ recruitment data" },
      { label: "School Coverage & Willingness", value: "825/825", target: "100%", pct: 100, status: "green", note: "All target schools active. 98.9% GM coverage. But coverage ≠ willingness. Patron satisfaction at 8.6/10 suggests schools value the program. No data yet on timetable accommodation difficulty.", source: "School list + patron survey" },
      { label: "Admin Satisfaction NPS", value: "8.6/10", target: "≥9/10", pct: 86, status: "amber", note: "Based on 221 school responses (patron feedback end-T1). Adjumani CU lower. Need full coverage + disaggregation to understand regional patterns.", source: "L&M Map: Patron Feedback Survey" },
    ],
    transformation: [
      { label: "Skills Development (Proven)", value: "Strong", status: "green", note: "PSM: public speaking +1.4 SD, leadership +1.7 SD, skills +0.7 SD. 4yr RCT: personality effects 0.08-0.13 SD persistent. Multiple replications. The behavioral skills pathway is proven and consistent." },
      { label: "Business Start-up Rate", value: "36% (SEED)", status: "amber", note: "SEED: 36% baseline. RCT: +63% business ownership (p<0.001). 2026 target: 46% (+10pp from growth mindset experiment). BHB now tied to gold scholar certificate. EXP cohort: TBD — scholars still in school." },
      { label: "Income & Employment", value: "Mixed", status: "amber", note: "PSM: UGX 31,338 vs 13,510 business income (treatment vs control). Women +244%. But 4yr RCT: NO labor market effects yet — 35% still in tertiary. Timing issue or real limitation?" },
      { label: "Savings Behavior", value: "Significant", status: "green", note: "RCT: significant savings effect (p<0.01). Behavioral mechanism likely peer-driven. May not sustain without reinforcement." },
      { label: "Agency & Soft Skills", value: "Declining ~0.5 SD", status: "red", note: "Three consecutive cycles: soft skills decline ~0.5 SD while earn-save-act holds. THIS IS THE CORE PRODUCT PROBLEM. Earlier versions DID produce persistent personality effects. The current product lost the mechanism." },
      { label: "Educational Outcomes", value: "Positive for women", status: "amber", note: "4yr RCT: +6.6pp educational completion for women. Gender-disaggregated effects consistently stronger for females (+130% business ownership vs +63% all)." },
    ],
    diag: "Product-market fit shows a split personality. On the demand side: scholars stay (97% retention), schools participate (100% coverage), and early satisfaction signals are positive (8.6/10 patron rating). On the transformation side: behavioral outcomes (earn-save-act, business start-up) are strong and well-replicated. But the agency/soft skills decline (~0.5 SD across 3 cycles) is the single biggest threat to product-market fit at the impact level. If the product produces action but not the beliefs that sustain action, transformation is incomplete. The growth mindset experiment is the direct bet that this can be repaired.",
    insight: "The Scholar Centricity Survey arriving next week is pivotal. It will either confirm that high retention = high satisfaction, or reveal that scholars stay for reasons other than loving the product (social, convenience, no alternatives). That distinction matters enormously for PMF.",
    assumptions: ["P1", "P4", "PR1", "P5"],
  },
];

/* ════════ 2026 STRATEGY KRs ════════ */
const STRAT = [
  { obj: "Product Obj 1: Scalable LX that deepens grit & soft-skills while sustaining earn-save-act", krs: [
    { id: "KR1.1", label: "36,000 scholars recruited and activated", status: "green", current: "36,569 recruited, 36,321 activated", mid: "36,000 recruited by T1", end: "36,000 full year", note: "On track. Exceeded T1 target. Activation at 98%.", source: "BQ / Mentor Monitoring Book" },
    { id: "KR1.2", label: "Milestone Quality Rate >70% on all key milestones", status: "green", current: "M1: 88% quality rate (55% Star, 33% Bulb). M2: 93% (small N, 12 schools)", mid: "≥80% for T1 milestones (M1, M2)", end: ">70% on all 6 milestones", note: "T1 on track. T2 milestones (individual) expected harder. Design BML to capture WHY quality may drop.", source: "BQ Passbook data" },
    { id: "KR1.3", label: "Scholar NPS and LX Usability >80%", status: "pending", current: "Pending — Scholar Centricity Survey next week", mid: "Baseline established", end: "NPS >50; >80% usability", note: "No data yet. Entirely dependent on centricity survey.", source: "Scholar Centricity Survey" },
    { id: "KR1.4", label: "Passbook Feedback Rate >80%", status: "green", current: "~98% based on completion proxy", mid: "90% receiving feedback", end: ">80% reporting receiving feedback", note: "High completion but BML shows some is performative. Need BML to verify quality. T2: use activation as denominator.", source: "BQ + BML" },
  ]},
  { obj: "Product Obj 2: Validate agency pathways — EXP as R&D engine", krs: [
    { id: "KR2.1", label: "Complete growth mindset experiment with validated agency indicators", status: "amber", current: "Pilot complete. Full RCT in field (810 tx, 810 ctrl).", mid: "RCT launched + instrument validated", end: "Treatment effect demonstrated", note: "On track for timeline. Instrument risk mitigated (vocabulary fixed, behavioral proxy added). Pivotal data arrives T2.", source: "Experiment tracking" },
    { id: "KR2.2", label: "≥3 validated assumptions in updated org-wide ToC", status: "amber", current: "P2 validated. P4 strongly evidenced. PR1 confirmed.", mid: "2 validated", end: "3+ validated", note: "P2 (skills pathway) clearly validated. P4 (agency gap) strongly evidenced across 3 cycles. PR1 confirmed (97% retention with redesigned LX). Need P3 or M1 for the third.", source: "ToC validation tracking" },
  ]},
  { obj: "Delivery Obj 1: Reignite mission-driven frontline leadership", krs: [
    { id: "KR3.1", label: "+10% increase in brand hallmark index", status: "amber", current: "Baseline: 67.3% correct. Pre-T2 induction designed from gaps.", mid: "Baseline + interventions designed", end: "77.3%+ at endline", note: "On track. Priority gaps identified: fellowship understanding, facilitation mindset, passion for scholars. Mid-term end-T2, endline end-T3.", source: "Mentor Baseline Analysis" },
    { id: "KR3.2", label: "Culture rating: all frontline teams meeting or exceeding", status: "amber", current: "Mentors: 93% meeting+. FOAs/POs: no assessment.", mid: "All teams assessed", end: "All meeting or exceeding", note: "Mentor data strong. FOA/PO assessment is a gap. Need plan: POs assess FOAs, PMs assess officers.", source: "Mentor Culture Assessment" },
  ]},
  { obj: "Delivery Obj 2: Simplified frontline structure", krs: [
    { id: "KR4.1", label: "Full PO/PQO matrix transition by Q2", status: "amber", current: "In transition — new JDs, performance standards in development", mid: "All teams on new structure", end: "100% transitioned + measured", note: "Matrix removal in progress. Risk: change management. Role clarity survey planned post-transition.", source: "HR / Ops" },
  ]},
];

/* ════════ EXPERIMENTS ════════ */
const EXPS = [
  {
    id: "gm", title: "Growth Mindset / Wise Interventions Experiment",
    what: "A randomized controlled trial testing whether brief psychological interventions — four narrative stories plus structured reflection — increase scholars' sense of agency, path flexibility, and business outcomes compared to standard LEC delivery.",
    why: "Three consecutive EXP cycles show soft skills declining ~0.5 SD while earn-save-act behaviors remain strong. The Investment Memo identifies agency as the binding constraint: youth can learn business skills, but internal beliefs suppress sustained application post-program. This experiment tests whether a wise intervention can repair the gap.",
    assumptions: ["P3: Wise interventions → agency + path flexibility", "P4: Skills alone don't sustain behavior — agency is the gap", "M2: Mentor mindset moderates scholar intervention effects (Yeager hypothesis)"],
    design: "810 treatment, 810 control scholars across matched school pairs. Randomization at school level. Treatment: 4 narrative stories + structured reflection embedded in one 60-minute LEC session. Control: standard LEC delivery. Matched on region, class size, mentor experience.",
    success: [
      { criterion: "Treatment group scores significantly higher on revised Hope Scale (agency + pathways subscales)", threshold: "≥0.1 SD difference, p<0.05" },
      { criterion: "Treatment group shows richer path-flexibility language in coded reflections", threshold: "Qualitative coding: ≥30% more alternative paths articulated" },
      { criterion: "Treatment group produces higher-quality business models", threshold: "+10% on BMC rubric score vs. control" },
      { criterion: "If mentor mindset moderates: high-quality mentors amplify treatment effect", threshold: "Significant interaction: mentor quality × treatment assignment" },
    ],
    failCriteria: "If NO significant difference between treatment and control on agency measures → the binding constraint hypothesis needs revision. If agency improves but business outcomes don't → the causal chain P3→P4→earn-save-act is broken. If effects only appear for certain subgroups → intervention needs targeting, not universal rollout.",
    integration: "If positive: embed wise intervention into core LEC structure (likely LEC 2 or 3). Design training module for mentors. If null: revisit whether agency IS the binding constraint, or whether the intervention design needs more dosage. If negative: kill intervention, investigate whether it displaced useful content.",
    timeline: [
      { phase: "Pilot", period: "T1 Wk 6-8", s: "done", detail: "Small-scale pilot. Tested story resonance, vocabulary, instruments. Found: stories resonated; ceiling on Hope Scale; vocabulary issues." },
      { phase: "Instrument redesign", period: "T1 Wk 9-10", s: "done", detail: "Revised Hope Scale. Fixed vocabulary ('mishap'→simpler). Added behavioral agency proxy. Controlled for mentor dependency confounder." },
      { phase: "Full RCT launch", period: "T2 Wk 1", s: "active", detail: "1,620 scholars enrolled. Schools randomized. Treatment and control groups matched." },
      { phase: "Midline", period: "T2 Wk 5", s: "next", detail: "First quantitative treatment vs. control comparison on revised instruments." },
      { phase: "Endline + analysis", period: "T2 Wk 9-10", s: "next", detail: "Full treatment effect. Subgroup analysis: does mentor quality moderate? Gender disaggregation." },
      { phase: "Decision point", period: "T3 Wk 1", s: "next", detail: "Integrate / revise / kill decision based on results." },
    ],
    findings: [
      { type: "+", text: "Stories resonated strongly. One scholar demonstrated full path-flexibility: deeper purpose, alternative paths, concrete 12-month plan." },
      { type: "+", text: "Vocabulary issues identified and fixed before full deployment. Instrument improved." },
      { type: "!", text: "Ceiling effects on Hope Scale (5-6/6). If instrument can't detect variation, RCT may show null even if intervention works." },
      { type: "!", text: "Mentor dependency: some scholars needed mentor support to complete questionnaire. If unequal across conditions, contaminates treatment effect." },
    ],
  },
  {
    id: "bml", title: "Passbook BML (Build-Measure-Learn)",
    what: "A longitudinal study tracking whether the redesigned passbook shifts mentor behavior from checklist completion to coaching conversations, and whether coaching mode correlates with better scholar outcomes.",
    why: "The passbook was redesigned for 2026 to be a coaching tool, not a checklist. If mentors treat it as a checklist, the feedback loop between mentor and scholar breaks — completion happens but learning doesn't deepen. The BML tracks whether the design intent is being realized and how it evolves across terms.",
    assumptions: ["M1: Passbook as coaching tool → deeper scholar outcomes", "P2: LEC + passbook → measurable skills development", "PR4: Club participation + passbook deepens mastery"],
    design: "Longitudinal BML across T1→T2→T3. Field interviews with mentors and scholars. Cross-reference coaching behavior scores with school-level milestone quality. BML focuses specifically on passbook usage patterns — NOT on LEC delivery quality (that's tracked via LEC observations).",
    success: [
      { criterion: "≥60% of mentors demonstrating coaching behavior (not checklist) by T3", threshold: "BML coaching rubric score ≥3/5" },
      { criterion: "Positive correlation between coaching score and scholar milestone quality at school level", threshold: "r > 0.3" },
      { criterion: "Milestone quality improves T1→T2→T3 (especially on individual T2 milestones)", threshold: "M4/M5/M6 ≥ 70% quality rate" },
    ],
    failCriteria: "If coaching adoption stays below 40% → passbook design needs further revision or mentor training needs overhaul. If no correlation between coaching and outcomes → the curriculum is doing the work regardless, and passbook is not the mechanism we think it is.",
    integration: "Insights feed directly into passbook iteration for 2027. If coaching mode correlates with outcomes: invest in coaching training. If not: simplify passbook further and redirect mentor time.",
    timeline: [
      { phase: "T1 field visits", period: "T1 Wk 6-9", s: "done", detail: "BML interviews conducted. Qualitative coding of coaching vs. checklist patterns." },
      { phase: "T1 analysis", period: "T1 Wk 10", s: "done", detail: "Patterns identified: some shift to coaching, some remain checklist. Regional variation documented." },
      { phase: "T2 BML design", period: "T2 Wk 1-2", s: "active", detail: "Standardized coaching rubric. Focus on: why T2 milestone quality may drop, mentor feedback quality for individual milestones." },
      { phase: "T2 field visits", period: "T2 Wk 4-7", s: "next", detail: "Expanded BML with rubric. Cross-reference with school-level milestone scores." },
      { phase: "T2→T1 comparison", period: "T2 Wk 9", s: "next", detail: "Has coaching improved? Does coaching predict milestone quality?" },
      { phase: "T3 final round", period: "T3", s: "next", detail: "Full T1→T2→T3 trajectory. Final validation." },
    ],
    findings: [
      { type: "+", text: "BML confirms SOME mentors shifting from memory-check to application-based coaching. Quote: 'Passbook requires you to be one-on-one with the scholar.'" },
      { type: "+", text: "Multiple FOAs report visible shift in mentor-scholar interaction quality." },
      { type: "+", text: "Existing mentors (37.4%) show slightly higher passbook completion quality — familiarity adds value beyond the tool." },
      { type: "!", text: "Some mentors remain in checklist mode despite new format. Time constraints in large classes (61+ scholars) limit 1:1 conversations." },
      { type: "!", text: "99.4% completion rate may mask quality variation. High completion ≠ high coaching quality." },
    ],
  },
];

/* ════════ ASSUMPTIONS ════════ */
const ASMS = [
  { id: "P1", l: "≥85% non-earners → stronger effects", c: "High", v: true, ev: "Cross-cohort evidence strong. 2026 criterion set." },
  { id: "P2", l: "≥14 LECs + passbook → skills development", c: "High", v: true, ev: "97% retention, 88.2% milestone ≥2/3, multiple RCT replications." },
  { id: "P3", l: "Wise interventions → agency + path flexibility", c: "Medium", v: false, ev: "Pilot promising. Full RCT in field. Instrument redesigned." },
  { id: "P4", l: "Skills alone don't sustain behavior — agency is the gap", c: "High", v: true, ev: "3 cycles: ~0.5 SD decline while earn-save-act holds." },
  { id: "P5", l: "Gender-responsive pedagogy → stronger female outcomes", c: "High", v: true, ev: "RCT: women +130% business ownership. PSM: +244% income." },
  { id: "P6", l: "Earn-save-act cycle → sustained income growth", c: "Medium", v: false, ev: "PSM positive. 4yr RCT: no labor market effects yet (35% in tertiary)." },
  { id: "M1", l: "Passbook as coaching tool → deeper outcomes", c: "Medium", v: false, ev: "BML: some coaching shift. Need T2 quantified scores." },
  { id: "M2", l: "Mentor mindset moderates scholar effects", c: "Low", v: false, ev: "No data. Items not in BML. Yeager hypothesis untested." },
  { id: "M3", l: "Mission-connected mentors deliver better + stay longer", c: "Medium", v: false, ev: "Hallmark baseline 67.3%. Fellowship redesigned." },
  { id: "M4", l: "Removing PO/PQO matrix → faster decisions + clarity", c: "Medium", v: false, ev: "Transition in progress. Survey planned post-implementation." },
  { id: "PR1", l: "Can add agency without losing earn-save-act", c: "High", v: true, ev: "97% retention with redesigned LX. Pathway robust." },
  { id: "PR3", l: "≤45 scholars per class → better outcomes", c: "Medium", v: false, ev: "34% at 61+. Outcomes acceptable. Need controlled comparison." },
  { id: "PR4", l: "Club + CD deepens mastery beyond LEC", c: "Medium", v: false, ev: "1,638 CD activities. Scholars lead unprompted. Quantitative link TBD." },
  { id: "E1", l: "School admin support moderates delivery", c: "High", v: false, ev: "100% coverage. 8.6/10 satisfaction. Correlation with outcomes untested." },
  { id: "E2", l: "School calendar provides enough dosage time", c: "High", v: true, ev: "89% sessions at 80 min. Validated." },
];

const EQS = [
  { q: "Central's 92% acquisition correlates with existing-to-school mentors. Is trust-based recruitment a separate mechanism?", src: "T1 BQ", pr: "High" },
  { q: "99.4% passbook completion but some is performative. How do we distinguish real from checklist at scale?", src: "T1 BML", pr: "High" },
  { q: "If the curriculum carries scholars through with 62.6% new mentors, what exactly is the mentor's unique contribution?", src: "T1 retention", pr: "High" },
  { q: "4yr RCT: personality effects persist but labor market effects don't appear. Timing or real limitation?", src: "RCT evidence", pr: "Medium" },
  { q: "East and North: lowest conversion AND highest info session sizes. Is overcrowding the cause or a symptom?", src: "T1 enrollment", pr: "Medium" },
];

const INSIGHTS = [
  { t: "The curriculum is more robust than expected. 62.6% new mentors, 97% retention. The LEC + passbook structure carries scholars regardless of mentor experience. Strengthens P2 but challenges the uniqueness of the mentor contribution.", d: "T1 2026" },
  { t: "The acquisition problem is conversion, not awareness. 103% awareness reach but 79% enrollment. Something breaks between learning about the product and signing up. Central's trust-based model (existing mentors → 92%) may hold the answer.", d: "T1 2026" },
  { t: "The soft skills decline is real — 3 cycles of ~0.5 SD while behavioral outcomes hold. Earlier program versions DID produce persistent personality effects (0.08-0.13 SD at 4 years). The current product lost the mechanism. This is the entire rationale for the 2026 strategy.", d: "Cross-cohort" },
];

/* ════════════════════════════════════════════════════════════════
   MAIN DASHBOARD
   ════════════════════════════════════════════════════════════════ */
export default function App() {
  const [tab, setTab] = useState("health");
  const [exp, setExp] = useState(null);
  const [expD, setExpD] = useState(null);

  const tabs = [
    { k: "health", l: "Product Health", i: "▣" },
    { k: "strategy", l: "2026 Strategy", i: "◈" },
    { k: "experiments", l: "Experiments", i: "◇" },
    { k: "assumptions", l: "Assumptions & Learning", i: "◆" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", background: C.bg, minHeight: "100vh", color: C.dark }} className="dashboard-wrapper">

      {/* Header */}
      <div style={{ background: C.dark, display: "flex", justifyContent: "space-between", alignItems: "center" }} className="dashboard-header">
        <div>
          <div className="header-title-label">Educate! EXP</div>
          <div className="header-title-main">Product Dashboard · 2026</div>
        </div>
        <div style={{ lineHeight: 1.6 }} className="header-meta">
          <div>End of Term 1, 2026</div>
          <div className="header-meta-secondary">36,664 scholars · 825 schools · 5 regions · 780 mentors</div>
        </div>
      </div>

      {/* Experiment Status Card (always visible) */}
      <div style={{ background: C.pBg, borderBottom: `1px solid ${C.pBd}`, color: C.mid, fontSize: "var(--fs-sm)" }} className="status-bar">
        <div className="status-item">
          <span style={{ fontWeight: 700, color: C.p }}>◇ Experiments</span>
          <span>Growth Mindset: <strong>In field</strong> (RCT launched, midline T2 Wk 5)</span>
        </div>
        <span className="status-divider">|</span>
        <div className="status-item">
          <span>Passbook BML: <strong>T1 complete</strong> (T2 field visits planned)</span>
        </div>
        <span className="status-divider">|</span>
        <div className="status-item">
          <span style={{ color: C.muted, fontStyle: "italic" }}>No integration decisions pending</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${C.line}` }} className="tabs-nav">
        {tabs.map(t => (
          <button key={t.k} onClick={() => { setTab(t.k); setExp(null); setExpD(null); }} className={`tab-button ${tab === t.k ? 'active' : ''}`}>
            <span>{t.i}</span> {t.l}
          </button>
        ))}
      </div>

      <div className="dashboard-container">

        {/* ════════ PRODUCT HEALTH ════════ */}
        {tab === "health" && DIMS.map(dim => {
          const isExp = exp === dim.id;
          return (
            <div key={dim.id} style={{ background: C.card, border: `1px solid ${C.line}` }} className="card">
              <div onClick={() => setExp(isExp ? null : dim.id)} style={{ padding: "var(--sp-lg)", cursor: "pointer", display: "flex", alignItems: "center", gap: "var(--sp-md)" }} className="card-header">
                <div style={{ background: `${RAG[dim.status].bg}`, border: `1px solid ${RAG[dim.status].bd}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }} className="card-icon">{dim.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-sm)", marginBottom: 1, flexWrap: "wrap" }}>
                    <span style={{ fontSize: "var(--fs-lg)", fontWeight: 800 }}>{dim.title}</span>
                    <Badge s={dim.status} />
                  </div>
                  <div style={{ fontSize: "var(--fs-xs)", color: C.muted }}>{dim.note}</div>
                </div>
                <div style={{ textAlign: "right", marginRight: 6 }}>
                  <div style={{ fontSize: "var(--fs-xs)", fontWeight: 600, color: C.light, textTransform: "uppercase", letterSpacing: 0.4 }}>{dim.top.label}</div>
                  <div style={{ fontSize: "var(--fs-xl)", fontWeight: 800, color: RAG[dim.top.status].c }}>{dim.top.value}</div>
                  <div style={{ fontSize: "var(--fs-xs)", color: C.light }}>{dim.top.target}</div>
                </div>
                <div style={{ fontSize: "var(--fs-lg)", color: C.light, transition: "transform 0.2s", transform: isExp ? "rotate(180deg)" : "" }}>▾</div>
              </div>

              {isExp && (
                <div style={{ borderTop: `1px solid ${C.line}}` }} className="card-content">
                  <div style={{ fontSize: "var(--fs-sm)", fontWeight: 700, color: C.muted, marginBottom: 2 }}>{dim.q}</div>
                  <div style={{ marginTop: "var(--sp-lg)", marginBottom: "var(--sp-xl)" }} className="grid grid-3">
                    {dim.metrics.map((m, i) => <MetricCard key={i} m={m} />)}
                  </div>

                  {/* Transformation arc (PMF only) */}
                  {dim.transformation && (
                    <div style={{ marginBottom: "var(--sp-xl)" }}>
                      <div style={{ fontSize: "var(--fs-xs)", fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: "var(--sp-md)" }}>Evidence of Transformation</div>
                      <div style={{ marginBottom: "var(--sp-xl)" }} className="grid grid-3">
                        {dim.transformation.map((t, i) => (
                          <div key={i} style={{ background: RAG[t.status].bg, border: `1px solid ${RAG[t.status].bd}`, borderRadius: "var(--rad-lg)", padding: "var(--sp-lg)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--sp-sm)", flexWrap: "wrap", gap: "var(--sp-sm)" }}>
                              <span style={{ fontSize: "var(--fs-sm)", fontWeight: 700, color: C.mid }}>{t.label}</span>
                              <span style={{ fontSize: "var(--fs-xl)", fontWeight: 800, color: RAG[t.status].c }}>{t.value}</span>
                            </div>
                            <div style={{ fontSize: "var(--fs-sm)", color: C.muted, lineHeight: 1.4 }}>{t.note}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Regional disagg (Team Culture) */}
                  {dim.regional && (
                    <div style={{ marginBottom: "var(--sp-xl)" }}>
                      <div style={{ fontSize: "var(--fs-xs)", fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: "var(--sp-md)" }}>Regional View</div>
                      <div style={{ background: C.faint, borderRadius: "var(--rad-lg)", overflow: "hidden", border: `1px solid ${C.line}` }} className="table-responsive">
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 0, padding: "var(--sp-md)", borderBottom: `1px solid ${C.line}` }} className="table-header">
                          {["Region", "Mentor Culture", "Hallmark", "Patron Sat.", "Note"].map(h => (
                            <span key={h}>{h}</span>
                          ))}
                        </div>
                        {dim.regional.map((r, i) => (
                          <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 0, padding: "var(--sp-md)", borderBottom: i < dim.regional.length - 1 ? `1px solid ${C.line}` : "none", background: i % 2 ? C.faint : "#fff" }} className="table-row">
                            <span style={{ fontSize: "var(--fs-sm)", fontWeight: 700, color: C.dark }}>{r.region}</span>
                            <span style={{ fontSize: "var(--fs-sm)", color: C.mid }}>{r.mentorCulture}</span>
                            <span style={{ fontSize: "var(--fs-sm)", color: C.mid }}>{r.hallmark}</span>
                            <span style={{ fontSize: "var(--fs-sm)", color: C.mid }}>{r.patronSat}</span>
                            <span style={{ fontSize: "var(--fs-xs)", color: C.muted }}>{r.note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <DiagBox title="Diagnostic Read" text={dim.diag} />
                  <div style={{ display: "flex", gap: "var(--sp-md)", marginTop: "var(--sp-lg)", flexWrap: "wrap" }}>
                    <div style={{ background: C.bBg, border: `1px solid ${C.bBd}`, borderRadius: "var(--rad-lg)", padding: "var(--sp-lg)", flex: "1 1 250px" }}>
                      <div style={{ fontSize: "var(--fs-xs)", fontWeight: 800, color: C.b, marginBottom: "var(--sp-sm)" }}>Key Insight</div>
                      <div style={{ fontSize: "var(--fs-sm)", color: "#1e3a5f", lineHeight: 1.5 }}>{dim.insight}</div>
                    </div>
                    {dim.assumptions.length > 0 && (
                      <div style={{ background: C.faint, borderRadius: "var(--rad-lg)", padding: "var(--sp-lg)", minWidth: 140 }}>
                        <div style={{ fontSize: "var(--fs-xs)", fontWeight: 700, color: C.light, textTransform: "uppercase", marginBottom: "var(--sp-sm)" }}>Tests Assumptions</div>
                        <div style={{ display: "flex", gap: "var(--sp-sm)", flexWrap: "wrap" }}>{dim.assumptions.map(a => <Tag key={a}>{a}</Tag>)}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* ════════ 2026 STRATEGY ════════ */}
        {tab === "strategy" && STRAT.map((obj, oi) => (
          <div key={oi} style={{ marginBottom: "var(--sp-xl)" }}>
            <div style={{ fontSize: "var(--fs-sm)", fontWeight: 800, color: C.dark, padding: "var(--sp-lg)", background: C.faint, borderRadius: "var(--rad-lg) var(--rad-lg) 0 0", border: `1px solid ${C.line}`, borderBottom: "none" }}>{obj.obj}</div>
            <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: "0 0 var(--rad-lg) var(--rad-lg)" }}>
              {obj.krs.map((kr, ki) => (
                <div key={ki} style={{ padding: "var(--sp-lg)", borderBottom: ki < obj.krs.length - 1 ? `1px solid ${C.line}` : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-sm)", marginBottom: "var(--sp-md)", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "var(--fs-xs)", fontWeight: 700, color: C.muted }}>{kr.id}</span>
                    <Badge s={kr.status} />
                    <span style={{ fontSize: "var(--fs-sm)", fontWeight: 600, color: C.dark }}>{kr.label}</span>
                  </div>
                  <div style={{ marginTop: "var(--sp-md)" }} className="grid grid-2">
                    {[{ h: "Current", v: kr.current }, { h: "Mid-point Target", v: kr.mid }, { h: "End-point Target", v: kr.end }].map((c, ci) => (
                      <div key={ci} style={{ background: C.faint, borderRadius: "var(--rad-md)", padding: "var(--sp-lg)" }}>
                        <div style={{ fontSize: "var(--fs-xs)", fontWeight: 700, color: C.light, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: "var(--sp-sm)" }}>{c.h}</div>
                        <div style={{ fontSize: "var(--fs-sm)", color: C.dark, lineHeight: 1.4 }}>{c.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: "var(--fs-xs)", color: C.muted, marginTop: "var(--sp-md)", lineHeight: 1.4, fontStyle: "italic" }}>{kr.note}</div>
                  <div style={{ fontSize: "var(--fs-xs)", color: C.b, marginTop: "var(--sp-sm)", fontWeight: 600 }}>Source: {kr.source}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* ════════ EXPERIMENTS ════════ */}
        {tab === "experiments" && (
          <div>
            <div style={{ fontSize: "var(--fs-sm)", color: C.muted, marginBottom: "var(--sp-xl)", lineHeight: 1.6, maxWidth: 750 }}>
              The two highest-priority learning activities in 2026. These test the existential assumptions — if they succeed, the strategy is validated. Each experiment shows what it is, why it matters, design, success criteria, failure criteria, and path to integration.
            </div>
            {EXPS.map(e => {
              const isOpen = expD === e.id;
              return (
                <div key={e.id} style={{ background: C.card, border: `1px solid ${C.line}` }} className="card">
                  <div onClick={() => setExpD(isOpen ? null : e.id)} style={{ padding: "var(--sp-lg)", cursor: "pointer", display: "flex", alignItems: "start", gap: "var(--sp-md)" }} className="card-header">
                    <div style={{ background: C.pBg, border: `1px solid ${C.pBd}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "var(--fs-xl)", flexShrink: 0 }} className="card-icon">◇</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "var(--fs-lg)", fontWeight: 800, color: C.dark }}>{e.title}</div>
                      <div style={{ fontSize: "var(--fs-sm)", color: C.muted, marginTop: "var(--sp-sm)" }}>{e.what}</div>
                    </div>
                    <div style={{ fontSize: "var(--fs-lg)", color: C.light, transform: isOpen ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>▾</div>
                  </div>

                  {isOpen && (
                    <div style={{ borderTop: `1px solid ${C.line}` }} className="card-content">
                      {/* Why */}
                      <DiagBox title="Why This Experiment" text={e.why} color="#4c1d95" bg={C.pBg} bd={C.pBd} />

                      {/* Assumptions */}
                      <div style={{ marginBottom: "var(--sp-lg)" }}>
                        <div style={{ fontSize: "var(--fs-xs)", fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: "var(--sp-md)" }}>Assumptions Being Tested</div>
                        <div style={{ display: "flex", gap: "var(--sp-sm)", flexWrap: "wrap" }}>{e.assumptions.map((a, i) => <Tag key={i} color={C.p} bg={C.pBg}>{a}</Tag>)}</div>
                      </div>

                      {/* Design */}
                      <div style={{ background: C.faint, borderRadius: "var(--rad-lg)", padding: "var(--sp-lg)", marginBottom: "var(--sp-lg)", border: `1px solid ${C.line}` }} className="info-box">
                        <div style={{ fontSize: "var(--fs-sm)", fontWeight: 700, color: C.muted, marginBottom: "var(--sp-md)" }}>Design</div>
                        <div style={{ fontSize: "var(--fs-sm)", color: C.mid, lineHeight: 1.5 }}>{e.design}</div>
                      </div>

                      {/* Success Criteria */}
                      <div style={{ marginBottom: "var(--sp-lg)" }}>
                        <div style={{ fontSize: "var(--fs-xs)", fontWeight: 800, color: C.g, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: "var(--sp-md)" }}>Success Criteria</div>
                        {e.success.map((s, i) => (
                          <div key={i} style={{ background: C.gBg, border: `1px solid ${C.gBd}`, borderRadius: "var(--rad-md)", padding: "var(--sp-lg)", marginBottom: "var(--sp-sm)", display: "flex", justifyContent: "space-between", alignItems: "start", gap: "var(--sp-md)", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "var(--fs-sm)", color: "#14532d", flex: 1 }}>{s.criterion}</span>
                            <span style={{ fontSize: "var(--fs-sm)", fontWeight: 700, color: C.g, whiteSpace: "nowrap" }}>{s.threshold}</span>
                          </div>
                        ))}
                      </div>

                      {/* Failure Criteria */}
                      <DiagBox title="What Failure Looks Like" text={e.failCriteria} color="#991b1b" bg={C.rBg} bd={C.rBd} />

                      {/* Integration Path */}
                      <DiagBox title="Path to Integration" text={e.integration} color="#1e40af" bg={C.bBg} bd={C.bBd} />

                      {/* Timeline */}
                      <div style={{ fontSize: "var(--fs-xs)", fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: "var(--sp-md)", marginTop: "var(--sp-xl)" }}>Timeline</div>
                      {e.timeline.map((n, i) => (
                        <div key={i} style={{ display: "flex", gap: "var(--sp-md)", marginBottom: "var(--sp-md)" }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 12, flexShrink: 0 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 99, background: n.s === "done" ? C.g : n.s === "active" ? C.a : C.line, border: `2px solid ${n.s === "done" ? C.g : n.s === "active" ? C.a : "#d1d5db"}` }} />
                            {i < e.timeline.length - 1 && <div style={{ width: 2, flex: 1, background: C.line, marginTop: 2 }} />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-sm)", flexWrap: "wrap" }}>
                              <span style={{ fontSize: "var(--fs-sm)", fontWeight: 700, color: C.dark }}>{n.phase}</span>
                              <span style={{ fontSize: "var(--fs-xs)", color: C.light }}>{n.period}</span>
                              <Tag color={n.s === "done" ? C.g : n.s === "active" ? C.a : C.light} bg={n.s === "done" ? C.gBg : n.s === "active" ? C.aBg : C.faint}>{n.s === "done" ? "Complete" : n.s === "active" ? "Active" : "Upcoming"}</Tag>
                            </div>
                            <div style={{ fontSize: "var(--fs-sm)", color: C.muted, lineHeight: 1.4, marginTop: "var(--sp-sm)" }}>{n.detail}</div>
                          </div>
                        </div>
                      ))}

                      {/* Findings */}
                      <div style={{ fontSize: "var(--fs-xs)", fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: "var(--sp-md)", marginTop: "var(--sp-xl)" }}>Findings So Far</div>
                      <div style={{ marginBottom: "var(--sp-xl)" }} className="grid grid-2">
                        {e.findings.map((f, i) => (
                          <div key={i} style={{ background: f.type === "+" ? C.gBg : C.aBg, border: `1px solid ${f.type === "+" ? C.gBd : C.aBd}`, borderRadius: "var(--rad-md)", padding: "var(--sp-lg)" }}>
                            <div style={{ fontSize: "var(--fs-xs)", fontWeight: 700, color: f.type === "+" ? C.g : C.a, textTransform: "uppercase", marginBottom: "var(--sp-sm)" }}>{f.type === "+" ? "◉ Positive" : "▲ Risk"}</div>
                            <div style={{ fontSize: "var(--fs-sm)", color: C.mid, lineHeight: 1.4 }}>{f.text}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ════════ ASSUMPTIONS & LEARNING ════════ */}
        {tab === "assumptions" && (
          <div>
            {/* Summary cards */}
            <div style={{ marginBottom: "var(--sp-xl)" }} className="grid grid-4">
              {[
                { l: "Validated", n: ASMS.filter(a => a.v).length, c: C.g, bg: C.gBg },
                { l: "In Progress", n: ASMS.filter(a => !a.v && a.c !== "Low").length, c: C.a, bg: C.aBg },
                { l: "Not Yet Tested", n: ASMS.filter(a => a.c === "Low").length, c: C.r, bg: C.rBg },
                { l: "Emerging Questions", n: EQS.length, c: C.b, bg: C.bBg },
              ].map((s, i) => (
                <div key={i} style={{ background: s.bg, borderRadius: "var(--rad-lg)", padding: "var(--sp-lg)", textAlign: "center" }}>
                  <div style={{ fontSize: "var(--fs-2xl)", fontWeight: 800, color: s.c }}>{s.n}</div>
                  <div style={{ fontSize: "var(--fs-xs)", fontWeight: 600, color: s.c }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Full list */}
            <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: "var(--rad-lg)", marginBottom: "var(--sp-xl)", overflow: "hidden" }}>
              <div style={{ padding: "var(--sp-md)", borderBottom: `1px solid ${C.line}`, background: C.faint }}>
                <span style={{ fontSize: "var(--fs-sm)", fontWeight: 800 }}>All Product Assumptions</span>
              </div>
              {ASMS.map((a, i) => (
                <div key={a.id} style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--sp-sm)", padding: "var(--sp-lg)", alignItems: "center", borderBottom: i < ASMS.length - 1 ? `1px solid ${C.line}` : "none" }} className="grid">
                  <div style={{ display: "flex", alignItems: "start", gap: "var(--sp-md)", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "var(--fs-xs)", fontWeight: 700, color: C.muted, minWidth: 44 }}>{a.id}</span>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontSize: "var(--fs-sm)", fontWeight: 600, color: C.dark, lineHeight: 1.3 }}>{a.l}</div>
                      <div style={{ fontSize: "var(--fs-xs)", color: C.light, marginTop: "var(--sp-sm)" }}>{a.ev}</div>
                    </div>
                    <span style={{ fontSize: "var(--fs-xs)", fontWeight: 700, padding: "2px 7px", borderRadius: 99, textAlign: "center", color: a.c === "High" ? C.g : a.c === "Medium" ? C.a : C.r, background: a.c === "High" ? C.gBg : a.c === "Medium" ? C.aBg : C.rBg }}>{a.c}</span>
                    {a.v ? <span style={{ fontSize: "var(--fs-xs)", fontWeight: 700, color: C.g }}>✓ Validated</span> : <span style={{ fontSize: "var(--fs-xs)", color: C.light }}>○ Testing</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Emerging Questions */}
            <div style={{ marginBottom: "var(--sp-xl)" }}>
              <div style={{ fontSize: "var(--fs-lg)", fontWeight: 800, marginBottom: "var(--sp-lg)" }}>Emerging Questions</div>
              {EQS.map((eq, i) => (
                <div key={i} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: "var(--rad-lg)", padding: "var(--sp-lg)", marginBottom: "var(--sp-md)" }}>
                  <div style={{ fontSize: "var(--fs-sm)", color: C.dark, lineHeight: 1.5, fontWeight: 500 }}>{eq.q}</div>
                  <div style={{ display: "flex", gap: "var(--sp-sm)", marginTop: "var(--sp-md)", flexWrap: "wrap" }}>
                    <Tag color={eq.pr === "High" ? C.r : C.a} bg={eq.pr === "High" ? C.rBg : C.aBg}>{eq.pr}</Tag>
                    <Tag>{eq.src}</Tag>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Insights */}
            <div>
              <div style={{ fontSize: "var(--fs-lg)", fontWeight: 800, marginBottom: "var(--sp-lg)" }}>What We've Learned</div>
              {INSIGHTS.map((ins, i) => (
                <div key={i} style={{ background: C.bBg, border: `1px solid ${C.bBd}`, borderRadius: "var(--rad-lg)", padding: "var(--sp-lg)", marginBottom: "var(--sp-md)" }}>
                  <div style={{ fontSize: "var(--fs-sm)", color: "#1e3a5f", lineHeight: 1.5 }}>{ins.t}</div>
                  <div style={{ fontSize: "var(--fs-xs)", color: C.b, fontWeight: 600, marginTop: "var(--sp-md)" }}>{ins.d}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
