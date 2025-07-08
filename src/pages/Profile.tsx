import { Upload, Users, Video, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sampleVideos } from '@/data/sampleVideos';
import BottomNav from '@/components/BottomNav';

const Profile = () => {
  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="relative w-full max-w-sm mx-auto h-screen bg-black overflow-hidden pb-16">
        {/* Header */}
        <div className="p-6 text-center border-b border-white/10">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-xl font-bold">Your Profile</h1>
          <p className="text-sm text-white/60 mt-1">Language learning progress</p>
        </div>

        {/* Stats */}
        <div className="p-4 grid grid-cols-2 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold">248</div>
              <div className="text-xs text-white/60">Followers</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <Video className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold">12</div>
              <div className="text-xs text-white/60">Videos</div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <div className="p-4">
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-400/30">
            <CardHeader>
              <CardTitle className="text-center text-white flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Your Video
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-white/80 text-center">
                Share your shadowing practice and help others learn!
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Choose Video File
              </Button>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                Record New Video
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Your Videos */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3">Your Videos</h3>
          <div className="grid grid-cols-2 gap-3">
            {sampleVideos.slice(0, 4).map((video) => (
              <div key={video.id} className="relative aspect-[9/16] bg-white/5 rounded-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  src={video.videoUrl}
                  muted
                  playsInline
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='320'%3E%3Crect width='100%25' height='100%25' fill='%23374151'/%3E%3C/svg%3E"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-white text-xs font-medium truncate">
                    {video.title}
                  </div>
                  <div className="text-white/60 text-xs">
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