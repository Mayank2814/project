import React from 'react'
import { Cpu, Terminal } from 'lucide-react'

function GithubIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export default function Footer({ onOpenEasterEgg }) {
  return (
    <footer className="border-t border-slate-800 bg-[#050811] py-10 text-slate-400 font-mono text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-7 pb-8 border-b border-slate-800/80">
          
          {/* Brand */}
          <div className="space-y-2 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-cyan-400">
                <Cpu className="h-3.5 w-3.5" />
              </div>
              <span>FlowForge<span className="text-cyan-400">.</span></span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Open-spec workflow orchestration engine for backend infrastructure. Sub-2ms overhead with zero vendor lock-in.
            </p>
            <div className="text-[10px] text-slate-500">
              Licensed under MIT.
            </div>
          </div>

          {/* Sandbox Links */}
          <div>
            <div className="text-slate-200 font-semibold mb-2.5 uppercase tracking-wider text-[10px]">Product Sandbox</div>
            <ul className="space-y-1.5 text-[11px]">
              <li><a href="#demo" className="hover:text-cyan-400 transition-colors">Stripe Order Flow</a></li>
              <li><a href="#demo" className="hover:text-cyan-400 transition-colors">AI Agent Fallback</a></li>
              <li><a href="#demo" className="hover:text-cyan-400 transition-colors">CDC Database Sync</a></li>
              <li><a href="#demo" className="hover:text-cyan-400 transition-colors">Live Node Inspector</a></li>
            </ul>
          </div>

          {/* Architecture Links */}
          <div>
            <div className="text-slate-200 font-semibold mb-2.5 uppercase tracking-wider text-[10px]">Architecture</div>
            <ul className="space-y-1.5 text-[11px]">
              <li><a href="#architecture" className="hover:text-cyan-400 transition-colors">State Replay Engine</a></li>
              <li><a href="#architecture" className="hover:text-cyan-400 transition-colors">Storage Drivers</a></li>
              <li><a href="#architecture" className="hover:text-cyan-400 transition-colors">W3C Telemetry Spec</a></li>
              <li><a href="#benchmarks" className="hover:text-cyan-400 transition-colors">Benchmark Suite</a></li>
            </ul>
          </div>

          {/* CLI Terminal & Easter Egg */}
          <div>
            <div className="text-slate-200 font-semibold mb-2.5 uppercase tracking-wider text-[10px]">Developer Console</div>
            <div className="space-y-2">
              <button
                onClick={onOpenEasterEgg}
                className="w-full flex items-center justify-between rounded border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Launch Debug Shell</span>
                </div>
                <span className="text-[10px] text-slate-400">Shift + ?</span>
              </button>

              <div className="rounded border border-slate-800/60 bg-slate-950 p-2 text-[10px] text-slate-400">
                <span>Easter Egg:</span> Try entering <code className="text-cyan-400 font-bold">↑↑↓↓←→←→BA</code> anywhere on page.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-400">
          <div>
            © 2026 FlowForge Engine Project. Built with craftsmanship for Acdyon Technologies.
          </div>
          <div className="flex items-center gap-4">
            <a href="#demo" className="hover:text-slate-300 transition-colors">Docs</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors flex items-center gap-1">
              <GithubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
