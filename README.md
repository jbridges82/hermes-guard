# Hermes Guard

Hermes Guard is a local-first risk auditor for repositories touched by AI agents.

It scans a local repository for risky agent automation patterns, then generates evidence-backed Markdown and JSON reports. The MVP includes a React/Vite dashboard, a deterministic Node.js scanner, a safe synthetic demo repo, and a Hermes-ready adapter boundary for future runtime integration.

> As AI agents start touching real repositories, who audits the agents?

## Why This Exists

AI coding agents are moving beyond chat. They can read source code, call tools, run shell commands, write files, open pull requests, and sometimes trigger CI or deployment workflows.

That creates a new review surface. A repository may look normal at the application-code level while still containing risky agentic automation in:

- `AGENTS.md` or agent policy files.
- Prompt files and system instructions.
- GitHub Actions workflows.
- MCP or tool permission configs.
- Scripts that run model-generated commands.
- Example environment files and logs.

Hermes Guard helps reviewers find those risks before agent automation becomes invisible infrastructure.

## What It Detects

The current deterministic rule engine looks for:

- Fake or exposed API-key-like strings.
- Prompt injection phrases such as `ignore previous instructions`.
- Unrestricted shell execution.
- `approval_mode: none`.
- `allow: "*"` wildcard access.
- `curl` or `wget` piped into a shell.
- GitHub Actions secrets used with broad agent automation.
- MCP or tool permission config that appears overly broad.

Each finding includes:

- Rule ID and title.
- Severity: `Critical`, `High`, `Medium`, or `Low`.
- File path and line number.
- Evidence snippet.
- Why it matters.
- Recommended fix.

## Install And Run

Clone the repo:

```powershell
git clone https://github.com/jbridges82/hermes-guard.git
cd hermes-guard
```

Install dependencies:

```powershell
npm install
```

Run the scanner against the included demo repo:

```powershell
npm run scan
```

Start the dashboard:

```powershell
npm run dev
```

Build the dashboard:

```powershell
npm run build
```

The dashboard runs locally through Vite and reads sample report data from `app/src/data/sampleReport.json`.

## Reports

Running `npm run scan` writes:

- `reports/hermes-guard-report.json`
- `reports/hermes-guard-report.md`

Example summary:

```json
{
  "riskPosture": "Critical",
  "riskScore": 100,
  "filesScanned": 6,
  "findingCount": 19,
  "severityCounts": {
    "Critical": 3,
    "High": 13,
    "Medium": 3,
    "Low": 0
  }
}
```

Example finding:

```json
{
  "id": "HG-004-1",
  "title": "Agent approval disabled",
  "severity": "High",
  "filePath": "AGENTS.md",
  "lineNumber": 5,
  "evidence": "approval_mode: none",
  "whyItMatters": "Disabling approvals removes the human checkpoint that should protect repository writes, tool calls, and deployments.",
  "recommendedFix": "Require approval for file writes, shell commands, package installs, network calls, pushes, merges, and deployments."
}
```

## Local-First Safety

The scanner only reads files. It does not execute scripts from the scanned repository.

The included `demo-repo` uses safe synthetic content and fake placeholders clearly marked as fake. No paid APIs or external services are required for the MVP.

## Hermes-Ready Adapter

Hermes Guard is Hermes-inspired, not a claim of live Hermes Agent execution.

The integration boundary lives in `scanner/hermesAdapter.js`. In this MVP, it reports that Hermes Agent is not connected and that Hermes Guard is running deterministic local rules only. A future Hermes runtime can connect through that adapter to enrich findings, map results to Hermes policies, or observe live agent execution context.

## Project Structure

```text
hermes-guard/
  app/          React + Vite + Tailwind dashboard
  scanner/      Node.js scanner, rules, report writer, Hermes adapter
  demo-repo/    Safe synthetic repository with risky agent patterns
  reports/      Generated Markdown and JSON reports
  docs/         Architecture, submission draft, screenshot guide, demo script
```

## DEV Challenge Angle

Hermes Guard is built as a challenge-ready MVP for the next wave of software development: repositories where AI agents can read, write, run, merge, and deploy.

The submission demonstrates a practical security workflow:

1. Scan an agentic repository locally.
2. Produce evidence-backed reports.
3. Review risk posture in a polished dashboard.
4. Keep Hermes integration modular and honest until a real runtime is connected.

The result is small enough to understand, safe enough to run locally, and clear enough to demo in under a minute.
