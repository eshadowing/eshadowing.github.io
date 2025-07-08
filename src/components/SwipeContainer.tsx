
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

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentTouchY = e.touches[0].clientY;
    setCurrentY(currentTouchY - startY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const threshold = 50;
    
    if (Math.abs(currentY) > threshold) {
      if (currentY > 0 && currentIndex > 0) {
        // Swipe down - go to previous
        setCurrentIndex(prev => prev - 1);
        onSwipe?.('down', currentIndex - 1);
      } else if (currentY < 0 && currentIndex < children.length - 1) {
        // Swipe up - go to next
        setCurrentIndex(prev => prev + 1);
        onSwipe?.('up', currentIndex + 1);
      }
    }
    
    setCurrentY(0);
    setIsDragging(false);
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
      className="relative w-full h-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="flex flex-col h-full transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${-currentIndex * 100 + (isDragging ? (currentY / window.innerHeight) * 100 : 0)}%)`
        }}
      >
        {children.map((child, index) => (
          <div key={index} className="min-h-full w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
      
      {/* Progress Indicator - moved to left */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-10">
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
