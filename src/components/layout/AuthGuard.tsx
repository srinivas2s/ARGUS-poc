'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { argusStore, AuthUser } from '@/lib/store';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(argusStore.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setUser(argusStore.user);
    setIsLoaded(true);

    const unsubscribe = argusStore.subscribe(() => {
      setUser(argusStore.user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (!argusStore.user && pathname !== '/login') {
        router.push('/login');
      } else if (argusStore.user && pathname === '/login') {
        router.push('/select-case');
      }
    }
  }, [isLoaded, user, pathname, router]);

  // Full-screen standalone pages without standard header/sidebar navigation
  if (pathname === '/login' || pathname === '/select-case') {
    return <>{children}</>;
  }

  // Waiting for state initialization before routing
  if (!isLoaded || (!user && pathname !== '/login')) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono text-xs text-sky-400">
        VERIFYING SECURITY CLEARANCE...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased cyber-grid-bg print:bg-white print:text-black">
      <Header />
      <div className="flex flex-1 relative overflow-hidden print:overflow-visible">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative z-10 print:p-0 print:overflow-visible">
          {children}
        </main>
      </div>
    </div>
  );
};
