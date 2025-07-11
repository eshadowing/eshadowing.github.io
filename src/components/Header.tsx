import { Settings, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isPreloading?: boolean;
}

const Header = ({ isPreloading = false }: HeaderProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="flex justify-between items-center">
        {/* Preloading Indicator */}
        <div className="flex items-center gap-2">
          {isPreloading && (
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 pointer-events-auto">
              <Loader2 className="w-3 h-3 text-blue-400 animate-spin" />
              <span className="text-xs text-white/80">Preloading...</span>
            </div>
          )}
        </div>
        
        {/* Right Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <Button 
            size="sm" 
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0 p-2 rounded-full w-9 h-9"
          >
            <Settings className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
