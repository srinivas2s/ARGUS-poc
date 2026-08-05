// Fallback React & JSX type definitions for IDE language server before node_modules installation

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare namespace React {
  export interface ChangeEvent<T = Element> {
    target: T & { value: string; checked?: boolean };
  }
  export interface FormEvent<T = Element> {
    preventDefault(): void;
  }
  export type ReactNode = any;
  export type ElementType = any;
  export type FC<P = {}> = (props: P) => any;
  export type ComponentType<P = {}> = any;
}

declare module 'react' {
  export interface ChangeEvent<T = Element> {
    target: T & { value: string; checked?: boolean };
  }
  export interface FormEvent<T = Element> {
    preventDefault(): void;
  }
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useLayoutEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  export function useMemo<T>(factory: () => T, deps: any[]): T;
  export function useRef<T>(initialValue?: T): { current: T };
  export type ReactNode = any;
  export type ElementType = any;
  export type FC<P = {}> = (props: P) => any;
  export type ComponentType<P = {}> = any;
  const React: any;
  export default React;
}

declare module 'lucide-react' {
  export const ShieldAlert: any;
  export const Activity: any;
  export const Cpu: any;
  export const Clock: any;
  export const Layers: any;
  export const Zap: any;
  export const Download: any;
  export const Radio: any;
  export const Sliders: any;
  export const LayoutDashboard: any;
  export const Crosshair: any;
  export const SearchCode: any;
  export const Network: any;
  export const BookOpenCheck: any;
  export const Lightbulb: any;
  export const FileSpreadsheet: any;
  export const BrainCircuit: any;
  export const Settings: any;
  export const ChevronRight: any;
  export const ShieldCheck: any;
  export const Sparkles: any;
  export const Lock: any;
  export const ArrowRight: any;
  export const Eye: any;
  export const AlertTriangle: any;
  export const Video: any;
  export const FileSearch: any;
  export const TrendingUp: any;
  export const ArrowUpRight: any;
  export const UserCheck: any;
  export const MapPin: any;
  export const Flame: any;
  export const User: any;
  export const Smartphone: any;
  export const AtSign: any;
  export const Car: any;
  export const Image: any;
  export const Volume2: any;
  export const Film: any;
  export const ZoomIn: any;
  export const ZoomOut: any;
  export const Maximize2: any;
  export const Search: any;
  export const Filter: any;
  export const MessageSquare: any;
  export const FileText: any;
  export const Share2: any;
  export const Info: any;
  export const CheckCircle: any;
  export const Play: any;
  export const Pause: any;
  export const RotateCcw: any;
  export const Plus: any;
  export const CheckCircle2: any;
  export const AlertCircle: any;
  export const HelpCircle: any;
  export const XCircle: any;
  export const Printer: any;
  export const Key: any;
  export const HardDrive: any;
  export const Save: any;
  export const Globe: any;
}

declare module 'framer-motion' {
  export const motion: any;
  export const AnimatePresence: any;
}

declare module 'recharts' {
  export const AreaChart: any;
  export const Area: any;
  export const XAxis: any;
  export const YAxis: any;
  export const Tooltip: any;
  export const ResponsiveContainer: any;
  export const BarChart: any;
  export const Bar: any;
}

declare module 'next' {
  export type Metadata = any;
}

declare module 'next/link' {
  const Link: any;
  export default Link;
}

declare module 'next/navigation' {
  export function usePathname(): string;
  export function useRouter(): any;
}
