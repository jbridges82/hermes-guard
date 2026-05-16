import { AlertCircle, CheckSquare, FileWarning } from "lucide-react";

const severityClasses = {
  Critical: "border-red-400/25 bg-red-500/8 text-red-200",
  High: "border-orange-300/25 bg-orange-400/8 text-orange-100",
  Medium: "border-cyan-300/25 bg-cyan-400/8 text-cyan-100",
  Low: "border-emerald-300/25 bg-emerald-400/8 text-emerald-100",
};

export default function FindingCard({ finding }) {
  return (
    <article className="rounded-lg border border-white/10 bg-slate-950/65 p-4 shadow-xl shadow-black/20">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs font-medium text-slate-300">
              {finding.id}
            </span>
            <span
              className={`rounded-md border px-2 py-1 text-xs font-semibold ${severityClasses[finding.severity]}`}
            >
              {finding.severity}
            </span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white">{finding.title}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
            <FileWarning size={16} className="shrink-0 text-slate-500" />
            <span className="truncate">
              {finding.filePath}:{finding.lineNumber}
            </span>
          </div>
        </div>
        <AlertCircle className="shrink-0 text-slate-500" size={20} />
      </div>

      <pre className="mt-4 overflow-x-auto rounded-md border border-white/10 bg-black/30 p-3 text-sm leading-6 text-emerald-100">
        <code>{finding.evidence}</code>
      </pre>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <InfoBlock title="Why it matters" text={finding.whyItMatters} />
        <InfoBlock title="Recommended fix" text={finding.recommendedFix} icon={CheckSquare} />
      </div>
    </article>
  );
}

function InfoBlock({ title, text, icon: Icon = AlertCircle }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.025] p-3">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
        <Icon size={15} className="text-emerald-300" />
        {title}
      </div>
      <p className="text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}
