import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { enrichFindingsWithHermes } from "./hermesAdapter.js";
import { rules, severityOrder } from "./rules.js";
import { writeReports } from "./reportWriter.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const defaultTarget = path.join(projectRoot, "demo-repo");
const defaultReportsDir = path.join(projectRoot, "reports");

const ignoredDirectories = new Set(["node_modules", ".git", "dist", "build", "reports"]);
const textExtensions = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".json",
  ".md",
  ".yml",
  ".yaml",
  ".env",
  ".example",
  ".txt",
  ".sh",
  ".ps1",
]);
const maxFileBytes = 512 * 1024;

async function main() {
  const targetArg = process.argv[2];
  const target = path.resolve(targetArg || defaultTarget);
  const report = await scanRepository(target);
  const written = await writeReports(report, defaultReportsDir);

  console.log(`Hermes Guard scanned ${report.summary.filesScanned} files.`);
  console.log(`Risk posture: ${report.summary.riskPosture} (${report.summary.riskScore}/100)`);
  console.log(`Findings: ${report.summary.findingCount}`);
  console.log(`JSON report: ${written.jsonPath}`);
  console.log(`Markdown report: ${written.markdownPath}`);
}

export async function scanRepository(target) {
  const files = await listFiles(target);
  const findings = [];

  for (const absolutePath of files) {
    const relativePath = path.relative(target, absolutePath).split(path.sep).join("/");
    const contents = await readFile(absolutePath, "utf8");
    findings.push(...scanFile(relativePath, contents));
  }

  findings.sort((a, b) => {
    const severityDelta = severityOrder[b.severity] - severityOrder[a.severity];
    if (severityDelta !== 0) return severityDelta;
    return `${a.filePath}:${a.lineNumber}`.localeCompare(`${b.filePath}:${b.lineNumber}`);
  });

  const hermes = await enrichFindingsWithHermes(findings);
  const severityCounts = countBySeverity(findings);
  const riskScore = calculateRiskScore(severityCounts);

  return {
    tool: "Hermes Guard",
    generatedAt: new Date().toISOString(),
    target,
    summary: {
      riskPosture: postureFromScore(riskScore),
      riskScore,
      filesScanned: files.length,
      findingCount: findings.length,
      severityCounts,
    },
    hermes: {
      status: hermes.status,
      notes: hermes.notes,
    },
    findings,
  };
}

function scanFile(filePath, contents) {
  const lines = contents.split(/\r?\n/);
  const findings = [];

  for (const rule of rules) {
    const fileMatches = [];

    lines.forEach((line, index) => {
      const matched = rule.patterns.some((pattern) => pattern.test(line));
      if (!matched) return;

      fileMatches.push({
        id: `${rule.id}-${fileMatches.length + 1}`,
        ruleId: rule.id,
        title: rule.title,
        severity: rule.severity,
        filePath,
        lineNumber: index + 1,
        evidence: line.trim(),
        whyItMatters: rule.why,
        recommendedFix: rule.fix,
      });
    });

    if (rule.requireAnyGroup && fileMatches.length < 2) {
      continue;
    }

    findings.push(...fileMatches);
  }

  return findings;
}

async function listFiles(root) {
  const results = [];

  async function walk(current) {
    const entries = await readdir(current, { withFileTypes: true });

    for (const entry of entries) {
      const absolutePath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (!ignoredDirectories.has(entry.name)) {
          await walk(absolutePath);
        }
        continue;
      }

      if (!entry.isFile()) continue;

      const details = await stat(absolutePath);
      if (details.size > maxFileBytes || !isTextFile(absolutePath)) continue;
      results.push(absolutePath);
    }
  }

  await walk(root);
  return results;
}

function isTextFile(filePath) {
  const basename = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  return basename === "AGENTS.md" || basename === ".env.example" || textExtensions.has(ext);
}

function countBySeverity(findings) {
  const counts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
  for (const finding of findings) {
    counts[finding.severity] += 1;
  }
  return counts;
}

function calculateRiskScore(counts) {
  return Math.min(100, counts.Critical * 28 + counts.High * 18 + counts.Medium * 8 + counts.Low * 3);
}

function postureFromScore(score) {
  if (score >= 80) return "Critical";
  if (score >= 50) return "High";
  if (score >= 20) return "Medium";
  if (score > 0) return "Low";
  return "Clean";
}

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || "")) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
