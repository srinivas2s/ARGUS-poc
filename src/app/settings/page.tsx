'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { 
  Settings, 
  Cpu, 
  Key, 
  Sliders, 
  BrainCircuit, 
  ShieldCheck, 
  Save, 
  CheckCircle2,
  HardDrive,
  Globe
} from 'lucide-react';
import { argusStore } from '@/lib/store';
import { PROVIDER_CATALOG } from '@/lib/ai-orchestrator';
import { AIProvider, OrchestrationSettings } from '@/types';

const PROVIDER_KEYS: AIProvider[] = [
  'OpenAI', 'Gemini', 'Claude', 'DeepSeek', 'Llama', 'Mistral', 'Local models'
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<OrchestrationSettings>(argusStore.settings);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    return argusStore.subscribe(() => {
      setSettings(argusStore.settings);
    });
  }, []);

  const handleProviderSelect = (prov: AIProvider) => {
    const provInfo = PROVIDER_CATALOG[prov];
    setSettings({
      ...settings,
      provider: prov,
      modelName: provInfo.defaultModel
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    argusStore.updateSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const currentProviderInfo = PROVIDER_CATALOG[settings.provider];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="glass-panel-glow p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 font-mono text-xs font-semibold">
            <Settings className="w-4 h-4 text-purple-400" />
            <span>KERALA POLICE MODEL ABSTRACTION ENGINE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono mt-0.5">
            AI Orchestration & Provider Settings
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Model-Independent Architecture • 7 Supported LLM Engine Providers
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1.5 rounded-xl font-mono text-xs animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>ORCHESTRATION UPDATED SUCCESSFULLY</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
        {/* Provider Selection Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-2xl space-y-3 border-purple-500/30">
            <h2 className="font-bold text-white text-sm flex items-center space-x-2 border-b border-slate-800 pb-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>SELECT LLM PROVIDER</span>
            </h2>

            <div className="space-y-2">
              {PROVIDER_KEYS.map((prov) => {
                const info = PROVIDER_CATALOG[prov];
                const isSelected = settings.provider === prov;

                return (
                  <div
                    key={prov}
                    onClick={() => handleProviderSelect(prov)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'glass-panel-glow border-purple-400 bg-purple-950/20 text-white shadow-cyber-purple'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-sm">{info.name}</div>
                      <div className="text-[10px] text-slate-400 flex items-center space-x-2">
                        {info.isLocal ? (
                          <span className="text-emerald-400 flex items-center space-x-1">
                            <HardDrive className="w-3 h-3" />
                            <span>AIR-GAPPED LOCAL</span>
                          </span>
                        ) : (
                          <span className="text-cyan-400 flex items-center space-x-1">
                            <Globe className="w-3 h-3" />
                            <span>CLOUD ENGINE</span>
                          </span>
                        )}
                        <span>• {info.contextWindow}</span>
                      </div>
                    </div>

                    <span className="text-[10px] text-purple-300 font-bold px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/30">
                      {info.reasoningCapability}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Configuration Parameters Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 rounded-2xl space-y-5 border border-slate-800">
            <h2 className="font-bold text-white text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>{settings.provider.toUpperCase()} PARAMETERS & TOOL PERMISSIONS</span>
            </h2>

            {/* Model Variant Selector */}
            <div className="space-y-1.5">
              <label className="text-slate-400 text-[10px] uppercase font-bold">MODEL VARIANT</label>
              <select
                value={settings.modelName}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSettings({ ...settings, modelName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-xs focus:border-cyan-500"
              >
                {currentProviderInfo.availableModels.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* API Key */}
            <div className="space-y-1.5">
              <label className="text-slate-400 text-[10px] uppercase font-bold flex items-center space-x-1">
                <Key className="w-3 h-3 text-cyan-400" />
                <span>PROVIDER API KEY</span>
              </label>
              <input
                type="password"
                value={settings.apiKey}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, apiKey: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-xs focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Temperature Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px]">
                <label className="text-slate-400 uppercase font-bold">TEMPERATURE (CREATIVITY CONTROL)</label>
                <span className="text-cyan-300 font-bold">{settings.temperature}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={settings.temperature}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, temperature: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Memory Options */}
            <div className="space-y-1.5">
              <label className="text-slate-400 text-[10px] uppercase font-bold">MEMORY ARCHITECTURE</label>
              <select
                value={settings.memoryOption}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSettings({ ...settings, memoryOption: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-xs focus:border-cyan-500"
              >
                <option value="Hybrid Relational Memory">Hybrid Relational Memory (Neo4j + Vector)</option>
                <option value="Graph Memory">Graph Memory Only</option>
                <option value="Vector DB Buffer">Vector DB Buffer Only</option>
              </select>
            </div>

            {/* Reasoning Depth */}
            <div className="space-y-1.5">
              <label className="text-slate-400 text-[10px] uppercase font-bold">REASONING SEARCH DEPTH</label>
              <select
                value={settings.reasoningDepth}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSettings({ ...settings, reasoningDepth: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-xs focus:border-cyan-500"
              >
                <option value="Standard (Multi-hop)">Standard (Multi-hop)</option>
                <option value="Fast (1-pass)">Fast (1-pass)</option>
                <option value="Exhaustive Deep Graph Search">Exhaustive Deep Graph Search</option>
              </select>
            </div>

            {/* Tool Permissions Toggles */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-slate-400 text-[10px] uppercase font-bold">SUB-AGENT TOOL PERMISSIONS</label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(settings.toolPermissions).map(([toolKey, enabled]) => (
                  <label key={toolKey} className="flex items-center space-x-2.5 p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setSettings({
                        ...settings,
                        toolPermissions: {
                          ...settings.toolPermissions,
                          [toolKey]: e.target.checked
                        }
                      })}
                      className="rounded bg-slate-800 border-slate-700 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-slate-200 capitalize">{toolKey.replace(/([A-Z])/g, ' $1')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all shadow-cyber-purple flex items-center justify-center space-x-2 mt-4 text-xs"
            >
              <Save className="w-4 h-4" />
              <span>SAVE & APPLY ORCHESTRATION CONFIG</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
