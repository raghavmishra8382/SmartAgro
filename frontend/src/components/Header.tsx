import React, { useEffect, useState } from "react";
import {
  Bell, Search, User, Menu, LogOut, LogIn,
  WifiOff, RefreshCw, CheckCircle2, Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { syncBus } from "../lib/syncBus";
import { apiUrl } from "../lib/env";

interface HeaderProps {
  onMenuClick?: () => void;
}

// ─── Sync status hook (now emits real refetch via syncBus) ────────────────────

type SyncStatus = "synced" | "syncing" | "offline" | "error";

function useSyncStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  const [status, setStatus] = useState<SyncStatus>(navigator.onLine ? "synced" : "offline");
  const [lastSynced, setLastSynced] = useState<Date>(new Date());
  const [, _tick] = useState(0); // for relative-time re-render

  // Online/offline events
  useEffect(() => {
    const goOnline  = () => { setOnline(true);  doSync(); };
    const goOffline = () => { setOnline(false); setStatus("offline"); };
    window.addEventListener("online",  goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online",  goOnline);
      window.removeEventListener("offline", goOffline);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Periodic auto-sync every 5 min
  useEffect(() => {
    if (!online) return;
    const id = setInterval(() => doSync(), 5 * 60 * 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online]);

  // Refresh relative time display every 30s
  useEffect(() => {
    const id = setInterval(() => _tick(t => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  const doSync = async () => {
    if (!online && navigator.onLine === false) return;
    setStatus("syncing");
    try {
      // Fire real API calls in parallel to confirm backend is alive
      await Promise.allSettled([
        fetch(apiUrl("/api/plants"), { credentials: "include" }),
        fetch(apiUrl("/api/mandi/prices"), { credentials: "include" }),
      ]);
      // Tell all hooks to bust cache and re-fetch
      syncBus.emit();
      setStatus("synced");
      setLastSynced(new Date());
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("synced"), 3000);
    }
  };

  const forceSync = () => {
    if (!navigator.onLine) { setStatus("offline"); return; }
    doSync();
  };

  return { status, lastSynced, forceSync };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatRelative(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60)   return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

// ─── SyncBadge ────────────────────────────────────────────────────────────────

const SyncBadge: React.FC = () => {
  const { status, lastSynced, forceSync } = useSyncStatus();
  const [showTooltip, setShowTooltip] = useState(false);

  const config: Record<SyncStatus, { icon: React.ReactNode; label: string; dot: string; pill: string }> = {
    synced: {
      icon: <CheckCircle2 className="h-3.5 w-3.5 text-forest-600" />,
      label: "Synced", dot: "bg-forest-400",
      pill: "bg-forest-50 text-forest-700 border-forest-200/60 hover:bg-forest-100/80",
    },
    syncing: {
      icon: <RefreshCw className="h-3.5 w-3.5 text-sky-500 animate-spin" />,
      label: "Syncing…", dot: "bg-sky-400 animate-pulse",
      pill: "bg-sky-50 text-sky-700 border-sky-200/60",
    },
    offline: {
      icon: <WifiOff className="h-3.5 w-3.5 text-red-500" />,
      label: "Offline", dot: "bg-red-400 animate-pulse",
      pill: "bg-red-50 text-red-700 border-red-200/60",
    },
    error: {
      icon: <Zap className="h-3.5 w-3.5 text-orange-500" />,
      label: "Retry",  dot: "bg-orange-400",
      pill: "bg-orange-50 text-orange-700 border-orange-200/60 hover:bg-orange-100/80",
    },
  };

  const c = config[status];

  return (
    <div className="relative">
      <button
        onClick={() => { forceSync(); }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        disabled={status === "syncing"}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-200 hover:shadow-soft disabled:cursor-wait ${c.pill}`}
        aria-label={`Sync status: ${c.label} — click to refresh`}
        title="Click to sync all data"
      >
        {c.icon}
        <span className="hidden sm:inline">{c.label}</span>
        <span className={`h-2 w-2 rounded-full flex-shrink-0 ${c.dot}`} />
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full mt-2 right-0 z-50 bg-gray-900 text-white text-xs rounded-xl px-3 py-2.5 whitespace-nowrap shadow-elevated min-w-[180px] pointer-events-none animate-scaleIn">
          {status === "offline" ? (
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-red-300 font-semibold">
                <WifiOff className="h-3 w-3" /> No internet connection
              </div>
              <p className="text-gray-400">Data may be outdated</p>
            </div>
          ) : status === "syncing" ? (
            <div className="flex items-center gap-1.5">
              <RefreshCw className="h-3 w-3 text-sky-300 animate-spin" />
              Fetching weather, market & crops…
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-forest-600 font-semibold">
                <CheckCircle2 className="h-3 w-3" /> All data up to date
              </div>
              <p className="text-gray-400">Last synced {formatRelative(lastSynced)}</p>
              <p className="text-gray-500 text-[10px]">Click to force refresh</p>
            </div>
          )}
          <div className="absolute -top-1.5 right-4 w-3 h-3 bg-gray-900 rotate-45 rounded-sm" />
        </div>
      )}
    </div>
  );
};

// ─── Header ───────────────────────────────────────────────────────────────────

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-gray-100/60 px-4 md:px-6 py-3 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-3">
        {/* Left: hamburger + search */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 text-gray-500 hover:text-forest-600 hover:bg-forest-50 rounded-xl transition-all duration-200 flex-shrink-0"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search crops, weather, advice…"
              className="input-premium pl-10 pr-4 py-2.5 bg-gray-50/80"
            />
          </div>
        </div>

        {/* Right: sync badge + bell + user */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <SyncBadge />

          {/* Bell */}
          <div className="relative">
            <button className="p-2 text-gray-400 hover:text-forest-600 hover:bg-forest-50 rounded-xl transition-all duration-200">
              <Bell className="h-5 w-5" />
            </button>
            <div className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-gradient-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-[9px] text-white font-bold leading-none">3</span>
            </div>
          </div>

          <div className="h-6 w-px bg-gray-200/80 hidden sm:block" />

          {/* User */}
          {user ? (
            <div className="flex items-center gap-2.5">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-800 leading-tight">{user.fullName}</p>
                <p className="text-[11px] text-gray-400 font-medium">{user.location || "India"}</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-forest-500 to-forest-600 rounded-xl flex items-center justify-center shadow-sm shadow-forest-500/20">
                <User style={{ width: "1rem", height: "1rem" }} className="text-white" />
              </div>
              <button
                onClick={() => { logout(); navigate("/login"); }}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                title="Logout"
              >
                <LogOut style={{ width: "1rem", height: "1rem" }} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="btn-primary text-sm py-2"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
