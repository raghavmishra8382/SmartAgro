import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, MapPin, Sprout, Globe } from "lucide-react";

const stats = [
  { value: 5000, label: "Active Farmers", suffix: "+", icon: Users },
  { value: 15, label: "Hectares Analyzed", suffix: "k+", icon: MapPin },
  { value: 30, label: "Agri Programs", suffix: "+", icon: Sprout },
  { value: 18, label: "States Covered", suffix: "", icon: Globe },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Parallax for the background image
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center min-h-[80vh] bg-[#0B1B13]"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 w-full h-[140%] -top-[20%] z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592982537447-6f233c706856?q=80&w=2000&auto=format&fit=crop')" }}
        />
        {/* Dark overlay gradients for contrast */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08140D] via-transparent to-[#F8FAF9] opacity-30" />
      </motion.div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-green-300 font-semibold text-xs tracking-wide uppercase mb-6 shadow-xl"
          >
            Our Global Impact
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[56px] font-[800] text-white leading-tight tracking-tight mb-6"
          >
            Empowering farmers <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">across the globe.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 leading-relaxed"
          >
            Our platform helps farmers reduce costs, increase yields, and make data-driven decisions that impact their bottom line and the environment.
          </motion.p>
        </div>

        {/* 4 Column Glassmorphism Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="group relative bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 lg:p-10 hover:bg-white/[0.08] hover:border-green-500/40 transition-all duration-500 flex flex-col items-center text-center overflow-hidden shadow-2xl"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-green-500/0 to-green-500/0 group-hover:from-green-500/10 group-hover:to-transparent transition-colors duration-500" />
                
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mb-8 group-hover:scale-110 group-hover:bg-green-500/20 group-hover:border-green-500/30 transition-all duration-500 relative z-10">
                  <Icon className="w-8 h-8 text-green-400 group-hover:text-green-300" />
                </div>
                
                <div className="relative z-10 w-full">
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      isVisible={isVisible}
                      suffix={stat.suffix}
                      className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mt-2">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}

interface CountUpProps {
  start: number;
  end: number;
  duration: number;
  isVisible: boolean;
  suffix: string;
  className?: string;
}

function CountUp({ start, end, duration, isVisible, suffix, className = "" }: CountUpProps) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercent = Math.min(progress / (duration * 1000), 1);

      // Cubic ease-out for premium feel
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOut(progressPercent);

      const currentCount = Math.floor(start + easedProgress * (end - start));
      setCount(currentCount);

      if (progressPercent < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [start, end, duration, isVisible]);

  return <div className={className}>{count.toLocaleString()}{suffix}</div>;
}
