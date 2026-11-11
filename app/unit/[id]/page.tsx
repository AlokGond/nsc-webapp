import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Clock,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Shield,
  Layers,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { units, getUnitById } from '@/lib/data';
import Breadcrumbs from '@/components/Breadcrumbs';
import Sidebar from '@/components/Sidebar';
import UnitQuiz from '@/components/UnitQuiz';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return units.map(u => ({ id: u.id }));
}

export default async function UnitPage({ params }: PageProps) {
  const { id } = await params;
  const unit = getUnitById(id);

  if (!unit) {
    notFound();
  }

  // Prev / Next Unit calculation
  const currentIndex = units.findIndex(u => u.id === unit.id);
  const prevUnit = currentIndex > 0 ? units[currentIndex - 1] : undefined;
  const nextUnit = currentIndex < units.length - 1 ? units[currentIndex + 1] : undefined;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row">
      {/* Navigation Sidebar */}
      <Sidebar currentUnitId={unit.id} />

      {/* Main Unit Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-5xl mx-auto overflow-hidden">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Units', href: '/' },
            { label: `Unit ${unit.number}: ${unit.title}` }
          ]}
        />

        {/* Hero Banner with Course Outcome & Hours */}
        <div className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-6 sm:p-8 shadow-2xl overflow-hidden mb-10">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-cyan-500 px-3 py-1 font-mono text-xs font-bold text-slate-950">
                Unit {unit.number}
              </span>
              <span className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-300">
                <Clock className="h-3.5 w-3.5 text-cyan-400" />
                {unit.hours} Lecture Hours
              </span>
              <span className="rounded-full border border-purple-500/40 bg-purple-950/60 px-3 py-1 text-xs font-semibold text-purple-300">
                {unit.badge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {unit.title}
            </h1>

            {/* Course Outcome (CO) Mapping */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-3.5 sm:p-4 text-xs sm:text-sm text-emerald-300 flex items-start gap-3">
              <Sparkles className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block text-emerald-200">
                  Course Learning Outcome Mapping:
                </strong>
                <span>{unit.courseOutcome}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-1">
              {unit.description}
            </p>
          </div>
        </div>

        {/* Subtopics Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-slate-100">
                Unit Subtopics ({unit.subtopics.length} Modules)
              </h2>
            </div>
            <span className="text-xs text-slate-400">Click any card to study</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unit.subtopics.map((topic, index) => (
              <Link
                key={topic.slug}
                href={`/unit/${unit.id}/${topic.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition-all duration-200 hover:border-cyan-500/40 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-cyan-950/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] font-bold text-cyan-400">
                      Module {unit.number}.{index + 1}
                    </span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                      Study Notes
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {topic.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {topic.shortDesc}
                  </p>

                  {/* Bullet Preview */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1">
                    {topic.keyPoints.slice(0, 2).map((kp, kpIdx) => (
                      <div
                        key={kpIdx}
                        className="flex items-center gap-1.5 text-[11px] text-slate-400 truncate"
                      >
                        <span className="h-1 w-1 rounded-full bg-cyan-400 shrink-0" />
                        <span className="truncate">{kp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-cyan-400 font-semibold group-hover:text-cyan-300">
                  <span>Read Full Module & Diagram</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Interactive Knowledge Quiz Section */}
        <UnitQuiz unitNumber={unit.number} questions={unit.quiz} />

        {/* Bottom Unit Pagination Bar */}
        <nav className="mt-12 pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
          {prevUnit ? (
            <Link
              href={`/unit/${prevUnit.id}`}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Unit {prevUnit.number}: {prevUnit.title.split('&')[0]}</span>
            </Link>
          ) : (
            <div />
          )}

          {nextUnit ? (
            <Link
              href={`/unit/${nextUnit.id}`}
              className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-4 py-2.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/40 transition-colors"
            >
              <span>Unit {nextUnit.number}: {nextUnit.title.split('&')[0]}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </main>
    </div>
  );
}
