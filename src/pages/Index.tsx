import { useState, useEffect, useRef } from 'react';
import SwipeContainer from '@/components/SwipeContainer';
import VideoCard, { VideoCardRef } from '@/components/VideoCard';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { sampleVideos } from '@/data/sampleVideos';
import { videoPreloader } from '@/utils/videoPreloader';
import { trackUserBehavior } from '@/utils/tracking';

const Index = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);
  const [showSentencePopup, setShowSentencePopup] = useState(false);
  const [sentencePopupVideoData, setSentencePopupVideoData] = useState<any>(null);
  const videoCardsRef = useRef<{ [key: number]: VideoCardRef | null }>({});

  // Advanced video preloading
  useEffect(() => {
    setIsPreloading(true);
    // Preload adjacent videos for smoother transitions
    videoPreloader.preloadAdjacentVideos(sampleVideos, activeVideoIndex)
      .then(() => {
        console.log('Adjacent videos preloaded successfully');
        setIsPreloading(false);
      })
      .catch((error) => {
        console.error('Error preloading videos:', error);
        setIsPreloading(false);
      });
  }, [activeVideoIndex]);

  // Cleanup preloader on unmount
  useEffect(() => {
    return () => {
      videoPreloader.cleanup();
    };
  }, []);

  const handleSwipe = (direction: 'up' | 'down', newIndex: number) => {
    setActiveVideoIndex(newIndex);
    console.log(`Swiped ${direction} to video ${newIndex + 1}`);
    
    // Track swipe behavior for specific videos
    if (newIndex === 1) {
      trackUserBehavior('swipe_video2');
    } else if (newIndex === 2) {
      trackUserBehavior('swipe_video3');
    }
  };

  const handleMicClick = () => {
    // Track mic button press
    trackUserBehavior('press_mic');
    
    setIsRecording(!isRecording);
    // Add your recording logic here
    console.log(`Recording ${!isRecording ? 'started' : 'stopped'}`);
  };

  const handleSentenceClick = (video: any) => {
    setSentencePopupVideoData(video);
    setShowSentencePopup(true);
  };

  const jumpToSentence = (timestamp: number) => {
    // Find the video that the sentence belongs to
    const videoIndex = sampleVideos.findIndex(v => v.id === sentencePopupVideoData?.id);
    if (videoIndex !== -1) {
      // Switch to the video if it's not already active
      if (videoIndex !== activeVideoIndex) {
        setActiveVideoIndex(videoIndex);
        // Wait for the video to become active, then seek
        setTimeout(() => {
          const videoCardRef = videoCardsRef.current[sentencePopupVideoData.id];
          if (videoCardRef) {
            videoCardRef.seekToTime(timestamp);
          }
        }, 300);
      } else {
        // Video is already active, seek immediately
        const videoCardRef = videoCardsRef.current[sentencePopupVideoData.id];
        if (videoCardRef) {
          videoCardRef.seekToTime(timestamp);
        }
      }
    }
    setShowSentencePopup(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex justify-center items-center lg:items-stretch">
      {/* Responsive Container */}
      <div className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto h-screen bg-black overflow-hidden lg:shadow-2xl lg:rounded-lg">
        <Header isPreloading={isPreloading} />
        
        {/* Video Container with bottom spacing only */}
        <div className="absolute top-0 left-0 right-0 bottom-0 pb-20">
          <SwipeContainer onSwipe={handleSwipe}>
            {sampleVideos.map((video, index) => (
              <VideoCard
                key={video.id}
                ref={(el) => (videoCardsRef.current[video.id] = el)}
                video={video}
                isActive={index === activeVideoIndex}
                onSentenceClick={() => handleSentenceClick(video)}
              />
            ))}
          </SwipeContainer>
        </div>
        
        <BottomNav 
          showMicButton={true}
          isListening={isRecording}
          onMicClick={handleMicClick}
        />
      </div>
      
      {/* Shared Sentence Popup */}
      {showSentencePopup && sentencePopupVideoData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end z-[60]">
          <div className="w-full bg-black/90 backdrop-blur-lg rounded-t-2xl p-6 pb-safe mb-0 max-h-2/3 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">All Sentences - {sentencePopupVideoData.title}</h3>
              <button 
                onClick={() => setShowSentencePopup(false)}
                className="text-white/70 hover:text-white text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 overflow-y-auto max-h-80 pb-60" data-scrollable="true">
              {sentencePopupVideoData.sentences?.map((sentence: any, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    trackUserBehavior('click_sentence');
                    jumpToSentence(sentence.timestamp);
                  }}
                  className="w-full text-left p-3 rounded-lg transition-colors bg-white/10 hover:bg-white/20 text-white/90"
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
    </div>
  );
};

export default Index;
