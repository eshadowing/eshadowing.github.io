
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Left side placeholder for future elements */}
        </div>
        <Button 
          size="sm" 
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0 p-2 rounded-full"
        >
          <Settings className="w-4 h-4 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
