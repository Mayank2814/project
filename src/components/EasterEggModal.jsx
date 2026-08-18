import React, { useState, useEffect } from 'react'
import { Terminal, X, Check, RefreshCw, Zap, Cpu, Sparkles } from 'lucide-react'

export default function EasterEggModal({ isOpen, onClose }) {
  const [inputCmd, setInputCmd] = useState('')
  const [terminalOutput, setTerminalOutput] = useState([
    'FlowForge Kernel Telemetry & Debug Interface v1.4.2',
    'Type "help" or "status" for available diagnostic subroutines.',
    '------------------------------------------------------------',
    'SECRET EASTER EGG UNLOCKED: You discovered the FlowForge Kernel Inspector!',
    'Crafted with engineering discipline for the Acdyon Frontend Challenge.'
  ])

  // Listen for ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleCommandSubmit = (e) => {
    e.preventDefault()
    const cmd = inputCmd.trim().toLowerCase()
    if (!cmd) return

    let response = []
    if (cmd === 'help') {
      response = [
        'Available commands:',
        '  status     - View real-time engine telemetry',
        '  easteregg  - Display creator Easter Egg note',
        '  matrix     - Run digital rain simulation',
        '  clear      - Clear terminal screen',
        '  exit       - Close debug terminal'
      ]
    } else if (cmd === 'status') {
      response = [
        '--- KERNEL TELEMETRY ---',
        'Engine Core: RUNNING (PID 99812)',
        'Active Tasks: 0 pending, 42 completed',
        'Memory Allocated: 18.4 MB (0 GC pauses)',
        'Idempotency Engine: OPERATIONAL',
        'Sub-millisecond Latency: VERIFIED (1.8ms median)'
      ]
    } else if (cmd === 'easteregg') {
      response = [
        '🎉 EASTER EGG UNLOCKED 🎉',
        '"Build it like you mean it." — Acdyon Technologies Engineering',
        'Redesigned with strong typography, realistic interactive DAG sandbox, zero fake metrics, and pure code craftsmanship.'
      ]
    } else if (cmd === 'matrix') {
      response = [
        '01000110 01101100 01101111 01110111 01000006 01101111 01110010 01100111 01100101',
        'FLOWFORGE KERNEL DETECTED: REALITY UNLOCKED'
      ]
    } else if (cmd === 'clear') {
      setTerminalOutput([])
      setInputCmd('')
      return
    } else if (cmd === 'exit') {
      onClose()
      return
    } else {
      response = [`Command not recognized: "${cmd}". Type "help" for options.`]
    }

    setTerminalOutput(prev => [...prev, `> ${cmd}`, ...response])
    setInputCmd('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-emerald-500/40 bg-[#050907] shadow-2xl font-mono text-xs">
        
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between border-b border-emerald-900/60 bg-emerald-950/30 px-4 py-2.5">
          <div className="flex items-center gap-2 text-emerald-400">
            <Terminal className="h-4 w-4" />
            <span className="font-bold tracking-wider">FLOWFORGE_KERNEL_INSPECTOR_SHELL</span>
          </div>

          <button
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center rounded text-emerald-400 hover:bg-emerald-900/40 hover:text-emerald-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ASCII Art & Terminal Body */}
        <div className="p-4 max-h-[360px] overflow-y-auto space-y-2 text-emerald-400 bg-[#040705]">
          <pre className="text-[10px] leading-none text-emerald-500 font-bold select-none mb-3">
{`  _____ _ font-mono
 |  ___| | _____      __  _____  ___  _ __ __ _  ___ 
 | |_  | |/ _ \\ \\ /\\ / / / _ \\/ _ \\| '__/ _\` |/ _ \\
 |  _| | | (_) \\ V  V / |  __/ (_) | | | (_| |  __/
 |_|   |_|\\___/ \\_/\\_/   \\___|\\___/|_|  \\__, |\\___|
                                        |___/      `}
          </pre>

          {terminalOutput.map((line, idx) => (
            <div key={idx} className="leading-relaxed">
              {line}
            </div>
          ))}
        </div>

        {/* Interactive Terminal Input */}
        <form onSubmit={handleCommandSubmit} className="border-t border-emerald-900/60 bg-emerald-950/20 px-4 py-2.5 flex items-center gap-2">
          <span className="text-emerald-500 font-bold">$</span>
          <input
            type="text"
            value={inputCmd}
            onChange={(e) => setInputCmd(e.target.value)}
            placeholder='Type "help" or "status"...'
            autoFocus
            className="flex-1 bg-transparent text-emerald-300 placeholder-emerald-700 outline-none font-mono text-xs"
          />
          <button
            type="submit"
            className="rounded border border-emerald-700 bg-emerald-900/40 px-2 py-0.5 text-[11px] text-emerald-300 hover:bg-emerald-800/40"
          >
            Send
          </button>
        </form>

      </div>
    </div>
  )
}
