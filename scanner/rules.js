export const rules = [
  {
    id: "HG-001",
    title: "Fake or exposed API-key-like string",
    severity: "Critical",
    patterns: [
      /(?:api[_-]?key|token|secret|password)\s*[:=]\s*["'](?:fake|demo|test|sample)[A-Za-z0-9_\-]{8,}["']/i,
      /(?:sk|ghp|xoxb|AKIA|AIza)[A-Za-z0-9_\-]{12,}/,
    ],
    why:
      "Agentic automation often sends prompts, logs, and context to tools. Even fake-looking secrets teach reviewers where real secrets could leak.",
    fix:
      "Keep only placeholders in examples, load real secrets from local environment files, and redact secret-shaped values before logging or prompting.",
  },
  {
    id: "HG-002",
    title: "Prompt injection phrase",
    severity: "High",
    patterns: [/ignore\s+previous\s+instructions/i],
    why:
      "Prompt injection text can override intended agent behavior when copied into system prompts, issue bodies, docs, or automation context.",
    fix:
      "Treat repository text as untrusted input, delimit it from instructions, and add explicit prompt-injection handling to agent workflows.",
  },
  {
    id: "HG-003",
    title: "Unrestricted shell execution",
    severity: "Critical",
    patterns: [
      /child_process\.(exec|execSync)\s*\(/,
      /spawn\s*\([^,\n]+,\s*[^,\n]+,\s*\{[^}]*shell\s*:\s*true/i,
      /shell\s*:\s*true/i,
      /eval\s*\(/,
    ],
    why:
      "Letting model or tool output reach a shell can turn a suggestion into local code execution.",
    fix:
      "Use structured commands, strict allowlists, argument arrays, and human approval before running mutating commands.",
  },
  {
    id: "HG-004",
    title: "Agent approval disabled",
    severity: "High",
    patterns: [/approval_mode\s*:\s*none/i, /approvalMode\s*[:=]\s*["']none["']/i],
    why:
      "Disabling approvals removes the human checkpoint that should protect repository writes, tool calls, and deployments.",
    fix:
      "Require approval for file writes, shell commands, package installs, network calls, pushes, merges, and deployments.",
  },
  {
    id: "HG-005",
    title: "Wildcard tool or file permission",
    severity: "High",
    patterns: [/allow\s*:\s*["']\*["']/i, /"allow"\s*:\s*"\*"/i, /tools\s*:\s*\[\s*["']\*["']\s*\]/i],
    why:
      "Wildcard allow rules make it hard to reason about what an agent can read, write, or execute.",
    fix:
      "Replace wildcard permissions with named tools, scoped paths, and a deny list for secrets, build output, and repository metadata.",
  },
  {
    id: "HG-006",
    title: "Remote script piped into shell",
    severity: "Critical",
    patterns: [/(curl|wget)\b[^\n|]*\|\s*(bash|sh|zsh|powershell|pwsh)/i],
    why:
      "Piping remote content directly into a shell bypasses review and can execute changed code without a local audit trail.",
    fix:
      "Download to a reviewed file, verify integrity, pin sources, and require human approval before execution.",
  },
  {
    id: "HG-007",
    title: "GitHub Actions secrets used by broad agent automation",
    severity: "High",
    patterns: [
      /\$\{\{\s*secrets\.[A-Z0-9_]+\s*\}\}/,
      /agent.*(push|deploy|merge|write|fix)/i,
      /permissions\s*:\s*write/i,
      /permissions\s*:\s*write-all/i,
    ],
    requireAnyGroup: true,
    why:
      "Secrets inside broad automation can let an agent mutate infrastructure or repositories if prompts or tools are compromised.",
    fix:
      "Scope secrets to protected environments, narrow workflow permissions, and keep deploy/write jobs behind manual approval.",
  },
  {
    id: "HG-008",
    title: "Overly broad MCP or tool permission config",
    severity: "Medium",
    patterns: [
      /mcp[\s\S]{0,120}(allow|tools|permissions)[\s\S]{0,80}["']\*["']/i,
      /(tool|server|permission).{0,80}(all|any|unrestricted)/i,
    ],
    why:
      "Broad MCP permissions can expose filesystem, network, browser, or credential capabilities beyond what a repo task needs.",
    fix:
      "Declare the minimal MCP servers and tool calls needed, disable unused tools, and require approvals for sensitive capabilities.",
  },
];

export const severityOrder = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};
