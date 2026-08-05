'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Key, User, ArrowRight, Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { argusStore } from '@/lib/store';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!code.trim()) {
      setError('Please enter the security access code.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const success = argusStore.login(name || 'Lead Investigator', code);
      if (success) {
        router.push('/select-case');
      } else {
        setError('Invalid Security Passcode.');
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 cyber-grid-bg">
      {/* Radial spotlight effect */}
      <div className="absolute inset-0 bg-grid pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 max-w-md w-full relative z-10 space-y-6 shadow-2xl"
      >
        {/* Header Icon & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mx-auto shadow-md">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-serif">
            ARGUS Security Clearance
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Enter investigator credentials & clearance passcode
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-sky-400" />
              <span>INVESTIGATOR NAME</span>
            </label>
            <input 
              type="text"
              placeholder="e.g. Officer Alex"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-sky-400 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
            />
          </div>

          {/* Security Code Field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-slate-300 font-semibold flex items-center space-x-1.5">
                <Key className="w-3.5 h-3.5 text-sky-400" />
                <span>ACCESS PASSCODE</span>
              </label>
            </div>
            <input 
              type="password"
              placeholder="Enter access passcode"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-sky-400 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors tracking-widest"
            />
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-white-pill py-3.5 px-6 rounded-full font-bold text-sm flex items-center justify-center space-x-2 transition-transform hover:scale-[1.02]"
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-black animate-spin" />
                <span>AUTHENTICATING...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <span>AUTHORIZE ACCESS</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </span>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="pt-2 border-t border-white/10 text-center text-[10px] text-slate-500 font-mono flex items-center justify-center space-x-1">
          <Lock className="w-3 h-3 text-emerald-400" />
          <span>AIR-GAPPED BIOMETRIC PROTOCOL VERIFIED</span>
        </div>
      </motion.div>
    </div>
  );
}
