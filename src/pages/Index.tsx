
import { useState } from 'react';
import SwipeContainer from '@/components/SwipeContainer';
import VideoCard from '@/components/VideoCard';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { sampleVideos } from '@/data/sampleVideos';

const Index = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const handleSwipe = (direction: 'up' | 'down', newIndex: number) => {
    setActiveVideoIndex(newIndex);
    console.log(`Swiped ${direction} to video ${newIndex + 1}`);
  };

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    // Add your recording logic here
    console.log(`Recording ${!isRecording ? 'started' : 'stopped'}`);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="relative w-full max-w-sm h-screen bg-black overflow-hidden shadow-2xl rounded-2xl">
          <Header />
          
          <SwipeContainer onSwipe={handleSwipe}>
            {sampleVideos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                isActive={index === activeVideoIndex}
              />
            ))}
          </SwipeContainer>
          
          <BottomNav 
            showMicButton={true}
            isListening={isRecording}
            onMicClick={handleMicClick}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden relative w-full max-w-sm mx-auto h-screen bg-black overflow-hidden pb-16">
        <Header />
        
        <SwipeContainer onSwipe={handleSwipe}>
          {sampleVideos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              isActive={index === activeVideoIndex}
            />
          ))}
        </SwipeContainer>
        
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
