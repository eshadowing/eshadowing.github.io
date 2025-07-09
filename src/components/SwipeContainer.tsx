import { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SwipeContainerProps {
  children: React.ReactNode[];
  onSwipe?: (direction: 'up' | 'down', currentIndex: number) => void;
}

const SwipeContainer = ({ children, onSwipe }: SwipeContainerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Track touch history to determine if a tap or swipe occurred
  const touchHistoryRef = useRef<{time: number, position: number}[]>([]);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
    
    // Start recording touch history
    touchHistoryRef.current = [{
      time: Date.now(),
      position: e.touches[0].clientY
    }];
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentTouchY = e.touches[0].clientY;
    setCurrentY(currentTouchY - startY);
    
    // Record touch movement
    touchHistoryRef.current.push({
      time: Date.now(),
      position: currentTouchY
    });
    
    // Limit history to last 10 points
    if (touchHistoryRef.current.length > 10) {
      touchHistoryRef.current.shift();
    }
    
    // Prevent default to avoid browser navigation gestures
    // But only when significant movement has happened to allow buttons to be clickable
    if (Math.abs(currentTouchY - startY) > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    // Calculate velocity from touch history
    const touchHistory = touchHistoryRef.current;
    let velocity = 0;
    
    if (touchHistory.length >= 2) {
      const first = touchHistory[0];
      const last = touchHistory[touchHistory.length - 1];
      const timeDiff = last.time - first.time;
      const distanceDiff = last.position - first.position;
      
      if (timeDiff > 0) {
        velocity = distanceDiff / timeDiff; // pixels per ms
      }
    }
    
    // Threshold for regular swipe and for velocity-based swipe
    const distanceThreshold = 50;
    const velocityThreshold = 0.5; // pixels per ms
    
    const shouldSwipeByDistance = Math.abs(currentY) > distanceThreshold;
    const shouldSwipeByVelocity = Math.abs(velocity) > velocityThreshold;
    
    if (shouldSwipeByDistance || shouldSwipeByVelocity) {
      const direction = (currentY > 0 || velocity > 0) ? 'down' : 'up';
      
      if (direction === 'down' && currentIndex > 0) {
        // Swipe down - go to previous
        setCurrentIndex(prev => prev - 1);
        onSwipe?.('down', currentIndex - 1);
      } else if (direction === 'up' && currentIndex < children.length - 1) {
        // Swipe up - go to next
        setCurrentIndex(prev => prev + 1);
        onSwipe?.('up', currentIndex + 1);
      }
    }
    
    // Reset
    setCurrentY(0);
    setIsDragging(false);
    touchHistoryRef.current = [];
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const threshold = 10;
    
    if (e.deltaY > threshold && currentIndex < children.length - 1) {
      setCurrentIndex(prev => prev + 1);
      onSwipe?.('up', currentIndex + 1);
    } else if (e.deltaY < -threshold && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      onSwipe?.('down', currentIndex - 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container && !isMobile) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [currentIndex, children.length, isMobile]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="flex flex-col h-full transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${-currentIndex * 100 + (isDragging ? (currentY / window.innerHeight) * 100 : 0)}%)`,
          willChange: 'transform' // Hardware acceleration hint
        }}
      >
        {children.map((child, index) => (
          <div key={index} className="min-h-full w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
      
      {/* Progress Indicator - moved to left */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-30 pointer-events-none">
        {children.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-8 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white shadow-lg' 
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SwipeContainer;
