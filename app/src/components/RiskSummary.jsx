import { AlertTriangle, FileJson2, Gauge, ShieldAlert } from "lucide-react";

const severityStyles = {
  Critical: "border-red-400/30 bg-red-400/10 text-red-200",
  High: "border-orange-300/30 bg-orange-300/10 text-orange-100",
  Medium: "border-cyan-300/30 bg-cyan-300/10 text-cyan-100",
  Low: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
};

export default function RiskSummary({ summary, reportState, onGenerateReport }) {
  return (
    <section className="rounded-lg border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/30">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
            Risk Summary
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">{summary.riskPosture}</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Evidence-backed local scan for agent automation risks across prompts, workflows,
            scripts, and policy files.
          </p>
        </div>
        <button
          onClick={onGenerateReport}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-300 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-200"
        >
          <FileJson2 size={17} />
          {reportState}
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Metric icon={Gauge} label="Risk score" value={`${summary.riskScore}/100`} />
        <Metric icon={ShieldAlert} label="Findings" value={summary.findingCount} />
        <Metric icon={AlertTriangle} label="Files scanned" value={summary.filesScanned} />
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-4">
        {Object.entries(summary.severityCounts).map(([severity, count]) => (
          <div
            key={severity}
            className={`rounded-md border px-3 py-3 ${severityStyles[severity]}`}
          >
            <p className="text-xs font-medium text-current/70">{severity}</p>
            <p className="mt-1 text-2xl font-semibold">{count}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-400">{label}</p>
        <Icon size={17} className="text-slate-500" />
      </div>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
