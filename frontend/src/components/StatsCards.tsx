import React from "react";
import {
  BarChart3,
  DollarSign,
  Wheat,
  CalendarDays,
  TrendingUp,
} from "lucide-react";
import { apiUrl } from "@/lib/env";

type Accent = "forest" | "blue" | "violet" | "gold";

const accentStyles: Record<
  Accent,
  { iconBg: string; iconColor: string; border: string; badge: string; badgeText: string }
> = {
  forest: {
    iconBg: "bg-forest-50",
    iconColor: "text-forest-600",
    border: "border-forest-100/60",
    badge: "bg-forest-50",
    badgeText: "text-forest-600",
  },
  blue: {
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-100/60",
    badge: "bg-blue-50",
    badgeText: "text-blue-600",
  },
  violet: {
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    border: "border-violet-100/60",
    badge: "bg-violet-50",
    badgeText: "text-violet-600",
  },
  gold: {
    iconBg: "bg-cream-100",
    iconColor: "text-cream-700",
    border: "border-cream-200/60",
    badge: "bg-cream-100",
    badgeText: "text-cream-700",
  },
};

const StatsCards: React.FC = () => {
  const [stats, setStats] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(apiUrl("/api/farm"), {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch farm stats");
        const data = await res.json();

        // Aggregate data
        const totalYield = data.reduce((sum: number, f: any) => sum + (Number(f.totalYield) || 0), 0);
        const revenue = data.reduce((sum: number, f: any) => sum + (Number(f.revenue) || 0), 0);
        const farmSize = data.reduce((sum: number, f: any) => sum + (Number(f.farmSize) || 0), 0);
        const daysToHarvest = data.length > 0
          ? Math.min(...data.map((f: any) => Number(f.daysToHarvest) || Infinity))
          : 0;

        const formattedStats = [
          {
            id: 1,
            title: "Total Yield",
            value: `${totalYield.toLocaleString()} kg`,
            change: "Live",
            icon: Wheat,
            accent: "forest" as Accent,
          },
          {
            id: 2,
            title: "Revenue",
            value: `₹${revenue.toLocaleString()}`,
            change: "Live",
            icon: DollarSign,
            accent: "blue" as Accent,
          },
          {
            id: 3,
            title: "Farm Size",
            value: `${farmSize.toFixed(1)} acres`,
            change: "Total",
            icon: BarChart3,
            accent: "violet" as Accent,
          },
          {
            id: 4,
            title: "Nearest Harvest",
            value: `${daysToHarvest === Infinity ? 0 : daysToHarvest} days`,
            change: "Next",
            icon: CalendarDays,
            accent: "gold" as Accent,
          },
        ];

        setStats(formattedStats);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card-premium p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-5 w-12 bg-gray-100 rounded-full animate-pulse" />
            </div>
            <div className="h-3 w-20 bg-gray-100 rounded animate-pulse mb-2" />
            <div className="h-7 w-28 bg-gray-100 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100/60 text-sm font-medium">
        Failed to load statistics: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        const accent = accentStyles[stat.accent as Accent];
        return (
          <div
            key={stat.id}
            className={`card-premium p-5 animate-fadeInUp`}
            style={{ animationDelay: `${idx * 75}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent.iconBg} shadow-inner-soft`}
              >
                <Icon className={`h-5 w-5 ${accent.iconColor}`} />
              </div>
              <span className={`badge-premium ${accent.badge} ${accent.badgeText} border ${accent.border}`}>
                {stat.change === "Live" && (
                  <span className="relative flex h-1.5 w-1.5 mr-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-40" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
                  </span>
                )}
                {stat.change}
              </span>
            </div>

            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
              {stat.title}
            </p>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
