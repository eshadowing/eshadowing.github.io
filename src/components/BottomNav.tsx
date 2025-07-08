import { Home, User, BarChart3, MessageCircle, Mic, MicOff } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface BottomNavProps {
  showMicButton?: boolean;
  isListening?: boolean;
  onMicClick?: () => void;
}

const BottomNav = ({ showMicButton = false, isListening = false, onMicClick }: BottomNavProps) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/progress', icon: BarChart3, label: 'Progress' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
      {/* Elevated Mic Button - Positioned above the nav */}
      {showMicButton && (
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 z-10 pointer-events-auto">
          <div className="relative pointer-events-auto">
            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-full blur-lg transition-all duration-300 ${
              isListening 
                ? 'bg-red-500/30 scale-110' 
                : 'bg-blue-500/20 scale-100'
            }`} />
            
            {/* Main button */}
            <Button
              onClick={onMicClick}
              size="lg"
              className={`relative w-16 h-16 rounded-full shadow-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                isListening 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 border-red-400/50 animate-pulse shadow-red-500/25' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-400/50 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/25'
              }`}
            >
              {isListening ? (
                <MicOff className="w-7 h-7 text-white drop-shadow-sm" />
              ) : (
                <Mic className="w-7 h-7 text-white drop-shadow-sm" />
              )}
            </Button>
            
            {/* Listening indicator ripple */}
            {isListening && (
              <div className="absolute inset-0 rounded-full border-2 border-red-400/60 animate-ping" />
            )}
          </div>
        </div>
      )}
      
      {/* Bottom Navigation */}
      <div className="bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-lg pointer-events-auto">
        <div className="flex justify-around items-center py-3 max-w-sm mx-auto pointer-events-auto">
          {navItems.slice(0, 2).map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 min-w-[60px] ${
                  isActive 
                    ? 'text-blue-400 bg-blue-500/10 scale-105' 
                    : 'text-white/60 hover:text-white/80 hover:bg-white/5'
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
                    ? 'text-blue-400 bg-blue-500/10 scale-105' 
                    : 'text-white/60 hover:text-white/80 hover:bg-white/5'
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
  );
};

export default BottomNav;