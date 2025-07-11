import { useState, useRef, useEffect } from 'react';
import { Volume2, Heart, MessageCircle, Share, ChevronUp, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Add YouTube Player type for TypeScript
declare global {
  interface Window {
    YT: {
      Player: any;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface VideoCardProps {
  video: {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    transcript: string;
    sentences: Array<{ text: string; timestamp: number; translation?: string }>;
    difficulty: string;
    duration: string;
    isYoutube?: boolean;
  };
  isActive: boolean;
}

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const VideoCard = ({ video, isActive }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(42);
  const [commentsCount, setCommentsCount] = useState(8);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [showSentencePopup, setShowSentencePopup] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false); // Initialize as unmuted
  const playerRef = useRef<any>(null);
  const [playerReady, setPlayerReady] = useState(false);

  const isYouTubeVideo = video.isYoutube && video.videoUrl.includes('youtube.com');
  const youtubeVideoId = isYouTubeVideo ? getYouTubeVideoId(video.videoUrl) : null;

  useEffect(() => {
    if (!isYouTubeVideo && videoRef.current) {
      if (isActive) {
        setIsPlaying(true);
        videoRef.current.play().catch(console.error);
      } else {
        setIsPlaying(false);
        videoRef.current.pause();
      }
    }
  }, [isActive, isYouTubeVideo]);

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

  // Reset speed when video changes (only for regular videos)
  useEffect(() => {
    if (!isYouTubeVideo && videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, isYouTubeVideo]);

  // Initialize YouTube API
  useEffect(() => {
    // Load YouTube API
    if (isYouTubeVideo && isActive) {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        
        window.onYouTubeIframeAPIReady = initializeYouTubePlayer;
      } else if (window.YT && window.YT.Player) {
        initializeYouTubePlayer();
      }
    }

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
    };
  }, [isYouTubeVideo, isActive, youtubeVideoId]);

  const initializeYouTubePlayer = () => {
    if (!youtubeVideoId || !isActive) return;
    
    // Clear any existing player
    if (playerRef.current && typeof playerRef.current.destroy === 'function') {
      playerRef.current.destroy();
    }
    
    playerRef.current = new window.YT.Player(`youtube-player-${video.id}`, {
      videoId: youtubeVideoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        showinfo: 0,
        rel: 0,
        loop: 1,
        modestbranding: 1,
        iv_load_policy: 3,
        fs: 0,
        disablekb: 1,
        mute: 0, // Explicitly set to unmuted (0)
        enablejsapi: 1,
        playsinline: 1
      },
      events: {
        onReady: (event) => {
          playerRef.current = event.target;
          playerRef.current.unMute(); // Ensure video is unmuted
          playerRef.current.setVolume(100); // Set volume to maximum
          playerRef.current.playVideo();
          setPlayerReady(true);
          setIsPlaying(true);
          setIsMuted(false); // Update state to reflect unmuted status
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          }
        }
      }
    });
  };

  const togglePlay = () => {
    if (isYouTubeVideo) {
      if (playerRef.current && playerReady) {
        if (isPlaying) {
          playerRef.current.pauseVideo();
        } else {
          playerRef.current.playVideo();
        }
        setIsPlaying(!isPlaying);
      }
    } else if (videoRef.current) {
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
    if (!isYouTubeVideo && videoRef.current) {
      videoRef.current.currentTime = timestamp;
      setCurrentTime(timestamp);
    }
    setShowSentencePopup(false);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const currentSentence = video.sentences?.[currentSentenceIndex]?.text || video.transcript;

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Video Background */}
      {isYouTubeVideo && youtubeVideoId ? (
        <div className="absolute inset-0 w-full h-full">
          <div id={`youtube-player-${video.id}`} className="absolute inset-0 w-full h-full"></div>
          {/* Overlay to capture clicks */}
          <div 
            className="absolute inset-0 cursor-pointer z-10" 
            onClick={togglePlay}
          ></div>
        </div>
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
          src={video.videoUrl}
          loop
          playsInline
          onClick={togglePlay}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        />
      )}
      
      {/* Play/Pause indicator - show briefly when clicked */}
      {isYouTubeVideo && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className={`w-20 h-20 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-opacity duration-300 ${
              isPlaying ? 'opacity-0' : 'opacity-80'
            }`}
          >
            {isPlaying ? (
              <span className="text-4xl text-white">▌▌</span>
            ) : (
              <span className="text-4xl text-white ml-1">▶</span>
            )}
          </div>
        </div>
      )}
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col p-6 text-white">
        {/* Top Section - Removed badges from here */}
        <div className="flex justify-between items-start -mt-2">
          <div className="flex items-center gap-2">
            {/* Badges removed from here */}
          </div>
        </div>

        {/* Push content to bottom with margin-top auto */}
        <div className="mt-auto space-y-4 mb-24 pb-safe">
          {/* Difficulty Badge - Moved above subtitles with liquid glass style */}
          <div className="flex justify-start mb-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg px-3 py-1 rounded-full text-sm font-medium text-white/90">
              {video.difficulty}
            </div>
          </div>
          
          {/* Current Subtitle - Clickable */}
          <div 
            className="bg-black/40 backdrop-blur-sm rounded-xl p-4 cursor-pointer hover:bg-black/50 transition-colors"
            onClick={() => setShowSentencePopup(true)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {/* Translation (above subtitle) */}
                {video.sentences?.[currentSentenceIndex]?.translation && (
                  <p className="text-sm leading-relaxed text-blue-200 mb-2 opacity-90">
                    {video.sentences[currentSentenceIndex].translation}
                  </p>
                )}
                {/* Original subtitle */}
                <p className="text-sm leading-relaxed font-medium text-white">{currentSentence}</p>
              </div>
              <ChevronUp className="w-4 h-4 ml-2 opacity-70" />
            </div>
          </div>
          
          {/* Video Progress Bar - Only show for regular videos */}
          {!isYouTubeVideo && (
            <div className="mt-4 mb-4">
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
          )}

          {/* Controls */}
          <div className="flex items-center justify-between gap-3">
            {/* Left side - controls can be added here */}
          </div>
        </div>
      </div>
      
      {/* Sentence Popup */}
      {showSentencePopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end z-[60]">
          <div className="w-full bg-black/90 backdrop-blur-lg rounded-t-2xl p-6 pb-safe mb-20 max-h-2/3 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">All Sentences</h3>
              <button 
                onClick={() => setShowSentencePopup(false)}
                className="text-white/70 hover:text-white text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 overflow-y-auto max-h-80 pb-4">
              {video.sentences?.map((sentence, index) => (
                <button
                  key={index}
                  onClick={() => jumpToSentence(sentence.timestamp)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    index === currentSentenceIndex 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white/10 hover:bg-white/20 text-white/90'
                  }`}
                  disabled={isYouTubeVideo} // Disable jumping for YouTube videos
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs opacity-70 mt-1 min-w-8">
                      {Math.floor(sentence.timestamp / 60)}:{String(Math.floor(sentence.timestamp % 60)).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-relaxed">{sentence.text}</span>
                  </div>
                  {sentence.translation && (
                    <p className="text-xs text-blue-200 mt-1 ml-11 opacity-80">
                      {sentence.translation}
                    </p>
                  )}
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
