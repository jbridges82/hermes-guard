import { Activity, CheckCircle2, Radio } from "lucide-react";

export default function ActivityFeed({ activity, hermes }) {
  return (
    <section className="rounded-lg border border-white/10 bg-slate-950/60 p-4 shadow-2xl shadow-black/20">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
            Agent Activity
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">Deterministic scan timeline</h2>
        </div>
        <Activity className="text-cyan-300" size={19} />
      </div>

      <div className="mb-4 rounded-md border border-amber-300/20 bg-amber-300/8 p-3 text-sm text-amber-100">
        Hermes runtime: <span className="font-semibold">{hermes.status.mode}</span>.{" "}
        {hermes.status.message}
      </div>

      <div className="relative space-y-4">
        <div className="absolute bottom-3 left-[1.15rem] top-3 w-px bg-white/10" />
        {activity.map((item, index) => (
          <div key={`${item.time}-${item.label}`} className="relative flex gap-3">
            <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-emerald-300">
              {index === activity.length - 1 ? <CheckCircle2 size={17} /> : <Radio size={15} />}
            </div>
            <div className="min-w-0 flex-1 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
              <div className="flex items-center justify-between gap-3">
                <h3 className="truncate text-sm font-semibold text-white">{item.label}</h3>
                <span className="text-xs tabular-nums text-slate-500">{item.time}</span>
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-400">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
