import React, { useState } from 'react'
import { Terminal, Copy, Check, Code2 } from 'lucide-react'

const CODE_EXAMPLES = {
  ts: {
    lang: 'TypeScript / Node.js',
    pkgCommand: 'npm install @flowforge/core',
    filename: 'workflow.ts',
    jsx: (
      <>
        <span className="code-keyword">import</span> &#123; createFlow, MemoryStorage &#125; <span className="code-keyword">from</span> <span className="code-string">'@flowforge/core'</span>;<br/><br/>
        <span className="code-comment">// 1. Initialize FlowEngine instance</span><br/>
        <span className="code-keyword">const</span> flow = <span className="code-function">createFlow</span>(<span className="code-string">'payment-settlement'</span>, &#123;<br/>
        &nbsp;&nbsp;storage: <span className="code-keyword">new</span> <span className="code-type">MemoryStorage</span>(),<br/>
        &nbsp;&nbsp;maxRetries: <span className="code-number">3</span><br/>
        &#125;);<br/><br/>
        <span className="code-comment">// 2. Register step handlers with type inference</span><br/>
        flow<br/>
        &nbsp;&nbsp;.<span className="code-function">step</span>(<span className="code-string">'verify_account'</span>, <span className="code-keyword">async</span> (ctx) =&gt; &#123;<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">const</span> user = <span className="code-keyword">await</span> ctx.db.users.<span className="code-function">findById</span>(ctx.input.userId);<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> &#123; accountId: user.accountId, balance: user.balance &#125;;<br/>
        &nbsp;&nbsp;&#125;)<br/>
        &nbsp;&nbsp;.<span className="code-function">step</span>(<span className="code-string">'debit_funds'</span>, <span className="code-keyword">async</span> (ctx, prev) =&gt; &#123;<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">if</span> (prev.balance &lt; ctx.input.amount) &#123;<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">throw new Error</span>(<span className="code-string">'INSUFFICIENT_FUNDS'</span>);<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">const</span> txn = <span className="code-keyword">await</span> ctx.bank.<span className="code-function">debit</span>(prev.accountId, ctx.input.amount);<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> &#123; txnId: txn.id, status: <span className="code-string">'SETTLED'</span> &#125;;<br/>
        &nbsp;&nbsp;&#125;);<br/><br/>
        <span className="code-comment">// 3. Dispatch execution</span><br/>
        <span className="code-keyword">const</span> result = <span className="code-keyword">await</span> flow.<span className="code-function">execute</span>(&#123; userId: <span className="code-string">'usr_9912'</span>, amount: <span className="code-number">1500</span> &#125;);<br/>
        console.<span className="code-function">log</span>(<span className="code-string">'Execution Result:'</span>, result.state);
      </>
    ),
    rawText: `import { createFlow, MemoryStorage } from '@flowforge/core';

const flow = createFlow('payment-settlement', {
  storage: new MemoryStorage(),
  maxRetries: 3
});

flow
  .step('verify_account', async (ctx) => {
    const user = await ctx.db.users.findById(ctx.input.userId);
    return { accountId: user.accountId, balance: user.balance };
  })
  .step('debit_funds', async (ctx, prev) => {
    if (prev.balance < ctx.input.amount) {
      throw new Error('INSUFFICIENT_FUNDS');
    }
    const txn = await ctx.bank.debit(prev.accountId, ctx.input.amount);
    return { txnId: txn.id, status: 'SETTLED' };
  });

const result = await flow.execute({ userId: 'usr_9912', amount: 1500 });
console.log('Execution Result:', result.state);`
  },
  python: {
    lang: 'Python (3.10+)',
    pkgCommand: 'pip install flowforge-sdk',
    filename: 'workflow.py',
    jsx: (
      <>
        <span className="code-keyword">from</span> flowforge <span className="code-keyword">import</span> FlowEngine, StepContext, MemoryStorage<br/>
        <span className="code-keyword">import</span> asyncio<br/><br/>
        <span className="code-comment"># 1. Instantiate FlowEngine</span><br/>
        engine = <span className="code-function">FlowEngine</span>(<br/>
        &nbsp;&nbsp;name=<span className="code-string">"order_processing"</span>,<br/>
        &nbsp;&nbsp;storage=<span className="code-function">MemoryStorage</span>(),<br/>
        &nbsp;&nbsp;max_retries=<span className="code-number">3</span><br/>
        )<br/><br/>
        <span className="code-comment"># 2. Register step decorators</span><br/>
        @engine.<span className="code-function">step</span>(name=<span className="code-string">"validate_cart"</span>)<br/>
        <span className="code-keyword">async def</span> <span className="code-function">validate_cart</span>(ctx: StepContext):<br/>
        &nbsp;&nbsp;items = ctx.input.<span className="code-function">get</span>(<span className="code-string">"items"</span>, [])<br/>
        &nbsp;&nbsp;<span className="code-keyword">if not</span> items:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">raise</span> ValueError(<span className="code-string">"CART_EMPTY"</span>)<br/>
        &nbsp;&nbsp;<span className="code-keyword">return</span> &#123;<span className="code-string">"total"</span>: <span className="code-function">sum</span>(i[<span className="code-string">"price"</span>] <span className="code-keyword">for</span> i <span className="code-keyword">in</span> items)&#125;<br/><br/>
        @engine.<span className="code-function">step</span>(name=<span className="code-string">"process_charge"</span>)<br/>
        <span className="code-keyword">async def</span> <span className="code-function">process_charge</span>(ctx: StepContext, prev_state: dict):<br/>
        &nbsp;&nbsp;charge = <span className="code-keyword">await</span> ctx.stripe.<span className="code-function">charge</span>(prev_state[<span className="code-string">"total"</span>])<br/>
        &nbsp;&nbsp;<span className="code-keyword">return</span> &#123;<span className="code-string">"charge_id"</span>: charge.id, <span className="code-string">"status"</span>: <span className="code-string">"CONFIRMED"</span>&#125;<br/><br/>
        <span className="code-keyword">if</span> __name__ == <span className="code-string">"__main__"</span>:<br/>
        &nbsp;&nbsp;result = asyncio.<span className="code-function">run</span>(engine.<span className="code-function">execute</span>(&#123;<span className="code-string">"items"</span>: [&#123;<span className="code-string">"price"</span>: <span className="code-number">4900</span>&#125;]&#125;))<br/>
        &nbsp;&nbsp;<span className="code-function">print</span>(<span className="code-string">"Output:"</span>, result.payload)
      </>
    ),
    rawText: `from flowforge import FlowEngine, StepContext, MemoryStorage
import asyncio

engine = FlowEngine(
    name="order_processing",
    storage=MemoryStorage(),
    max_retries=3
)

@engine.step(name="validate_cart")
async def validate_cart(ctx: StepContext):
    items = ctx.input.get("items", [])
    if not items:
        raise ValueError("CART_EMPTY")
    return {"total": sum(i["price"] for i in items)}

@engine.step(name="process_charge")
async def process_charge(ctx: StepContext, prev_state: dict):
    charge = await ctx.stripe.charge(prev_state["total"])
    return {"charge_id": charge.id, "status": "CONFIRMED"}

if __name__ == "__main__":
    result = asyncio.run(engine.execute({"items": [{"price": 4900}]}))
    print("Output:", result.payload)`
  },
  go: {
    lang: 'Go (1.21+)',
    pkgCommand: 'go get github.com/flowforge/flowforge-go',
    filename: 'main.go',
    jsx: (
      <>
        <span className="code-keyword">package</span> main<br/><br/>
        <span className="code-keyword">import</span> (<br/>
        &nbsp;&nbsp;<span className="code-string">"context"</span><br/>
        &nbsp;&nbsp;<span className="code-string">"fmt"</span><br/>
        &nbsp;&nbsp;<span className="code-string">"github.com/flowforge/flowforge-go"</span><br/>
        )<br/><br/>
        <span className="code-keyword">func</span> <span className="code-function">main</span>() &#123;<br/>
        &nbsp;&nbsp;engine := flowforge.<span className="code-function">NewEngine</span>(flowforge.Config&#123;<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;FlowID: <span className="code-string">"user_onboarding"</span>,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;MaxRetries: <span className="code-number">3</span>,<br/>
        &nbsp;&nbsp;&#125;)<br/><br/>
        &nbsp;&nbsp;engine.<span className="code-function">Step</span>(<span className="code-string">"create_auth_user"</span>, <span className="code-keyword">func</span>(ctx context.Context, input <span className="code-keyword">map</span>[<span className="code-keyword">string</span>]<span className="code-keyword">interface</span>&#123;&#125;) (<span className="code-keyword">map</span>[<span className="code-keyword">string</span>]<span className="code-keyword">interface</span>&#123;&#125;, <span className="code-keyword">error</span>) &#123;<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-keyword">map</span>[<span className="code-keyword">string</span>]<span className="code-keyword">interface</span>&#123;&#125;&#123;<span className="code-string">"userID"</span>: <span className="code-string">"usr_771"</span>&#125;, <span className="code-keyword">nil</span><br/>
        &nbsp;&nbsp;&#125;)<br/><br/>
        &nbsp;&nbsp;res, _ := engine.<span className="code-function">Execute</span>(context.<span className="code-function">Background</span>(), <span className="code-keyword">map</span>[<span className="code-keyword">string</span>]<span className="code-keyword">interface</span>&#123;&#125;&#123;<span className="code-string">"email"</span>: <span className="code-string">"dev@acdyon.com"</span>&#125;)<br/>
        &nbsp;&nbsp;fmt.<span className="code-function">Printf</span>(<span className="code-string">"Success: %v\\n"</span>, res.Success)<br/>
        &#125;
      </>
    ),
    rawText: `package main

import (
	"context"
	"fmt"
	"github.com/flowforge/flowforge-go"
)

func main() {
	engine := flowforge.NewEngine(flowforge.Config{
		FlowID:     "user_onboarding",
		MaxRetries: 3,
	})

	engine.Step("create_auth_user", func(ctx context.Context, input map[string]interface{}) (map[string]interface{}, error) {
		return map[string]interface{}{"userID": "usr_771"}, nil
	})

	res, _ := engine.Execute(context.Background(), map[string]interface{}{"email": "dev@acdyon.com"})
	fmt.Printf("Success: %v\n", res.Success)
}`
  },
  curl: {
    lang: 'cURL / REST API',
    pkgCommand: 'curl -X POST https://api.flowforge.dev/v1/flows',
    filename: 'trigger_flow.sh',
    jsx: (
      <>
        <span className="code-comment"># 1. Dispatch execution via HTTP API</span><br/>
        curl -X POST https://api.flowforge.dev/v1/flows/stripe-order-dispatch/execute \<br/>
        &nbsp;&nbsp;-H <span className="code-string">"Authorization: Bearer ff_live_9941a02..."</span> \<br/>
        &nbsp;&nbsp;-H <span className="code-string">"Content-Type: application/json"</span> \<br/>
        &nbsp;&nbsp;-d <span className="code-string">'&#123; "idempotencyKey": "evt_881920194", "payload": &#123; "order_id": "ord_99812", "amount": 4900 &#125; &#125;'</span><br/><br/>
        <span className="code-comment"># Response (HTTP 200 OK):</span><br/>
        <span className="code-comment"># &#123; "executionId": "exec_99182a", "status": "COMPLETED", "durationMs": 1.8 &#125;</span>
      </>
    ),
    rawText: `curl -X POST https://api.flowforge.dev/v1/flows/stripe-order-dispatch/execute \
  -H "Authorization: Bearer ff_live_9941a02..." \
  -H "Content-Type: application/json" \
  -d '{ "idempotencyKey": "evt_881920194", "payload": { "order_id": "ord_99812", "amount": 4900 } }'`
  }
}

export default function DeveloperExperience() {
  const [selectedLang, setSelectedLang] = useState('ts')
  const [copied, setCopied] = useState(false)

  const activeExample = CODE_EXAMPLES[selectedLang]

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeExample.rawText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="docs" className="py-14 sm:py-20 bg-[#070a12] border-t border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px] uppercase tracking-wider">
              <Code2 className="h-3.5 w-3.5" />
              <span>Developer SDK Integration</span>
            </div>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Integrate FlowForge in Under 60 Seconds
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Clean API contracts. Pure code in your native stack.
            </p>
          </div>

          {/* Language Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {Object.keys(CODE_EXAMPLES).map(key => (
              <button
                key={key}
                onClick={() => setSelectedLang(key)}
                className={`rounded border px-3 py-1.5 font-mono text-xs transition-all ${
                  selectedLang === key
                    ? 'border-cyan-500/60 bg-cyan-950/40 text-cyan-300 font-medium'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {CODE_EXAMPLES[key].lang.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Code Block Window */}
        <div className="mt-6 rounded-lg border border-slate-800 bg-[#050811] overflow-hidden shadow-xl">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-[#0a0e18] px-4 py-2.5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-200">
                <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                <span>{activeExample.filename}</span>
              </div>
              <span className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-400">
                {activeExample.pkgCommand}
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 rounded border border-slate-800 bg-slate-900 px-2.5 py-1 font-mono text-xs text-slate-300 hover:border-slate-700 hover:text-white"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Syntax-Highlighted Code Body */}
          <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-200 min-h-[280px]">
            <pre>
              <code>{activeExample.jsx}</code>
            </pre>
          </div>
        </div>

      </div>
    </section>
  )
}
