'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { argusStore } from '@/lib/store';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (argusStore.user) {
      router.replace('/select-case');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono text-xs text-sky-400">
      INITIALIZING ARGUS SYSTEM DISPATCH...
    </div>
  );
}
