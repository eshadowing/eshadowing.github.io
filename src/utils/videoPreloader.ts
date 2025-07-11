interface VideoData {
  id: number;
  videoUrl: string;
  isYoutube?: boolean;
}

class VideoPreloader {
  private preloadedVideos = new Map<string, HTMLVideoElement>();
  private maxPreloadedVideos = 5; // Limit to prevent memory issues

  preloadVideo(videoUrl: string, isYoutube?: boolean): Promise<HTMLVideoElement> {
    return new Promise((resolve, reject) => {
      // Skip preloading for YouTube videos
      if (isYoutube) {
        // Create a dummy video element for YouTube videos
        const dummyVideo = document.createElement('video');
        resolve(dummyVideo);
        return;
      }

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
      const prevVideo = videos[currentIndex - 1];
      promises.push(this.preloadVideo(prevVideo.videoUrl, prevVideo.isYoutube));
    }
    
    // Preload next video
    if (currentIndex < videos.length - 1) {
      const nextVideo = videos[currentIndex + 1];
      promises.push(this.preloadVideo(nextVideo.videoUrl, nextVideo.isYoutube));
    }

    // Preload next 2 videos for even smoother experience
    if (currentIndex < videos.length - 2) {
      const nextVideo2 = videos[currentIndex + 2];
      promises.push(this.preloadVideo(nextVideo2.videoUrl, nextVideo2.isYoutube));
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
