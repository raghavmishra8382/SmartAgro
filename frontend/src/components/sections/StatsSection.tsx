import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: 5000, label: "Farmers Connected", suffix: "+", icon: "👨‍🌾" },
  { value: 15000, label: "Hectares Analyzed", suffix: "+", icon: "🗺️" },
  { value: 30, label: "Agricultural Programs", suffix: "", icon: "📋" },
  { value: 18, label: "Indian States Covered", suffix: "", icon: "🇮🇳" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const patternY = useTransform(scrollYProgress, [0, 1], [0, 30]);

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
      className="py-24 md:py-32 bg-gradient-to-br from-forest-800 via-forest-700 to-forest-800 text-white relative overflow-hidden"
    >
      {/* Pattern Overlay with parallax */}
      <motion.div
        className="absolute inset-0 opacity-[0.06]"
        style={{ y: patternY, backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />
      {/* Gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-forest-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-leaf-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 font-bold text-xs tracking-wider uppercase mb-5 border border-white/10"
            >
              Our Impact
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              Empowering Farmers <br />
              <span className="text-leaf-300">Across the Globe</span>
            </h2>
            <p className="text-forest-200/80 text-lg max-w-xl leading-relaxed">
              Our platform helps farmers reduce costs, increase yields, and make data-driven decisions that impact their bottom line and the environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.12, ease }}
                whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.3 } }}
                className="bg-white/[0.07] backdrop-blur-sm border border-white/[0.08] p-6 rounded-2xl hover:bg-white/[0.12] transition-colors duration-300 cursor-default"
              >
                <span className="text-2xl mb-3 block">{stat.icon}</span>
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={2.5}
                  isVisible={isVisible}
                  suffix={stat.suffix}
                  className="text-3xl md:text-4xl font-bold text-leaf-300 mb-1.5 block tracking-tight"
                />
                <span className="text-white/60 font-medium text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </div>
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
