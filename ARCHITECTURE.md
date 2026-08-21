# Dire Pay production architecture

The current application is a consumer-product prototype using simulated money only.

## Deployment

Deployment has one source of truth and one production path:

- GitHub repository: `haalukaa/Dire-Pay`
- Production branch: `main`
- Host: Vercel
- Production domain: `dire-pay.vercel.app`
- Entry point: `index.html`
- Project config: `vercel.json`

Do not use GitHub Pages, runtime GitHub HTML loaders, duplicate production projects, or deployments that point to local `/mnt/data` files. Preview deployments are for testing only; production should come from the current `main` commit.

## Production layers

### Identity
- Ethiopian phone number as the primary human identifier
- UUID as the internal user identifier
- OTP verification and device binding
- Unique DireTag
- KYC status and tiered transaction limits

### Ledger
Production balances must be derived from an immutable double-entry ledger, not a mutable balance field.

Core entities: users, wallets, ledger_accounts, journal_entries, journal_lines, payment_intents, transfers, funding_sources, withdrawals, provider_events, audit_events.

Every settled transfer must balance debits and credits exactly.

### Money rail adapter
The product layer should depend on a provider adapter rather than hard-code one payment company. The adapter will eventually cover collection, payout, settlement, reconciliation and signed webhooks with a licensed partner.

### Security
- Encrypt sensitive PII and secrets
- Rate limit OTP and transfer endpoints
- Require idempotency keys on money-moving operations
- Verify and replay-protect provider webhooks
- Apply transaction and velocity limits
- Device/session revocation
- Admin RBAC
- Immutable audit events
- Fraud and risk review queues

### Operations
- Provider reconciliation
- Pending/failed transfer recovery
- Support tooling
- Account restrictions and freezes
- Compliance-reporting hooks
- Observability and alerting
