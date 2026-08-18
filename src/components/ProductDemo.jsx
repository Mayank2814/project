import React, { useState, useEffect } from 'react'
import { Play, AlertTriangle, RotateCcw, Activity, Layers, Terminal, FileCode, Info, ChevronRight } from 'lucide-react'

// Workflow Presets with Syntax Highlighting HTML/JSX tokens
const WORKFLOW_PRESETS = [
  {
    id: 'stripe-order',
    name: 'Stripe Order Fulfillment',
    specType: 'TS Code',
    description: 'Validates webhook signature, checks inventory lock, charges card, and dispatches fulfillment event.',
    codeTSJSX: (
      <>
        <span className="code-keyword">import</span> &#123; createFlow &#125; <span className="code-keyword">from</span> <span className="code-string">'@flowforge/core'</span>;<br/><br/>
        <span className="code-keyword">export const</span> <span className="code-function">StripeDispatchFlow</span> = <span className="code-function">createFlow</span>(<span className="code-string">'stripe-order-dispatch'</span>, &#123;<br/>
        &nbsp;&nbsp;retries: <span className="code-number">3</span>,<br/>
        &nbsp;&nbsp;backoff: <span className="code-string">'exponential'</span>,<br/>
        &nbsp;&nbsp;timeout: <span className="code-string">'5s'</span>,<br/>
        &#125;)<br/>
        .<span className="code-function">step</span>(<span className="code-string">'validate_signature'</span>, <span className="code-keyword">async</span> (ctx) =&gt; &#123;<br/>
        &nbsp;&nbsp;<span className="code-keyword">const</span> isValid = <span className="code-keyword">await</span> ctx.crypto.<span className="code-function">verifyStripe</span>(ctx.input.headers);<br/>
        &nbsp;&nbsp;<span className="code-keyword">if</span> (!isValid) <span className="code-keyword">throw new Error</span>(<span className="code-string">'INVALID_WEBHOOK_SIGNATURE'</span>);<br/>
        &nbsp;&nbsp;<span className="code-keyword">return</span> &#123; orderId: ctx.input.body.order_id, amount: ctx.input.body.amount &#125;;<br/>
        &#125;)<br/>
        .<span className="code-function">step</span>(<span className="code-string">'lock_inventory'</span>, <span className="code-keyword">async</span> (ctx, prev) =&gt; &#123;<br/>
        &nbsp;&nbsp;<span className="code-keyword">const</span> reserved = <span className="code-keyword">await</span> ctx.db.inventory.<span className="code-function">reserve</span>(prev.orderId);<br/>
        &nbsp;&nbsp;<span className="code-keyword">return</span> &#123; ...prev, reserved &#125;;<br/>
        &#125;)<br/>
        .<span className="code-function">step</span>(<span className="code-string">'charge_payment'</span>, <span className="code-keyword">async</span> (ctx, prev) =&gt; &#123;<br/>
        &nbsp;&nbsp;<span className="code-keyword">const</span> receipt = <span className="code-keyword">await</span> ctx.stripe.charges.<span className="code-function">create</span>(&#123; amount: prev.amount &#125;);<br/>
        &nbsp;&nbsp;<span className="code-keyword">return</span> &#123; ...prev, receiptId: receipt.id, status: <span className="code-string">'PAID'</span> &#125;;<br/>
        &#125;)<br/>
        .<span className="code-function">step</span>(<span className="code-string">'dispatch_fulfillment'</span>, <span className="code-keyword">async</span> (ctx, prev) =&gt; &#123;<br/>
        &nbsp;&nbsp;<span className="code-keyword">await</span> ctx.kafka.<span className="code-function">publish</span>(<span className="code-string">'fulfillment-events'</span>, prev);<br/>
        &nbsp;&nbsp;<span className="code-keyword">return</span> &#123; completed: <span className="code-keyword">true</span>, timestamp: Date.now() &#125;;<br/>
        &#125;);
      </>
    ),
    codeJSONJSX: (
      <>
        &#123;<br/>
        &nbsp;&nbsp;<span className="code-property">"flowId"</span>: <span className="code-string">"stripe-order-dispatch"</span>,<br/>
        &nbsp;&nbsp;<span className="code-property">"version"</span>: <span className="code-string">"1.4.2"</span>,<br/>
        &nbsp;&nbsp;<span className="code-property">"concurrency"</span>: <span className="code-number">50</span>,<br/>
        &nbsp;&nbsp;<span className="code-property">"steps"</span>: [<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&#123; <span className="code-property">"id"</span>: <span className="code-string">"validate_signature"</span>, <span className="code-property">"timeoutMs"</span>: <span className="code-number">500</span>, <span className="code-property">"retry"</span>: &#123; <span className="code-property">"maxAttempts"</span>: <span className="code-number">3</span> &#125; &#125;,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&#123; <span className="code-property">"id"</span>: <span className="code-string">"lock_inventory"</span>, <span className="code-property">"timeoutMs"</span>: <span className="code-number">1200</span>, <span className="code-property">"retry"</span>: &#123; <span className="code-property">"maxAttempts"</span>: <span className="code-number">3</span> &#125; &#125;,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&#123; <span className="code-property">"id"</span>: <span className="code-string">"charge_payment"</span>, <span className="code-property">"timeoutMs"</span>: <span className="code-number">2500</span>, <span className="code-property">"retry"</span>: &#123; <span className="code-property">"maxAttempts"</span>: <span className="code-number">3</span> &#125; &#125;,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&#123; <span className="code-property">"id"</span>: <span className="code-string">"dispatch_fulfillment"</span>, <span className="code-property">"timeoutMs"</span>: <span className="code-number">800</span>, <span className="code-property">"retry"</span>: &#123; <span className="code-property">"maxAttempts"</span>: <span className="code-number">2</span> &#125; &#125;<br/>
        &nbsp;&nbsp;]<br/>
        &#125;
      </>
    ),
    nodes: [
      { id: 'step_1', label: '1. Validate Signature', type: 'VALIDATION', duration: '0.3ms', input: '{\n  "header": "t=172400,v1=a8f9..."\n}', output: '{\n  "valid": true,\n  "orderId": "ord_88192"\n}' },
      { id: 'step_2', label: '2. Lock Inventory', type: 'DATABASE', duration: '1.1ms', input: '{\n  "orderId": "ord_88192",\n  "sku": "SKU-992"\n}', output: '{\n  "reserved": true,\n  "stock": 42\n}' },
      { id: 'step_3', label: '3. Charge Payment', type: 'PAYMENT', duration: '1.4ms', input: '{\n  "amount": 8900,\n  "currency": "usd"\n}', output: '{\n  "receiptId": "ch_3N9...",\n  "status": "PAID"\n}' },
      { id: 'step_4', label: '4. Dispatch Fulfillment', type: 'WEBHOOK', duration: '0.6ms', input: '{\n  "receiptId": "ch_3N9...",\n  "status": "PAID"\n}', output: '{\n  "dispatched": true,\n  "topic": "fulfillment"\n}' }
    ]
  },
  {
    id: 'ai-pipeline',
    name: 'AI Agent Chain & Fallback',
    specType: 'TS Code',
    description: 'Orchestrates multi-LLM step evaluations with fallback mechanisms when latency exceeds thresholds.',
    codeTSJSX: (
      <>
        <span className="code-keyword">import</span> &#123; createFlow &#125; <span className="code-keyword">from</span> <span className="code-string">'@flowforge/core'</span>;<br/><br/>
        <span className="code-keyword">export const</span> <span className="code-function">AIAgentChain</span> = <span className="code-function">createFlow</span>(<span className="code-string">'ai-agent-chain'</span>, &#123; retries: <span className="code-number">2</span> &#125;)<br/>
        .<span className="code-function">step</span>(<span className="code-string">'extract_intent'</span>, <span className="code-keyword">async</span> (ctx) =&gt; &#123;<br/>
        &nbsp;&nbsp;<span className="code-keyword">const</span> intent = <span className="code-keyword">await</span> ctx.ai.<span className="code-function">classify</span>(ctx.input.userPrompt);<br/>
        &nbsp;&nbsp;<span className="code-keyword">return</span> &#123; intent: intent.category, score: intent.score &#125;;<br/>
        &#125;)<br/>
        .<span className="code-function">step</span>(<span className="code-string">'primary_llm_inference'</span>, <span className="code-keyword">async</span> (ctx, prev) =&gt; &#123;<br/>
        &nbsp;&nbsp;<span className="code-keyword">const</span> response = <span className="code-keyword">await</span> ctx.ai.<span className="code-function">generate</span>(&#123; prompt: prev.intent &#125;);<br/>
        &nbsp;&nbsp;<span className="code-keyword">return</span> &#123; text: response.text, tokens: response.usage &#125;;<br/>
        &#125;)<br/>
        .<span className="code-function">step</span>(<span className="code-string">'verify_json_schema'</span>, <span className="code-keyword">async</span> (ctx, prev) =&gt; &#123;<br/>
        &nbsp;&nbsp;<span className="code-keyword">const</span> parsed = ctx.json.<span className="code-function">parseStrict</span>(prev.text);<br/>
        &nbsp;&nbsp;<span className="code-keyword">return</span> &#123; payload: parsed &#125;;<br/>
        &#125;)<br/>
        .<span className="code-function">step</span>(<span className="code-string">'persist_embedding'</span>, <span className="code-keyword">async</span> (ctx, prev) =&gt; &#123;<br/>
        &nbsp;&nbsp;<span className="code-keyword">await</span> ctx.vectorDb.<span className="code-function">upsert</span>(prev.payload);<br/>
        &nbsp;&nbsp;<span className="code-keyword">return</span> &#123; status: <span className="code-string">'STORED'</span> &#125;;<br/>
        &#125;);
      </>
    ),
    codeJSONJSX: (
      <>
        &#123;<br/>
        &nbsp;&nbsp;<span className="code-property">"flowId"</span>: <span className="code-string">"ai-agent-chain"</span>,<br/>
        &nbsp;&nbsp;<span className="code-property">"steps"</span>: [<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&#123; <span className="code-property">"id"</span>: <span className="code-string">"extract_intent"</span>, <span className="code-property">"provider"</span>: <span className="code-string">"claude-3-haiku"</span> &#125;,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&#123; <span className="code-property">"id"</span>: <span className="code-string">"primary_llm_inference"</span>, <span className="code-property">"fallback"</span>: <span className="code-string">"llama3"</span> &#125;,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&#123; <span className="code-property">"id"</span>: <span className="code-string">"verify_json_schema"</span>, <span className="code-property">"enforceSchema"</span>: <span className="code-keyword">true</span> &#125;,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&#123; <span className="code-property">"id"</span>: <span className="code-string">"persist_embedding"</span>, <span className="code-property">"target"</span>: <span className="code-string">"pinecone"</span> &#125;<br/>
        &nbsp;&nbsp;]<br/>
        &#125;
      </>
    ),
    nodes: [
      { id: 'step_1', label: '1. Extract Intent', type: 'CLASSIFICATION', duration: '0.5ms', input: '{\n  "userPrompt": "Refactor query"\n}', output: '{\n  "intent": "code_refactor",\n  "score": 0.98\n}' },
      { id: 'step_2', label: '2. LLM Inference', type: 'LLM_RUNNER', duration: '1.8ms', input: '{\n  "intent": "code_refactor"\n}', output: '{\n  "tokens": 240,\n  "model": "claude-3.5"\n}' },
      { id: 'step_3', label: '3. Verify Schema', type: 'VALIDATION', duration: '0.2ms', input: '{\n  "tokens": 240\n}', output: '{\n  "schemaValid": true\n}' },
      { id: 'step_4', label: '4. Persist Vector', type: 'DATABASE', duration: '0.9ms', input: '{\n  "schemaValid": true\n}', output: '{\n  "status": "STORED",\n  "vec": "v9"\n}' }
    ]
  },
  {
    id: 'db-sync',
    name: 'CDC Database Sync',
    specType: 'TS Code',
    description: 'Captures change-data events from Postgres WAL logs, transforms payload, and pushes metrics to Slack.',
    codeTSJSX: (
      <>
        <span className="code-keyword">import</span> &#123; createFlow &#125; <span className="code-keyword">from</span> <span className="code-string">'@flowforge/core'</span>;<br/><br/>
        <span className="code-keyword">export const</span> <span className="code-function">DBSyncFlow</span> = <span className="code-function">createFlow</span>(<span className="code-string">'db-cdc-sync'</span>, &#123; concurrency: <span className="code-number">100</span> &#125;)<br/>
        .<span className="code-function">step</span>(<span className="code-string">'parse_wal_log'</span>, <span className="code-keyword">async</span> (ctx) =&gt; &#123;<br/>
        &nbsp;&nbsp;<span className="code-keyword">const</span> event = ctx.cdc.<span className="code-function">parseRow</span>(ctx.input.rawWal);<br/>
        &nbsp;&nbsp;<span className="code-keyword">return</span> &#123; table: event.table, record: event.data &#125;;<br/>
        &#125;)<br/>
        .<span className="code-function">step</span>(<span className="code-string">'anonymize_pii'</span>, <span className="code-keyword">async</span> (ctx, prev) =&gt; &#123;<br/>
        &nbsp;&nbsp;<span className="code-keyword">const</span> clean = ctx.crypto.<span className="code-function">maskFields</span>(prev.record, [<span className="code-string">'email'</span>]);<br/>
        &nbsp;&nbsp;<span className="code-keyword">return</span> &#123; ...prev, record: clean &#125;;<br/>
        &#125;)<br/>
        .<span className="code-function">step</span>(<span className="code-string">'sync_search_index'</span>, <span className="code-keyword">async</span> (ctx, prev) =&gt; &#123;<br/>
        &nbsp;&nbsp;<span className="code-keyword">await</span> ctx.elasticsearch.<span className="code-function">index</span>(&#123; id: prev.record.id &#125;);<br/>
        &nbsp;&nbsp;<span className="code-keyword">return</span> &#123; indexed: <span className="code-keyword">true</span> &#125;;<br/>
        &#125;)<br/>
        .<span className="code-function">step</span>(<span className="code-string">'emit_slack_alert'</span>, <span className="code-keyword">async</span> (ctx, prev) =&gt; &#123;<br/>
        &nbsp;&nbsp;<span className="code-keyword">await</span> ctx.slack.<span className="code-function">notify</span>(<span className="code-string">\`Row updated\`</span>);<br/>
        &nbsp;&nbsp;<span className="code-keyword">return</span> &#123; notified: <span className="code-keyword">true</span> &#125;;<br/>
        &#125;);
      </>
    ),
    codeJSONJSX: (
      <>
        &#123;<br/>
        &nbsp;&nbsp;<span className="code-property">"flowId"</span>: <span className="code-string">"db-cdc-sync"</span>,<br/>
        &nbsp;&nbsp;<span className="code-property">"concurrency"</span>: <span className="code-number">100</span>,<br/>
        &nbsp;&nbsp;<span className="code-property">"steps"</span>: [<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&#123; <span className="code-property">"id"</span>: <span className="code-string">"parse_wal_log"</span> &#125;,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&#123; <span className="code-property">"id"</span>: <span className="code-string">"anonymize_pii"</span> &#125;,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&#123; <span className="code-property">"id"</span>: <span className="code-string">"sync_search_index"</span> &#125;,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&#123; <span className="code-property">"id"</span>: <span className="code-string">"emit_slack_alert"</span> &#125;<br/>
        &nbsp;&nbsp;]<br/>
        &#125;
      </>
    ),
    nodes: [
      { id: 'step_1', label: '1. Parse WAL Log', type: 'CDC', duration: '0.2ms', input: '{\n  "table": "users",\n  "op": "UPDATE"\n}', output: '{\n  "table": "users",\n  "rowId": 9912\n}' },
      { id: 'step_2', label: '2. Anonymize PII', type: 'SECURITY', duration: '0.4ms', input: '{\n  "rowId": 9912,\n  "email": "usr@x.com"\n}', output: '{\n  "rowId": 9912,\n  "email": "u***@x.com"\n}' },
      { id: 'step_3', label: '3. Sync Search Index', type: 'DATABASE', duration: '1.2ms', input: '{\n  "rowId": 9912\n}', output: '{\n  "indexed": true\n}' },
      { id: 'step_4', label: '4. Emit Alert', type: 'WEBHOOK', duration: '0.5ms', input: '{\n  "indexed": true\n}', output: '{\n  "notified": true\n}' }
    ]
  }
]

export default function ProductDemo() {
  const [selectedPresetId, setSelectedPresetId] = useState('stripe-order')
  const [viewFormat, setViewFormat] = useState('TS') // 'TS' or 'JSON'
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0)
  
  const [isSimulating, setIsSimulating] = useState(false)
  const [nodeStates, setNodeStates] = useState(['idle', 'idle', 'idle', 'idle'])
  const [logs, setLogs] = useState([
    '[ENGINE] Loaded zero-allocation task scheduler (PID 99812).',
    '[READY] Waiting for workflow execution trigger...'
  ])

  const preset = WORKFLOW_PRESETS.find(p => p.id === selectedPresetId) || WORKFLOW_PRESETS[0]

  useEffect(() => {
    setNodeStates(['idle', 'idle', 'idle', 'idle'])
    setSelectedNodeIndex(0)
    setLogs([
      `[LOADED] Preset workflow: ${preset.name}`,
      '[READY] Ready for execution simulation.'
    ])
  }, [selectedPresetId])

  const handleRunSimulation = (mode = 'normal') => {
    if (isSimulating) return
    setIsSimulating(true)
    setNodeStates(['idle', 'idle', 'idle', 'idle'])
    
    setLogs([
      `[EXEC_START] Dispatching pipeline ${preset.id} (Mode: ${mode.toUpperCase()})`,
      `[WAL_LOG] Idempotency key generated @ timestamp ${new Date().toISOString().slice(11, 19)}`
    ])

    // Step 0
    setTimeout(() => {
      setNodeStates(['success', 'idle', 'idle', 'idle'])
      setLogs(prev => [...prev, `[STEP_1] ${preset.nodes[0].label} finished in ${preset.nodes[0].duration}`])
      
      // Step 1
      setTimeout(() => {
        setNodeStates(['success', 'success', 'idle', 'idle'])
        setLogs(prev => [...prev, `[STEP_2] ${preset.nodes[1].label} finished in ${preset.nodes[1].duration}`])

        // Step 2 Failure Simulation
        if (mode === 'failure') {
          setTimeout(() => {
            setNodeStates(['success', 'success', 'retry_pending', 'idle'])
            setLogs(prev => [
              ...prev,
              `[WARN] Payment gateway timeout at node 3. Retrying attempt 1/3...`
            ])

            setTimeout(() => {
              setNodeStates(['success', 'success', 'success', 'idle'])
              setLogs(prev => [
                ...prev,
                `[RETRY_SUCCESS] Step 3 recovered idempotently! Latency: 1.4ms`
              ])

              // Step 3
              setTimeout(() => {
                setNodeStates(['success', 'success', 'success', 'success'])
                setIsSimulating(false)
                setLogs(prev => [
                  ...prev,
                  `[STEP_4] ${preset.nodes[3].label} finished in ${preset.nodes[3].duration}`,
                  `[FINISH] Execution finished in 4.2ms total (1 retry attempt resolved).`
                ])
              }, 500)
            }, 700)
          }, 500)
        } else {
          // Normal Step 2 & 3
          setTimeout(() => {
            setNodeStates(['success', 'success', 'success', 'idle'])
            setLogs(prev => [...prev, `[STEP_3] ${preset.nodes[2].label} finished in ${preset.nodes[2].duration}`])

            setTimeout(() => {
              setNodeStates(['success', 'success', 'success', 'success'])
              setIsSimulating(false)
              setLogs(prev => [
                ...prev,
                `[STEP_4] ${preset.nodes[3].label} finished in ${preset.nodes[3].duration}`,
                `[FINISH] Pipeline executed with 0 errors in 3.4ms total.`
              ])
            }, 500)
          }, 500)
        }
      }, 500)
    }, 500)
  }

  const handleReset = () => {
    setIsSimulating(false)
    setNodeStates(['idle', 'idle', 'idle', 'idle'])
    setSelectedNodeIndex(0)
    setLogs([
      `[RESET] Pipeline canvas reset to initial state.`,
      `[READY] Waiting for execution trigger...`
    ])
  }

  const selectedNode = preset.nodes[selectedNodeIndex] || preset.nodes[0]

  return (
    <section id="demo" className="py-14 sm:py-20 bg-[#070a12] border-y border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px] uppercase tracking-wider">
              <Activity className="h-3.5 w-3.5" />
              <span>Interactive Product Sandbox</span>
            </div>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Live Pipeline Spec & DAG Visualizer
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Select a workflow spec below. Trigger step execution, simulate retries, and inspect state live.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {WORKFLOW_PRESETS.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPresetId(p.id)}
                className={`rounded border px-3 py-1.5 font-mono text-xs transition-all ${
                  selectedPresetId === p.id
                    ? 'border-cyan-500/60 bg-cyan-950/40 text-cyan-300 font-medium shadow-sm'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left: Code Spec Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col rounded-lg border border-slate-800 bg-[#050811] overflow-hidden shadow-xl">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 bg-[#0a0e18] px-3.5 py-2">
              <div className="flex items-center gap-2">
                <FileCode className="h-3.5 w-3.5 text-cyan-400" />
                <span className="font-mono text-xs font-semibold text-slate-200">
                  {preset.id}.{viewFormat === 'TS' ? 'ts' : 'json'}
                </span>
              </div>

              {/* View Switcher */}
              <div className="flex items-center rounded border border-slate-800 bg-slate-950 p-0.5 font-mono text-[10px]">
                <button
                  onClick={() => setViewFormat('TS')}
                  className={`px-2 py-0.5 rounded ${
                    viewFormat === 'TS' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  TS Code
                </button>
                <button
                  onClick={() => setViewFormat('JSON')}
                  className={`px-2 py-0.5 rounded ${
                    viewFormat === 'JSON' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  JSON Spec
                </button>
              </div>
            </div>

            {/* Info Sub-bar */}
            <div className="bg-slate-900/20 px-3.5 py-1.5 text-[11px] text-slate-400 border-b border-slate-800/50 flex items-center gap-2">
              <Info className="h-3 w-3 text-cyan-400 shrink-0" />
              <span className="truncate">{preset.description}</span>
            </div>

            {/* Code Body */}
            <div className="p-3.5 overflow-x-auto font-mono text-xs leading-relaxed text-slate-300 max-h-[380px] min-h-[330px]">
              <pre>
                <code>{viewFormat === 'TS' ? preset.codeTSJSX : preset.codeJSONJSX}</code>
              </pre>
            </div>
          </div>

          {/* Right: Interactive DAG Canvas & Controls (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* Canvas Panel */}
            <div className="rounded-lg border border-slate-800 bg-[#050811] p-4 sm:p-5 shadow-xl flex flex-col justify-between">
              
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-cyan-400" />
                  <span className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wide">
                    Live DAG Pipeline
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRunSimulation('normal')}
                    disabled={isSimulating}
                    className="flex items-center gap-1 rounded bg-white px-3 py-1.2 font-mono text-xs font-semibold text-slate-950 transition-all hover:bg-slate-200 disabled:opacity-50"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>{isSimulating ? 'Executing...' : 'Run Simulation'}</span>
                  </button>

                  <button
                    onClick={() => handleRunSimulation('failure')}
                    disabled={isSimulating}
                    className="flex items-center gap-1 rounded border border-amber-500/40 bg-amber-500/10 px-3 py-1.2 font-mono text-xs font-medium text-amber-300 hover:border-amber-500/60 disabled:opacity-50"
                    title="Simulate step failure and automatic retry"
                  >
                    <AlertTriangle className="h-3 w-3 text-amber-400" />
                    <span>Test Retry</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex h-6.5 w-6.5 items-center justify-center rounded border border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
                    title="Reset Canvas"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Connected DAG Node Flow */}
              <div className="my-5 grid grid-cols-1 sm:grid-cols-4 gap-2.5 relative">
                {preset.nodes.map((node, idx) => {
                  const state = nodeStates[idx]
                  const isSelected = selectedNodeIndex === idx

                  let statusBorder = 'border-slate-800 bg-slate-900/50 text-slate-400'
                  let statusBadge = 'IDLE'
                  let badgeClass = 'bg-slate-800 text-slate-400'

                  if (state === 'running') {
                    statusBorder = 'border-cyan-400 bg-cyan-950/40 text-cyan-200 shadow-sm'
                    statusBadge = 'RUNNING'
                    badgeClass = 'bg-cyan-400 text-slate-950 font-bold animate-pulse'
                  } else if (state === 'retry_pending') {
                    statusBorder = 'border-amber-500 bg-amber-950/40 text-amber-200'
                    statusBadge = 'RETRYING'
                    badgeClass = 'bg-amber-500 text-slate-950 font-bold'
                  } else if (state === 'success') {
                    statusBorder = 'border-emerald-500/60 bg-emerald-950/30 text-emerald-200'
                    statusBadge = 'SUCCESS'
                    badgeClass = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }

                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNodeIndex(idx)}
                      className={`cursor-pointer rounded border p-2.5 transition-all relative ${statusBorder} ${
                        isSelected ? 'ring-1 ring-cyan-400 ring-offset-1 ring-offset-[#050811]' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span>{node.duration}</span>
                        <span className={`rounded px-1.5 py-0.2 text-[9px] ${badgeClass}`}>
                          {statusBadge}
                        </span>
                      </div>
                      
                      <div className="mt-1.5 text-xs font-semibold text-white leading-tight">
                        {node.label}
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>Step {idx + 1}</span>
                        <span className="uppercase text-cyan-400/90">{node.type}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Node Inspector */}
              <div className="rounded border border-slate-800 bg-slate-900/40 p-3.5 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2.5 text-[11px]">
                  <span className="text-slate-400">
                    NODE INSPECTOR: <span className="text-cyan-300 font-semibold">{selectedNode.label}</span>
                  </span>
                  <span className="text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30 text-[10px]">
                    Latency: {selectedNode.duration}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Input State</div>
                    <pre className="rounded bg-[#03050a] p-2 text-slate-300 border border-slate-800/80 overflow-x-auto text-[11px]">
                      <code>{selectedNode.input}</code>
                    </pre>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Step Delta Output</div>
                    <pre className="rounded bg-[#03050a] p-2 text-cyan-300 border border-slate-800/80 overflow-x-auto text-[11px]">
                      <code>{selectedNode.output}</code>
                    </pre>
                  </div>
                </div>
              </div>

            </div>

            {/* Event Console Logger */}
            <div className="rounded-lg border border-slate-800 bg-[#03050a] p-3.5 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-slate-400 text-[11px]">EVENT_STREAM_LOGGER</span>
                </div>
                <span className="text-[10px] text-slate-400">REALTIME</span>
              </div>

              <div className="space-y-1 max-h-[110px] overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i} className="text-slate-300 flex items-start gap-2 text-[11px]">
                    <span className="text-slate-400 select-none">&gt;</span>
                    <span className={log.includes('WARN') ? 'text-amber-300' : log.includes('SUCCESS') || log.includes('FINISH') ? 'text-emerald-400' : 'text-slate-300'}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
