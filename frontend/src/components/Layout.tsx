import React, { useState } from 'react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleVoiceNavigation = (path: string) => {
    navigate(path);
  };

  const handleVoiceAction = (action: string, data?: any) => {
    // Handle various voice actions
    switch (action) {
      case 'search':
        // Could trigger search functionality
        console.log('Voice search:', data);
        break;
      case 'help':
        // Show help modal or navigate to help page
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
      
      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full md:w-auto min-h-screen">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
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
