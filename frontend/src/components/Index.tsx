
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import MapSection from "@/components/sections/MapSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
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
                <ProgramsSection />
                <TestimonialsSection />
                <ContactSection />

                {/* CTA Banner */}
                <section className="py-16 px-4 bg-gradient-to-r from-forest-700 to-forest-800 text-white">
                    <div className="container mx-auto max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl font-bold mb-4 tracking-tight">Ready to Transform Your Farming?</h2>
                            <p className="text-lg text-forest-100/80 mb-0 lg:mb-0">
                                Join thousands of farmers who've already improved their yields and profitability with SmartAgro.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <UIButton asChild size="lg" className="bg-white text-forest-700 hover:bg-gray-100 shadow-lg font-bold">
                                <Link to="/register">Sign Up Now</Link>
                            </UIButton>
                            <UIButton asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                                <Link to="/contact">Contact Sales</Link>
                            </UIButton>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
