import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, CloudSun, MessageSquare, Timer, BarChart2, Users, ArrowRight } from "lucide-react";
import { useRef } from "react";

import { Link } from "react-router-dom";

const features = [
  {
    icon: Leaf,
    title: "Soil Analysis & Crop Recommendations",
    description:
      "Analyze NPK levels from soil samples to receive tailored recommendations for crops and fertilizers to optimize your yield.",
    link: "/crop-prediction",
    gradient: "from-forest-500 to-forest-600",
    bg: "bg-forest-50",
  },
  {
    icon: CloudSun,
    title: "Weather Forecasting & Predictions",
    description:
      "Get accurate weather forecasts and real-time soil condition data to make informed decisions for your farming activities.",
    link: "/weather",
    gradient: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
  },
  {
    icon: MessageSquare,
    title: "AI-Powered Agricultural Assistant",
    description:
      "Access our intelligent chatbot for instant guidance on farming techniques, crop diseases, and best practices.",
    link: "/chat",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
  },
  {
    icon: Timer,
    title: "Growth & Income Calculation",
    description:
      "Time series models analyze your soil, weather, and crop data to calculate expected growth and yearly income predictions.",
    link: "/crop-production",
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
  },
  {
    icon: BarChart2,
    title: "Disease Prediction & Prevention",
    description:
      "Our GenAI technology identifies potential crop diseases before they appear and suggests prevention strategies.",
    link: "/disease-prediction",
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
  },
  {
    icon: Users,
    title: "Farmer Community",
    description:
      "Connect with other farmers to share knowledge, experiences, and insights for better agricultural practices.",
    link: "/community",
    gradient: "from-teal-500 to-cyan-600",
    bg: "bg-teal-50",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="features" className="py-24 md:py-32 bg-[#08140D] relative overflow-hidden" ref={sectionRef}>
      
      {/* Dark mode glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#1c6c3f] rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#2b6a43] rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-green-400 font-semibold text-xs tracking-wide uppercase mb-6"
          >
            Powerful Capabilities
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[56px] font-[800] text-white leading-tight tracking-tight mb-6"
          >
            Everything you need for <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">modern farming.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            Leverage AI, machine learning, and comprehensive data analytics to optimize every aspect of your agricultural operations.
          </motion.p>
        </div>

        {/* Hierarchical Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {[
            { index: 0, size: 'large' },  // Soil Analysis (Large, 58%)
            { index: 1, size: 'medium' }, // Weather Forecasting (Medium, 42%)
            { index: 2, size: 'medium' }, // AI Assistant (Medium, 42%)
            { index: 4, size: 'large' },  // Disease Prediction (Large, 58%) - Alternates layout
            { index: 5, size: 'small' },  // Farmer Community (Small, 50%)
            { index: 3, size: 'small' },  // Growth Calculator (Small, 50%)
          ].map((layoutConfig, idx) => {
            const feature = features[layoutConfig.index];
            const Icon = feature.icon;
            
            const isLarge = layoutConfig.size === 'large';
            const isMedium = layoutConfig.size === 'medium';
            const isSmall = layoutConfig.size === 'small';
            
            // Grid sizing (7-col / 5-col split = 58% / 42% ratio)
            let spanClass = "";
            if (isLarge) spanClass = "col-span-1 md:col-span-12 lg:col-span-7";
            if (isMedium) spanClass = "col-span-1 md:col-span-12 lg:col-span-5";
            if (isSmall) spanClass = "col-span-1 md:col-span-6 lg:col-span-6";

            // Visual sizing hierarchy
            const paddingClass = isLarge ? "p-8 lg:p-12" : isMedium ? "p-8 lg:p-10" : "p-6 lg:p-8";
            const titleClass = isLarge ? "text-2xl lg:text-3xl" : isMedium ? "text-xl lg:text-2xl" : "text-lg lg:text-xl";
            const iconWrapClass = isLarge ? "w-20 h-20 rounded-3xl" : isMedium ? "w-16 h-16 rounded-2xl" : "w-14 h-14 rounded-2xl";
            const iconSizeClass = isLarge ? "w-10 h-10" : isMedium ? "w-8 h-8" : "w-6 h-6";
            
            // Layout direction based on size
            const flexDirClass = isLarge 
              ? "flex-col lg:flex-row lg:items-center gap-8 lg:gap-12" 
              : isSmall 
                ? "flex-col xl:flex-row xl:items-center gap-6" 
                : "flex-col gap-6 lg:gap-8";

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`${spanClass}`}
              >
                <Link
                  to={feature.link}
                  className={`group block relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] hover:bg-white/[0.05] hover:border-green-500/30 transition-all duration-500 overflow-hidden h-full ${paddingClass}`}
                >
                  
                  {/* Subtle hover gradient inside the card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-transparent to-green-500/0 group-hover:to-green-500/5 transition-colors duration-500" />
                  
                  <div className={`relative z-10 flex h-full ${flexDirClass}`}>
                    
                    {/* Icon */}
                    <div className={`${iconWrapClass} bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-green-500/20 group-hover:border-green-500/30 transition-all duration-500`}>
                      <Icon className={`${iconSizeClass} text-green-400 group-hover:text-green-300 transition-colors`} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col flex-1 justify-center h-full">
                      <h3 className={`font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300 ${titleClass}`}>
                        {feature.title}
                      </h3>
                      
                      <p className={`text-gray-400 leading-relaxed mb-6 lg:mb-8 ${isSmall ? 'text-sm' : 'text-base lg:text-lg'}`}>
                        {feature.description}
                      </p>
                      
                      <div className="mt-auto">
                        <span className="inline-flex items-center text-green-400 font-semibold text-sm group-hover:text-green-300 transition-colors">
                          Explore Feature 
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </span>
                      </div>
                    </div>
  
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
