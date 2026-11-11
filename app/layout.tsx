import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Network Security and Cryptography (BTCS 701-18)',
  description:
    'Comprehensive study portal and curriculum guide for Network Security & Cryptography (BTCS 701-18). Featuring detailed theoretical notes, cryptographic algorithm breakdowns, interactive quizzes, and network defense architectures.',
  keywords: [
    'Network Security',
    'Cryptography',
    'RSA Algorithm',
    'AES Encryption',
    'Diffie-Hellman',
    'Kerberos',
    'BTCS 701-18',
    'Firewalls',
    'IPsec',
    'Hash Functions'
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
