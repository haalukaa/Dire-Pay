# Dire Pay

Dire Pay is a mobile-first Ethiopian payments prototype built around sending, receiving and managing ETB using a phone number or DireTag.

## Current prototype

- Mobile-first interface
- Simulated ETB wallet balance
- Send and request flows
- Transaction activity
- Dire Card preview
- Profile and security screens

## Deployment architecture

GitHub is the source of truth.

- Production branch: `main`
- Production host: Vercel
- Production URL: `https://dire-pay.vercel.app`
- Static entry point: `/index.html`
- Vercel configuration: `/vercel.json`
- No GitHub Pages deployment
- No runtime loader that fetches HTML from GitHub
- No local-file-path deployments

The intended workflow is:

`change code -> commit to GitHub -> Vercel deploys that commit -> production`

Do not manually replace production with temporary loader pages or files from `/mnt/data`.

## Run locally

No build step is required. Serve the repository with any static server, for example:

```bash
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

## Important

This release is a prototype using simulated money. It does not hold funds, perform KYC, connect to banks or wallets, or execute regulated transactions.

See `ARCHITECTURE.md` for the production path covering identity, double-entry ledger, payment-provider adapters, reconciliation, security, fraud controls and compliance operations.
