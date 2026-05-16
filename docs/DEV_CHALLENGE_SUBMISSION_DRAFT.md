# I Built an AI Agent Risk Auditor for Agentic Repositories

AI coding agents are crossing an important line.

They are no longer just suggesting code in a chat window. In many developer workflows, agents can inspect repositories, run scripts, edit files, open pull requests, and trigger automation. That is powerful, but it creates a new security question:

**As AI agents start touching real repositories, who audits the agents?**

That question led me to build **Hermes Guard**, a local-first risk auditor for agentic repositories.

Hermes Guard scans a repository for risky AI-agent automation patterns and produces evidence-backed Markdown and JSON reports. It also includes a polished React dashboard for reviewing the scan results.

## The Problem: Repos Now Contain Agent Behavior

Traditional code review focuses on application behavior. Reviewers ask whether a function is correct, whether a dependency is safe, or whether a service handles data properly.

Agentic repositories add another layer.

The risky behavior may not live in product code at all. It may live in:

- `AGENTS.md` instructions.
- Prompt files.
- GitHub Actions workflows.
- MCP server and tool permission config.
- Shell scripts that run agent-generated commands.
- Example environment files that normalize unsafe secret handling.

That means a repository can pass normal review while still allowing an AI agent to run too broadly.

For example:

```yaml
approval_mode: none
allow: "*"
```

Those two lines are not an application bug. They are an automation risk. They tell a reviewer something important about the repo's agent posture.

## What Hermes Guard Does

Hermes Guard is intentionally practical. It does not try to be a black-box AI judge. It uses deterministic local rules and shows evidence for every finding.

The MVP detects patterns such as:

- Fake or exposed API-key-like strings.
- `ignore previous instructions` prompt-injection text.
- Unrestricted shell execution.
- `approval_mode: none`.
- `allow: "*"` wildcard access.
- `curl` or `wget` piped into a shell.
- GitHub Actions secrets used with broad agent automation.
- MCP or tool permission config that appears overly broad.

Each finding includes:

- ID and title.
- Severity.
- File path and line number.
- Evidence snippet.
- Why it matters.
- Recommended fix.

That evidence-first design matters. A reviewer should not have to trust the tool. They should be able to verify the finding immediately.

## Why Local-First Was The Right MVP Choice

The safest way to audit a repository is to avoid sending it anywhere.

Hermes Guard runs locally. The scanner reads files, applies rules, and writes local reports. It does not execute scripts from the scanned repository. It does not require paid APIs. It does not require a hosted backend.

For a security-focused developer tool, that local-first posture is not just convenient. It is part of the product promise.

## Safe By Design

For the challenge submission, I wanted the demo to be safe by default, not just useful.

Hermes Guard never executes repository code. The scanner is read-only: it walks the local file tree, reads text files, applies deterministic rules, and writes Markdown and JSON reports. The architecture is local-first, so the repository does not need to be uploaded to a cloud service to get value from the MVP.

There is also no required cloud dependency. The dashboard runs locally, the scanner runs locally, and the reports are generated locally. The included demo repository contains intentionally fake credentials only, clearly marked as fake placeholders so the project can demonstrate secret-shaped findings without exposing real secrets.

## The Dashboard

The React/Vite dashboard presents the scan as a security review workspace:

- A left panel for the scanned repo tree.
- A center panel for Hermes-style activity.
- A main panel for risk posture, severity counts, and finding cards.

The UI is deliberately serious rather than theatrical. The goal is not to look like a movie terminal. The goal is to help a developer or reviewer quickly understand the repo's agent risk posture.

## Hermes-Inspired, Hermes-Ready

Hermes Guard is inspired by Hermes Agent, but the MVP does not claim Hermes Agent is running.

The integration is modular through:

```text
scanner/hermesAdapter.js
```

Right now, that adapter clearly reports stub mode:

```text
Hermes Agent runtime is not connected. Hermes Guard is running deterministic local rules only.
```

That keeps the project honest. If a real Hermes runtime is available later, the adapter can connect to it without changing the scanner and reporting pipeline.

## How The Demo Works

The project includes a safe synthetic `demo-repo` with risky-looking agent automation patterns. The fake keys are clearly marked as fake, and the scanner never executes the demo scripts.

The basic flow is:

```powershell
npm install
npm run scan
npm run dev
```

The scan produces:

- `reports/hermes-guard-report.json`
- `reports/hermes-guard-report.md`

The dashboard then shows the risk summary and representative findings.

## What I Learned

The interesting part of this project was not writing regular expressions. It was deciding what an "agentic repository" actually means.

A repo is no longer just source code. It can also be a set of permissions, prompts, tools, and automation pathways. Once an agent can act on that repo, those files become part of the system's security boundary.

That boundary needs review.

## What I Would Build Next

The next version of Hermes Guard would add:

- SARIF output for GitHub code scanning.
- Pull request diff scanning.
- Rule suppressions with reviewer justification.
- Live dashboard wiring to the local scanner output.
- Policy profiles for strict, balanced, and advisory scans.
- Real Hermes Agent integration through the existing adapter once a runtime is available.

## Closing

AI agents make repositories more capable. They also make repositories more complex.

Hermes Guard is a small, local-first step toward making that complexity auditable. It gives developers a way to ask, before the agent acts:

**What is this repository allowing an AI agent to do?**

That is the question I think every agentic repo will need to answer.
