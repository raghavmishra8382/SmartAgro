import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import VoiceAssistant from './VoiceAssistant';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  // Initialize open on desktop, closed on mobile
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      // Auto close on mobile resize, optional auto open on desktop
      if (window.innerWidth < 768 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  const handleVoiceNavigation = (path: string) => {
    navigate(path);
  };

  const handleVoiceAction = (action: string, data?: any) => {
    switch (action) {
      case 'search':
        console.log('Voice search:', data);
        break;
      case 'help':
        navigate('/help');
        break;
      default:
        console.log('Voice action:', action, data);
    }
  };

  return (
    <div className="flex min-h-screen bg-[hsl(40,33%,98%)]">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar Container */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-50 
        transform transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0 md:ml-0' : '-translate-x-full md:ml-[-272px]'}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full min-w-0 min-h-screen transition-all duration-300">
        <Header isSidebarOpen={sidebarOpen} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
        <Footer />
      </div>
      <VoiceAssistant onNavigate={handleVoiceNavigation} onAction={handleVoiceAction} />
    </div>
  );
};

export default Layout;
