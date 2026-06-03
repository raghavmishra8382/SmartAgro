import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Punjab",
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921&auto=format&fit=crop",
    rating: 5,
    text: "SmartAgro's soil analysis and crop recommendations have transformed my farming practices. I've seen a 40% increase in yield and significant cost savings on fertilizers.",
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    location: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "The weather forecasting feature has been a game-changer for me. I can now plan irrigation and harvesting with precision, saving water and protecting my crops.",
  },
  {
    id: 3,
    name: "Amit Sharma",
    location: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop",
    rating: 4,
    text: "I was skeptical about technology in farming, but the SmartAgro app is so user-friendly. The disease prediction feature helped me save my tomato crop from blight.",
  },
  {
    id: 4,
    name: "Priya Patel",
    location: "Gujarat",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    rating: 5,
    text: "Being able to connect with other farmers through the community feature has been invaluable. I've learned new techniques and made friends who understand farming challenges.",
  },
  {
    id: 5,
    name: "Mohammad Farooq",
    location: "Maharashtra",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "The AI chatbot answers my questions at any time of day, which is perfect for busy farmers like me. It's like having an agriculture expert in my pocket 24/7.",
  },
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
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [autoplay, current]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.4, ease },
    }),
  };

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white via-cream-50/30 to-white relative overflow-hidden">
      {/* Subtle decorative dots */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(#2c7252 0.8px, transparent 0.8px)", backgroundSize: "28px 28px" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <span className="inline-block text-forest-600 font-bold tracking-wider uppercase text-xs mb-4 bg-forest-50 px-4 py-1.5 rounded-full border border-forest-100/60">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 tracking-tight">
            Farmers Trust SmartAgro
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <div className="relative h-[400px] md:h-[340px] overflow-hidden">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-white rounded-3xl shadow-elevated border border-gray-100/60 p-8 md:p-10 w-full mx-auto absolute inset-0 flex flex-col md:flex-row gap-8 items-center"
              >
                {/* Image Column */}
                <div className="w-24 h-24 md:w-48 md:h-full flex-shrink-0 relative group">
                  <motion.div
                    className="absolute inset-0 bg-forest-200/40 rounded-2xl"
                    animate={{ rotate: [2, 4, 2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-full h-full object-cover rounded-2xl shadow-md relative z-10"
                  />
                  {/* Rating badge */}
                  <div className="absolute -bottom-2 -right-2 z-20 bg-white px-2.5 py-1 rounded-full flex items-center gap-1 shadow-soft border border-gray-100/60">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-gray-900">{testimonials[current].rating}.0</span>
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                  <Quote className="h-8 w-8 text-forest-200 mb-4 mx-auto md:mx-0" />

                  <p className="text-lg md:text-xl text-gray-600 font-medium italic mb-8 leading-relaxed">
                    "{testimonials[current].text}"
                  </p>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">{testimonials[current].name}</h3>
                    <p className="text-forest-600 font-semibold text-sm">{testimonials[current].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -left-4 md:-left-14 -translate-y-1/2 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              className="bg-white text-gray-700 rounded-full p-3 shadow-soft hover:shadow-elevated hover:text-forest-600 transition-all duration-300 border border-gray-100/60"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </motion.button>
          </div>
          <div className="absolute top-1/2 -right-4 md:-right-14 -translate-y-1/2 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="bg-white text-gray-700 rounded-full p-3 shadow-soft hover:shadow-elevated hover:text-forest-600 transition-all duration-300 border border-gray-100/60"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`transition-all duration-500 rounded-full h-2 ${
                  index === current
                    ? "w-8 bg-forest-600"
                    : "w-2 bg-gray-300 hover:bg-forest-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
