import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, User, Wheat, Check } from "lucide-react";

// Google Translate language codes
const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "हिन्दी (Hindi)", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা (Bengali)", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు (Telugu)", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ் (Tamil)", flag: "🇮🇳" },
    { code: "mr", name: "मराठी (Marathi)", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી (Gujarati)", flag: "🇮🇳" },
    { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)", flag: "🇮🇳" },
    { code: "kn", name: "ಕನ್ನಡ (Kannada)", flag: "🇮🇳" },
];

const navItems = [
    { name: "Home", sectionId: "hero" },
    { name: "Features", sectionId: "features" },
    { name: "About", sectionId: "about" },
    { name: "Programs", sectionId: "programs" },
    { name: "Contact", sectionId: "contact" },
];

// Extend window type for Google Translate bridge
declare global {
    interface Window {
        triggerGoogleTranslate?: (langCode: string) => void;
    }
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
    const [activeSection, setActiveSection] = useState("hero");
    const [scrolled, setScrolled] = useState(false);
    const [translating, setTranslating] = useState(false);
    const langRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            setIsMenuOpen(false);
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        sectionId: string
    ) => {
        e.preventDefault();
        scrollToSection(sectionId);
    };

    // Switch language via Google Translate bridge
    const switchLanguage = (lang: typeof languages[0]) => {
        setCurrentLanguage(lang);
        setIsLangOpen(false);
        setTranslating(true);

        // Call the bridge function defined in index.html
        if (window.triggerGoogleTranslate) {
            window.triggerGoogleTranslate(lang.code);
        }

        // Reset translating indicator after a short delay
        setTimeout(() => setTranslating(false), 2000);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(e.target as Node)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const scrollPosition = window.scrollY + 120;

            for (const item of navItems) {
                const section = document.getElementById(item.sectionId);
                if (section) {
                    const { offsetTop, offsetHeight } = section;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(item.sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
            scrolled 
                ? "bg-white/90 backdrop-blur-xl shadow-soft border-b border-gray-100/60" 
                : "bg-white/60 backdrop-blur-md border-b border-gray-100/40"
        }`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <a
                        href="#hero"
                        onClick={(e) => handleNavClick(e, "hero")}
                        className="flex items-center gap-2.5"
                    >
                        <div className="w-9 h-9 bg-gradient-to-br from-forest-600 to-forest-700 rounded-xl flex items-center justify-center shadow-sm shadow-forest-500/20">
                            <Wheat className="h-4.5 w-4.5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">
                            Smart<span className="text-forest-600">Agro</span>
                        </span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <a
                                key={item.sectionId}
                                href={`#${item.sectionId}`}
                                onClick={(e) => handleNavClick(e, item.sectionId)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeSection === item.sectionId
                                    ? "text-forest-700 bg-forest-50/80"
                                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                                    }`}
                            >
                                {item.name}
                            </a>
                        ))}

                        <div className="w-px h-6 bg-gray-200/80 mx-2" />

                        {/* Language Dropdown — triggers Google Translate */}
                        <div className="relative" ref={langRef}>
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                    isLangOpen
                                        ? "text-forest-700 bg-forest-50/80"
                                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                                }`}
                            >
                                <Globe className={`h-4 w-4 ${translating ? "animate-spin" : ""}`} />
                                <span>{currentLanguage.flag}</span>
                                <span className="hidden lg:inline">{currentLanguage.code.toUpperCase()}</span>
                                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`} />
                            </button>

                            {isLangOpen && (
                                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-100/80 bg-white/95 backdrop-blur-xl shadow-elevated overflow-hidden animate-scaleIn origin-top-right">
                                    <div className="px-3 py-2 border-b border-gray-100/60">
                                        <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                                            Translate Page
                                        </p>
                                    </div>
                                    <div className="max-h-72 overflow-y-auto py-1">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => switchLanguage(lang)}
                                                className={`w-full px-3 py-2.5 text-left text-sm font-medium transition-colors flex items-center gap-2.5 ${
                                                    currentLanguage.code === lang.code 
                                                        ? "bg-forest-50 text-forest-700" 
                                                        : "text-gray-700 hover:bg-gray-50"
                                                }`}
                                            >
                                                <span className="text-base">{lang.flag}</span>
                                                <span className="flex-1">{lang.name}</span>
                                                {currentLanguage.code === lang.code && (
                                                    <Check className="h-3.5 w-3.5 text-forest-600" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Auth Buttons */}
                        <Link 
                            to="/login"
                            className="btn-ghost text-sm px-4 py-2"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/register"
                            className="btn-primary text-sm px-4 py-2"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile Controls */}
                    <div className="md:hidden flex items-center gap-1.5">
                        <button 
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200"
                        >
                            <Globe className={`h-5 w-5 ${translating ? "animate-spin" : ""}`} />
                        </button>

                        <Link 
                            to="/login"
                            className="p-2 text-gray-500 hover:text-forest-600 hover:bg-forest-50 rounded-xl transition-all duration-200"
                        >
                            <User className="h-5 w-5" />
                        </Link>

                        <button 
                            onClick={toggleMenu}
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
                isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            }`}>
                <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100/60 px-2 py-2">
                    {navItems.map((item) => (
                        <a
                            key={item.sectionId}
                            href={`#${item.sectionId}`}
                            onClick={(e) => handleNavClick(e, item.sectionId)}
                            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                activeSection === item.sectionId
                                    ? "text-forest-700 bg-forest-50/80"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                            }`}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>

            {/* Mobile Language Dropdown */}
            {isLangOpen && (
                <div className="md:hidden fixed inset-0 z-40" onClick={() => setIsLangOpen(false)}>
                    <div className="absolute top-16 right-2 w-56 rounded-xl border border-gray-100/80 bg-white/95 backdrop-blur-xl shadow-elevated overflow-hidden animate-scaleIn origin-top-right"
                         onClick={(e) => e.stopPropagation()}>
                        <div className="px-3 py-2 border-b border-gray-100/60">
                            <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                                Translate Page
                            </p>
                        </div>
                        <div className="max-h-72 overflow-y-auto py-1">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => switchLanguage(lang)}
                                    className={`w-full px-3 py-2.5 text-left text-sm font-medium transition-colors flex items-center gap-2.5 ${
                                        currentLanguage.code === lang.code 
                                            ? "bg-forest-50 text-forest-700" 
                                            : "text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    <span className="text-base">{lang.flag}</span>
                                    <span className="flex-1">{lang.name}</span>
                                    {currentLanguage.code === lang.code && (
                                        <Check className="h-3.5 w-3.5 text-forest-600" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
