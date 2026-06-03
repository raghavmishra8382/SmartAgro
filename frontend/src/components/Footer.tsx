import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Users, Phone, Wheat } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-100/60 bg-white/60 backdrop-blur-sm px-4 md:px-6 lg:px-8 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center justify-center gap-1">
          {[
            { to: "/help", icon: HelpCircle, label: "Help Center" },
            { to: "/community", icon: Users, label: "Community" },
            { to: "/support", icon: Phone, label: "Support" },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 hover:text-forest-600 hover:bg-forest-50/50 rounded-lg transition-all duration-200 text-[13px] font-medium"
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-gradient-to-br from-forest-500 to-forest-600 rounded flex items-center justify-center">
              <Wheat className="h-2.5 w-2.5 text-white" />
            </div>
            <span className="font-semibold text-gray-500">SmartAgro</span>
          </div>
          <span className="text-gray-300">·</span>
          <span>© 2024 Advisory Platform</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;