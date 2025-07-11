import { useState, useEffect } from 'react';
import SwipeContainer from '@/components/SwipeContainer';
import VideoCard from '@/components/VideoCard';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { sampleVideos } from '@/data/sampleVideos';
import { videoPreloader } from '@/utils/videoPreloader';
import { trackUserBehavior } from '@/utils/tracking';

const Index = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);

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
  };

  const handleMicClick = () => {
    // Track mic button press
    trackUserBehavior('press_mic');
    
    setIsRecording(!isRecording);
    // Add your recording logic here
    console.log(`Recording ${!isRecording ? 'started' : 'stopped'}`);
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
                video={video}
                isActive={index === activeVideoIndex}
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
    </div>
  );
};

export default Index;
