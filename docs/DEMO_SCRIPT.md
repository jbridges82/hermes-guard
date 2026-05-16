# 60-Second Demo Script

This script is designed for a short DEV Challenge demo video.

## Goal

Show that Hermes Guard can audit a local agentic repository, produce evidence-backed reports, and stay honest about local-first safety and Hermes adapter status.

## Before Recording

Prepare the project:

```powershell
cd C:\NEXA\hermes-guard
npm install
npm run scan
npm run dev
```

Open the dashboard:

```text
http://127.0.0.1:5173
```

Also have the generated Markdown report ready:

```text
reports/hermes-guard-report.md
```

## Timeline

### 0:00-0:08 - Open Dashboard

Show the Hermes Guard dashboard overview.

Narration:

> This is Hermes Guard, a local-first risk auditor for repositories touched by AI agents.

### 0:08-0:18 - Show Demo Repo

Point to the left repo tree.

Narration:

> The demo repo includes the kinds of files that shape agent behavior: agent instructions, prompts, GitHub Actions, environment examples, and automation scripts.

### 0:18-0:28 - Run The Scanner

Switch to the terminal and run:

```powershell
npm run scan
```

Narration:

> The scanner only reads files. It does not execute scripts from the target repository, and it does not require a paid API or hosted service.

### 0:28-0:38 - Show Critical Risk Posture

Return to the dashboard risk summary.

Narration:

> Hermes Guard found a Critical posture in this synthetic repo, with severity counts and evidence-backed findings.

### 0:38-0:50 - Show A Finding

Open or scroll to the `Unrestricted shell execution` finding card.

Narration:

> Each finding includes a rule ID, severity, file path, line number, evidence snippet, why it matters, and a recommended fix.

### 0:50-0:58 - Open Markdown Report

Open:

```text
reports/hermes-guard-report.md
```

Narration:

> The same scan also generates Markdown and JSON reports, so the output can be reviewed outside the dashboard or used in automation.

### 0:58-1:00 - Close

Return to the dashboard or repo page.

Narration:

> Hermes Guard is Hermes-inspired and Hermes-ready through a clean adapter, but this MVP stays honest: it runs deterministic local rules unless a real Hermes runtime is connected.

## Key Points To Emphasize

- Local-first scanner.
- No external services required for the MVP.
- Scanner reads files only and does not execute demo scripts.
- Hermes integration is a stubbed adapter, not a runtime claim.
- Findings are evidence-backed and reviewer-friendly.

## Avoid Saying

- Do not say Hermes Agent is running.
- Do not imply real secrets are present.
- Do not imply the dashboard is connected to a backend scanner yet.
- Do not claim full security coverage; describe it as an MVP rule-based auditor.
