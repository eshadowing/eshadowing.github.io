import { TrendingUp, Award, Clock, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import BottomNav from '@/components/BottomNav';

const ProgressPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="relative w-full max-w-sm mx-auto h-screen bg-black overflow-y-auto pb-16">
        {/* Header */}
        <div className="p-6 text-center border-b border-white/10">
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-bold">Your Progress</h1>
          <p className="text-sm text-white/60 mt-1">Track your shadowing journey</p>
        </div>

        {/* Stats Overview */}
        <div className="p-4 grid grid-cols-2 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-lg font-bold">47</div>
              <div className="text-xs text-white/60">Videos Completed</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold">24h</div>
              <div className="text-xs text-white/60">Total Practice</div>
            </CardContent>
          </Card>
        </div>

        {/* Pronunciation Score */}
        <div className="p-4">
          <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Pronunciation Score</span>
                <Award className="w-5 h-5 text-green-400" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">87%</div>
                <div className="text-sm text-white/60">Overall accuracy</div>
              </div>
              <Progress value={87} className="h-2" />
              <div className="text-xs text-white/80 text-center">
                +5% improvement this week!
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3">This Week</h3>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/80">Daily Goal</span>
                  <span className="text-sm font-medium">5/7 days</span>
                </div>
                <Progress value={71} className="h-2" />
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-white/80">Videos Shadowed</span>
                  <span className="text-sm font-medium">12 videos</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3">Recent Achievements</h3>
          <div className="space-y-3">
            {[
              { title: '7-Day Streak', description: 'Practiced every day this week', icon: '🔥' },
              { title: 'Pronunciation Pro', description: 'Scored 90%+ on 5 videos', icon: '🎯' },
              { title: 'Fast Learner', description: 'Completed 10 videos in 24h', icon: '⚡' },
            ].map((achievement, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center text-lg">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{achievement.title}</div>
                  <div className="text-xs text-white/60">{achievement.description}</div>
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

export default ProgressPage;