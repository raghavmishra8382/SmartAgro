import React from 'react';
import { Link } from 'react-router-dom';
import { Wheat, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050C08] pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      
      {/* Subtle glowing accents */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 mb-6 inline-block w-max">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <Wheat className="h-5 w-5 text-gray-900" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Smart<span className="text-green-400">Agro</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
              The world's leading AI-powered agricultural intelligence platform. Empowering farmers to maximize yield, reduce costs, and build a sustainable future.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {[Twitter, Linkedin, Facebook, Instagram].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-green-500/20 hover:text-green-400 hover:border-green-500/30 transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Product */}
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide text-sm">Product</h4>
              <ul className="space-y-4">
                {['Features', 'Pricing', 'Integrations', 'Changelog', 'API Documentation'].map(item => (
                  <li key={item}>
                    <Link to="#" className="text-gray-400 text-sm hover:text-green-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide text-sm">Resources</h4>
              <ul className="space-y-4">
                {['Help Center', 'Community Forum', 'Farming Guides', 'Webinars', 'Status'].map(item => (
                  <li key={item}>
                    <Link to="#" className="text-gray-400 text-sm hover:text-green-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide text-sm">Company</h4>
              <ul className="space-y-4">
                {['About Us', 'Careers', 'Blog', 'Contact', 'Partners'].map(item => (
                  <li key={item}>
                    <Link to="#" className="text-gray-400 text-sm hover:text-green-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SmartAgro Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-gray-500 text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-gray-500 text-sm hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" className="text-gray-500 text-sm hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;