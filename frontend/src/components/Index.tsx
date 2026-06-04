import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import MapSection from "@/components/sections/MapSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import { Button as UIButton } from "@/components/ui/button";

export default function Index() {
    // Add smooth scrolling effect for hash links
    useEffect(() => {
        // Handle initial hash in URL
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }

        // Add event listener for all internal hash links
        const handleHashLinkClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const anchor = target.closest('a');

            if (anchor && anchor.hash && anchor.origin + anchor.pathname === window.location.origin + window.location.pathname) {
                event.preventDefault();
                const id = anchor.hash.substring(1);
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                    // Update URL without causing page reload
                    window.history.pushState(null, "", anchor.hash);
                }
            }
        };

        document.addEventListener("click", handleHashLinkClick);
        return () => document.removeEventListener("click", handleHashLinkClick);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <HeroSection />
                <FeaturesSection />
                <AboutSection />
                <StatsSection />
                <MapSection />
                <HowItWorksSection />
                <TestimonialsSection />
                <ContactSection />

                {/* Premium CTA Banner */}
                <section className="py-24 relative overflow-hidden bg-white">
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="relative flex flex-col items-center text-center max-w-5xl mx-auto bg-[#08140D] rounded-[2.5rem] p-12 md:p-20 shadow-[0_20px_60px_rgba(8,20,13,0.15)] overflow-hidden border border-gray-100">
                            
                            {/* Card Background Pattern */}
                            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                            
                            {/* Card Glowing Accents */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-white tracking-tight leading-[1.1] mb-6">
                                    Ready to transform your farming?
                                </h2>
                                
                                <p className="text-xl text-gray-400 font-medium mb-10 max-w-2xl mx-auto">
                                    Join thousands of modern farmers who have already improved their yields and maximized their profitability.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                                    <UIButton asChild className="w-full sm:w-auto h-14 px-8 bg-green-500 hover:bg-green-400 text-gray-900 text-lg font-bold rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:-translate-y-1 transition-all duration-300">
                                        <Link to="/register">Get Started For Free</Link>
                                    </UIButton>
                                    
                                    <UIButton asChild className="w-full sm:w-auto h-14 px-8 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-lg font-bold rounded-xl transition-all duration-300">
                                        <Link to="/contact">Talk to Sales</Link>
                                    </UIButton>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
