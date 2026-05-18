"use client";

import dynamic from "next/dynamic";
import { 
  ResponsiveContainer as RC, 
  LineChart as LC, 
  Line as L, 
  XAxis as XA, 
  YAxis as YA, 
  CartesianGrid as CG, 
  Tooltip as TT,
  BarChart as BC,
  Bar as B,
  PieChart as PC,
  Pie as P,
  Cell as C,
  AreaChart as AC,
  Area as A,
  RadarChart as RC2,
  Radar as R,
  PolarGrid as PG,
  PolarAngleAxis as PAA,
  PolarRadiusAxis as PRA,
  Legend as L2
} from "recharts";

// We wrap the Recharts components to force them to only render on the client side.
// This completely avoids the "createContext only works in Client Components" error during SSR/hydration.

export const ResponsiveContainer = dynamic(() => Promise.resolve(RC), { ssr: false });
export const LineChart = dynamic(() => Promise.resolve(LC), { ssr: false });
export const Line = dynamic(() => Promise.resolve(L), { ssr: false });
export const XAxis = dynamic(() => Promise.resolve(XA), { ssr: false });
export const YAxis = dynamic(() => Promise.resolve(YA), { ssr: false });
export const CartesianGrid = dynamic(() => Promise.resolve(CG), { ssr: false });
export const Tooltip = dynamic(() => Promise.resolve(TT), { ssr: false });
export const BarChart = dynamic(() => Promise.resolve(BC), { ssr: false });
export const Bar = dynamic(() => Promise.resolve(B), { ssr: false });
export const PieChart = dynamic(() => Promise.resolve(PC), { ssr: false });
export const Pie = dynamic(() => Promise.resolve(P), { ssr: false });
export const Cell = dynamic(() => Promise.resolve(C), { ssr: false });
export const AreaChart = dynamic(() => Promise.resolve(AC), { ssr: false });
export const Area = dynamic(() => Promise.resolve(A), { ssr: false });
export const RadarChart = dynamic(() => Promise.resolve(RC2), { ssr: false });
export const Radar = dynamic(() => Promise.resolve(R), { ssr: false });
export const PolarGrid = dynamic(() => Promise.resolve(PG), { ssr: false });
export const PolarAngleAxis = dynamic(() => Promise.resolve(PAA), { ssr: false });
export const PolarRadiusAxis = dynamic(() => Promise.resolve(PRA), { ssr: false });
export const Legend = dynamic(() => Promise.resolve(L2), { ssr: false });
