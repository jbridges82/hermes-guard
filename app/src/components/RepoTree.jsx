import { FileCode2, FolderClosed, ShieldCheck } from "lucide-react";

export default function RepoTree({ files }) {
  return (
    <aside className="min-h-0 rounded-lg border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-black/30">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
            Local Target
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">demo-repo</h2>
        </div>
        <div className="rounded-md border border-emerald-400/30 bg-emerald-400/10 p-2 text-emerald-300">
          <ShieldCheck size={18} />
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300">
        <FolderClosed size={16} className="text-cyan-300" />
        <span className="truncate">hermes-guard/demo-repo</span>
      </div>

      <div className="space-y-1">
        {files.map((file) => (
          <div
            key={file}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-white/[0.04]"
          >
            <FileCode2 size={15} className="shrink-0 text-slate-500" />
            <span className="truncate">{file}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
