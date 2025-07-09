interface VideoData {
  id: number;
  videoUrl: string;
}

class VideoPreloader {
  private preloadedVideos = new Map<string, HTMLVideoElement>();
  private maxPreloadedVideos = 5; // Limit to prevent memory issues

  preloadVideo(videoUrl: string): Promise<HTMLVideoElement> {
    return new Promise((resolve, reject) => {
      // Check if already preloaded
      if (this.preloadedVideos.has(videoUrl)) {
        resolve(this.preloadedVideos.get(videoUrl)!);
        return;
      }

      // Clean up if we've hit the limit
      if (this.preloadedVideos.size >= this.maxPreloadedVideos) {
        this.cleanupOldestVideo();
      }

      const video = document.createElement('video');
      video.src = videoUrl;
      video.preload = 'metadata';
      video.muted = true;
      video.playsInline = true;

      video.addEventListener('loadedmetadata', () => {
        this.preloadedVideos.set(videoUrl, video);
        resolve(video);
      });

      video.addEventListener('error', () => {
        reject(new Error(`Failed to preload video: ${videoUrl}`));
      });
    });
  }

  preloadAdjacentVideos(videos: VideoData[], currentIndex: number) {
    const promises: Promise<HTMLVideoElement>[] = [];
    
    // Preload previous video
    if (currentIndex > 0) {
      promises.push(this.preloadVideo(videos[currentIndex - 1].videoUrl));
    }
    
    // Preload next video
    if (currentIndex < videos.length - 1) {
      promises.push(this.preloadVideo(videos[currentIndex + 1].videoUrl));
    }

    // Preload next 2 videos for even smoother experience
    if (currentIndex < videos.length - 2) {
      promises.push(this.preloadVideo(videos[currentIndex + 2].videoUrl));
    }

    return Promise.allSettled(promises);
  }

  private cleanupOldestVideo() {
    const firstEntry = this.preloadedVideos.entries().next();
    if (!firstEntry.done) {
      const [url, video] = firstEntry.value;
      video.remove();
      this.preloadedVideos.delete(url);
    }
  }

  getPreloadedVideo(videoUrl: string): HTMLVideoElement | null {
    return this.preloadedVideos.get(videoUrl) || null;
  }

  cleanup() {
    this.preloadedVideos.forEach((video) => {
      video.remove();
    });
    this.preloadedVideos.clear();
  }
}

// Create singleton instance
export const videoPreloader = new VideoPreloader();
