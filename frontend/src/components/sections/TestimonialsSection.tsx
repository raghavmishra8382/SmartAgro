import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Punjab",
    role: "Wheat Farmer",
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921&auto=format&fit=crop",
    rating: 5,
    text: "SmartAgro's AI soil analysis has transformed my entire operation. We've reduced our fertilizer costs by 30% while actually seeing a 40% increase in yield. It's almost unbelievable.",
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    location: "Tamil Nadu",
    role: "Sugarcane Grower",
    image: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "The hyper-local weather forecasting feature has been a massive game-changer. I can now plan my irrigation schedules with absolute precision, protecting my crops from unexpected shifts.",
  },
  {
    id: 3,
    name: "Anita Desai",
    location: "Karnataka",
    role: "Commercial Farm Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    rating: 5,
    text: "The profitability tracking dashboard is phenomenal. I can now track all my input costs against my expected harvest value in real-time. This is the absolute future of farming.",
  }
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(next, 7000);
    return () => clearInterval(interval);
  }, [autoplay, current]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#F4F7F5] relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 font-bold text-xs tracking-wide uppercase mb-6 shadow-sm"
          >
            Success Stories
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[52px] font-[800] text-gray-900 leading-tight tracking-tight mb-6"
          >
            Farmers Trust <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">SmartAgro</span>
          </motion.h2>
        </div>

        {/* Premium Large Slider */}
        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          {/* Main Card Container */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden relative min-h-[500px] lg:min-h-[600px] flex items-stretch">
            
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full flex flex-col lg:flex-row absolute inset-0 h-full"
              >
                {/* Left: Massive Image */}
                <div className="w-full lg:w-5/12 h-64 lg:h-full relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gray-900/10 z-10" />
                  <img 
                    src={testimonials[current].image} 
                    alt={testimonials[current].name} 
                    className="w-full h-full object-cover"
                  />
                  {/* Rating Overlay */}
                  <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg">
                    <div className="flex gap-1">
                      {[...Array(testimonials[current].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
                      ))}
                    </div>
                    <span className="font-bold text-gray-900 text-sm ml-1">5.0</span>
                  </div>
                </div>

                {/* Right: Typography & Quote */}
                <div className="w-full lg:w-7/12 p-10 lg:p-20 flex flex-col justify-center relative bg-white">
                  
                  {/* Giant Decorative Quote Mark */}
                  <div className="absolute top-10 right-10 text-[180px] leading-none font-serif text-gray-50 select-none pointer-events-none">
                    "
                  </div>

                  <div className="relative z-10">
                    <p className="text-2xl md:text-3xl lg:text-4xl text-gray-900 font-medium leading-[1.4] tracking-tight mb-12">
                      "{testimonials[current].text}"
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-2xl font-extrabold text-gray-900 mb-1">{testimonials[current].name}</h4>
                        <p className="text-green-600 font-semibold uppercase tracking-wider text-sm">
                          {testimonials[current].role} • {testimonials[current].location}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls (Floating Overlapping Layout) */}
          <div className="absolute -bottom-6 lg:bottom-10 lg:right-10 left-1/2 lg:left-auto -translate-x-1/2 lg:translate-x-0 z-30 flex items-center gap-4 bg-white p-2 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100">
            <button 
              onClick={prev}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-green-500 hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Progress Indicator */}
            <div className="flex gap-2 px-2">
              {testimonials.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === current ? "w-8 bg-green-500" : "w-2 bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={next}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-green-500 hover:text-white transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
