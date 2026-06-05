import { useState } from "react";

const T = {
  bg:"#F5F4F1", surface:"#FFFFFF", alt:"#F6F5F2",
  ink:"#1A1A1A", ink2:"#3D3D3D", ink3:"#6B6B6B", ink4:"#9B9B9B", ink5:"#CDCDCD",
  border:"#EBEBEB", bStrong:"#D4D4D4",
  g:"#1B8A4E", gS:"#E8F5EC", a:"#C27B1E", aS:"#FDF3E3",
  r:"#C43232", rS:"#FCECEC", b:"#2B6CB0", bS:"#EBF2FB", bBd:"#93B8DC",
  p:"#6B46C1", pS:"#F3EEFF", nav:"#141414", navA:"#2A2A2A"
};
const m = "'IBM Plex Mono',monospace";
const sc = s => s==="green"?T.g:s==="red"?T.r:s==="amber"?T.a:T.ink4;
const sBg = s => s==="green"?T.gS:s==="red"?T.rS:s==="amber"?T.aS:T.alt;
const sL = s => s==="green"?"On Track":s==="red"?"At Risk":s==="amber"?"Watch":"Pending";

function Dot({s,sz=8}){return <span style={{display:"inline-block",width:sz,height:sz,borderRadius:99,background:sc(s),flexShrink:0}}/>}
function Pill({s}){return <span style={{fontSize:10,fontWeight:600,padding:"3px 10px",borderRadius:99,color:sc(s),background:sBg(s),textTransform:"uppercase",letterSpacing:.5}}>{sL(s)}</span>}

const DIMS = [
  {id:"df",label:"Delivery Fidelity",num:"01",status:"green",q:"Is the product being delivered consistently as designed?",
   hl:{v:"5 / 5",sub:"T1 LECs delivered"},
   summary:"Strong structural fidelity across all activity types. 89% duration fidelity. 97% retention. One critical gap: no LEC observation data.",
   metrics:[
     {l:"LEC Sessions (cumulative)",v:"5 / 5",t:"5 by T1 | 13 by T2 | 21 by T3",s:"green",n:"All 5 T1 LECs delivered across 825 schools. LEC4 lowest (96.1%). All sessions above 95% target.",src:"BQ Mentor Reports"},
     {l:"Session Duration Fidelity",v:"89%",t:"85% at 80 min",s:"green",n:"89.3% of 3,672 sessions at 80 min. 8.8% outside 75-85 window, mostly 60 min deviations from time pressure.",src:"BQ session_duration"},
     {l:"Session Delivery Quality",v:"No data",t:"80% rated good+",s:"red",n:"No LEC observation scores in T1. This is the primary pedagogical fidelity indicator. FOA observation forms planned for T2.",src:"Planned: LEC Observation Rubric"},
     {l:"Group Mentoring",v:"1 / 1",t:"1/term, 4/year",s:"green",n:"821 schools (98.9% coverage). 36,067 scholars, avg 44/session.",src:"BQ GM logs"},
     {l:"Passbook Completion",v:"99.4%",t:"95%+",s:"green",n:"Near-total completion. Quality tracked under Experiments tab (BML).",src:"BQ pb_total_scholars"},
     {l:"Community Day",v:"88.7%",t:"95%+",s:"amber",n:"Below target. Qualitative strong: scholars describe CD as 'our day,' take initiative unprompted.",src:"BQ CD reports"},
     {l:"BQ Reporting",v:"97.6%",t:"95%+",s:"green",n:"825 schools. Dual-channel: field_hub 57%, texit_2026 43%.",src:"BQ system"},
   ],
   diag:"Structural fidelity is strong. The critical gap is pedagogical: we know sessions HAPPEN but not if they're FACILITATED well. Session Delivery Quality must be #1 measurement priority for T2.",
   insight:"The absence of LEC observation data is the single biggest measurement gap in this dimension.",
   asms:["P2","E2"]},
  {id:"mve",label:"Mentor Value Exchange",num:"02",status:"amber",q:"Are mentors delivering value while getting value from the fellowship?",
   hl:{v:"8.6",sub:"patron rating /10"},
   summary:"Strong indirect delivery evidence (97% retention, 8.6/10 patron rating). Almost no direct data on whether mentors are getting value.",
   metrics:[
     {l:"Mentor Retention Rate",v:"Pending",t:"80% T1 / 75% year",s:"pending",n:"Compare scholar alumni vs. short course mentors.",src:"L&M Map: Learning Q3"},
     {l:"Fellowship Value Score",v:"Pending",t:"75% mid / 80% end",s:"pending",n:"% rating fellowship as valuable for professional growth.",src:"L&M Map: Learning Q3"},
     {l:"Mentor Milestone Achievement",v:"Pending",t:"80% mid / 85% end",s:"pending",n:"Mentors have 6 milestones. 6hrs advanced content.",src:"L&M Map: Learning Q3"},
     {l:"Professional Growth",v:"Pending",t:"75% mid / 80% end",s:"pending",n:"% reporting career growth from fellowship.",src:"L&M Map: Impl Q3"},
     {l:"Patron Mentor Rating",v:"8.6/10",t:"9/10+",s:"amber",n:"221 school responses. Adjumani CU lower.",src:"Patron Feedback Survey"},
     {l:"Recruitment Fill Rate",v:"Pending",t:"95% / 100%",s:"pending",n:"% positions filled in window.",src:"L&M Map: Impl Q3"},
   ],
   diag:"5 of 6 metrics are pending. The mentor experience is the least-measured dimension. L&M Map has the right metrics defined but data collection is unclear for T2.",
   insight:"62.6% new mentors makes this urgent. If they don't experience value, next year's recruitment becomes a crisis.",
   asms:["M1","M3"]},
  {id:"ce",label:"Cost Efficiency",num:"03",status:"amber",q:"Is the delivery model financially sustainable?",
   hl:{v:"$30.6",sub:"CPY vs $27 target"},
   summary:"CPY above budget. Gap is structural (field team cost). Transport model may not reflect regional variation.",
   metrics:[
     {l:"Cost Per Youth",v:"$30.6",t:"$27 budgeted",s:"amber",n:"Includes field salaries, materials, transport, overhead.",src:"Finance / BVA"},
     {l:"Transport Budget Variance",v:"Pending",t:"+/-10%",s:"pending",n:"If >15%: revise cost mapping.",src:"L&M Map: Impl Q4"},
     {l:"Transport Complaint Rate",v:"Pending",t:"<15 per 100",s:"pending",n:"Where cost creates product friction.",src:"L&M Map: Impl Q4"},
     {l:"Transport-Driven Attrition",v:"Pending",t:"<5%",s:"pending",n:"Where cost becomes a product health issue.",src:"L&M Map: Impl Q4"},
   ],
   diag:"CPY overshoot is structural. Transport cost model is the key lever. If it doesn't reflect regional variation, mentors absorb the gap.",
   insight:"Watch transport-driven attrition. If mentors leave because of transport, that's product health wearing a finance costume.",
   asms:[]},
  {id:"tc",label:"Team & Culture",num:"04",status:"amber",q:"Is the team culture positive, empowering, and high-performing?",
   hl:{v:"93%",sub:"mentor culture score"},
   summary:"Mentor culture strong. Brand hallmark at 67.3%. Critical gap: no FOA/PO assessment exists during structural reform.",
   metrics:[
     {l:"Mentor Culture Assessment",v:"93% meeting+",t:"95%+",s:"amber",n:"324 assessed: 284 exceeding, 30 meeting, 3 below.",src:"Midterm Assessment"},
     {l:"Brand Hallmark Index",v:"67.3%",t:"77.3% (+10%)",s:"amber",n:"26% 'Mixed.' Gaps: fellowship understanding, facilitation, passion.",src:"Mentor Baseline Analysis"},
     {l:"FOA/PO Assessment",v:"No data",t:"Deployed",s:"red",n:"No assessment exists. Restructuring roles with no baseline. URGENT.",src:"Gap identified"},
     {l:"Role Clarity Index",v:"Pending",t:"85%+ clear",s:"pending",n:"Survey planned post-transition.",src:"L&M Map: Impl Q1"},
     {l:"Patron Satisfaction",v:"8.6/10",t:"9/10+",s:"amber",n:"221/825 schools. Adjumani CU lower.",src:"Patron Feedback Survey"},
   ],
   regional:["East: lowest acquisition (43%)","South: 97% retention","North: lowest alongside East","West: higher quality from existing mentors","Central: 92% conversion (trust-based)"],
   diag:"Mentor culture looks strong but hallmark reveals 26% mixed understanding. FOA/PO blind spot during structural reform is the most urgent gap.",
   insight:"Deploy FOA/PO assessment before end-T2. Prerequisite for evaluating the biggest structural change in years.",
   asms:["M3","M4"]},
  {id:"pmf",label:"Product-Market Fit",num:"05",status:"amber",q:"Do scholars love it, do schools want it, and does transformation happen?",
   hl:{v:"97%",sub:"scholar retention"},
   summary:"Scholars stay (97%), schools participate (100%). But agency decline (~0.5 SD) threatens transformation-level PMF.",
   metrics:[
     {l:"Scholar NPS",v:"Pending",t:">50",s:"pending",n:"Centricity Survey next week. Most direct PMF measure.",src:"Scholar Centricity Survey"},
     {l:"LEC Retention (LEC2-5)",v:"97%",t:"95%+",s:"green",n:"E:98%, S:97%, N:99%, W:97%, C:99%. All GREEN. Only 317 lost.",src:"BQ LEC attendance"},
     {l:"Acquisition Conversion",v:"79%",t:"100%",s:"red",n:"36,664/46,200. Awareness 103% but enrollment 52% vs 70% target. East/North 43%. Central 92%.",src:"BQ recruitment"},
     {l:"School Coverage",v:"825/825",t:"100%",s:"green",n:"All target schools active.",src:"School records"},
     {l:"Admin Satisfaction",v:"8.6/10",t:"9/10+",s:"amber",n:"221 schools responded.",src:"Patron Feedback Survey"},
   ],
   transformation:[
     {l:"Skills",v:"Strong",s:"green",d:"PSM: speaking +1.4 SD, leadership +1.7 SD. Proven. PROTECT THIS."},
     {l:"Business Start-up",v:"36%",s:"amber",d:"SEED baseline. RCT: +63%. Target: 46%."},
     {l:"Income",v:"Mixed",s:"amber",d:"PSM: +95%. 4yr RCT: no labor market effect yet."},
     {l:"Agency",v:"-0.5 SD",s:"red",d:"3 cycles declining. THE core problem. Growth mindset targets this."},
     {l:"Savings",v:"Sig.",s:"green",d:"RCT: p<0.01. May not sustain without reinforcement."},
     {l:"Education",v:"Women+",s:"amber",d:"4yr: +6.6pp completion for women."},
   ],
   diag:"PMF split personality: demand strong, transformation mixed. Behavioral outcomes work but the agency decline means the product may produce action without sustaining beliefs.",
   insight:"Centricity Survey next week is pivotal. Will confirm whether high retention = high satisfaction.",
   asms:["P1","P4","PR1"]},
];

const OKRS = [
  {obj:"Product Obj 1: Scalable LX deepening grit and soft-skills",krs:[
    {id:"KR1.1",l:"36K scholars recruited and activated",s:"green",c:"36,569 recruited, 36,321 activated",mi:"36K by T1",e:"36K full year",n:"Exceeded T1 target."},
    {id:"KR1.2",l:"Milestone quality >70% all milestones",s:"green",c:"M1: 88% (55% Star, 33% Bulb)",mi:"80%+ T1 milestones",e:">70% all 6",n:"T2 individual milestones expected harder."},
    {id:"KR1.3",l:"Scholar NPS and usability >80%",s:"pending",c:"Pending: survey next week",mi:"Baseline",e:"NPS>50; 80% usability",n:"Depends on centricity survey."},
    {id:"KR1.4",l:"Passbook feedback >80%",s:"green",c:"~98% completion proxy",mi:"90% receiving",e:">80%",n:"High but some performative."},
  ]},
  {obj:"Product Obj 2: Validate agency pathways",krs:[
    {id:"KR2.1",l:"Complete growth mindset experiment",s:"amber",c:"Pilot done. Full RCT in field.",mi:"RCT launched",e:"Treatment effect shown",n:"Pivotal data T2."},
    {id:"KR2.2",l:"3+ validated assumptions in ToC",s:"amber",c:"P2, P4, PR1 validated/evidenced",mi:"2 validated",e:"3+ validated",n:"Need P3 or M1 for third."},
  ]},
  {obj:"Delivery Obj 1: Reignite frontline leadership",krs:[
    {id:"KR3.1",l:"+10% brand hallmark index",s:"amber",c:"Baseline: 67.3%",mi:"Baseline + interventions",e:"77.3%+",n:"Priority gaps identified."},
    {id:"KR3.2",l:"All teams meeting+ on culture",s:"amber",c:"Mentors: 93%. FOAs/POs: no data",mi:"All assessed",e:"All meeting+",n:"FOA/PO gap."},
  ]},
  {obj:"Delivery Obj 2: Simplified structure",krs:[
    {id:"KR4.1",l:"Full PO/PQO transition by Q2",s:"amber",c:"In transition",mi:"New structure",e:"100% transitioned",n:"Role clarity survey post-transition."},
  ]},
];

const EXPS = [
  {id:"gm",title:"Growth Mindset Experiment",sub:"Wise Interventions RCT",st:"In field",stC:T.a,
   what:"Testing whether 4 narrative stories + structured reflection increase agency, path flexibility, and business outcomes.",
   why:"3 consecutive cycles: soft skills declining ~0.5 SD while earn-save-act holds. Agency hypothesized as the binding constraint.",
   design:"810 treatment, 810 control. School-level randomization. 60-min wise intervention vs. standard LEC.",
   asms:["P3: Wise interventions to agency","P4: Agency is the missing piece","M2: Mentor mindset moderates"],
   success:[{c:"Hope Scale: treatment > control",th:"0.1+ SD, p<0.05"},{c:"Path flexibility: richer alternatives",th:"30%+ more paths"},{c:"BMC quality: treatment > control",th:"+10% rubric"},{c:"Mentor mindset moderates",th:"Significant interaction"}],
   fail:"If NO difference: binding constraint hypothesis needs revision. If agency moves but business doesn't: causal chain breaks.",
   integ:"Positive: embed in core LEC. Null: revisit hypothesis. Negative: kill.",
   tl:[{p:"Pilot",t:"T1 Wk 6-8",s:"done",d:"Tested stories, instruments. Ceiling on Hope Scale."},{p:"Instrument fix",t:"T1 Wk 9-10",s:"done",d:"Revised scale. Added behavioral proxy."},{p:"Full RCT",t:"T2 Wk 1",s:"active",d:"1,620 scholars enrolled."},{p:"Midline",t:"T2 Wk 5",s:"next",d:"First tx vs. ctrl comparison."},{p:"Endline",t:"T2 Wk 9-10",s:"next",d:"Full effect + subgroup."},{p:"Decision",t:"T3 Wk 1",s:"next",d:"Integrate / revise / kill."}],
   find:[{ty:"+",x:"Stories resonated. One scholar showed full path-flexibility + 12-month plan."},{ty:"+",x:"Vocabulary issues fixed before deployment."},{ty:"!",x:"Ceiling on Hope Scale (5-6/6). Instrument may miss real variation."},{ty:"!",x:"Mentor dependency as potential confounder."}]},
  {id:"bml",title:"Passbook BML",sub:"Build-Measure-Learn Cycle",st:"T1 complete",stC:T.g,
   what:"Tracking whether redesigned passbook shifts mentors from checklist to coaching, and whether coaching predicts outcomes.",
   why:"Passbook redesigned as coaching tool. If mentors treat as checklist, feedback loop breaks.",
   design:"Longitudinal T1 to T3. Field interviews. Cross-reference coaching scores with milestone quality.",
   asms:["M1: Passbook as coaching tool","P2: LEC + passbook to skills","PR4: Club deepens mastery"],
   success:[{c:"60%+ mentors coaching by T3",th:"Rubric 3+/5"},{c:"Coaching correlates with outcomes",th:"r > 0.3"},{c:"Milestone quality improves",th:"M4-6 at 70%+"}],
   fail:"If coaching <40%: passbook needs revision. If no correlation: curriculum works regardless.",
   integ:"Coaching correlates: invest in training. No correlation: simplify passbook.",
   tl:[{p:"T1 visits",t:"T1 Wk 6-9",s:"done",d:"Qualitative coaching patterns coded."},{p:"T1 analysis",t:"T1 Wk 10",s:"done",d:"Patterns identified."},{p:"T2 design",t:"T2 Wk 1-2",s:"active",d:"Standardized rubric."},{p:"T2 visits",t:"T2 Wk 4-7",s:"next",d:"Expanded BML."},{p:"Comparison",t:"T2 Wk 9",s:"next",d:"Coaching improvement?"},{p:"T3 final",t:"T3",s:"next",d:"Full trajectory."}],
   find:[{ty:"+",x:"Some mentors shifting: 'Passbook requires one-on-one with the scholar.'"},{ty:"+",x:"Existing mentors show higher quality."},{ty:"!",x:"Some remain in checklist mode. Large classes limit 1:1."},{ty:"!",x:"99.4% completion may mask quality variation."}]},
];

const ASMS = [
  {id:"P1",l:"Non-earner targeting strengthens effects",c:"High",v:true},
  {id:"P2",l:"LEC + passbook produces skills",c:"High",v:true},
  {id:"P3",l:"Wise interventions increase agency",c:"Medium",v:false},
  {id:"P4",l:"Skills alone don't sustain behavior",c:"High",v:true},
  {id:"P5",l:"Gender-responsive pedagogy helps women more",c:"High",v:true},
  {id:"P6",l:"Earn-save-act produces sustained income",c:"Medium",v:false},
  {id:"M1",l:"Passbook as coaching deepens outcomes",c:"Medium",v:false},
  {id:"M2",l:"Mentor mindset moderates effects",c:"Low",v:false},
  {id:"M3",l:"Mission-connected mentors deliver + stay",c:"Medium",v:false},
  {id:"M4",l:"Matrix removal improves decisions",c:"Medium",v:false},
  {id:"PR1",l:"Can add agency without losing earn-save-act",c:"High",v:true},
  {id:"PR3",l:"Smaller classes produce better outcomes",c:"Medium",v:false},
  {id:"E1",l:"School admin support moderates delivery",c:"High",v:false},
  {id:"E2",l:"School calendar provides enough time",c:"High",v:true},
];

const EQS = [
  {q:"Central's 92% conversion correlates with existing-to-school mentors. Is trust-based recruitment a separate mechanism?",p:"High"},
  {q:"99.4% passbook completion but some is performative. How to separate real from checklist at scale?",p:"High"},
  {q:"If curriculum carries scholars with 62.6% new mentors, what is the mentor's unique contribution?",p:"High"},
  {q:"4yr RCT: personality persists but labor market doesn't. Timing or real limitation?",p:"Med"},
];

const INS = [
  {t:"The curriculum is more robust than expected. 62.6% new mentors, 97% retention. Strengthens P2 but challenges the mentor's unique contribution.",d:"T1 2026"},
  {t:"Acquisition is a conversion problem, not awareness. 103% awareness but 79% enrollment. Central's trust model (92%) may be the template.",d:"T1 2026"},
  {t:"Soft skills decline is real: 3 cycles of ~0.5 SD while earn-save-act holds. Earlier versions DID produce persistent effects. Current product lost the mechanism.",d:"Cross-cohort"},
];

/* ===== PAGES ===== */

function HealthGrid({onPick}) {
  return (
    <div>
      <div style={{marginBottom:28}}>
        <h2 style={{fontSize:28,fontWeight:700,color:T.ink,letterSpacing:-.5,marginBottom:6}}>Product Health</h2>
        <p style={{fontSize:14,color:T.ink3,lineHeight:1.6,maxWidth:620}}>Five dimensions of what it means for EXP to be a healthy product. Click any dimension to explore.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {DIMS.map(d => (
          <div key={d.id} onClick={()=>onPick(d.id)} style={{
            background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, padding:"22px 24px",
            cursor:"pointer", transition:"all .2s", position:"relative", overflow:"hidden",
          }}
          onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,.06)"; e.currentTarget.style.borderColor=T.bStrong}}
          onMouseLeave={e=>{e.currentTarget.style.boxShadow="none"; e.currentTarget.style.borderColor=T.border}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:sc(d.status)}} />
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:14}}>
              <div>
                <div style={{fontSize:10,fontFamily:m,fontWeight:600,color:T.ink4,letterSpacing:1,marginBottom:4}}>{d.num}</div>
                <div style={{fontSize:17,fontWeight:700,color:T.ink,letterSpacing:-.3}}>{d.label}</div>
              </div>
              <Pill s={d.status} />
            </div>
            <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:10}}>
              <span style={{fontFamily:m,fontSize:34,fontWeight:800,color:T.ink,letterSpacing:-1}}>{d.hl.v}</span>
              <span style={{fontSize:12,color:T.ink4}}>{d.hl.sub}</span>
            </div>
            <div style={{fontSize:12,color:T.ink3,lineHeight:1.55}}>{d.summary}</div>
            <div style={{marginTop:14,fontSize:11,color:T.b,fontWeight:600}}>{"Explore dimension →"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DimDetail({dim, onBack}) {
  return (
    <div>
      <button onClick={onBack} style={{background:"none",border:"none",fontSize:12,color:T.b,fontWeight:600,cursor:"pointer",marginBottom:16,padding:0}}>{"← Back to Product Health"}</button>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
        <span style={{fontFamily:m,fontSize:12,fontWeight:600,color:T.ink4,letterSpacing:1}}>{dim.num}</span>
        <h2 style={{fontSize:24,fontWeight:700,color:T.ink,letterSpacing:-.4,margin:0}}>{dim.label}</h2>
        <Pill s={dim.status} />
      </div>
      <p style={{fontSize:14,color:T.ink3,marginBottom:24}}>{dim.q}</p>

      <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:20}}>
        <div>
          <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:"20px 24px",marginBottom:16}}>
            <div style={{fontSize:11,fontWeight:700,color:T.ink4,textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Metrics</div>
            {dim.metrics.map((mt,i) => (
              <div key={i} style={{padding:"12px 0",borderBottom:i<dim.metrics.length-1?`1px solid ${T.border}`:"none",display:"flex",gap:10,alignItems:"start"}}>
                <Dot s={mt.s} />
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:2}}>
                    <span style={{fontSize:13,fontWeight:600,color:T.ink}}>{mt.l}</span>
                    <span style={{fontFamily:m,fontSize:14,fontWeight:700,color:sc(mt.s)}}>{mt.v}</span>
                  </div>
                  <div style={{fontSize:11,color:T.ink4,marginBottom:3}}>Target: {mt.t}</div>
                  <div style={{fontSize:12,color:T.ink3,lineHeight:1.5}}>{mt.n}</div>
                  <div style={{fontSize:10,color:T.b,marginTop:2,fontWeight:600}}>{mt.src}</div>
                </div>
              </div>
            ))}
          </div>

          {dim.transformation && (
            <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:"20px 24px"}}>
              <div style={{fontSize:11,fontWeight:700,color:T.ink4,textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Evidence of Transformation</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {dim.transformation.map((tr,i) => (
                  <div key={i} style={{background:sBg(tr.s),borderRadius:8,padding:"12px 14px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                      <span style={{fontSize:12,fontWeight:700,color:T.ink2}}>{tr.l}</span>
                      <span style={{fontFamily:m,fontSize:13,fontWeight:800,color:sc(tr.s)}}>{tr.v}</span>
                    </div>
                    <div style={{fontSize:11,color:T.ink3,lineHeight:1.4}}>{tr.d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div style={{background:"#FFF8F0",border:"1px solid #F0DCC0",borderRadius:12,padding:"18px 20px",marginBottom:14}}>
            <div style={{fontSize:10,fontWeight:700,color:"#8B6914",textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>Diagnostic Read</div>
            <div style={{fontSize:13,color:"#6B4F10",lineHeight:1.6}}>{dim.diag}</div>
          </div>
          <div style={{background:T.bS,border:`1px solid ${T.bBd}`,borderRadius:12,padding:"18px 20px",marginBottom:14}}>
            <div style={{fontSize:10,fontWeight:700,color:T.b,textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>Key Insight</div>
            <div style={{fontSize:13,color:"#1A4971",lineHeight:1.6}}>{dim.insight}</div>
          </div>
          {dim.asms.length > 0 && (
            <div style={{background:T.alt,borderRadius:12,padding:"18px 20px",marginBottom:14}}>
              <div style={{fontSize:10,fontWeight:700,color:T.ink4,textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>Tests Assumptions</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{dim.asms.map(a => <span key={a} style={{fontFamily:m,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:4,background:T.surface,border:`1px solid ${T.border}`,color:T.ink3}}>{a}</span>)}</div>
            </div>
          )}
          {dim.regional && (
            <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:"18px 20px"}}>
              <div style={{fontSize:10,fontWeight:700,color:T.ink4,textTransform:"uppercase",letterSpacing:.8,marginBottom:10}}>Regional View</div>
              {dim.regional.map((r,i) => (
                <div key={i} style={{padding:"6px 0",borderBottom:i<dim.regional.length-1?`1px solid ${T.border}`:"none",fontSize:12,color:T.ink3}}>{r}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function OKRPage() {
  return (
    <div>
      <h2 style={{fontSize:28,fontWeight:700,color:T.ink,letterSpacing:-.5,marginBottom:6}}>OKR Progress</h2>
      <p style={{fontSize:14,color:T.ink3,marginBottom:28,maxWidth:620}}>Progress against the 2026 Investment Memo commitments.</p>
      {OKRS.map((obj,oi) => (
        <div key={oi} style={{marginBottom:22}}>
          <div style={{fontSize:12,fontWeight:700,color:T.ink,padding:"10px 16px",background:T.alt,borderRadius:"12px 12px 0 0",border:`1px solid ${T.border}`,borderBottom:"none"}}>{obj.obj}</div>
          <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:"0 0 12px 12px"}}>
            {obj.krs.map((kr,ki) => (
              <div key={ki} style={{padding:"14px 18px",borderBottom:ki<obj.krs.length-1?`1px solid ${T.border}`:"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <span style={{fontFamily:m,fontSize:10,fontWeight:700,color:T.ink4}}>{kr.id}</span>
                  <Pill s={kr.s} />
                  <span style={{fontSize:12,fontWeight:600,color:T.ink}}>{kr.l}</span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  {[{h:"Current",v:kr.c},{h:"Mid-point",v:kr.mi},{h:"End-point",v:kr.e}].map((c,ci) => (
                    <div key={ci} style={{background:T.alt,borderRadius:8,padding:"8px 10px"}}>
                      <div style={{fontSize:9,fontWeight:700,color:T.ink4,textTransform:"uppercase",letterSpacing:.5,marginBottom:2}}>{c.h}</div>
                      <div style={{fontSize:11,color:T.ink2,lineHeight:1.4}}>{c.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:10,color:T.ink4,marginTop:6,fontStyle:"italic"}}>{kr.n}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExpsPage() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <h2 style={{fontSize:28,fontWeight:700,color:T.ink,letterSpacing:-.5,marginBottom:6}}>Experiments</h2>
      <p style={{fontSize:14,color:T.ink3,marginBottom:28,maxWidth:620}}>Two active experiments testing the existential assumptions behind the 2026 strategy.</p>
      {EXPS.map(e => {
        const isO = open === e.id;
        return (
          <div key={e.id} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,marginBottom:14,overflow:"hidden"}}>
            <div onClick={() => setOpen(isO ? null : e.id)} style={{padding:"18px 22px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"start"}}>
              <div>
                <div style={{fontSize:18,fontWeight:700,color:T.ink,letterSpacing:-.3}}>{e.title}</div>
                <div style={{fontSize:12,color:T.ink4,marginTop:2}}>{e.sub}</div>
              </div>
              <span style={{fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:99,color:e.stC,background:sBg(e.st === "In field" ? "amber" : "green")}}>{e.st}</span>
            </div>
            {isO && (
              <div style={{borderTop:`1px solid ${T.border}`,padding:22}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
                  <div style={{background:T.pS,borderRadius:10,padding:"14px 16px"}}>
                    <div style={{fontSize:10,fontWeight:700,color:T.p,textTransform:"uppercase",letterSpacing:.5,marginBottom:5}}>What</div>
                    <div style={{fontSize:13,color:"#3B2171",lineHeight:1.6}}>{e.what}</div>
                  </div>
                  <div style={{background:"#FFF8F0",borderRadius:10,padding:"14px 16px"}}>
                    <div style={{fontSize:10,fontWeight:700,color:"#8B6914",textTransform:"uppercase",letterSpacing:.5,marginBottom:5}}>Why</div>
                    <div style={{fontSize:13,color:"#6B4F10",lineHeight:1.6}}>{e.why}</div>
                  </div>
                </div>
                <div style={{background:T.alt,borderRadius:10,padding:"14px 16px",marginBottom:14}}>
                  <div style={{fontSize:10,fontWeight:700,color:T.ink4,marginBottom:3}}>Design</div>
                  <div style={{fontSize:12,color:T.ink2,lineHeight:1.5}}>{e.design}</div>
                </div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:16}}>
                  {e.asms.map((a,i) => <span key={i} style={{fontFamily:m,fontSize:9,fontWeight:600,padding:"3px 8px",borderRadius:4,background:T.pS,color:T.p}}>{a}</span>)}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
                  <div>
                    <div style={{fontSize:10,fontWeight:700,color:T.g,textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>Success Criteria</div>
                    {e.success.map((s,i) => (
                      <div key={i} style={{background:T.gS,borderRadius:6,padding:"8px 10px",marginBottom:3}}>
                        <div style={{fontSize:11,color:"#14532D"}}>{s.c}</div>
                        <div style={{fontFamily:m,fontSize:9,fontWeight:700,color:T.g,marginTop:2}}>{s.th}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{fontSize:10,fontWeight:700,color:T.r,textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>Failure</div>
                    <div style={{background:T.rS,borderRadius:6,padding:"10px 12px",fontSize:11,color:"#7F1D1D",lineHeight:1.5,marginBottom:12}}>{e.fail}</div>
                    <div style={{fontSize:10,fontWeight:700,color:T.b,textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>Integration</div>
                    <div style={{background:T.bS,borderRadius:6,padding:"10px 12px",fontSize:11,color:"#1A4971",lineHeight:1.5}}>{e.integ}</div>
                  </div>
                </div>
                <div style={{fontSize:10,fontWeight:700,color:T.ink4,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Timeline</div>
                <div style={{marginBottom:16}}>
                  {e.tl.map((n,i) => (
                    <div key={i} style={{display:"flex",gap:10,marginBottom:8}}>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:12,flexShrink:0}}>
                        <div style={{width:8,height:8,borderRadius:99,background:n.s==="done"?T.g:n.s==="active"?T.a:T.ink5}} />
                        {i < e.tl.length-1 && <div style={{width:1,flex:1,background:T.border,marginTop:2}} />}
                      </div>
                      <div>
                        <span style={{fontSize:12,fontWeight:700,color:T.ink}}>{n.p}</span>
                        <span style={{fontSize:10,color:T.ink4,marginLeft:6}}>{n.t}</span>
                        <div style={{fontSize:11,color:T.ink3,marginTop:1}}>{n.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:10,fontWeight:700,color:T.ink4,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Findings</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
                  {e.find.map((f,i) => (
                    <div key={i} style={{background:f.ty==="+"?T.gS:T.aS,borderRadius:6,padding:"8px 10px"}}>
                      <div style={{fontSize:9,fontWeight:700,color:f.ty==="+"?T.g:T.a,textTransform:"uppercase",marginBottom:2}}>{f.ty==="+"?"Positive":"Risk"}</div>
                      <div style={{fontSize:11,color:T.ink2,lineHeight:1.4}}>{f.x}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function AsmPage() {
  const vl = ASMS.filter(a=>a.v).length;
  const ts = ASMS.filter(a=>!a.v && a.c!=="Low").length;
  const ut = ASMS.filter(a=>a.c==="Low").length;
  return (
    <div>
      <h2 style={{fontSize:28,fontWeight:700,color:T.ink,letterSpacing:-.5,marginBottom:6}}>Assumptions & Learning</h2>
      <p style={{fontSize:14,color:T.ink3,marginBottom:28,maxWidth:620}}>What we validated, what we are testing, and what new questions emerged.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:28}}>
        {[{l:"Validated",n:vl,c:T.g,bg:T.gS},{l:"In Progress",n:ts,c:T.a,bg:T.aS},{l:"Not Tested",n:ut,c:T.r,bg:T.rS},{l:"Emerging Qs",n:EQS.length,c:T.b,bg:T.bS}].map((s,i) => (
          <div key={i} style={{background:s.bg,borderRadius:12,padding:"14px",textAlign:"center"}}>
            <div style={{fontFamily:m,fontSize:28,fontWeight:800,color:s.c}}>{s.n}</div>
            <div style={{fontSize:11,fontWeight:600,color:s.c}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,marginBottom:24}}>
        <div style={{padding:"12px 18px",borderBottom:`1px solid ${T.border}`}}>
          <span style={{fontSize:13,fontWeight:700,color:T.ink}}>All Product Assumptions</span>
        </div>
        {ASMS.map((a,i) => (
          <div key={a.id} style={{display:"grid",gridTemplateColumns:"44px 1fr 76px 68px",gap:8,padding:"9px 18px",alignItems:"center",borderBottom:i<ASMS.length-1?`1px solid ${T.border}`:"none"}}>
            <span style={{fontFamily:m,fontSize:10,fontWeight:700,color:T.ink4}}>{a.id}</span>
            <span style={{fontSize:12,fontWeight:500,color:T.ink2}}>{a.l}</span>
            <span style={{fontFamily:m,fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:99,textAlign:"center",color:a.c==="High"?T.g:a.c==="Medium"?T.a:T.r,background:a.c==="High"?T.gS:a.c==="Medium"?T.aS:T.rS}}>{a.c}</span>
            {a.v ? <span style={{fontSize:9,fontWeight:700,color:T.g}}>{"✓"} Validated</span> : <span style={{fontSize:9,color:T.ink4}}>{"○"} Testing</span>}
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
        <div>
          <h3 style={{fontSize:16,fontWeight:700,color:T.ink,marginBottom:10}}>Emerging Questions</h3>
          {EQS.map((eq,i) => (
            <div key={i} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"12px 14px",marginBottom:8}}>
              <div style={{fontSize:12,color:T.ink2,lineHeight:1.55,fontWeight:500}}>{eq.q}</div>
              <div style={{marginTop:5}}>
                <span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:4,color:eq.p==="High"?T.r:T.a,background:eq.p==="High"?T.rS:T.aS}}>{eq.p}</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3 style={{fontSize:16,fontWeight:700,color:T.ink,marginBottom:10}}>What We Learned</h3>
          {INS.map((ins,i) => (
            <div key={i} style={{background:T.bS,border:`1px solid ${T.bBd}`,borderRadius:10,padding:"12px 14px",marginBottom:8}}>
              <div style={{fontSize:12,color:"#1A4971",lineHeight:1.55}}>{ins.t}</div>
              <div style={{fontSize:10,color:T.b,fontWeight:600,marginTop:5}}>{ins.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("health");
  const [dimV, setDimV] = useState(null);
  const nav = [{k:"health",l:"Product Health",i:"◎"},{k:"okrs",l:"OKR Progress",i:"◈"},{k:"exps",l:"Experiments",i:"◇"},{k:"asms",l:"Assumptions",i:"◆"}];
  const go = k => { setPage(k); setDimV(null); };
  const selDim = DIMS.find(d => d.id === dimV);

  return (
    <div style={{fontFamily:"'Instrument Sans','SF Pro Display',system-ui,sans-serif",display:"flex",minHeight:"100vh",background:T.bg,color:T.ink}}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <nav style={{width:220,background:T.nav,padding:"24px 0",display:"flex",flexDirection:"column",position:"sticky",top:0,height:"100vh",flexShrink:0}}>
        <div style={{padding:"0 20px",marginBottom:30}}>
          <div style={{fontSize:9,fontWeight:700,letterSpacing:2.5,color:T.ink4,textTransform:"uppercase"}}>Educate!</div>
          <div style={{fontSize:16,fontWeight:700,color:"#fff",marginTop:2,letterSpacing:-.3}}>EXP Dashboard</div>
          <div style={{fontSize:10,color:T.ink4,marginTop:4}}>2026 {"·"} End of Term 1</div>
        </div>
        {nav.map(n => (
          <button key={n.k} onClick={() => go(n.k)} style={{
            display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 20px",
            border:"none",cursor:"pointer",textAlign:"left",fontSize:13,
            background:page===n.k ? T.navA : "transparent",
            color:page===n.k ? "#fff" : T.ink4,
            fontWeight:page===n.k ? 700 : 500,
            borderLeft:page===n.k ? `3px solid ${T.accent}` : "3px solid transparent",
            transition:"all .15s",fontFamily:"inherit",
          }}>
            <span style={{fontSize:14,opacity:.6}}>{n.i}</span> {n.l}
          </button>
        ))}
        <div style={{marginTop:"auto",padding:"14px 20px",borderTop:"1px solid #2A2A2A"}}>
          <div style={{fontSize:10,color:T.ink4,lineHeight:1.6}}>36,664 scholars{"\n"}825 schools {"·"} 780 mentors</div>
        </div>
        <div style={{padding:"12px 20px",borderTop:"1px solid #2A2A2A"}}>
          <div style={{fontSize:9,fontWeight:700,color:T.ink4,textTransform:"uppercase",letterSpacing:.8,marginBottom:5}}>Experiments</div>
          <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3}}><Dot s="amber" sz={5}/><span style={{fontSize:9,color:"#888"}}>Growth Mindset: In field</span></div>
          <div style={{display:"flex",alignItems:"center",gap:5}}><Dot s="green" sz={5}/><span style={{fontSize:9,color:"#888"}}>Passbook BML: T1 done</span></div>
        </div>
      </nav>

      <main style={{flex:1,padding:"28px 36px",maxWidth:960,overflow:"auto"}}>
        {page === "health" && !dimV && <HealthGrid onPick={setDimV} />}
        {page === "health" && selDim && <DimDetail dim={selDim} onBack={() => setDimV(null)} />}
        {page === "okrs" && <OKRPage />}
        {page === "exps" && <ExpsPage />}
        {page === "asms" && <AsmPage />}
      </main>
    </div>
  );
}
