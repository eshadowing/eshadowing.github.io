
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-4">
      <div className="flex justify-end items-center">{/* Removed logo section */}
        
        <div className="flex items-center gap-3">
          <div className="text-white text-sm font-medium">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <Button 
            size="sm" 
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0 p-2"
          >
            <Settings className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
