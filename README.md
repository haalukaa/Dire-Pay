# Dire Pay

Dire Pay is a mobile-first Ethiopian payments experience built around a simple idea: send, receive and manage ETB using a phone number or DireTag.

## v0.1 includes

- Cash-App-inspired mobile interface
- Simulated ETB wallet balance
- Send flow with review and confirmation
- Request-money flow
- Transaction activity feed
- Dire QR receive experience
- Dire Card product preview and lock control
- Profile and security controls
- Local demo persistence
- GitHub Pages-ready static deployment

## Run locally

No build step is required. Serve the repository with any static server, for example:

```bash
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

## Important

This release is a product prototype using simulated money. It does not hold funds, perform KYC, connect to banks or wallets, or execute regulated transactions.

See `ARCHITECTURE.md` for the production path covering identity, double-entry ledger, payment-provider adapters, reconciliation, security, fraud controls and compliance operations.

Deployment trigger: GitHub Pages branch publishing is enabled from `main` / `(root)`.
