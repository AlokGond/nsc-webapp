import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Lock,
  KeyRound,
  Binary,
  Cpu,
  Layers,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Clock,
  Sparkles,
  Server,
  Fingerprint
} from 'lucide-react';
import { units, courseInfo } from '@/lib/data';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Academic Course Portal · {courseInfo.code}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Network Security &{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
              Cryptography
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive, rigorous study companion and engineering syllabus portal. Complete notes across mathematical number theory, classical ciphers, DES, AES, RSA, Diffie-Hellman, SHA-256, Kerberos, and network perimeter security.
          </p>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-3xl mx-auto">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 backdrop-blur-md text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">5</div>
              <div className="text-xs font-medium text-slate-400 mt-1">Core Units</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 backdrop-blur-md text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-teal-400">33</div>
              <div className="text-xs font-medium text-slate-400 mt-1">Lecture Hours</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 backdrop-blur-md text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-400">45</div>
              <div className="text-xs font-medium text-slate-400 mt-1">Syllabus Modules</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 backdrop-blur-md text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-400">15</div>
              <div className="text-xs font-medium text-slate-400 mt-1">MCQ Quizzes</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/unit/unit-1"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-[1.02]"
            >
              <BookOpen className="h-4 w-4 text-slate-950" />
              <span>Start Unit 1: Introduction</span>
              <ArrowRight className="h-4 w-4 text-slate-950" />
            </Link>

            <Link
              href="/unit/unit-3"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-cyan-500/50 hover:bg-slate-800 transition-all"
            >
              <Lock className="h-4 w-4 text-cyan-400" />
              <span>Jump to Core Cryptography (Unit 3)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Units Grid Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="h-4 w-4" />
              <span>Curriculum Structure</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              Complete Course Units
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Click any unit card below to study comprehensive theoretical explanations, visual diagrams, code snippets, and review MCQs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit, index) => {
            const icons = [Shield, Binary, Lock, Fingerprint, Server];
            const UnitIcon = icons[index % icons.length];

            return (
              <div
                key={unit.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-cyan-950/40"
              >
                <div>
                  {/* Card Header Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 group-hover:scale-105 transition-transform">
                      <UnitIcon className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-mono text-cyan-300 font-semibold">
                        {unit.hours} Hours
                      </span>
                      <span className="rounded-full bg-cyan-950/60 px-2.5 py-1 text-[11px] font-bold text-cyan-400 border border-cyan-800/40">
                        Unit {unit.number}
                      </span>
                    </div>
                  </div>

                  {/* Title & CO */}
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {unit.title}
                  </h3>
                  <div className="mt-1 text-[11px] font-semibold text-emerald-400">
                    {unit.courseOutcome.split(':')[0]}
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {unit.description}
                  </p>

                  {/* Subtopics Preview */}
                  <div className="mt-5 space-y-1.5 border-t border-slate-800/80 pt-4">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Includes {unit.subtopics.length} Subtopics:
                    </div>
                    {unit.subtopics.slice(0, 4).map(sub => (
                      <Link
                        key={sub.slug}
                        href={`/unit/${unit.id}/${sub.slug}`}
                        className="flex items-center gap-2 text-xs text-slate-300 hover:text-cyan-300 transition-colors truncate"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span className="truncate">{sub.title}</span>
                      </Link>
                    ))}
                    {unit.subtopics.length > 4 && (
                      <div className="text-[11px] text-slate-400 italic pt-1">
                        + {unit.subtopics.length - 4} more modules inside...
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Link */}
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-purple-400">
                    <HelpCircle className="h-3.5 w-3.5" />
                    <span>3 Review MCQs</span>
                  </div>

                  <Link
                    href={`/unit/${unit.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-all"
                  >
                    <span>Open Unit</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Curriculum Outcomes & Pillars */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80 mt-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Course Learning Outcomes (CO1 – CO5)
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Mapped strictly to the engineering accreditation guidelines for BTCS 701-18.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="h-10 w-10 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400 border border-cyan-800/50 mb-4">
              <Shield className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-slate-100">Symmetric Cryptosystems</h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Master the design mechanics of Shannon confusion/diffusion, Feistel networks, DES rounds, 3DES vulnerabilities, and the 4-step AES Rijndael algebraic pipeline.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="h-10 w-10 rounded-xl bg-blue-950 flex items-center justify-center text-blue-400 border border-blue-800/50 mb-4">
              <KeyRound className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-slate-100">Asymmetric Public Keys</h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Explore integer factorization with RSA, discrete logarithm exchange with Diffie-Hellman & Elgamal, and high-efficiency Elliptic Curve Cryptography (ECC).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="h-10 w-10 rounded-xl bg-purple-950 flex items-center justify-center text-purple-400 border border-purple-800/50 mb-4">
              <Server className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-slate-100">Network Defense & Access</h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Analyze multi-tier DMZ firewalls, stateful packet filtering, Snort NIDS detection, WPA3 wireless encryption, and PGP/S-MIME message authentication.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
