'use client';

import React, { useState } from 'react';
import { Code2, Copy, Check, Info } from 'lucide-react';
import { CodeSnippet } from '@/lib/types';

interface CodeSnippetViewProps {
  snippet: CodeSnippet;
}

export default function CodeSnippetView({ snippet }: CodeSnippetViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl overflow-hidden">
      {/* Code Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/70 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-200">
            {snippet.title}
          </span>
          <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] uppercase font-bold text-cyan-400">
            {snippet.language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-md border border-slate-700/80 bg-slate-800/60 px-2 py-1 text-[11px] font-mono text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
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

      {/* Code Body */}
      <div className="overflow-x-auto p-4 sm:p-5 bg-slate-950 text-slate-200 font-mono text-xs sm:text-[13px] leading-relaxed selection:bg-cyan-500/30 selection:text-cyan-200">
        <pre>{snippet.code.trim()}</pre>
      </div>

      {/* Explanation Footer Callout */}
      {snippet.explanation && (
        <div className="flex items-start gap-2.5 border-t border-slate-800/80 bg-slate-900/40 p-3.5 text-xs text-slate-300">
          <Info className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
          <p>{snippet.explanation}</p>
        </div>
      )}
    </div>
  );
}
