'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, HelpCircle, Layers } from 'lucide-react';
import { units, Unit } from '@/lib/data';

interface SidebarProps {
  currentUnitId?: string;
  currentTopicSlug?: string;
}

export default function Sidebar({ currentUnitId, currentTopicSlug }: SidebarProps) {
  const pathname = usePathname();
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>(() => {
    // Default expand the current active unit or unit 1
    const initial: Record<string, boolean> = {};
    units.forEach(u => {
      initial[u.id] = u.id === currentUnitId;
    });
    if (!currentUnitId) {
      initial['unit-1'] = true;
    }
    return initial;
  });

  // Load completed topics from localStorage
  useEffect(() => {
    const loadProgress = () => {
      try {
        const stored = localStorage.getItem('nsc_completed_topics');
        if (stored) {
          const list = JSON.parse(stored);
          if (Array.isArray(list)) setCompletedTopics(list);
        }
      } catch {
        // ignore
      }
    };
    loadProgress();
    window.addEventListener('storage', loadProgress);
    window.addEventListener('nsc_progress_updated', loadProgress);
    return () => {
      window.removeEventListener('storage', loadProgress);
      window.removeEventListener('nsc_progress_updated', loadProgress);
    };
  }, []);

  const toggleTopicCompleted = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isCompleted = completedTopics.includes(slug);
    const updated = isCompleted
      ? completedTopics.filter(s => s !== slug)
      : [...completedTopics, slug];
    setCompletedTopics(updated);
    try {
      localStorage.setItem('nsc_completed_topics', JSON.stringify(updated));
      window.dispatchEvent(new Event('nsc_progress_updated'));
    } catch {
      // ignore
    }
  };

  const toggleUnitExpand = (unitId: string) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  return (
    <aside className="w-full shrink-0 lg:w-72 border-b lg:border-b-0 lg:border-r border-slate-800/80 bg-slate-950/60 p-4 lg:p-6 lg:min-h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Course Navigation
          </span>
        </div>
        <span className="text-[11px] font-mono text-cyan-400">
          {completedTopics.length}/45 done
        </span>
      </div>

      <nav className="space-y-3">
        {units.map((unit: Unit) => {
          const isCurrentUnit = unit.id === currentUnitId;
          const isExpanded = expandedUnits[unit.id] ?? isCurrentUnit;
          const unitCompletedCount = unit.subtopics.filter(st =>
            completedTopics.includes(st.slug)
          ).length;

          return (
            <div
              key={unit.id}
              className={`rounded-xl border transition-colors ${
                isCurrentUnit
                  ? 'border-cyan-500/30 bg-slate-900/60'
                  : 'border-slate-800/50 bg-slate-900/20 hover:border-slate-800'
              }`}
            >
              {/* Unit Header Row */}
              <div className="flex items-center justify-between p-2.5">
                <button
                  type="button"
                  onClick={() => toggleUnitExpand(unit.id)}
                  className="flex items-center gap-2 flex-1 text-left min-w-0"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
                  )}
                  <div className="truncate">
                    <span className="text-xs font-semibold text-slate-200 block truncate">
                      Unit {unit.number}: {unit.title.split('&')[0]}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {unit.hours}h · {unitCompletedCount}/{unit.subtopics.length} done
                    </span>
                  </div>
                </button>

                <Link
                  href={`/unit/${unit.id}`}
                  className={`shrink-0 ml-2 rounded-md px-2 py-1 text-[10px] font-medium transition-colors ${
                    pathname === `/unit/${unit.id}`
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-cyan-300 hover:bg-slate-700'
                  }`}
                  title="View Unit Overview"
                >
                  View
                </Link>
              </div>

              {/* Subtopics Accordion Content */}
              {isExpanded && (
                <div className="border-t border-slate-800/60 px-2 py-1.5 space-y-0.5">
                  {unit.subtopics.map(topic => {
                    const isTopicActive = currentTopicSlug === topic.slug;
                    const isDone = completedTopics.includes(topic.slug);

                    return (
                      <div
                        key={topic.slug}
                        className={`group flex items-center justify-between rounded-lg px-2 py-1.5 text-xs transition-colors ${
                          isTopicActive
                            ? 'bg-cyan-950/60 text-cyan-300 font-medium border border-cyan-800/50'
                            : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                        }`}
                      >
                        <Link
                          href={`/unit/${unit.id}/${topic.slug}`}
                          className="flex-1 truncate pr-2"
                        >
                          {topic.title}
                        </Link>

                        <button
                          type="button"
                          onClick={e => toggleTopicCompleted(topic.slug, e)}
                          title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                          className="shrink-0 p-0.5 text-slate-500 hover:text-cyan-400 transition-colors"
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <Circle className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100" />
                          )}
                        </button>
                      </div>
                    );
                  })}

                  {/* Unit Quiz Link */}
                  <Link
                    href={`/unit/${unit.id}#quiz`}
                    className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-purple-300 hover:bg-purple-950/30 transition-colors mt-1"
                  >
                    <HelpCircle className="h-3.5 w-3.5 text-purple-400" />
                    <span>Unit {unit.number} Quiz (3 MCQs)</span>
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
