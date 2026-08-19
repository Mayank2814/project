import React from 'react'
import { Cpu, RotateCcw, Database, Activity, Shield, Server, Check } from 'lucide-react'

const FEATURES = [
  {
    icon: Cpu,
    title: 'Sub-2ms Zero-Allocation Scheduler',
    description: 'Engineered with a lock-free task queue and pre-allocated memory pools. Ingests thousands of step transitions per second per core with sub-millisecond overhead.',
    badge: '1.8ms Median'
  },
  {
    icon: RotateCcw,
    title: 'Deterministic State Replay',
    description: 'Every step boundary records an immutable state delta. If a downstream API fails at step 4, retry execution from step 4 without re-running steps 1-3.',
    badge: 'Idempotency: 100%'
  },
  {
    icon: Database,
    title: 'Pluggable Persistence Drivers',
    description: 'Zero vendor or cloud lock-in. Switch storage backends with a single config flag—Memory for unit tests, SQLite for edge nodes, Redis/Postgres for cluster deployment.',
    badge: 'SQLite · Redis · Postgres'
  },
  {
    icon: Activity,
    title: 'Native OpenTelemetry Tracing',
    description: 'FlowForge automatically injects W3C trace contexts into every step invocation. View full pipeline DAGs directly in Grafana, Datadog, or Honeycomb.',
    badge: 'W3C TraceContext'
  },
  {
    icon: Shield,
    title: 'Type-Safe Step Contracts',
    description: 'Full TypeScript type safety across asynchronous step boundaries. Output payload types from Step N are automatically inferred as inputs for Step N+1.',
    badge: 'TS 5.0+ Inferred'
  },
  {
    icon: Server,
    title: 'Embedded Library or Micro-Daemon',
    description: 'Import FlowForge as an npm package inside your existing Node/Bun backend, or run standalone as a lightweight Rust/Go binary daemon.',
    badge: 'Zero External Daemons'
  }
]

export default function FeaturesArchitecture() {
  return (
    <section id="architecture" className="py-14 sm:py-20 bg-[#080c14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px] uppercase tracking-wider">
            <Cpu className="h-3.5 w-3.5" />
            <span>Engine Architecture</span>
          </div>
          <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Built for Engineers Who Hate Black Boxes
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
            FlowForge replaces fragile custom worker scripts and heavy JVM orchestrators with an open, code-first specification.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon
            return (
              <div
                key={i}
                className="rounded-lg border border-slate-800/80 bg-[#060911] p-5 transition-all hover:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div className="text-slate-300">
                    <Icon className="h-4.5 w-4.5 text-cyan-400" />
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="mt-3.5 text-sm font-semibold text-white">
                  {feat.title}
                </h3>

                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Side-by-side Architectural Comparison */}
        <div className="mt-10 rounded-lg border border-slate-800/80 bg-[#050811] p-5 sm:p-6">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4">
            PARADIGM COMPARISON: TRADITIONAL WORKERS VS FLOWFORGE
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            {/* Traditional */}
            <div className="rounded border border-slate-800/80 bg-slate-900/40 p-4">
              <div className="font-semibold text-slate-300 mb-2">Traditional Custom Worker Setup (BullMQ / Celery)</div>
              <ul className="space-y-2 text-slate-400 text-[11px]">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">×</span>
                  <span>Manual retry loops & custom state persistence boilerplate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">×</span>
                  <span>Duplicate side-effects if worker crashes mid-step</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">×</span>
                  <span>High baseline memory overhead (80MB+ per process)</span>
                </li>
              </ul>
            </div>

            {/* FlowForge */}
            <div className="rounded border border-cyan-500/30 bg-cyan-950/20 p-4">
              <div className="font-semibold text-cyan-300 mb-2">
                FlowForge Code-First Spec
              </div>
              <ul className="space-y-2 text-slate-300 text-[11px]">
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Declarative step boundaries with automatic WAL state recording</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>100% deterministic time-travel replay from exact failure step</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Sub-2ms step routing overhead & zero external daemons</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
