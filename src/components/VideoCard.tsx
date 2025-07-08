
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Mic, Square, Volume2 } from 'lucide-react';
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
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        setIsPlaying(true);
        videoRef.current.play();
      } else {
        setIsPlaying(false);
        videoRef.current.pause();
      }
    }
  }, [isActive]);

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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setRecordedBlob(blob);
        setHasRecorded(true);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (recordedBlob) {
      const audio = new Audio(URL.createObjectURL(recordedBlob));
      audio.play();
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={video.videoUrl}
        loop
        muted
        playsInline
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6 text-white">
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div className="bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
            {video.difficulty}
          </div>
          <div className="text-sm opacity-75">{video.duration}</div>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4">
          {/* Video Info */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold leading-tight">{video.title}</h3>
            <p className="text-sm opacity-90 leading-relaxed">{video.description}</p>
          </div>

          {/* Transcript */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm leading-relaxed font-medium">{video.transcript}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3">
            {/* Video Controls */}
            <div className="flex items-center gap-2">
              <Button
                onClick={togglePlay}
                size="lg"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0 rounded-full p-3"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <div className="text-xs opacity-75">
                {Math.floor(currentTime)}s
              </div>
            </div>

            {/* Recording Controls */}
            <div className="flex items-center gap-2">
              {hasRecorded && (
                <Button
                  onClick={playRecording}
                  size="sm"
                  className="bg-green-600/80 backdrop-blur-sm hover:bg-green-600 border-0 rounded-full p-2"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              )}
              
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                size="lg"
                className={`${
                  isRecording 
                    ? 'bg-red-600/80 hover:bg-red-600' 
                    : 'bg-blue-600/80 hover:bg-blue-600'
                } backdrop-blur-sm border-0 rounded-full p-3 ${
                  isRecording ? 'animate-pulse' : ''
                }`}
              >
                {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
