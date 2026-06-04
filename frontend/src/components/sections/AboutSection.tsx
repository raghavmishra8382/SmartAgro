import { motion } from "framer-motion";
import { Users, Target, ShieldCheck, TrendingUp } from "lucide-react";
import { useRef } from "react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const benefits = [
    {
      icon: Target,
      title: "Precision Farming",
      desc: "AI-driven insights for optimal yields"
    },
    {
      icon: ShieldCheck,
      title: "Risk Mitigation",
      desc: "Proactive weather and disease alerts"
    },
    {
      icon: Users,
      title: "Community Driven",
      desc: "Knowledge sharing across borders"
    },
    {
      icon: TrendingUp,
      title: "Profit Optimization",
      desc: "Smart market price predictions"
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-[#F8FAF9] relative overflow-hidden" ref={sectionRef}>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-900/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/[0.03] rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left - Premium Image Collage */}
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="w-[90%] sm:w-[85%] h-[400px] sm:h-[500px] lg:h-[650px] rounded-[2rem] overflow-hidden shadow-2xl relative mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
                <img
                  src="https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=2127&auto=format&fit=crop"
                  alt="Farmer using technology"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Overlapping small image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-4 sm:bottom-10 -right-2 sm:-right-4 lg:-right-8 w-[180px] sm:w-[240px] lg:w-[280px] h-[180px] sm:h-[240px] lg:h-[280px] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl border-[6px] lg:border-[8px] border-[#F8FAF9] z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1000&auto=format&fit=crop"
                alt="Agricultural crops"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </motion.div>

            {/* Floating Stats Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-8 sm:top-12 -left-4 sm:-left-6 lg:-left-12 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] z-30 flex items-center gap-4 sm:gap-5 border border-gray-100"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                <Users className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <p className="font-extrabold text-gray-900 text-2xl sm:text-3xl tracking-tight leading-none mb-1">10k+</p>
                <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider">Active Farmers</p>
              </div>
            </motion.div>
          </div>

          {/* Right - Content */}
          <div className="w-full lg:w-1/2 pt-12 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/50 border border-green-200/50 text-green-700 font-bold text-xs tracking-wide uppercase mb-6"
            >
              Our Mission
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-[52px] font-[800] text-[#0f291e] mb-6 leading-[1.1] tracking-tight"
            >
              Bridging traditional roots with <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">modern innovation.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 mb-5 leading-relaxed"
            >
              Founded with a vision to revolutionize agriculture, we combine deep farming expertise with cutting-edge AI and data science to solve the real-world challenges faced by farmers today.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-600 mb-10 leading-relaxed"
            >
              We believe that every farmer deserves access to intelligent tools that increase productivity, eliminate guesswork, and ensure sustainable, highly profitable yields for generations to come.
            </motion.p>

            {/* Grid of benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0 text-green-600 group-hover:scale-110 group-hover:bg-green-50 group-hover:border-green-100 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-[15px] group-hover:text-green-700 transition-colors duration-300">{benefit.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
