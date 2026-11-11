'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Search, Menu, X, BookOpen, CheckCircle2, ChevronDown } from 'lucide-react';
import SearchModal from './SearchModal';
import { units } from '@/lib/data';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [unitsDropdownOpen, setUnitsDropdownOpen] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const totalTopics = 45;

  // Sync completion count from localStorage
  useEffect(() => {
    const updateProgress = () => {
      try {
        const stored = localStorage.getItem('nsc_completed_topics');
        if (stored) {
          const list = JSON.parse(stored);
          if (Array.isArray(list)) {
            setCompletedCount(list.length);
          }
        }
      } catch {
        // ignore parse error
      }
    };

    updateProgress();
    window.addEventListener('storage', updateProgress);
    window.addEventListener('nsc_progress_updated', updateProgress);
    return () => {
      window.removeEventListener('storage', updateProgress);
      window.removeEventListener('nsc_progress_updated', updateProgress);
    };
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUnitsDropdownOpen(false);
  }, [pathname]);

  const progressPercent = Math.round((completedCount / totalTopics) * 100);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Course Badge */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 p-2 text-cyan-400 ring-1 ring-cyan-500/30 group-hover:ring-cyan-400/60 transition-all">
              <Shield className="h-6 w-6 transition-transform group-hover:scale-110" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider uppercase">
                  BTCS 701-18
                </span>
                <span className="hidden sm:inline-block rounded-full bg-cyan-950/60 px-2 py-0.5 text-[10px] font-medium text-cyan-300 border border-cyan-800/50">
                  Course Portal
                </span>
              </div>
              <h1 className="text-sm font-semibold tracking-tight text-slate-100 group-hover:text-cyan-300 transition-colors">
                Network Security & Cryptography
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/"
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-slate-800/80 text-cyan-300'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              Overview
            </Link>

            {/* Units Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setUnitsDropdownOpen(!unitsDropdownOpen)}
                className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  pathname?.startsWith('/unit')
                    ? 'bg-slate-800/80 text-cyan-300'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <span>Syllabus Units</span>
                <ChevronDown className="h-4 w-4 opacity-70" />
              </button>

              {unitsDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-72 rounded-xl border border-slate-800 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100"
                  onMouseLeave={() => setUnitsDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Course Units (33 Total Hours)
                  </div>
                  {units.map(unit => (
                    <Link
                      key={unit.id}
                      href={`/unit/${unit.id}`}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-200 hover:bg-cyan-950/40 hover:text-cyan-300 transition-colors"
                    >
                      <div>
                        <span className="font-mono text-cyan-400 mr-2">U{unit.number}</span>
                        <span>{unit.title.split('&')[0]}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{unit.hours}h</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-colors"
            >
              <Search className="h-3.5 w-3.5 text-cyan-400" />
              <span>Search topics...</span>
              <kbd className="ml-1 rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
                ⌘K
              </kbd>
            </button>
          </nav>

          {/* Right Section: Progress & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Progress Pill */}
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs">
              <CheckCircle2 className={`h-3.5 w-3.5 ${progressPercent > 0 ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span className="text-slate-400 font-medium">
                {completedCount}/{totalTopics} Done
              </span>
              <div className="h-1.5 w-12 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="md:hidden rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-6 backdrop-blur-xl">
            <div className="space-y-1">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
              >
                <BookOpen className="h-4 w-4 text-cyan-400" />
                <span>Overview & Syllabus</span>
              </Link>
              <div className="pt-2 pb-1 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Course Units
              </div>
              {units.map(unit => (
                <Link
                  key={unit.id}
                  href={`/unit/${unit.id}`}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/80 hover:text-cyan-300"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-cyan-400">
                      Unit {unit.number}
                    </span>
                    <span className="truncate max-w-[200px]">{unit.title}</span>
                  </div>
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                    {unit.hours}h
                  </span>
                </Link>
              ))}
            </div>

            {/* Mobile Progress Bar */}
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                <span className="font-medium">Curriculum Progress</span>
                <span className="font-mono text-cyan-400">{progressPercent}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                {completedCount} of {totalTopics} subtopics completed
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
