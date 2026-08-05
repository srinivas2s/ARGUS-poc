import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ARGUS — Agentic Relational Graph for Unified Safeguarding',
  description: 'AI-Powered Autonomous Child Protection Investigative Intelligence Platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${outfit.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-black text-slate-100 min-h-screen flex flex-col font-sans antialiased cyber-grid-bg print:bg-white print:text-black">
        <Header />
        <div className="flex flex-1 relative overflow-hidden print:overflow-visible">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative z-10 print:p-0 print:overflow-visible">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
