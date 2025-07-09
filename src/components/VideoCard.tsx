import { useState, useRef, useEffect } from 'react';
import { Volume2, Heart, MessageCircle, Share, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoCardProps {
  video: {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    transcript: string;
    sentences: Array<{ text: string; timestamp: number }>;
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
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [showSentencePopup, setShowSentencePopup] = useState(false);
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

  // Update current sentence based on video time
  useEffect(() => {
    if (video.sentences && video.sentences.length > 0) {
      const newIndex = video.sentences.findIndex((sentence, index) => {
        const nextSentence = video.sentences[index + 1];
        return currentTime >= sentence.timestamp && (!nextSentence || currentTime < nextSentence.timestamp);
      });
      if (newIndex !== -1 && newIndex !== currentSentenceIndex) {
        setCurrentSentenceIndex(newIndex);
      }
    }
  }, [currentTime, video.sentences, currentSentenceIndex]);

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

  const jumpToSentence = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
      setCurrentTime(timestamp);
    }
    setShowSentencePopup(false);
  };

  const currentSentence = video.sentences?.[currentSentenceIndex]?.text || video.transcript;

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
          </div>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4">
          {/* Current Subtitle - Clickable */}
          <div 
            className="bg-black/40 backdrop-blur-sm rounded-xl p-4 cursor-pointer hover:bg-black/50 transition-colors"
            onClick={() => setShowSentencePopup(true)}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm leading-relaxed font-medium flex-1">{currentSentence}</p>
              <ChevronUp className="w-4 h-4 ml-2 opacity-70" />
            </div>
          </div>
          
          {/* Video Progress Bar */}
          <div className="mt-4 mb-12">
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
            {/* Left side - controls can be added here */}
          </div>
        </div>
      </div>
      
      {/* Sentence Popup */}
      {showSentencePopup && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-end z-20">
          <div className="w-full bg-black/90 backdrop-blur-lg rounded-t-2xl p-6 pb-12 max-h-2/3 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">All Sentences</h3>
              <button 
                onClick={() => setShowSentencePopup(false)}
                className="text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 overflow-y-auto max-h-96">
              {video.sentences?.map((sentence, index) => (
                <button
                  key={index}
                  onClick={() => jumpToSentence(sentence.timestamp)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    index === currentSentenceIndex 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white/10 hover:bg-white/20 text-white/90'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs opacity-70 mt-1 min-w-8">
                      {Math.floor(sentence.timestamp / 60)}:{String(sentence.timestamp % 60).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-relaxed">{sentence.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
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
