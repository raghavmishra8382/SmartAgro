import React, { useMemo } from "react";
import {
  Sun, CloudRain, Cloud, AlertTriangle, CheckCircle2,
  TrendingUp, TrendingDown, MapPin, Sparkles,
  Wind, Droplets, Loader2, Clock, Flame, Activity,
  Users, BarChart3, MapPin as MapPinIcon, Wheat,
} from "lucide-react";
import HeroImg from "../../Images/image_750x500_657ad9e35f2bc.jpg";
import { useWeather } from "@/lib/useWeather";
import { getTopPriorityTask } from "@/lib/taskStore";
import { useMandiPrices } from "@/lib/useMandiPrices";

interface SmartBannerProps {
  userName: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   INLINE CSS — keeps all animation keyframes co-located with the component
   ═══════════════════════════════════════════════════════════════════════════ */

const bannerCSS = `
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0;  }
}
@keyframes float-slow {
  0%, 100% { transform: translateY(0px) scale(1);   }
  50%      { transform: translateY(-8px) scale(1.05);}
}
@keyframes float-med {
  0%, 100% { transform: translateY(0px);   }
  50%      { transform: translateY(-5px);  }
}
@keyframes aurora {
  0%   { opacity: 0.15; transform: translateX(-5%) rotate(-2deg); }
  50%  { opacity: 0.25; transform: translateX(5%)  rotate(2deg);  }
  100% { opacity: 0.15; transform: translateX(-5%) rotate(-2deg); }
}
.banner-shimmer {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent);
  background-size: 200% 100%;
  animation: shimmer 6s ease-in-out infinite;
}
.float-slow  { animation: float-slow 7s ease-in-out infinite; }
.float-med   { animation: float-med  5s ease-in-out infinite; }
.aurora-glow { animation: aurora 8s ease-in-out infinite; }
`;

// ─── Main Banner ──────────────────────────────────────────────────────────────

const SmartBanner: React.FC<SmartBannerProps> = ({ userName }) => {
  const { weather, advice, loading: wLoading } = useWeather();
  const { topGainer: topCrop, loading: mLoading } = useMandiPrices();
  const topTask = useMemo(() => getTopPriorityTask(), []);

  const hour = new Date().getHours();
  const greeting =
    hour < 5 ? "Good night" :
      hour < 12 ? "Good morning" :
        hour < 17 ? "Good afternoon" : "Good evening";
  const emoji = hour < 5 ? "🌙" : hour < 12 ? "🌅" : hour < 17 ? "☀️" : "🌙";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long",
  });

  const desc = (weather?.description ?? "").toLowerCase();
  const isRainy = desc.includes("rain") || desc.includes("drizzle");
  const WIcon = isRainy ? CloudRain : desc.includes("cloud") ? Cloud : Sun;

  return (
    <>
      <style>{bannerCSS}</style>
      <div className="w-full bg-gradient-to-br from-forest-50 to-sage-50 border border-forest-100/60 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm relative overflow-hidden mt-2">
        
        {/* Background shimmer for premium feel */}
        <div className="absolute inset-0 banner-shimmer opacity-30 pointer-events-none mix-blend-overlay" />
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-forest-200/40 rounded-full blur-[80px] pointer-events-none aurora-glow" />
        
        {/* Left side: Greeting */}
        <div className="relative z-10 flex flex-col gap-1.5">
          <p className="text-forest-600 font-bold text-sm tracking-wide uppercase">{today}</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-forest-900 tracking-tight">
            {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-600 to-forest-800">{userName.split(' ')[0]}</span> {emoji}
          </h1>
          <p className="text-forest-700/80 text-sm md:text-base max-w-lg mt-1 leading-relaxed">
            Here's what is happening across your fields today. Let's make it a productive and sustainable day.
          </p>
        </div>

        {/* Right side: Quick stats/weather pills */}
        <div className="relative z-10 flex flex-wrap gap-3 lg:justify-end">
          
          {/* Weather Pill */}
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-white rounded-2xl px-4 py-2.5 hover:bg-white transition-colors shadow-sm">
            <div className="p-2 bg-sky-100 rounded-xl">
              <WIcon className="h-5 w-5 text-sky-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-sky-700/70 font-bold tracking-wider leading-none mb-1">Weather</span>
              <span className="text-sm text-sky-950 font-semibold leading-none">
                {wLoading ? (
                  <span className="flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin text-sky-600"/> Loading</span>
                ) : (
                  `${weather?.temperature || '--'}°C ${weather?.main || 'Clear'}`
                )}
              </span>
            </div>
          </div>
          
          {/* Market Pill */}
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-white rounded-2xl px-4 py-2.5 hover:bg-white transition-colors shadow-sm">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-emerald-700/70 font-bold tracking-wider leading-none mb-1">Top Market</span>
              <span className="text-sm text-emerald-950 font-semibold leading-none">
                {mLoading ? (
                  <span className="flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin text-emerald-600"/> Loading</span>
                ) : topCrop ? (
                  `${topCrop.commodity} +${topCrop.priceChange}%`
                ) : (
                  "Wheat +2.4%"
                )}
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default SmartBanner;

// ═══════════════════════════════════════════════════════════════════════════════
// SUB‑COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

/* ── Glass Pill (header location / weather) ── */

const GlassPill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-1.5 bg-white/[0.06] backdrop-blur-2xl border border-white/[0.1] rounded-2xl px-3 py-2 shadow-lg shadow-black/10 hover:bg-white/[0.1] transition-colors duration-200">
    {children}
  </div>
);

/* ── Glass Info Card ── */

const ACCENTS = {
  sky: { gradient: "from-sky-500/[0.12] via-sky-600/[0.05] to-transparent", border: "border-sky-400/[0.15]", label: "text-sky-300/90", glow: "bg-sky-400/25", hoverBorder: "hover:border-sky-400/30" },
  rose: { gradient: "from-rose-500/[0.12] via-rose-600/[0.05] to-transparent", border: "border-rose-400/[0.15]", label: "text-rose-300/90", glow: "bg-rose-400/25", hoverBorder: "hover:border-rose-400/30" },
  emerald: { gradient: "from-forest-600/[0.12] via-forest-600/[0.05] to-transparent", border: "border-forest-600/[0.15]", label: "text-forest-600/90", glow: "bg-forest-600/25", hoverBorder: "hover:border-forest-600/30" },
  amber: { gradient: "from-amber-500/[0.12] via-amber-600/[0.05] to-transparent", border: "border-amber-400/[0.15]", label: "text-amber-300/90", glow: "bg-amber-400/25", hoverBorder: "hover:border-amber-400/30" },
  violet: { gradient: "from-violet-500/[0.12] via-violet-600/[0.05] to-transparent", border: "border-violet-400/[0.15]", label: "text-violet-300/90", glow: "bg-violet-400/25", hoverBorder: "hover:border-violet-400/30" },
};

const GlassInfoCard: React.FC<{
  label: string;
  accent: keyof typeof ACCENTS;
  icon?: React.ReactNode;
  loading?: boolean;
  children?: React.ReactNode;
}> = ({ label, accent, icon, loading, children }) => {
  const a = ACCENTS[accent];
  return (
    <div className={`
      relative group overflow-hidden rounded-2xl
      bg-gradient-to-br ${a.gradient}
      backdrop-blur-2xl
      border ${a.border} ${a.hoverBorder}
      shadow-lg shadow-black/10
      p-4 flex flex-col gap-2
      hover:shadow-xl hover:shadow-black/15
      hover:-translate-y-[2px]
      transition-all duration-300 ease-out
    `}>
      {/* Inner glow — top-right corner */}
      <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full ${a.glow} blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />

      {/* Top shine line — glass refraction illusion */}
      <div className="absolute top-0 inset-x-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      {/* Left edge highlight */}
      <div className="absolute top-2 bottom-2 left-0 w-px bg-gradient-to-b from-white/15 via-white/5 to-transparent" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${a.label}`}>{label}</span>
        <span className="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">{icon}</span>
      </div>

      {/* Content / Skeleton */}
      {loading ? (
        <div className="space-y-2.5 mt-1">
          <div className="h-5 w-3/4 rounded-lg bg-white/[0.07] animate-pulse" />
          <div className="h-3 w-1/2 rounded-lg bg-white/[0.05] animate-pulse [animation-delay:0.15s]" />
          <div className="h-3 w-2/3 rounded-lg bg-white/[0.04] animate-pulse [animation-delay:0.3s]" />
        </div>
      ) : (
        <div className="relative z-10 flex-1">{children}</div>
      )}
    </div>
  );
};

/* ── Mini stat row ── */

const MiniStat: React.FC<{ icon: React.ReactNode; text: string; tint: string }> = ({ icon, text, tint }) => (
  <div className={`flex items-center gap-1.5 ${tint}`}>
    {icon}
    <span className="text-[10px] text-white/55 font-medium">{text}</span>
  </div>
);
