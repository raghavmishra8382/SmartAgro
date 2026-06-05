import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, PlayCircle, Leaf, Scan, ShieldCheck, 
  Droplets, Thermometer, Users, TrendingUp, Globe, Sprout 
} from "lucide-react";

export default function HeroSection() {
  return (
    <div id="hero" className="relative min-h-[calc(100vh-5rem)] bg-white overflow-hidden flex flex-col justify-between">
      
      {/* Full Bleed Background Section */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {/* Right side image - Full height, fading into white */}
        <div 
          className="absolute right-0 top-0 w-full md:w-[70%] h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop')" }}
        />
        {/* Smooth gradient overlay masking from left (white) to right (transparent) - Full width to prevent borders */}
        <div 
          className="absolute inset-0 w-full h-full hidden md:block" 
          style={{ background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 35%, rgba(255,255,255,0) 65%)' }}
        />
        
        {/* Extra gradient block for mobile readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/70 to-transparent md:hidden" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8 pt-12 lg:pt-20 pb-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-center">
          
          {/* Left Column - Content (Spans 5 of 12 columns) */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center mt-4">
            
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f0f9f4] text-[#1c6c3f] font-semibold text-sm mb-6"
            >
              <Leaf className="w-4 h-4" /> Smart Agriculture Platform
            </motion.div>
            
            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-[72px] font-[800] text-slate-800 leading-[1.05] mb-6 tracking-tight"
            >
              Smarter <span className="text-[#2b6a43]">Farming.</span><br/>
              Sustainable <span className="text-[#2b6a43]">Future.</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed max-w-lg"
            >
              Harnessing the power of AI and IoT to help farmers increase productivity, reduce costs, and build a better tomorrow.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <Link to="/register" className="inline-flex items-center gap-2 bg-[#2b6a43] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#1f4f31] transition-colors shadow-lg shadow-green-900/20 text-base">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#features" className="inline-flex items-center justify-center bg-white text-[#2b6a43] border border-gray-200 px-8 py-3.5 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-sm text-base">
                Explore Features
              </a>
            </motion.div>
            
            {/* Features Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center divide-x divide-gray-200/60"
            >
              {/* Feature 1 */}
              <div className="flex items-center gap-3 pr-6">
                <div className="w-10 h-10 rounded-lg bg-[#eef8f1] flex items-center justify-center text-[#2b6a43] shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">AI-Powered</h4>
                  <p className="text-[12px] text-slate-500">Smart Insights</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3 pl-6">
                <div className="w-10 h-10 rounded-lg bg-[#eef8f1] flex items-center justify-center text-[#2b6a43] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">Sustainable</h4>
                  <p className="text-[12px] text-slate-500">Better Tomorrow</p>
                </div>
              </div>
            </motion.div>
            
          </div>
          
          {/* Right Column - Glassmorphism Widgets (Spans 7 of 12 columns) */}
          <div className="lg:col-span-7 relative h-full hidden lg:block pointer-events-none">
            
            {/* Crop Health Widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute top-[30%] left-[25%] bg-[#0f291e]/70 backdrop-blur-md border border-white/20 p-2.5 rounded-xl shadow-2xl flex items-center gap-3 w-40"
            >
              <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center shrink-0">
                <Leaf className="w-4 h-4 text-green-300" />
              </div>
              <div>
                <p className="text-[10px] text-white/90 font-medium leading-none mb-1">Crop Health</p>
                <p className="text-lg font-bold text-white leading-none mb-0.5">98%</p>
                <p className="text-[9px] text-white/70 leading-none">Excellent</p>
              </div>
              {/* SVG pointer line */}
              <svg className="absolute -bottom-16 left-1/2 w-[1px] h-16 overflow-visible">
                 <line x1="0" y1="0" x2="0" y2="64" stroke="rgba(255,255,255,0.8)" strokeWidth="1" strokeDasharray="3 3"/>
                 <circle cx="0" cy="64" r="3" fill="white" />
              </svg>
            </motion.div>
            
            {/* Soil Moisture Widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute top-[45%] right-[10%] bg-[#0f291e]/70 backdrop-blur-md border border-white/20 p-2.5 rounded-xl shadow-2xl flex items-center gap-3 w-40"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0">
                <Droplets className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <p className="text-[10px] text-white/90 font-medium leading-none mb-1">Soil Moisture</p>
                <p className="text-lg font-bold text-white leading-none mb-0.5">72%</p>
                <p className="text-[9px] text-white/70 leading-none">Optimal</p>
              </div>
              {/* SVG pointer line */}
              <svg className="absolute top-1/2 -left-16 w-16 h-[1px] overflow-visible">
                 <line x1="0" y1="0" x2="64" y2="0" stroke="rgba(255,255,255,0.8)" strokeWidth="1" strokeDasharray="3 3"/>
                 <circle cx="0" cy="0" r="3" fill="white" />
              </svg>
            </motion.div>

            {/* Temperature Widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="absolute bottom-[20%] left-[40%] bg-[#0f291e]/70 backdrop-blur-md border border-white/20 p-2.5 rounded-xl shadow-2xl flex items-center gap-3 w-40"
            >
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-400/30 flex items-center justify-center shrink-0">
                <Thermometer className="w-4 h-4 text-orange-200" />
              </div>
              <div>
                <p className="text-[10px] text-white/90 font-medium leading-none mb-1">Temperature</p>
                <p className="text-lg font-bold text-white leading-none mb-0.5">24°C</p>
                <p className="text-[9px] text-white/70 leading-none">Ideal</p>
              </div>
              {/* SVG pointer line */}
              <svg className="absolute top-1/2 -right-24 w-24 h-[1px] overflow-visible">
                 <line x1="0" y1="0" x2="96" y2="0" stroke="rgba(255,255,255,0.8)" strokeWidth="1" strokeDasharray="3 3"/>
                 <circle cx="96" cy="0" r="3" fill="white" />
              </svg>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Decorative White Curve to overlay behind the dark green bar on the left */}
      <div className="relative w-full z-10 -mb-6 md:-mb-10 lg:-mb-14 xl:-mb-20">
        <svg viewBox="0 0 1440 120" className="w-full h-auto fill-white drop-shadow-sm transform translate-y-1">
          <path d="M0,0 C240,120 480,120 1440,0 L1440,120 L0,120 Z"></path>
        </svg>
      </div>

      {/* Bottom Dark Green Stats Bar */}
      <div className="relative w-full z-20 pb-6 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="bg-[#183625] rounded-3xl lg:rounded-[2rem] px-6 py-6 md:px-12 md:py-8 shadow-2xl relative overflow-hidden">
            
            {/* Subtle glow effect inside the green bar */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
               <div className="absolute -top-[150px] -left-[50px] w-[300px] h-[300px] bg-white rounded-full blur-3xl mix-blend-overlay"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 relative z-10 divide-x divide-white/10">
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white leading-none">10,000+</h3>
                  <p className="text-[13px] font-semibold text-white/90 mt-1">Farmers</p>
                  <p className="text-[11px] text-white/60 leading-tight">Trust our platform</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pl-4 lg:pl-8">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white leading-none">28%</h3>
                  <p className="text-[13px] font-semibold text-white/90 mt-1">Average Yield Increase</p>
                  <p className="text-[11px] text-white/60 leading-tight">Through smart insights</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pl-4 lg:pl-8 border-l border-white/10">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white leading-none">35+</h3>
                  <p className="text-[13px] font-semibold text-white/90 mt-1">Countries</p>
                  <p className="text-[11px] text-white/60 leading-tight">Growing worldwide</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pl-4 lg:pl-8">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white leading-none">1M+</h3>
                  <p className="text-[13px] font-semibold text-white/90 mt-1">Acres Monitored</p>
                  <p className="text-[11px] text-white/60 leading-tight">And counting</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
