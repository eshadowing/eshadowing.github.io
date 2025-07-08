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
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-black/90 backdrop-blur-md border-t border-white/10">
      <div className="relative flex justify-around items-center py-2 max-w-sm mx-auto">
        {navItems.slice(0, 2).map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 transition-colors ${
                isActive 
                  ? 'text-blue-400' 
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
        
        {/* Elevated Mic Button in Center */}
        {showMicButton && (
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-4">
            <Button
              onClick={onMicClick}
              size="lg"
              className={`w-14 h-14 rounded-full shadow-lg border-4 border-black/20 ${
                isListening 
                  ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>
          </div>
        )}
        
        {navItems.slice(2).map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 transition-colors ${
                isActive 
                  ? 'text-blue-400' 
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;