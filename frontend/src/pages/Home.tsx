import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "@/lib/env";
import { useWeather } from "@/lib/useWeather";
import { useMandiPrices } from "@/lib/useMandiPrices";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ScanLine, Bot, Droplets, Settings, AlertCircle, ArrowRight, 
  Wifi, WifiOff, CloudSun, Sprout, TrendingUp, Leaf, Wind, ThermometerSun
} from "lucide-react";

import Alerts from "../components/home/Alerts";
import CropsList from "../components/home/CropsList";
import FloatingAIButton from "../components/home/FloatingAIButton";

// ─── Animation Variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const pulseGlow = {
  initial: { opacity: 0.5, scale: 0.8 },
  animate: { opacity: [0.5, 1, 0.5], scale: [0.8, 1.1, 0.8], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
};

// ─── Luxury Home Component ─────────────────────────────────────────────────────

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userName = user?.fullName?.split(" ")[0] || "Farmer";

  // Data Hooks
  const { weather, loading: wLoading } = useWeather();
  const { topGainer, loading: mLoading } = useMandiPrices();

  // States
  const [healthStats, setHealthStats] = useState({ healthy: 0, atRisk: 0 });
  const [isDeviceConnected] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  useEffect(() => {
    fetch(apiUrl("/api/plants"), { credentials: "include" })
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        const atRisk = data.filter((p: any) => ["high", "medium"].includes((p.riskLevel || "").toLowerCase())).length;
        setHealthStats({ healthy: Math.max(0, data.length - atRisk), atRisk });
      })
      .catch(() => {});
  }, []);

  const handleStartWatering = () => {
    if (!isDeviceConnected) setShowAlert(true);
  };

  return (
    <div className="relative min-h-screen pb-24 overflow-hidden selection:bg-forest-200">
      
      {/* ── Background Ambient Glowing Orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div variants={pulseGlow} initial="initial" animate="animate" className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px]" />
        <motion.div variants={pulseGlow} initial="initial" animate="animate" className="absolute top-[30%] -right-[10%] w-[400px] h-[400px] bg-teal-400/10 rounded-full blur-[100px]" style={{ animationDelay: "2s" }} />
        <motion.div variants={pulseGlow} initial="initial" animate="animate" className="absolute -bottom-[10%] left-[20%] w-[600px] h-[600px] bg-forest-500/10 rounded-full blur-[150px]" style={{ animationDelay: "1s" }} />
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* ── Command Center (Hero) ── */}
        <motion.div variants={fadeUp} className="relative w-full rounded-[2.5rem] bg-white/40 backdrop-blur-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-8 md:p-12 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-10">
            {/* Greeting */}
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-50 border border-forest-100/50 shadow-sm">
                <CloudSun className="h-4 w-4 text-forest-600" />
                <span className="text-xs font-bold text-forest-800 tracking-wide uppercase">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-600 to-teal-500">{userName}</span>.
              </h1>
              <p className="text-lg text-gray-600/90 font-medium max-w-lg leading-relaxed">
                Your fields are looking pristine today. Let’s manage your smart farm ecosystem.
              </p>
            </div>

            {/* Premium IoT Controller */}
            <div className="flex-shrink-0 w-full xl:w-80 rounded-[2rem] bg-white/60 backdrop-blur-md border border-white/80 shadow-lg p-6 relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:bg-white/80">
              <div className="absolute top-0 right-0 w-32 h-32 bg-forest-400/10 rounded-full blur-2xl" />
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl ${isDeviceConnected ? "bg-forest-100 shadow-inner" : "bg-gray-100"} transition-colors`}>
                    {isDeviceConnected ? <Wifi className="h-6 w-6 text-forest-600 animate-pulse" /> : <WifiOff className="h-6 w-6 text-gray-400" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Sprinkler System</h3>
                    <span className={`text-[11px] font-extrabold uppercase tracking-widest ${isDeviceConnected ? "text-forest-600" : "text-gray-400"}`}>
                      {isDeviceConnected ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>
                <button onClick={() => navigate("/iot-connect")} className="p-2 rounded-xl hover:bg-gray-200/50 transition-colors">
                  <Settings className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <button 
                onClick={handleStartWatering}
                disabled={!isDeviceConnected}
                className={`relative z-10 w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold transition-all duration-300 ${
                  isDeviceConnected 
                  ? "bg-forest-600 text-white shadow-[0_8px_16px_rgba(34,197,94,0.2)] hover:bg-forest-700 hover:shadow-[0_12px_24px_rgba(34,197,94,0.3)] hover:-translate-y-1"
                  : "bg-gray-200/50 text-gray-400 border border-gray-300/50 cursor-not-allowed"
                }`}
              >
                <Droplets className="h-4 w-4" /> Start Irrigation
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Floating Stats Row ── */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Weather Stat */}
          <div className="rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 p-6 flex items-center gap-5 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:-translate-y-1 transition-transform duration-300">
            <div className="p-4 rounded-2xl bg-sky-100/50 shadow-inner">
              <ThermometerSun className="h-8 w-8 text-sky-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Weather</p>
              <h4 className="text-2xl font-black text-gray-900">
                {wLoading ? "..." : `${weather?.temp || "--"}°C`}
              </h4>
              <p className="text-sm font-medium text-sky-700/80 capitalize">{weather?.description || "Clear skies"}</p>
            </div>
          </div>

          {/* Market Stat */}
          <div className="rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 p-6 flex items-center gap-5 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:-translate-y-1 transition-transform duration-300">
            <div className="p-4 rounded-2xl bg-emerald-100/50 shadow-inner">
              <TrendingUp className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Top Market</p>
              <h4 className="text-2xl font-black text-gray-900 truncate max-w-[150px]">
                {mLoading ? "..." : topGainer ? topGainer.name : "Wheat"}
              </h4>
              <p className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                +{topGainer ? topGainer.change.toFixed(1) : "2.4"}% <span className="text-emerald-700/60 font-medium">today</span>
              </p>
            </div>
          </div>

          {/* Crop Health Stat */}
          <div className="rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 p-6 flex items-center gap-5 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:-translate-y-1 transition-transform duration-300">
            <div className="p-4 rounded-2xl bg-amber-100/50 shadow-inner">
              <Sprout className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Crop Health</p>
              <h4 className="text-2xl font-black text-gray-900">
                {healthStats.healthy + healthStats.atRisk} <span className="text-lg text-gray-500">total</span>
              </h4>
              <p className="text-sm font-bold text-amber-600">
                {healthStats.atRisk} <span className="text-amber-700/60 font-medium">need attention</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Luxury Action Gateways ── */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Scan CTA */}
          <button onClick={() => navigate("/disease-prediction")} className="group relative rounded-[2.5rem] bg-gray-900 overflow-hidden text-left shadow-2xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(34,197,94,0.2)] hover:-translate-y-2 border border-gray-800">
            <div className="absolute inset-0 bg-gradient-to-br from-forest-600/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-forest-500/20 rounded-full blur-[80px] group-hover:bg-forest-400/40 transition-colors duration-700" />
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-700 pointer-events-none">
              <ScanLine className="h-64 w-64 text-white" />
            </div>
            
            <div className="relative z-10 p-10 flex flex-col h-full min-h-[280px] justify-between">
              <div>
                <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <ScanLine className="h-8 w-8 text-emerald-400" />
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">AI Crop Scanner</h2>
                <p className="text-gray-400 text-base max-w-sm font-medium leading-relaxed">
                  Leverage our advanced computer vision model to instantly detect diseases and anomalies in your crops.
                </p>
              </div>
              <div className="inline-flex w-max items-center gap-3 bg-white text-gray-900 text-sm font-bold px-6 py-3 rounded-2xl shadow-lg group-hover:bg-forest-50 transition-colors duration-300 mt-8">
                Initialize Scanner <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* Assistant CTA */}
          <button onClick={() => navigate("/chat")} className="group relative rounded-[2.5rem] bg-white overflow-hidden text-left shadow-xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-violet-400/10 rounded-full blur-[80px] group-hover:bg-violet-400/20 transition-colors duration-700" />
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none">
              <Bot className="h-64 w-64 text-violet-900" />
            </div>
            
            <div className="relative z-10 p-10 flex flex-col h-full min-h-[280px] justify-between">
              <div>
                <div className="w-16 h-16 rounded-3xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <Bot className="h-8 w-8 text-violet-600" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">SmartAgro Assistant</h2>
                <p className="text-gray-500 text-base max-w-sm font-medium leading-relaxed">
                  Have a question? Talk to your personal AI agronomist for expert advice, market insights, and best practices.
                </p>
              </div>
              <div className="inline-flex w-max items-center gap-3 bg-violet-600 text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-lg hover:bg-violet-700 transition-colors duration-300 mt-8">
                Start Conversation <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        </motion.div>

        {/* ── Embedded Data Lists ── */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          
          {/* Crops List Wrapped in Luxury Container */}
          <div className="rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-forest-400 to-transparent opacity-50" />
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 px-2">
              <Leaf className="h-5 w-5 text-forest-600" /> My Fields
            </h3>
            <div className="-mx-2"><CropsList /></div>
          </div>

          {/* Alerts Wrapped in Luxury Container */}
          <div className="rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-400 to-transparent opacity-50" />
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 px-2">
              <AlertCircle className="h-5 w-5 text-amber-600" /> System Alerts
            </h3>
            <div className="-mx-2"><Alerts /></div>
          </div>

        </motion.div>

      </motion.div>

      {/* ── IoT Error Toast ── */}
      <AnimatePresence>
        {showAlert && !isDeviceConnected && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
          >
            <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 p-5 flex items-start gap-4">
              <div className="p-2.5 bg-red-500/20 rounded-xl flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-red-400" />
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-base font-bold text-white">Connection Error</p>
                <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                  IoT hardware is currently offline. Please check your device settings to begin irrigation.
                </p>
              </div>
              <button onClick={() => setShowAlert(false)} className="text-gray-500 hover:text-white p-2 rounded-xl hover:bg-gray-800 transition-colors">
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingAIButton />
    </div>
  );
};

export default Home;
