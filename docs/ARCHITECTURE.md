# Hermes Guard Architecture

Hermes Guard follows a local-first pipeline:

```text
Repo -> Scanner -> Rule Engine -> Hermes Adapter -> Report Writer -> Dashboard
```

## Repo

The target repository is a local folder. The MVP scans `demo-repo` by default, but the scanner can accept another local path. It ignores `node_modules`, `.git`, `dist`, `build`, and `reports`.

## Scanner

`scanner/scan.js` walks the local filesystem and reads text files only. It does not execute files from the scanned repository.

## Rule Engine

`scanner/rules.js` contains deterministic regular-expression rules for risky agent automation patterns such as disabled approvals, wildcard tool access, prompt-injection phrases, exposed fake keys, remote shell installers, and broad GitHub Actions automation.

## Hermes Adapter

`scanner/hermesAdapter.js` is the integration boundary for Hermes Agent. In this MVP it is a clean stub that reports Hermes as unavailable and avoids unsupported runtime claims.

When a Hermes runtime is installed later, this file can be extended to enrich deterministic findings, request runtime context, or map repo risks to Hermes policies.

## Report Writer

`scanner/reportWriter.js` emits both:

- `reports/hermes-guard-report.json`
- `reports/hermes-guard-report.md`

Every finding includes rule ID, title, severity, file path, line number, evidence snippet, why it matters, and a recommended fix.

## Dashboard

The Vite app in `app` renders `app/src/data/sampleReport.json` as a polished security dashboard. The MVP keeps dashboard data static so it can build without a backend service. Future work can wire it to the scanner output or a local API.
