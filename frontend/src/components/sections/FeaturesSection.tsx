import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, CloudSun, MessageSquare, Timer, BarChart2, Users, ArrowRight } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    icon: Leaf,
    title: "Soil Analysis & Crop Recommendations",
    description:
      "Analyze NPK levels from soil samples to receive tailored recommendations for crops and fertilizers to optimize your yield.",
    link: "/features/soil-analysis",
    gradient: "from-forest-500 to-forest-600",
    bg: "bg-forest-50",
  },
  {
    icon: CloudSun,
    title: "Weather Forecasting & Predictions",
    description:
      "Get accurate weather forecasts and real-time soil condition data to make informed decisions for your farming activities.",
    link: "/features/weather",
    gradient: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
  },
  {
    icon: MessageSquare,
    title: "AI-Powered Agricultural Assistant",
    description:
      "Access our intelligent chatbot for instant guidance on farming techniques, crop diseases, and best practices.",
    link: "/features/chatbot",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
  },
  {
    icon: Timer,
    title: "Growth & Income Calculation",
    description:
      "Time series models analyze your soil, weather, and crop data to calculate expected growth and yearly income predictions.",
    link: "/features/growth-calculator",
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
  },
  {
    icon: BarChart2,
    title: "Disease Prediction & Prevention",
    description:
      "Our GenAI technology identifies potential crop diseases before they appear and suggests prevention strategies.",
    link: "/features/disease-prediction",
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
  },
  {
    icon: Users,
    title: "Farmer Community",
    description:
      "Connect with other farmers to share knowledge, experiences, and insights for better agricultural practices.",
    link: "/features/community",
    gradient: "from-teal-500 to-cyan-600",
    bg: "bg-teal-50",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for decorative blobs
  const blobY1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section id="features" className="py-24 md:py-32 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Decorative parallax blobs */}
      <motion.div
        style={{ y: blobY1 }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-forest-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -translate-y-1/2 translate-x-1/3 pointer-events-none"
      />
      <motion.div
        style={{ y: blobY2 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cream-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 translate-y-1/3 -translate-x-1/3 pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-forest-600 font-bold tracking-wider uppercase text-xs mb-4 bg-forest-50 px-4 py-1.5 rounded-full border border-forest-100/60"
          >
            Why Choose SmartAgro?
          </motion.span>

          <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-tight tracking-tight">
            Innovative Technology for <br />
            <span className="text-forest-600 relative inline-block">
              Modern Farming
              <motion.svg
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-full h-3 -bottom-1 left-0 text-leaf-300/60 -z-10 origin-left"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
              </motion.svg>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-gray-500 max-w-2xl mx-auto mt-5 leading-relaxed"
          >
            Leverage AI, machine learning, and comprehensive data analytics to optimize every aspect of your agricultural operations.
          </motion.p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group bg-white rounded-2xl p-7 md:p-8 shadow-soft hover:shadow-elevated transition-shadow duration-500 border border-gray-100/80 hover:border-forest-200/60 relative overflow-hidden cursor-pointer"
              >
                {/* Animated corner blob */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-forest-50/80 to-transparent rounded-bl-[3rem] -mr-8 -mt-8 transition-all duration-700 ease-out group-hover:scale-[2] group-hover:opacity-60" />

                <div className="relative z-10">
                  {/* Icon with gradient background on hover */}
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-all duration-500 ${feature.bg} group-hover:bg-gradient-to-br group-hover:${feature.gradient} group-hover:shadow-md`}
                  >
                    <Icon className="h-6 w-6 text-gray-700 group-hover:text-white transition-colors duration-500" />
                  </motion.div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-forest-700 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <span className="inline-flex items-center text-forest-600 font-semibold text-sm group-hover:text-forest-700 transition-all duration-300">
                    Explore Feature
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
