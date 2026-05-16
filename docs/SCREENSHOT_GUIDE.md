# Screenshot Guide

Use these screenshots for the DEV Challenge post, README visuals, and demo collateral.

## Setup

Start the dashboard locally:

```powershell
cd C:\NEXA\hermes-guard
npm run dev
```

Open the local Vite URL, usually:

```text
http://127.0.0.1:5173
```

Use a desktop browser window around `1440 x 1000` for the main shots. Use a narrow mobile-sized viewport only if you want to show responsive behavior.

## 1. Dashboard Overview

Capture the full first screen with all three major areas visible:

- Left: scanned repo tree.
- Center: activity feed.
- Right: risk summary and first finding cards.

Suggested filename:

```text
screenshots/01-dashboard-overview.png
```

What the screenshot should communicate:

- Hermes Guard is a polished security dashboard.
- The target is `demo-repo`.
- The scan posture is `Critical`.
- The product is local-first and deterministic.

## 2. Repo Tree

Crop the left panel showing:

- `demo-repo`.
- `AGENTS.md`.
- `.env.example`.
- `.github/workflows/agent.yml`.
- `prompts/system-prompt.md`.
- `scripts/dangerous-agent-runner.js`.

Suggested filename:

```text
screenshots/02-repo-tree.png
```

What the screenshot should communicate:

- Hermes Guard scans repo files that influence agent behavior.
- The demo repo includes prompts, workflows, scripts, and agent instructions.

## 3. Activity Feed

Crop the center panel showing:

- `Deterministic scan timeline`.
- Hermes runtime stub note.
- `Repository opened`.
- `Rules loaded`.
- `Hermes adapter checked`.
- `Evidence captured`.
- `Reports ready`.

Suggested filename:

```text
screenshots/03-activity-feed.png
```

What the screenshot should communicate:

- The MVP does not claim real Hermes Agent execution.
- The adapter is Hermes-ready but currently in stub mode.
- The scanner is deterministic and local.

## 4. Risk Summary

Crop the top of the right panel showing:

- `Critical` risk posture.
- `100/100` risk score.
- `19` findings.
- `6` files scanned.
- Severity counts.
- `Generate Report` button.

Suggested filename:

```text
screenshots/04-risk-summary.png
```

What the screenshot should communicate:

- The output is reviewable at a glance.
- Severity counts make the report easy to triage.

## 5. Finding Card

Capture one complete finding card, preferably:

```text
HG-003-1: Unrestricted shell execution
```

Include:

- Rule ID.
- Severity badge.
- File path and line number.
- Evidence snippet.
- Why it matters.
- Recommended fix.

Suggested filename:

```text
screenshots/05-finding-card.png
```

What the screenshot should communicate:

- Findings are evidence-backed.
- A reviewer can verify the result without trusting a black box.

## 6. Generated Markdown Report

Run the scanner:

```powershell
npm run scan
```

Open:

```text
reports/hermes-guard-report.md
```

Capture:

- Report title.
- Summary section.
- Severity counts.
- At least one finding with evidence.

Suggested filename:

```text
screenshots/06-markdown-report.png
```

What the screenshot should communicate:

- Hermes Guard produces a portable report outside the dashboard.
- The report can be reviewed, shared, or attached to a submission.

## Capture Notes

- Do not show private repositories or real secrets.
- Use only the included `demo-repo`.
- Keep the browser zoom at `100%`.
- Prefer clean crops with readable text.
- Avoid screenshots that imply Hermes Agent is running. Use the visible stub-mode wording when showing Hermes integration.
