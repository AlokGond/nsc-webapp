import React from 'react';
import Link from 'next/link';
import { Shield, BookOpen, Terminal, CheckCircle2 } from 'lucide-react';
import { units } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Course Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-950 border border-cyan-800/60 text-cyan-400">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-cyan-400">BTCS 701-18</span>
                <h3 className="text-sm font-semibold text-slate-100">
                  Network Security & Cryptography
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A comprehensive curriculum web platform engineered for engineering students covering symmetric and asymmetric ciphers, number theory, hash integrity functions, Kerberos, and defensive network security controls.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] font-mono text-slate-300">
                33 Lecture Hours
              </span>
              <span className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] font-mono text-cyan-300">
                45 Core Modules
              </span>
              <span className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] font-mono text-emerald-300">
                5 Units · CO1 to CO5
              </span>
            </div>
          </div>

          {/* Units Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Course Syllabus
            </h4>
            <ul className="space-y-2 text-xs">
              {units.map(unit => (
                <li key={unit.id}>
                  <Link
                    href={`/unit/${unit.id}`}
                    className="hover:text-cyan-300 transition-colors flex items-center justify-between"
                  >
                    <span>Unit {unit.number}: {unit.title.split('&')[0]}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{unit.hours}h</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Study Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Key Algorithms
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/unit/unit-3/rsa-algorithm" className="hover:text-cyan-300 transition-colors">
                  RSA Cryptosystem
                </Link>
              </li>
              <li>
                <Link href="/unit/unit-3/advanced-encryption-standard-aes" className="hover:text-cyan-300 transition-colors">
                  AES-128/256 Rijndael
                </Link>
              </li>
              <li>
                <Link href="/unit/unit-3/diffie-hellman-key-exchange" className="hover:text-cyan-300 transition-colors">
                  Diffie-Hellman Key Exchange
                </Link>
              </li>
              <li>
                <Link href="/unit/unit-4/message-authentication-code" className="hover:text-cyan-300 transition-colors">
                  HMAC-SHA256 Integrity
                </Link>
              </li>
              <li>
                <Link href="/unit/unit-4/kerberos-protocol" className="hover:text-cyan-300 transition-colors">
                  Kerberos v5 Authentication
                </Link>
              </li>
              <li>
                <Link href="/unit/unit-5/firewalls-design-types" className="hover:text-cyan-300 transition-colors">
                  Firewall Architectures
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-800/80 pt-6 text-[11px] text-slate-400 gap-4">
          <p>© 2026 Department of Computer Science & Engineering · Course BTCS 701-18.</p>
          <p className="flex items-center gap-1 font-mono">
            <span>Built with Next.js & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
