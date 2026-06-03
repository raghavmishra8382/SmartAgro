import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "@/lib/env";
import { ScanLine, Mic, Droplets, Settings, AlertCircle, ArrowRight, Wifi, WifiOff } from "lucide-react";

// New home section components
import SmartBanner from "../components/home/SmartBanner";
import ActionCards from "../components/home/ActionCards";
import Alerts from "../components/home/Alerts";
import CropsList from "../components/home/CropsList";
import FloatingAIButton from "../components/home/FloatingAIButton";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userName = user?.fullName || "Farmer";

  // Keep the existing priority computation — passed down to ActionCards
  const [priorities, setPriorities] = useState<{ title: string; detail: string }[]>([]);

  // IoT state retained (for IoT page link / status badge)
  const [isDeviceConnected] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleConnectDevice = () => navigate("/iot-connect");
  const handleStartWatering = () => {
    if (!isDeviceConnected) setShowAlert(true);
  };

  useEffect(() => {
    const computePriorities = async () => {
      try {
        const res = await fetch(apiUrl("/api/plants"), { credentials: "include" });
        if (!res.ok) return;
        const data = await res.json();
        const actions: { title: string; detail: string }[] = [];

        const highRisk = data.filter(
          (p: any) => (p.riskLevel || "").toLowerCase() === "high"
        );
        if (highRisk.length) {
          actions.push({
            title: "Inspect high-risk plants",
            detail: `${highRisk.length} flagged today`,
          });
        }

        const now = Date.now();
        const dueFollowups = data.filter((p: any) => {
          const d = p.latestAssessment?.nextCheckDate
            ? new Date(p.latestAssessment.nextCheckDate).getTime()
            : null;
          return d !== null && d <= now;
        });
        if (dueFollowups.length) {
          actions.push({
            title: "Upload fresh photos",
            detail: `${dueFollowups.length} follow-ups due`,
          });
        }

        const worsening = data.filter(
          (p: any) =>
            (p.latestAssessment?.conditionTrend || "").toLowerCase() === "worsening"
        );
        if (worsening.length) {
          actions.push({
            title: "Re-scan worsening plants",
            detail: `${worsening.length} need attention`,
          });
        }

        if (actions.length === 0) {
          actions.push({
            title: "Keep monitoring",
            detail: "All plants stable. Upload new images weekly.",
          });
        }

        setPriorities(actions.slice(0, 3));
      } catch (err) {
        console.error("Failed to compute priorities", err);
      }
    };

    computePriorities();
  }, []);

  return (
    <div className="space-y-6 pb-24 max-w-7xl mx-auto">
      {/* ── 1. Smart Hero Banner ─────────────────────────────────────── */}
      <SmartBanner userName={userName} />

      {/* ── 2. Action Cards Row ──────────────────────────────────────── */}
      <ActionCards priorityTasks={priorities} />

      {/* ── 3. Alert Section ─────────────────────────────────────────── */}
      <Alerts />

      {/* ── 4. My Crops Section ──────────────────────────────────────── */}
      <CropsList />

      {/* ── 5. CTA Buttons ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Scan Crop Disease */}
        <button
          onClick={() => navigate("/disease-prediction")}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest-600 to-forest-700 p-6 text-left shadow-soft hover:shadow-glow-green transition-all duration-300"
        >
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 opacity-[0.08]">
            <ScanLine className="h-28 w-28 text-white" />
          </div>
          <div className="relative z-10">
            <div className="mb-3 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm">
              <ScanLine className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1 tracking-tight">Scan Crop Disease</h3>
            <p className="text-forest-200/80 text-sm">Use camera to detect any disease</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white text-forest-700 text-sm font-bold px-4 py-2 rounded-xl shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-200">
              Scan Now
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </button>

        {/* Talk to SmartAgro AI */}
        <button
          onClick={() => navigate("/chat")}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-left shadow-soft hover:shadow-elevated transition-all duration-300"
        >
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 opacity-[0.08]">
            <Mic className="h-28 w-28 text-white" />
          </div>
          <div className="relative z-10">
            <div className="mb-3 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm">
              <Mic className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1 tracking-tight">Talk to SmartAgro</h3>
            <p className="text-violet-200/80 text-sm">Ask farming questions by voice or text</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white text-violet-700 text-sm font-bold px-4 py-2 rounded-xl shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-200">
              Ask Now
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </button>
      </div>

      {/* ── 6. Quick IoT Status Strip ────────────────────────────────── */}
      <div className="card-premium flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${isDeviceConnected ? "bg-forest-50" : "bg-gray-50"}`}>
            {isDeviceConnected ? (
              <Wifi className="h-5 w-5 text-forest-600" />
            ) : (
              <WifiOff className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">IoT Sprinkler System</p>
            <p className={`text-xs font-semibold ${isDeviceConnected ? "text-forest-600" : "text-gray-400"}`}>
              {isDeviceConnected ? "● Connected" : "○ Not Connected"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isDeviceConnected && (
            <button
              onClick={handleConnectDevice}
              className="btn-primary text-xs py-2 px-4"
            >
              Connect Device
            </button>
          )}
          <button
            onClick={handleStartWatering}
            disabled={!isDeviceConnected}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isDeviceConnected
                ? "bg-forest-600 text-white hover:bg-forest-700 shadow-sm"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Droplets className="h-4 w-4" />
            Start Watering
          </button>
          <button
            onClick={handleConnectDevice}
            className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-200"
            title="IoT Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* IoT Alert Toast */}
      {showAlert && !isDeviceConnected && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm animate-slideInRight">
          <div className="bg-white rounded-2xl shadow-elevated border border-orange-100/60 p-4 flex items-start gap-3">
            <div className="p-1.5 bg-orange-50 rounded-lg flex-shrink-0">
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800">No IoT Device Connected</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Connect your device to enable watering control.
              </p>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="text-gray-400 hover:text-gray-600 text-lg leading-none p-1"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ── 7. Floating AI Button ─────────────────────────────────────── */}
      <FloatingAIButton />
    </div>
  );
};

export default Home;
