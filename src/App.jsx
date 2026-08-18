import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductDemo from './components/ProductDemo'
import FeaturesArchitecture from './components/FeaturesArchitecture'
import DeveloperExperience from './components/DeveloperExperience'
import PerformanceHonesty from './components/PerformanceHonesty'
import Footer from './components/Footer'
import EasterEggModal from './components/EasterEggModal'

export default function App() {
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false)
  const [easterEggTriggerCount, setEasterEggTriggerCount] = useState(0)

  // Konami Code Detection
  useEffect(() => {
    const konamiSequence = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ]
    let konamiIndex = 0

    const handleKeyDown = (e) => {
      // Toggle modal on Shift + ?
      if (e.key === '?' && e.shiftKey) {
        setIsEasterEggOpen(prev => !prev)
        return
      }

      // Check Konami sequence
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      const expectedKey = konamiSequence[konamiIndex].length === 1 
        ? konamiSequence[konamiIndex].toLowerCase() 
        : konamiSequence[konamiIndex]

      if (key === expectedKey) {
        konamiIndex++
        if (konamiIndex === konamiSequence.length) {
          setIsEasterEggOpen(true)
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans selection:bg-cyan-500/25 selection:text-cyan-200">
      
      {/* Top Navbar */}
      <Navbar
        onOpenEasterEgg={() => setIsEasterEggOpen(true)}
        easterEggTriggerCount={easterEggTriggerCount}
        setEasterEggTriggerCount={setEasterEggTriggerCount}
      />

      {/* Main Page Sections */}
      <main>
        {/* 1. Hero Section (3-second visual hook + value prop + quickstart CLI) */}
        <Hero />

        {/* 2. Interactive Product Sandbox Showcase (Core DAG Visualizer + Node Inspector) */}
        <ProductDemo />

        {/* 3. Technical Architecture Breakdown */}
        <FeaturesArchitecture />

        {/* 4. Multi-language Integration Code & Docs */}
        <DeveloperExperience />

        {/* 5. Honest Engine Benchmarks (No fake metrics/logos) */}
        <PerformanceHonesty />
      </main>

      {/* Footer */}
      <Footer onOpenEasterEgg={() => setIsEasterEggOpen(true)} />

      {/* Secret Konami / Console Easter Egg Modal */}
      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />

    </div>
  )
}
