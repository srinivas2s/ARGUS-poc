import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'ARGUS - Agentic Relational Graph for Unified Safeguarding | Kerala Police Hac\'KP 2026',
  description: 'AI-Powered Autonomous Child Protection Investigative Intelligence Platform for Kerala Police Hac\'KP 2026 Challenge.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-slate-100 min-h-screen flex flex-col font-sans antialiased cyber-grid-bg">
        <Header />
        <div className="flex flex-1 relative overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
