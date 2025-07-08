
import { useState, useRef, useEffect } from 'react';
import { Volume2, Heart, MessageCircle, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoCardProps {
  video: {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    transcript: string;
    difficulty: string;
    duration: string;
  };
  isActive: boolean;
}

const VideoCard = ({ video, isActive }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(42);
  const [commentsCount, setCommentsCount] = useState(8);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        setIsPlaying(true);
        videoRef.current.play().catch(console.error);
      } else {
        setIsPlaying(false);
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  // Reset speed when video changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };


  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        src={video.videoUrl}
        loop
        muted
        playsInline
        onClick={togglePlay}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6 text-white">
        {/* Top Section */}
        <div className="flex justify-between items-start -mt-2">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              {video.difficulty}
            </div>
            <Button
              onClick={() => {
                if (videoRef.current) {
                  const speeds = [1, 1.25, 1.5, 1.75, 2];
                  const currentIndex = speeds.indexOf(playbackSpeed);
                  const nextIndex = (currentIndex + 1) % speeds.length;
                  const newSpeed = speeds[nextIndex];
                  videoRef.current.playbackRate = newSpeed;
                  setPlaybackSpeed(newSpeed);
                  console.log(`Speed changed to ${newSpeed}x`);
                }
              }}
              size="sm"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0 px-2 py-1 text-xs"
            >
              {playbackSpeed}x
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4">
          {/* Transcript - Now on top */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm leading-relaxed font-medium">{video.transcript}</p>
          </div>
          
          {/* Video Info - Now below transcript */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold leading-tight">{video.title}</h3>
            <p className="text-sm opacity-90 leading-relaxed">{video.description}</p>
          </div>
          
          {/* Video Progress Bar - positioned after content */}
          <div className="mt-4 mb-6">
            <div 
              className="relative h-1 bg-white/20 rounded-full cursor-pointer"
              onClick={(e) => {
                if (videoRef.current) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const percentage = clickX / rect.width;
                  const newTime = percentage * videoRef.current.duration;
                  videoRef.current.currentTime = newTime;
                  setCurrentTime(newTime);
                }
              }}
            >
              <div 
                className="h-full bg-white rounded-full transition-all duration-100"
                style={{ 
                  width: videoRef.current ? `${(currentTime / videoRef.current.duration) * 100 || 0}%` : '0%' 
                }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3">
            {/* Left side - No recording controls needed anymore */}
          </div>
        </div>
      </div>
      
      
      {/* Social Actions - positioned at right center */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-4 z-10">
        <div className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-colors"
             onClick={handleLike}>
          <div className="flex flex-col items-center justify-center gap-0">
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
            <span className="text-xs font-medium leading-none text-white">{likesCount}</span>
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-colors">
          <div className="flex flex-col items-center justify-center gap-0">
            <MessageCircle className="w-5 h-5 text-white" />
            <span className="text-xs font-medium leading-none text-white">{commentsCount}</span>
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-colors">
          <Share className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
