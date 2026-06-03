import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const benefits = [
    "AI-Powered Crop Analysis",
    "Real-time Weather Alerts",
    "Community Support Network",
    "Market Price Predictions",
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Background Decorative */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-forest-50/30 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left - Image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="w-full lg:w-1/2 relative"
          >
            <motion.div style={{ y: imageY }} className="relative rounded-2xl overflow-hidden shadow-elevated border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=2127&auto=format&fit=crop"
                alt="Farmer using technology"
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-bold text-2xl tracking-tight">Empowering</p>
                <p className="text-forest-200 font-medium">Rural India</p>
              </div>
            </motion.div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
              className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-elevated border border-gray-100/60 hidden md:block z-20"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-3"
              >
                <div className="bg-forest-50 p-3 rounded-xl">
                  <span className="text-2xl">🌾</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg tracking-tight">5,000+</p>
                  <p className="text-sm text-gray-500 font-medium">Farmers Joined</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="inline-block px-4 py-1.5 rounded-full bg-forest-50 text-forest-700 font-bold text-xs tracking-wider uppercase mb-5 border border-forest-100/60"
            >
              About SmartAgro
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight"
            >
              Bridging Tradition with{" "}
              <span className="text-forest-600">Innovation</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="text-base text-gray-500 mb-5 leading-relaxed"
            >
              SmartAgro was founded in 2020 with a vision to revolutionize farming in India. We combine deep agricultural expertise with cutting-edge AI and data science to solve the real-world challenges faced by farmers today.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6, ease }}
              className="text-base text-gray-500 mb-8 leading-relaxed"
            >
              We believe that every farmer deserves access to tools that increase productivity, reduce waste, and ensure sustainable profits.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1, ease }}
                  className="flex items-center gap-3 bg-forest-50/50 px-4 py-3 rounded-xl border border-forest-100/40"
                >
                  <CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0" />
                  <span className="text-gray-700 font-semibold text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
