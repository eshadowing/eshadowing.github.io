import { useEffect } from 'react';
import { Upload, Heart, Video, User } from 'lucide-react';
import { Button } from '@/components/TrackedButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sampleVideos } from '@/data/sampleVideos';
import { trackUserBehavior } from '@/utils/tracking';
import BottomNav from '@/components/BottomNav';
import { useBetaAccess } from '@/hooks/useBetaAccess';
import { useTranslation } from '@/lib/i18n';

const Profile = () => {
  const { trackButtonClick } = useBetaAccess();
  const { t } = useTranslation();
  
  useEffect(() => {
    // Track user behavior when profile page opens
    trackUserBehavior('open_profile');
  }, []);

  const handleVideoClick = (videoId: number) => {
    trackButtonClick('video_click', { 
      page: 'profile', 
      video_id: videoId.toString(),
      action: 'open_video'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center">
      <div className="relative w-full max-w-sm mx-auto min-h-screen bg-gray-900 pb-32 pb-safe overflow-y-auto">
        {/* Header */}
        <div className="p-6 text-center border-b border-gray-700">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">{t('profile.title')}</h1>
          <p className="text-sm text-gray-400 mt-1">{t('profile.subtitle')}</p>
        </div>

        {/* Stats */}
        <div className="p-4 grid grid-cols-2 gap-4">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
            <CardContent className="p-4 text-center">
              <Heart className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">248</div>
              <div className="text-xs text-gray-400">{t('profile.likes')}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
            <CardContent className="p-4 text-center">
              <Video className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">12</div>
              <div className="text-xs text-gray-400">{t('profile.videos')}</div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <div className="p-4">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-white flex items-center justify-center gap-2 text-lg">
                <Upload className="w-5 h-5 text-blue-400" />
                {t('profile.uploadVideo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-300 text-center leading-relaxed">
                {t('profile.shareSubtitle')}
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                trackingName="choose_video_file"
                trackingData={{ page: 'profile', action: 'upload_video' }}
              >
                {t('profile.chooseVideoFile')}
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-slate-500 bg-slate-800/50 text-slate-200 hover:bg-slate-700 hover:text-white hover:border-slate-400 font-medium transition-all duration-300"
                trackingName="import_youtube_link"
                trackingData={{ page: 'profile', action: 'import_youtube' }}
              >
                {t('profile.importYoutube')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Your Videos */}
        <div className="p-4 pb-80">
          <h3 className="text-lg font-semibold mb-3 text-white">{t('profile.yourVideos')}</h3>
          <div className="grid grid-cols-2 gap-3">
            {sampleVideos.slice(0, 4).map((video) => (
              <div 
                key={video.id} 
                className="relative aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => handleVideoClick(video.id)}
              >
                <video
                  className="w-full h-full object-cover"
                  src={video.videoUrl}
                  muted
                  playsInline
                  preload="metadata"
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='320'%3E%3Crect width='100%25' height='100%25' fill='%23374151'/%3E%3C/svg%3E"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-white text-xs font-medium truncate">
                    {video.title}
                  </div>
                  <div className="text-gray-300 text-xs">
                    {video.difficulty} • {video.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default Profile;