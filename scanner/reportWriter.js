import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function writeReports(report, reportsDir) {
  await mkdir(reportsDir, { recursive: true });

  const jsonPath = path.join(reportsDir, "hermes-guard-report.json");
  const markdownPath = path.join(reportsDir, "hermes-guard-report.md");

  await writeFile(jsonPath, JSON.stringify(report, null, 2), "utf8");
  await writeFile(markdownPath, renderMarkdown(report), "utf8");

  return { jsonPath, markdownPath };
}

export function renderMarkdown(report) {
  const lines = [
    "# Hermes Guard Report",
    "",
    `Generated: ${report.generatedAt}`,
    `Target: \`${report.target}\``,
    `Hermes adapter: **${report.hermes.status.mode}**`,
    "",
    "## Summary",
    "",
    `- Risk posture: **${report.summary.riskPosture}**`,
    `- Risk score: **${report.summary.riskScore}/100**`,
    `- Files scanned: **${report.summary.filesScanned}**`,
    `- Findings: **${report.summary.findingCount}**`,
    "",
    "## Severity Counts",
    "",
    `- Critical: **${report.summary.severityCounts.Critical}**`,
    `- High: **${report.summary.severityCounts.High}**`,
    `- Medium: **${report.summary.severityCounts.Medium}**`,
    `- Low: **${report.summary.severityCounts.Low}**`,
    "",
    "## Findings",
    "",
  ];

  if (report.findings.length === 0) {
    lines.push("No matching risk patterns were detected by the local rule set.", "");
  }

  for (const finding of report.findings) {
    lines.push(
      `### ${finding.id}: ${finding.title}`,
      "",
      `Severity: **${finding.severity}**`,
      "",
      `Location: \`${finding.filePath}:${finding.lineNumber}\``,
      "",
      "**Evidence**",
      "",
      "```text",
      finding.evidence,
      "```",
      "",
      "**Why It Matters**",
      "",
      finding.whyItMatters,
      "",
      "**Recommended Fix**",
      "",
      finding.recommendedFix,
      "",
    );
  }

  lines.push(
    "## Hermes Integration Note",
    "",
    report.hermes.status.message,
    "",
    "The integration point is `scanner/hermesAdapter.js`. This MVP does not claim Hermes Agent is running unless a real adapter is connected.",
    "",
  );

  return lines.join("\n");
}
