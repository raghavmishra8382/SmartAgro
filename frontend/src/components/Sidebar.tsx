import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, CloudRain, Wheat, DollarSign, Building2, Settings,
  MessageCircle, Voicemail, PhoneCall, X, Leaf, Plane, Sprout,
  Brain, ChevronDown, ChevronRight, Cpu, BarChart2, HeartPulse,
  HelpCircle, ListChecks, Menu
} from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

// ─── Nav structure ────────────────────────────────────────────────────────────

type NavItem = { id: string; label: string; icon: React.ElementType; path: string };
type NavGroup = {
  id: string; label: string; icon: React.ElementType;
  color: string; activeBg: string; activeText: string; items: NavItem[];
};
type FlatItem = NavItem & { flat: true };
type SidebarEntry = NavGroup | FlatItem;

const NAV: SidebarEntry[] = [
  { id: "home",       label: "Home",        icon: Home,       path: "/home",    flat: true },
  { id: "tasks",      label: "Tasks",       icon: ListChecks, path: "/tasks",   flat: true },
  {
    id: "ai-tools", label: "AI Tools", icon: Brain,
    color: "text-violet-600", activeBg: "bg-violet-50/80", activeText: "text-violet-700",
    items: [
      { id: "chat",  label: "AI Chat",          icon: MessageCircle, path: "/chat" },
      { id: "voice", label: "Voice Assistant",   icon: Voicemail,     path: "/voice" },
      { id: "ivr",   label: "IVR Dialer",        icon: PhoneCall,     path: "/ivr-dialer" },
    ],
  },
  {
    id: "crop-intel", label: "Crop Intelligence", icon: Cpu,
    color: "text-forest-600", activeBg: "bg-forest-50/80", activeText: "text-forest-700",
    items: [
      { id: "disease",         label: "Disease Detection",   icon: Leaf,     path: "/disease-prediction" },
      { id: "crop-prediction", label: "Crop Prediction",     icon: Sprout,   path: "/crop-prediction" },
      { id: "crop-production", label: "Production Forecast", icon: BarChart2,path: "/crop-production" },
      { id: "drone",           label: "Drone Module",        icon: Plane,    path: "/drone-module" },
    ],
  },
  {
    id: "farm-info", label: "Farm Info", icon: HeartPulse,
    color: "text-sky-600", activeBg: "bg-sky-50/80", activeText: "text-sky-700",
    items: [
      { id: "weather", label: "Weather",       icon: CloudRain,  path: "/weather" },
      { id: "market",  label: "Market Prices", icon: DollarSign, path: "/market" },
      { id: "schemes", label: "Gov Schemes",   icon: Building2,  path: "/schemes" },
    ],
  },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings", flat: true },
];

// ─── Component ────────────────────────────────────────────────────────────────

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();

  const handleLinkClick = () => {
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  const defaultOpen = () => {
    const open = new Set<string>();
    NAV.forEach(entry => {
      if (!("flat" in entry)) {
        const g = entry as NavGroup;
        if (g.items.some(i => i.path === location.pathname)) open.add(g.id);
      }
    });
    return open;
  };

  const [openGroups, setOpenGroups] = useState<Set<string>>(defaultOpen);

  const toggle = (id: string) =>
    setOpenGroups(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const isGroupActive = (g: NavGroup) => g.items.some(i => i.path === location.pathname);

  return (
    <aside className="w-[272px] bg-white/95 backdrop-blur-xl border-r border-gray-100/80 h-full md:h-screen md:sticky md:top-0 overflow-y-auto flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-forest-600 to-forest-700 rounded-xl flex items-center justify-center shadow-sm shadow-forest-500/20">
            <Wheat className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-gray-900 leading-tight tracking-tight">SmartAgro</h1>
            <p className="text-[11px] text-gray-400 font-medium leading-none mt-0.5">Farm Advisory</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1.5 text-gray-500 hover:text-forest-600 hover:bg-forest-50 rounded-xl transition-all duration-200">
            <Menu className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(entry => {
          if ("flat" in entry) {
            const Icon = entry.icon;
            const isActive = location.pathname === entry.path;
            return (
              <Link
                key={entry.id}
                to={entry.path}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-[13px] font-semibold group ${
                  isActive
                    ? "bg-forest-50/80 text-forest-700 shadow-sm shadow-forest-100/50"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${isActive ? "bg-forest-100/80" : "bg-transparent group-hover:bg-gray-100"}`}>
                  <Icon className={`h-4 w-4 ${isActive ? "text-forest-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                </div>
                {entry.label}
              </Link>
            );
          }

          const group = entry as NavGroup;
          const active = isGroupActive(group);
          const open = openGroups.has(group.id);
          const GroupIcon = group.icon;

          return (
            <div key={group.id}>
              <button
                onClick={() => toggle(group.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-[13px] font-semibold group ${
                  active ? `${group.activeBg} ${group.activeText}` : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${active ? "bg-white/60" : "bg-transparent group-hover:bg-gray-100"}`}>
                  <GroupIcon className="h-4 w-4" />
                </div>
                <span className="flex-1 text-left">{group.label}</span>
                <div className={`transition-transform duration-200 ${open ? "rotate-0" : "-rotate-90"}`}>
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </div>
              </button>

              {/* Submenu with smooth collapse */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-5 mt-0.5 mb-1 pl-4 border-l-2 border-gray-100/80 space-y-0.5">
                  {group.items.map(child => {
                    const ChildIcon = child.icon;
                    const childActive = location.pathname === child.path;
                    return (
                      <Link
                        key={child.id}
                        to={child.path}
                        onClick={handleLinkClick}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 text-[13px] ${
                          childActive
                            ? `${group.activeBg} font-semibold ${group.activeText}`
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700 font-medium"
                        }`}
                      >
                        <ChildIcon className="h-3.5 w-3.5 flex-shrink-0" />
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      {/* Help card */}
      <div className="px-4 pb-4 mt-auto">
        <div className="bg-gradient-to-br from-forest-50 to-sage-50 rounded-2xl p-4 border border-forest-100/60">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-forest-100/80 rounded-lg">
              <HelpCircle className="h-3.5 w-3.5 text-forest-600" />
            </div>
            <h3 className="font-bold text-forest-800 text-[13px]">Need Help?</h3>
          </div>
          <p className="text-xs text-forest-600/80 mb-3 leading-relaxed">Get expert farming advice from our team.</p>
          <Link
            to="/support"
            onClick={handleLinkClick}
            className="w-full btn-primary text-xs py-2 block text-center"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
