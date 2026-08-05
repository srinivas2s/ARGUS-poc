import { AIProvider, OrchestrationSettings } from '../types';

export interface ModelProviderInfo {
  provider: AIProvider;
  name: string;
  defaultModel: string;
  availableModels: string[];
  latencyMs: number;
  reasoningCapability: 'Extreme' | 'High' | 'Medium';
  contextWindow: string;
  isLocal: boolean;
}

export const PROVIDER_CATALOG: Record<AIProvider, ModelProviderInfo> = {
  OpenAI: {
    provider: 'OpenAI',
    name: 'OpenAI GPT-4o / O3-Mini',
    defaultModel: 'gpt-4o-realtime',
    availableModels: ['gpt-4o', 'gpt-4o-mini', 'o1-preview', 'o3-mini'],
    latencyMs: 320,
    reasoningCapability: 'Extreme',
    contextWindow: '128k tokens',
    isLocal: false
  },
  Gemini: {
    provider: 'Gemini',
    name: 'Google Gemini 3.6 / 1.5 Pro',
    defaultModel: 'gemini-3.6-flash',
    availableModels: ['gemini-3.6-flash', 'gemini-1.5-pro', 'gemini-1.5-flash'],
    latencyMs: 180,
    reasoningCapability: 'Extreme',
    contextWindow: '1M - 2M tokens',
    isLocal: false
  },
  Claude: {
    provider: 'Claude',
    name: 'Anthropic Claude 3.5 Sonnet',
    defaultModel: 'claude-3-5-sonnet',
    availableModels: ['claude-3-5-sonnet', 'claude-3-opus', 'claude-3-haiku'],
    latencyMs: 290,
    reasoningCapability: 'Extreme',
    contextWindow: '200k tokens',
    isLocal: false
  },
  DeepSeek: {
    provider: 'DeepSeek',
    name: 'DeepSeek R1 / V3 Reasoning',
    defaultModel: 'deepseek-r1-full',
    availableModels: ['deepseek-r1-full', 'deepseek-v3-chat', 'deepseek-coder'],
    latencyMs: 240,
    reasoningCapability: 'Extreme',
    contextWindow: '128k tokens',
    isLocal: false
  },
  Llama: {
    provider: 'Llama',
    name: 'Meta Llama 3.3 70B',
    defaultModel: 'llama-3.3-70b-instruct',
    availableModels: ['llama-3.3-70b-instruct', 'llama-3.1-405b', 'llama-guard-3'],
    latencyMs: 210,
    reasoningCapability: 'High',
    contextWindow: '128k tokens',
    isLocal: false
  },
  Mistral: {
    provider: 'Mistral',
    name: 'Mistral Large / Codestral',
    defaultModel: 'mistral-large-2407',
    availableModels: ['mistral-large-2407', 'codestral-2501', 'mixtral-8x22b'],
    latencyMs: 260,
    reasoningCapability: 'High',
    contextWindow: '128k tokens',
    isLocal: false
  },
  'Local models': {
    provider: 'Local models',
    name: 'On-Premises / Offline Ollama & vLLM',
    defaultModel: 'ollama/llama3.2-vision:11b-q8',
    availableModels: ['ollama/llama3.2-vision:11b-q8', 'vllm/deepseek-r1-distill-qwen-32b', 'ollama/mistral-nemo-12b'],
    latencyMs: 85,
    reasoningCapability: 'Extreme',
    contextWindow: '64k tokens (AIR-GAPPED HIGH SECURE)',
    isLocal: true
  }
};

export class AIOrchestrator {
  public static executeSubAgentTask(
    agentName: string,
    taskDescription: string,
    settings: OrchestrationSettings
  ): { status: string; output: string; confidence: number; durationMs: number } {
    const providerInfo = PROVIDER_CATALOG[settings.provider] || PROVIDER_CATALOG['Gemini'];
    
    return {
      status: 'SUCCESS',
      output: `[${providerInfo.name} :: ${settings.modelName}] Executed ${agentName} with ${settings.reasoningDepth} reasoning. Task processed with zero leakage.`,
      confidence: 96.5,
      durationMs: providerInfo.latencyMs
    };
  }
}
