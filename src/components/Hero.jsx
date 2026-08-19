import React, { useState } from 'react'
import { Copy, Check, ArrowRight, Zap, ShieldCheck, RefreshCw, Layers } from 'lucide-react'

export default function Hero() {
  const [copied, setCopied] = useState(false)
  const cliCommand = "npx flowforge@latest init"

  const handleCopy = () => {
    navigator.clipboard.writeText(cliCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative overflow-hidden pt-12 pb-14 sm:pt-20 sm:pb-20 bg-grid-pattern">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        
        {/* Monospace Spec Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded border border-slate-800 bg-slate-900/80 px-3 py-1 font-mono text-[11px] text-slate-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
            <span>OPEN SPEC ORCHESTRATION · SUB-2MS OVERHEAD</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="mt-6 text-center max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.12]">
            Code-First Workflows.<br className="hidden sm:inline" /> Zero Infrastructure Lock-in.
          </h1>
          
          <p className="mt-5 text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
            Define, execute, and debug resilient distributed pipelines using TypeScript or JSON specs. FlowForge provides deterministic state replay, automatic retry backoffs, and step-level telemetry without heavy JVM daemons.
          </p>
        </div>

        {/* CLI Command & Primary Actions */}
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          
          {/* CLI Box */}
          <div className="flex w-full sm:w-auto items-center justify-between gap-3 rounded-md border border-slate-800 bg-[#060911] px-3.5 py-2 font-mono text-xs text-slate-200 shadow-inner">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">$</span>
              <span>{cliCommand}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-slate-800 bg-slate-900 text-slate-400 transition-colors hover:border-slate-700 hover:text-white"
              title="Copy quickstart command"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full sm:w-auto items-center gap-2.5">
            <a
              href="#demo"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-md bg-white px-4 py-2 text-xs font-semibold text-slate-950 transition-all hover:bg-slate-200 shadow-sm"
            >
              <span>Launch Sandbox</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            <a
              href="#architecture"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
            >
              <span>Read Specs</span>
            </a>
          </div>
        </div>

        {/* Linear-Style Technical Metrics Row */}
        <div className="mt-14 border-y border-slate-800/80 bg-slate-900/20">
          <div className="grid grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80 sm:grid-cols-4 py-3">
            
            <div className="p-4 sm:p-5 text-left">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                <Zap className="h-3.5 w-3.5 text-cyan-400" />
                <span>Median Overhead</span>
              </div>
              <div className="mt-1.5 font-mono text-xl sm:text-2xl font-bold text-white">&lt; 1.8 ms</div>
              <div className="mt-0.5 text-[11px] text-slate-400">Zero-allocation task router</div>
            </div>

            <div className="p-4 sm:p-5 text-left">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                <span>Vendor Lock-in</span>
              </div>
              <div className="mt-1.5 font-mono text-xl sm:text-2xl font-bold text-white">0%</div>
              <div className="mt-0.5 text-[11px] text-slate-400">SQLite, Redis, Postgres drivers</div>
            </div>

            <div className="p-4 sm:p-5 text-left">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                <RefreshCw className="h-3.5 w-3.5 text-cyan-400" />
                <span>State Replay</span>
              </div>
              <div className="mt-1.5 font-mono text-xl sm:text-2xl font-bold text-white">Idempotent</div>
              <div className="mt-0.5 text-[11px] text-slate-400">Step-boundary state persistence</div>
            </div>

            <div className="p-4 sm:p-5 text-left">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                <Layers className="h-3.5 w-3.5 text-cyan-400" />
                <span>Binary Footprint</span>
              </div>
              <div className="mt-1.5 font-mono text-xl sm:text-2xl font-bold text-white">18.4 KB</div>
              <div className="mt-0.5 text-[11px] text-slate-400">Zero runtime dependencies</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
