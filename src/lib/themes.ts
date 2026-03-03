import {
  Sparkles,
  Trophy,
  HeartHandshake,
  Banknote,
  PartyPopper,
  Gem,
  Cake,
  Music,
  Gift,
  Palmtree,
  type LucideIcon,
} from "lucide-react";
import type { Theme } from "@/types";

export interface ThemeStyle {
  bg: string;
  gradient: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  ticketDefault: string;
  accent: string;
  Icon: LucideIcon;
  iconColor: string;
}

export const themeStyles: Record<Theme, ThemeStyle> = {
  default: {
    bg: "bg-slate-950",
    gradient:
      "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black",
    card: "bg-slate-900/60 backdrop-blur-xl border-slate-800 shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
    textPrimary: "text-white",
    textSecondary: "text-slate-400",
    ticketDefault:
      "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700",
    accent: "text-indigo-400",
    Icon: Sparkles,
    iconColor: "text-indigo-500/5",
  },
  football: {
    bg: "bg-emerald-950",
    gradient:
      "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900 via-emerald-950 to-black",
    card: "bg-emerald-900/40 backdrop-blur-xl border-emerald-800/50 shadow-[0_8px_32px_rgba(5,150,105,0.15)]",
    textPrimary: "text-emerald-50",
    textSecondary: "text-emerald-200/70",
    ticketDefault:
      "bg-emerald-800/50 text-emerald-100 hover:bg-emerald-600 hover:text-white border border-emerald-700 shadow-sm",
    accent: "text-emerald-400",
    Icon: Trophy,
    iconColor: "text-emerald-500/5",
  },
  baby: {
    bg: "bg-rose-50",
    gradient:
      "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100 via-pink-50 to-white",
    card: "bg-white/60 backdrop-blur-xl border-pink-100 shadow-[0_8px_32px_rgba(244,114,182,0.15)]",
    textPrimary: "text-rose-950",
    textSecondary: "text-rose-700/80",
    ticketDefault:
      "bg-white text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-rose-200 shadow-sm",
    accent: "text-rose-600",
    Icon: HeartHandshake,
    iconColor: "text-rose-500/5",
  },
  money: {
    bg: "bg-amber-50",
    gradient:
      "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100 via-yellow-50 to-white",
    card: "bg-white/60 backdrop-blur-xl border-amber-200/50 shadow-[0_8px_32px_rgba(245,158,11,0.1)]",
    textPrimary: "text-amber-950",
    textSecondary: "text-amber-700/80",
    ticketDefault:
      "bg-white text-amber-700 hover:bg-amber-100 hover:text-amber-900 border border-amber-200 shadow-sm",
    accent: "text-amber-600",
    Icon: Banknote,
    iconColor: "text-amber-500/5",
  },
  party: {
    bg: "bg-fuchsia-950",
    gradient:
      "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-900 via-purple-950 to-black",
    card: "bg-fuchsia-900/40 backdrop-blur-xl border-fuchsia-800/50 shadow-[0_8px_32px_rgba(192,38,211,0.15)]",
    textPrimary: "text-fuchsia-50",
    textSecondary: "text-fuchsia-200/70",
    ticketDefault:
      "bg-fuchsia-800/50 text-fuchsia-100 hover:bg-fuchsia-600 hover:text-white border border-fuchsia-700 shadow-sm",
    accent: "text-fuchsia-400",
    Icon: PartyPopper,
    iconColor: "text-fuchsia-500/5",
  },
  wedding: {
    bg: "bg-stone-50",
    gradient:
      "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-100 via-stone-50 to-white",
    card: "bg-white/60 backdrop-blur-xl border-stone-200 shadow-[0_8px_32px_rgba(120,113,108,0.1)]",
    textPrimary: "text-stone-900",
    textSecondary: "text-stone-500",
    ticketDefault:
      "bg-white text-stone-600 hover:bg-stone-100/50 hover:text-stone-900 border border-stone-200 shadow-sm",
    accent: "text-orange-400",
    Icon: Gem,
    iconColor: "text-orange-500/5",
  },
  birthday: {
    bg: "bg-yellow-50",
    gradient:
      "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-100 via-amber-50 to-white",
    card: "bg-white/60 backdrop-blur-xl border-yellow-200 shadow-[0_8px_32px_rgba(234,179,8,0.1)]",
    textPrimary: "text-yellow-950",
    textSecondary: "text-yellow-700/80",
    ticketDefault:
      "bg-white text-yellow-700 hover:bg-yellow-100 hover:text-yellow-900 border border-yellow-200 shadow-sm",
    accent: "text-yellow-500",
    Icon: Cake,
    iconColor: "text-yellow-500/5",
  },
  carnival: {
    bg: "bg-violet-950",
    gradient:
      "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900 via-fuchsia-950 to-rose-950",
    card: "bg-white/10 backdrop-blur-xl border-rose-500/20 shadow-[0_8px_32px_rgba(244,63,94,0.15)]",
    textPrimary: "text-white",
    textSecondary: "text-rose-200/70",
    ticketDefault:
      "bg-white/5 text-rose-100 hover:bg-rose-600 hover:text-white border border-rose-500/30 shadow-sm",
    accent: "text-rose-400",
    Icon: Music,
    iconColor: "text-rose-500/5",
  },
  christmas: {
    bg: "bg-red-950",
    gradient:
      "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900 via-red-950 to-emerald-950",
    card: "bg-black/20 backdrop-blur-xl border-red-800/50 shadow-[0_8px_32px_rgba(220,38,38,0.15)]",
    textPrimary: "text-red-50",
    textSecondary: "text-red-200/70",
    ticketDefault:
      "bg-red-900/30 text-red-100 hover:bg-red-600 hover:text-white border border-red-800 border-opacity-50 shadow-sm",
    accent: "text-emerald-400",
    Icon: Gift,
    iconColor: "text-red-500/5",
  },
  beach: {
    bg: "bg-cyan-50",
    gradient:
      "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-100 via-sky-50 to-white",
    card: "bg-white/60 backdrop-blur-xl border-cyan-100 shadow-[0_8px_32px_rgba(6,182,212,0.1)]",
    textPrimary: "text-cyan-950",
    textSecondary: "text-cyan-700/80",
    ticketDefault:
      "bg-white text-cyan-600 hover:bg-cyan-100/50 hover:text-cyan-800 border border-cyan-200 shadow-sm",
    accent: "text-sky-500",
    Icon: Palmtree,
    iconColor: "text-cyan-500/5",
  },
};
