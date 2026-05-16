import { Shield, TerminalSquare } from "lucide-react";
import { useState } from "react";
import ActivityFeed from "./components/ActivityFeed.jsx";
import FindingCard from "./components/FindingCard.jsx";
import RepoTree from "./components/RepoTree.jsx";
import RiskSummary from "./components/RiskSummary.jsx";
import report from "./data/sampleReport.json";

export default function App() {
  const [reportState, setReportState] = useState("Generate Report");

  function handleGenerateReport() {
    setReportState("Sample Report Loaded");
    window.setTimeout(() => setReportState("Generate Report"), 1800);
  }

  return (
    <main className="min-h-screen px-4 py-5 text-slate-100 sm:px-6 lg:px-8">
      <header className="mx-auto mb-5 flex max-w-[1500px] flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-300/30 bg-emerald-300/10 text-emerald-300 shadow-lg shadow-emerald-950/30">
            <Shield size={23} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Hermes Guard</h1>
            <p className="mt-1 text-sm text-slate-400">
              Local-first risk auditing for repositories touched by AI agents.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-slate-300">
            Target: <span className="text-slate-100">demo-repo</span>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100">
            <TerminalSquare size={16} />
            Deterministic rules
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-5 xl:grid-cols-[280px_minmax(320px,420px)_1fr]">
        <RepoTree files={report.files} />
        <ActivityFeed activity={report.activity} hermes={report.hermes} />
        <section className="min-w-0 space-y-5">
          <RiskSummary
            summary={report.summary}
            reportState={reportState}
            onGenerateReport={handleGenerateReport}
          />
          <div className="space-y-4">
            {report.findings.map((finding) => (
              <FindingCard key={finding.id} finding={finding} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
