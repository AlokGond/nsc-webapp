'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import { Diagram } from '@/lib/types';

interface DiagramViewProps {
  diagram: Diagram;
}

export default function DiagramView({ diagram }: DiagramViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(diagram.content.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl border border-cyan-500/20 bg-slate-900/80 shadow-xl overflow-hidden">
      {/* Terminal Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 font-mono text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-cyan-400" />
            {diagram.title}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-md border border-slate-700/80 bg-slate-800/60 px-2 py-1 text-[11px] font-mono text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          title="Copy Diagram Text"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Diagram Canvas */}
      <div className="overflow-x-auto p-4 sm:p-6 bg-slate-950/90 text-cyan-100 font-mono text-xs sm:text-[13px] leading-relaxed selection:bg-cyan-500/30 selection:text-cyan-200">
        <pre className="inline-block min-w-full">{diagram.content.trim()}</pre>
      </div>

      {/* Caption */}
      {diagram.caption && (
        <div className="border-t border-slate-800/80 bg-slate-950/50 px-4 py-2 text-xs text-slate-400 italic">
          Figure: {diagram.caption}
        </div>
      )}
    </div>
  );
}
