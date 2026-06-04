import { motion } from "framer-motion";
import { Wifi, Cpu, LineChart, Sprout } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Connect Your Farm",
    description: "Integrate your existing IoT sensors or easily input your farm's baseline data into our secure platform.",
    icon: Wifi,
  },
  {
    id: "02",
    title: "AI Processing",
    description: "Our proprietary machine learning engine analyzes your soil health, local weather, and crop data in real-time.",
    icon: Cpu,
  },
  {
    id: "03",
    title: "Actionable Insights",
    description: "Receive precise recommendations, automated schedules, and proactive disease alerts on your dashboard.",
    icon: LineChart,
  },
  {
    id: "04",
    title: "Optimize Yield",
    description: "Execute the data-driven plan to reduce resource waste, protect your crops, and maximize your profitability.",
    icon: Sprout,
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#08140D] relative overflow-hidden">
      
      {/* Decorative Dark Mode Background Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-green-400 font-semibold text-xs tracking-wide uppercase mb-6"
          >
            Platform Workflow
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[52px] font-[800] text-white leading-tight tracking-tight mb-6"
          >
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">SmartAgro</span> Works
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            From raw field data to profitable harvests, our platform streamlines your entire agricultural operation in four simple steps.
          </motion.p>
        </div>

        {/* Workflow Grid */}
        <div className="relative">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[48px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-transparent via-green-500/20 to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative group"
                >
                  
                  {/* Icon Node - Dark Mode Glassmorphism */}
                  <div className="w-24 h-24 mx-auto bg-white/[0.03] backdrop-blur-xl rounded-[2rem] border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:-translate-y-2 group-hover:bg-white/[0.08] group-hover:border-green-500/40 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-b from-green-500/0 to-green-500/0 group-hover:from-green-500/20 group-hover:to-transparent rounded-[2rem] transition-colors duration-500" />
                    
                    <Icon className="w-10 h-10 text-gray-400 group-hover:text-green-400 group-hover:scale-110 transition-all duration-500 relative z-10" />
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-green-500 text-gray-900 flex items-center justify-center text-xs font-bold ring-4 ring-[#08140D] shadow-lg group-hover:bg-green-400 transition-colors duration-500 z-20">
                      {step.id}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed px-4 lg:px-2 group-hover:text-gray-300 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
