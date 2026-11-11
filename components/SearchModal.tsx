'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { getAllTopics, SubTopic } from '@/lib/data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SubTopic[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const allTopics = useRef<SubTopic[]>([]);

  useEffect(() => {
    allTopics.current = getAllTopics();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase().trim();
    const filtered = allTopics.current.filter(t => {
      return (
        t.title.toLowerCase().includes(q) ||
        t.shortDesc.toLowerCase().includes(q) ||
        t.keyPoints.some(kp => kp.toLowerCase().includes(q))
      );
    });
    setResults(filtered.slice(0, 8)); // Top 8 matches
  }, [query]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/95 shadow-2xl backdrop-blur-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-slate-800 px-4 py-3">
          <Search className="h-5 w-5 text-cyan-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search all 45 topics (e.g., RSA, Kerberos, AES, Diffie-Hellman, WPA3)..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-[11px] font-mono text-slate-400 hover:bg-slate-700 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-800/40">
          {query.trim() && results.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <BookOpen className="mx-auto h-8 w-8 text-slate-600 mb-2" />
              <p className="text-sm font-medium">No matching topics found for &quot;{query}&quot;</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for broader keywords like &quot;cipher&quot;, &quot;hash&quot;, &quot;firewall&quot;, or &quot;keys&quot;.
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1 p-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Found {results.length} Matching Topics
              </div>
              {results.map(topic => (
                <Link
                  key={topic.slug}
                  href={`/unit/${topic.unitId}/${topic.slug}`}
                  onClick={onClose}
                  className="group flex items-start justify-between rounded-xl p-3 text-left transition-colors hover:bg-slate-800/60"
                >
                  <div className="pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="rounded bg-cyan-950/80 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-400 border border-cyan-800/40">
                        Unit {topic.unitNumber}
                      </span>
                      <h4 className="text-sm font-medium text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {topic.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {topic.shortDesc}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all mt-1" />
                </Link>
              ))}
            </div>
          ) : (
            /* Suggested Quick Queries */
            <div className="p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Popular Quick Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'RSA Algorithm',
                  'Diffie-Hellman',
                  'AES S-Box',
                  'Kerberos',
                  'SHA-256',
                  'Firewalls',
                  'IPsec VPN',
                  'WPA3',
                  'Extended Euclidean',
                  'CIA Triad'
                ].map(suggested => (
                  <button
                    key={suggested}
                    onClick={() => setQuery(suggested)}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-300 hover:border-cyan-500/40 hover:bg-cyan-950/20 hover:text-cyan-300 transition-all"
                  >
                    <Tag className="h-3 w-3 text-cyan-400" />
                    <span>{suggested}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-800/80 bg-slate-950/60 px-4 py-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 mr-1">↑↓</kbd>
              to navigate
            </span>
            <span>
              <kbd className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 mr-1">↵</kbd>
              to select
            </span>
          </div>
          <span>45 modules indexed</span>
        </div>
      </div>
    </div>
  );
}
