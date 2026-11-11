import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
  AlertTriangle,
  Code2,
  Layers,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { units, getUnitById, getTopicBySlug } from '@/lib/data';
import Breadcrumbs from '@/components/Breadcrumbs';
import Sidebar from '@/components/Sidebar';
import DiagramView from '@/components/DiagramView';
import CodeSnippetView from '@/components/CodeSnippetView';
import TopicCompletionButton from '@/components/TopicCompletionButton';

interface PageProps {
  params: Promise<{ id: string; topic: string }>;
}

export function generateStaticParams() {
  const paths: { id: string; topic: string }[] = [];
  for (const unit of units) {
    for (const sub of unit.subtopics) {
      paths.push({
        id: unit.id,
        topic: sub.slug
      });
    }
  }
  return paths;
}

export default async function SubtopicPage({ params }: PageProps) {
  const { id, topic: topicSlug } = await params;
  const unit = getUnitById(id);
  const data = getTopicBySlug(topicSlug);

  if (!unit || !data) {
    notFound();
  }

  const { topic, prevTopic, nextTopic } = data;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row">
      {/* Navigation Sidebar */}
      <Sidebar currentUnitId={unit.id} currentTopicSlug={topic.slug} />

      {/* Main Topic Content Stream */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-4xl mx-auto overflow-hidden">
        {/* Breadcrumb Header */}
        <Breadcrumbs
          items={[
            { label: 'Units', href: '/' },
            { label: `Unit ${unit.number}`, href: `/unit/${unit.id}` },
            { label: topic.title }
          ]}
        />

        {/* Topic Title Header Bar */}
        <div className="mb-8 pb-6 border-b border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-cyan-500/20 px-3 py-1 font-mono text-xs font-bold text-cyan-300 border border-cyan-500/30">
                Unit {unit.number} · Module
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                {unit.title.split('&')[0]}
              </span>
            </div>

            {/* Interactive Mark Completed Button */}
            <TopicCompletionButton slug={topic.slug} />
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {topic.title}
          </h1>

          <p className="text-sm sm:text-base text-cyan-200/80 font-medium">
            {topic.shortDesc}
          </p>
        </div>

        {/* Detailed Academic Explanation (2-4 Paragraphs) */}
        <section className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800/80 pb-2">
            <BookOpen className="h-4 w-4 text-cyan-400" />
            Detailed Theoretical Explanation
          </h2>
          {topic.explanation.map((paragraph, pIdx) => (
            <p key={pIdx} className="text-slate-300">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Visual Diagram Section (ASCII / Styled Schema) */}
        {topic.diagram && (
          <section className="mt-8">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-2">
              <Terminal className="h-4 w-4 text-cyan-400" />
              Architectural & Flow Diagram
            </h2>
            <DiagramView diagram={topic.diagram} />
          </section>
        )}

        {/* Code Snippet Demonstration */}
        {topic.codeSnippet && (
          <section className="mt-8">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-2">
              <Code2 className="h-4 w-4 text-cyan-400" />
              Algorithm & Code Demonstration
            </h2>
            <CodeSnippetView snippet={topic.codeSnippet} />
          </section>
        )}

        {/* Real-World Case Study / Example */}
        {topic.realWorldExample && (
          <section className="my-8 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/30 via-slate-900 to-slate-900 p-5 sm:p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-900/60 text-blue-300 border border-blue-700/50">
                <Lightbulb className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                Real-World Industry Case Study
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-100">
              {topic.realWorldExample.title}
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {topic.realWorldExample.description}
            </p>

            <div className="mt-4 rounded-xl border border-blue-800/40 bg-blue-950/40 p-3 text-xs text-blue-200 flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-white">Impact & Takeaway: </strong>
                {topic.realWorldExample.impact}
              </div>
            </div>
          </section>
        )}

        {/* Key Points / Bullet Summary */}
        <section className="my-8">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Key Points & Exam Takeaways
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topic.keyPoints.map((point, ptIdx) => (
              <div
                key={ptIdx}
                className="flex items-start gap-2.5 rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 text-xs text-slate-300"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Topic Footer Navigation (Prev / Next) */}
        <nav className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevTopic ? (
            <Link
              href={`/unit/${prevTopic.unitId}/${prevTopic.slug}`}
              className="w-full sm:w-auto flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" />
              <div className="text-left">
                <div className="text-[10px] text-slate-500 uppercase">Previous Module</div>
                <div className="truncate max-w-[200px]">{prevTopic.title}</div>
              </div>
            </Link>
          ) : (
            <Link
              href={`/unit/${unit.id}`}
              className="w-full sm:w-auto flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" />
              <span>Unit {unit.number} Overview</span>
            </Link>
          )}

          {nextTopic ? (
            <Link
              href={`/unit/${nextTopic.unitId}/${nextTopic.slug}`}
              className="w-full sm:w-auto flex items-center justify-end gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-4 py-3 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/40 transition-colors"
            >
              <div className="text-right">
                <div className="text-[10px] text-cyan-400/70 uppercase">Next Module</div>
                <div className="truncate max-w-[200px]">{nextTopic.title}</div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          ) : (
            <Link
              href={`/unit/${unit.id}#quiz`}
              className="w-full sm:w-auto flex items-center justify-end gap-2 rounded-xl border border-purple-500/30 bg-purple-950/40 px-4 py-3 text-xs font-semibold text-purple-300 hover:bg-purple-900/40 transition-colors"
            >
              <span>Take Unit {unit.number} Quiz</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          )}
        </nav>
      </main>
    </div>
  );
}
