# I Built an AI Agent Risk Auditor for Agentic Repositories

AI coding agents are moving quickly from "suggest a patch" to "touch the repo." They can read files, run tools, create commits, open pull requests, and sometimes trigger deployment workflows.

That shift creates a practical question:

**As AI agents start touching real repositories, who audits the agents?**

Hermes Guard is my answer for this challenge. It is a local-first repo risk auditor for agentic repositories. The MVP scans a repository for risky AI-agent automation patterns and generates evidence-backed Markdown and JSON reports.

## The Problem

Most teams already know how to review application code. Fewer teams have a process for reviewing the automation layer around AI agents:

- What can the agent read?
- What can the agent execute?
- Can it push, merge, or deploy?
- Are secrets exposed to prompts or logs?
- Are tool permissions scoped or wildcarded?
- Can repository text inject instructions into the agent?

These risks often hide in workflow files, prompt files, scripts, and agent policy docs rather than the product code itself.

## What Hermes Guard Does

Hermes Guard scans local files and applies deterministic rules for patterns such as:

- Fake or exposed API-key-like strings.
- `ignore previous instructions` prompt-injection text.
- Unrestricted shell execution.
- `approval_mode: none`.
- `allow: "*"` wildcard access.
- `curl` or `wget` piped into a shell.
- GitHub Actions secrets used by broad agent automation.
- Overly broad MCP or tool permission configuration.

Every finding includes a file path, line number, evidence snippet, why it matters, and a recommended fix.

## Why Local-First Matters

The MVP does not require a paid API and does not send repository contents anywhere. It reads local files, writes local reports, and keeps the logic transparent. That makes it safe to try on sensitive repositories before connecting any optional runtime integration.

## Hermes Agent Integration

Hermes Guard is inspired by Hermes Agent, but it does not claim Hermes is running. The integration is intentionally modular through `scanner/hermesAdapter.js`.

Today, the adapter is a stub. Tomorrow, it can connect to a real Hermes runtime to enrich findings, map risks to policies, or observe agent execution context.

## The Demo

The project includes a synthetic `demo-repo` with safe fake content. Running the scanner produces:

- `reports/hermes-guard-report.json`
- `reports/hermes-guard-report.md`

The React dashboard then presents the same style of data in a dark, professional security-review interface.

## What I Would Build Next

The next iteration would add SARIF output, pull-request diff scanning, suppressions with reviewer justification, local API wiring for live dashboard scans, and real Hermes runtime integration once available.

The core idea remains the same: make agentic automation auditable before it becomes invisible infrastructure.
