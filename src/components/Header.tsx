
import { Settings, Captions, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Header = () => {
  const [isSubtitlesOn, setIsSubtitlesOn] = useState(false);
  const [isVolumeOn, setIsVolumeOn] = useState(false);

  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            onClick={() => setIsSubtitlesOn(!isSubtitlesOn)}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0 p-2 rounded-full w-9 h-9"
          >
            <Captions className={`w-4 h-4 ${isSubtitlesOn ? 'text-blue-400' : 'text-white'}`} />
          </Button>
          <Button 
            size="sm" 
            onClick={() => setIsVolumeOn(!isVolumeOn)}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0 p-2 rounded-full w-9 h-9"
          >
            {isVolumeOn ? (
              <Volume2 className="w-4 h-4 text-blue-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-white" />
            )}
          </Button>
        </div>
        <Button 
          size="sm" 
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0 p-2 rounded-full w-9 h-9"
        >
          <Settings className="w-4 h-4 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
