# Hermes Guard

Hermes Guard is a local-first agentic repository risk auditor inspired by Hermes Agent.

It scans a repository for risky AI-agent automation patterns and generates evidence-backed Markdown and JSON reports. The core question behind the project is:

> As AI agents start touching real repositories, who audits the agents?

## Why Agentic Repos Need Auditing

AI agents increasingly interact with real repositories through scripts, CI workflows, prompts, tool configs, and MCP servers. That automation layer can accidentally grant broad file access, shell access, secret access, repository write access, or deployment access.

Hermes Guard focuses on those repo-level risk patterns before they become production incidents.

## How To Run

Install dependencies:

```powershell
npm install
```

Run the scanner against the included demo repo:

```powershell
npm run scan
```

Run the dashboard:

```powershell
npm run dev
```

Build the dashboard:

```powershell
npm run build
```

## What It Detects

- Fake or exposed API-key-like strings.
- `ignore previous instructions` prompt-injection text.
- Unrestricted shell execution.
- `approval_mode: none`.
- `allow: "*"` wildcard permissions.
- `curl` or `wget` piped into a shell.
- GitHub Actions secrets used with broad agent automation.
- MCP or tool permission config that appears overly broad.

## Example Output

The scanner writes:

- `reports/hermes-guard-report.json`
- `reports/hermes-guard-report.md`

Example finding shape:

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

## Hermes Agent Integration

Hermes Guard keeps Hermes Agent integration modular in `scanner/hermesAdapter.js`.

This MVP does not claim Hermes Agent is running. If Hermes is unavailable, the scanner works locally with deterministic rules. A future Hermes runtime can connect through the adapter to enrich findings or observe live agent execution context.

## DEV Challenge Angle

Hermes Guard is built for a serious challenge submission: a practical security dashboard and scanner for the new class of repositories where AI agents can read, write, run, merge, and deploy.

The MVP is intentionally local-first, transparent, and safe to run.
