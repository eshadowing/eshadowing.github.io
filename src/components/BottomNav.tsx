import { Home, User, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/progress', icon: BarChart3, label: 'Progress' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-black/90 backdrop-blur-md border-t border-white/10">
      <div className="flex justify-around items-center py-2 max-w-sm mx-auto">
        {navItems.map((item) => {
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