import { Home, User, BarChart3, MessageCircle, Mic, MicOff } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/TrackedButton';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/lib/i18n';

interface BottomNavProps {
  showMicButton?: boolean;
  isListening?: boolean;
  onMicClick?: () => void;
}

const BottomNav = ({ showMicButton = false, isListening = false, onMicClick }: BottomNavProps) => {
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const { t } = useTranslation();
  
  // Track scroll position to create parallax effect for the glass
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { path: '/', icon: Home, label: t('navigation.home') },
    { path: '/chat', icon: MessageCircle, label: t('navigation.chat') },
    { path: '/progress', icon: BarChart3, label: t('navigation.progress') },
    { path: '/profile', icon: User, label: t('navigation.profile') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      {/* Elevated Mic Button - Positioned above the nav */}
      {showMicButton && (
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 z-50 pointer-events-auto">
          <div className="relative pointer-events-auto">
            {/* Main button */}
            <Button
              onClick={onMicClick}
              size="lg"
              trackingName="mic_button"
              trackingData={{
                mic_state: isListening ? 'stop_recording' : 'start_recording',
                page: 'home'
              }}
              className="relative w-16 h-16 rounded-full shadow-2xl border-2 transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-500 to-blue-600 border-blue-400/50 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/25"
            >
              <Mic className="w-7 h-7 text-white drop-shadow-sm" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Liquid Glass Bottom Navigation */}
      <div className="relative overflow-hidden">
        {/* Animated background bubbles/gradient for liquid effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
          style={{
            transform: `translateY(${scrollPosition * 0.05}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="absolute top-0 left-1/4 w-20 h-20 rounded-full bg-blue-400/20 blur-xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 rounded-full bg-purple-400/20 blur-xl animate-float"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-pink-400/20 blur-xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Glass overlay with rounded corners and no border */}
        <div className="bg-white/10 backdrop-blur-xl backdrop-saturate-150 rounded-t-3xl shadow-lg pointer-events-auto">
          <div className="flex justify-around items-center py-4 px-2 max-w-sm mx-auto pointer-events-auto">
            {navItems.slice(0, 2).map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 min-w-[60px] ${
                    isActive 
                      ? 'text-blue-400 bg-white/20 shadow-inner shadow-white/10 scale-105' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Center spacer for mic button */}
            {showMicButton && <div className="w-16" />}
            
            {navItems.slice(2).map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 min-w-[60px] ${
                    isActive 
                      ? 'text-blue-400 bg-white/20 shadow-inner shadow-white/10 scale-105' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Add a safe area padding at the bottom for iOS devices */}
      <div className="h-safe-bottom bg-black/60 backdrop-blur-xl"></div>
    </div>
  );
};

export default BottomNav;