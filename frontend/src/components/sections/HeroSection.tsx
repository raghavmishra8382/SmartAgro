import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=2070&auto=format&fit=crop",
];

// Premium easing curve
const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="hero" className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Images with Ken Burns effect */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.5 }, scale: { duration: 8, ease: "linear" } }}
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900/95 via-forest-800/85 to-agri-900/80" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-xl border border-white/15 shadow-lg">
            <Sparkles className="h-3.5 w-3.5 text-cream-400" />
            Smart Agriculture Platform
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.4 }}
          className="text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 text-shadow leading-[1.1] tracking-tight"
        >
          Smart
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-sage-300"
          >
            Agro
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mb-12 leading-relaxed"
        >
          Harnessing the power of AI, IoT, and drones to make farming more sustainable, productive, and profitable for every farmer
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to="/register">
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-base py-3.5 px-8 shadow-glow-green group"
            >
              Get Started
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.div>
          </Link>
          <a href="#features">
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 text-base py-3.5 px-8 backdrop-blur-sm"
            >
              Explore Features
            </motion.div>
          </a>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 1.2 }}
          className="mt-16 md:mt-20"
        >
          <div className="flex justify-center gap-10 md:gap-16 lg:gap-20 p-6 bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-white/[0.08] shadow-lg">
            {[
              { value: "10,000+", label: "Farmers" },
              { value: "28%", label: "Yield Increase" },
              { value: "35+", label: "Countries" },
            ].map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 + i * 0.15, ease }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-cream-300 tracking-tight">{value}</p>
                <p className="text-white/50 text-sm font-medium mt-1">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.a
          href="#features"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-white/50 hover:text-white bg-white/[0.06] rounded-full p-2.5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10"
          aria-label="Scroll to features section"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.a>
      </motion.div>

      {/* Image indicators */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        {images.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrentImageIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentImageIndex ? "w-8 bg-white/80" : "w-3 bg-white/30 hover:bg-white/50"
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
}
