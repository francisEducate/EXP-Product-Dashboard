# EXP Product Dashboard · 2026

Educate! Experience Program product health dashboard. Tracks delivery fidelity, mentor value exchange, cost efficiency, team culture, product-market fit, experiments, 2026 strategy progress, and assumption validation.

## Deploy to Vercel (one command)

### Option 1: Vercel CLI (fastest)

```bash
# Install Vercel CLI if needed
npm install -g vercel

# From this project folder:
vercel

# Follow prompts, then for production:
vercel --prod
```

You'll get a shareable URL like `https://exp-product-dashboard.vercel.app`

### Option 2: Vercel Dashboard (no CLI)

1. Push this folder to a GitHub repo
2. Go to vercel.com → "Add New Project" → Import repo
3. Framework: Vite (auto-detected) → Deploy

### Option 3: Claude Code

```bash
claude "deploy this project to Vercel"
```

## Local Development

```bash
npm install
npm run dev
```

## Dashboard Tabs

1. **Product Health** — 5 dimensions with expandable sub-metrics
2. **2026 Strategy** — KR progress against Investment Memo
3. **Experiments** — Growth Mindset RCT + Passbook BML
4. **Assumptions & Learning** — Validation status + emerging questions
