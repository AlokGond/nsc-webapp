'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface TopicCompletionButtonProps {
  slug: string;
}

export default function TopicCompletionButton({ slug }: TopicCompletionButtonProps) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nsc_completed_topics');
      if (stored) {
        const list = JSON.parse(stored);
        if (Array.isArray(list)) {
          setCompleted(list.includes(slug));
        }
      }
    } catch {
      // ignore
    }
  }, [slug]);

  const toggle = () => {
    try {
      const stored = localStorage.getItem('nsc_completed_topics');
      const list: string[] = stored ? JSON.parse(stored) : [];
      let updated: string[];
      if (list.includes(slug)) {
        updated = list.filter(s => s !== slug);
        setCompleted(false);
      } else {
        updated = [...list, slug];
        setCompleted(true);
      }
      localStorage.setItem('nsc_completed_topics', JSON.stringify(updated));
      window.dispatchEvent(new Event('nsc_progress_updated'));
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
        completed
          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/40 shadow-lg shadow-emerald-950/50'
          : 'bg-slate-900 text-slate-300 border border-slate-700 hover:border-cyan-500 hover:text-cyan-300 hover:bg-slate-800'
      }`}
    >
      {completed ? (
        <>
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Topic Completed</span>
        </>
      ) : (
        <>
          <Circle className="h-4 w-4 text-slate-400" />
          <span>Mark as Completed</span>
        </>
      )}
    </button>
  );
}
