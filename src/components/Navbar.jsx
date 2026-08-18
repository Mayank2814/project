import React, { useState } from 'react'
import { Cpu, Terminal, Menu, X, ChevronRight } from 'lucide-react'

function GithubIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export default function Navbar({ onOpenEasterEgg, easterEggTriggerCount, setEasterEggTriggerCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleStatusDotClick = () => {
    const nextCount = easterEggTriggerCount + 1
    setEasterEggTriggerCount(nextCount)
    if (nextCount >= 3) {
      onOpenEasterEgg()
      setEasterEggTriggerCount(0)
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/60 bg-[#080c14]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand & Status Pill */}
        <div className="flex items-center gap-3.5">
          <a href="#" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-700/60 bg-slate-900/90 text-cyan-400 group-hover:border-cyan-500/50 transition-colors">
              <Cpu className="h-4.5 w-4.5" />
            </div>
            <span className="font-mono text-base font-bold tracking-tight text-white">
              FlowForge<span className="text-cyan-400">.</span>
            </span>
          </a>

          <div className="hidden sm:flex items-center gap-2">
            <span className="rounded border border-slate-800 bg-slate-900/60 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-400">
              v1.4.2
            </span>
            
            <button
              onClick={handleStatusDotClick}
              title="Click 3 times to inspect kernel telemetry"
              className="group flex items-center gap-1.5 rounded border border-emerald-500/30 bg-emerald-950/30 px-2 py-0.5 text-[11px] font-mono text-emerald-400 transition-colors hover:border-emerald-500/50"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              </span>
              <span>Ready</span>
            </button>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
          <a href="#demo" className="transition-colors hover:text-white">
            Sandbox
          </a>
          <a href="#architecture" className="transition-colors hover:text-white">
            Architecture
          </a>
          <a href="#docs" className="transition-colors hover:text-white">
            SDK Specs
          </a>
          <a href="#benchmarks" className="transition-colors hover:text-white">
            Benchmarks
          </a>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenEasterEgg}
            className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
            title="Launch Terminal Inspector (Shift + ?)"
          >
            <Terminal className="h-3.5 w-3.5 text-cyan-400" />
            <span>CLI</span>
          </button>
          
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-900/60 text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
            title="GitHub Repository"
          >
            <GithubIcon className="h-4 w-4" />
          </a>

          <a
            href="#demo"
            className="flex items-center gap-1 rounded-md bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-950 transition-all hover:bg-slate-200 shadow-sm"
          >
            <span>Sandbox</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-900/80 text-slate-300 sm:hidden hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-[#080c14] px-4 pt-3 pb-5 sm:hidden">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3 text-xs font-mono">
            <span className="text-slate-400">STATUS: ENGINE_READY</span>
            <button
              onClick={handleStatusDotClick}
              className="text-emerald-400 flex items-center gap-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              v1.4.2
            </button>
          </div>
          
          <div className="flex flex-col gap-2.5 text-sm text-slate-200">
            <a
              href="#demo"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 transition-colors hover:text-cyan-400"
            >
              Live Sandbox
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 transition-colors hover:text-cyan-400"
            >
              Architecture
            </a>
            <a
              href="#docs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 transition-colors hover:text-cyan-400"
            >
              SDK Specs
            </a>
            <a
              href="#benchmarks"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 transition-colors hover:text-cyan-400"
            >
              Benchmarks
            </a>
            
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenEasterEgg()
                }}
                className="w-full flex items-center justify-center gap-2 rounded-md border border-slate-800 bg-slate-900 py-2 font-mono text-xs text-slate-200"
              >
                <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                <span>Launch CLI Shell</span>
              </button>
              
              <a
                href="#demo"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center rounded-md bg-white py-2 text-xs font-semibold text-slate-950"
              >
                Try Sandbox Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
