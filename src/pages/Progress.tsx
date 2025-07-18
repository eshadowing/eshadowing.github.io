import { useEffect } from 'react';
import { TrendingUp, Award, Clock, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { trackUserBehavior } from '@/utils/tracking';
import BottomNav from '@/components/BottomNav';
import { useTranslation } from '@/lib/i18n';

const ProgressPage = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    // Track user behavior when progress page opens
    trackUserBehavior('open_progress');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex justify-center">
      <div className="relative w-full max-w-sm mx-auto h-screen bg-gradient-to-br from-slate-900 to-slate-800 overflow-y-auto pb-32 pb-safe">
        {/* Header */}
        <div className="p-6 text-center border-b border-slate-700/50">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">{t('progress.title')}</h1>
          <p className="text-sm text-slate-300 mt-1">{t('progress.subtitle')}</p>
        </div>

        {/* Stats Overview */}
        <div className="p-4 grid grid-cols-2 gap-4">
          <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-600/50 shadow-lg">
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">47</div>
              <div className="text-xs text-slate-300">{t('common.sentencesCompleted')}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-600/50 shadow-lg">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">24h</div>
              <div className="text-xs text-slate-300">{t('progress.totalPractice')}</div>
            </CardContent>
          </Card>
        </div>

        {/* Pronunciation Score */}
        <div className="p-4">
          <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-600/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>{t('progress.pronunciationScore')}</span>
                <Award className="w-5 h-5 text-emerald-400" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">87%</div>
                <div className="text-sm text-slate-300">{t('progress.overallAccuracy')}</div>
              </div>
              <Progress value={87} className="h-3 bg-slate-700" />
              <div className="text-xs text-emerald-400 text-center font-medium">
                {t('progress.improvementWeek')}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3 text-white">{t('progress.thisWeek')}</h3>
          <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-600/50 shadow-lg">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">{t('progress.dailyGoal')}</span>
                  <span className="text-sm font-medium text-white">5/7 {t('progress.days')}</span>
                </div>
                <Progress value={71} className="h-3 bg-slate-700" />
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-slate-300">{t('progress.sentencesShadowed')}</span>
                  <span className="text-sm font-medium text-white">12 {t('progress.sentences')}</span>
                </div>
                <Progress value={80} className="h-3 bg-slate-700" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div className="p-4 pb-60">
          <h3 className="text-lg font-semibold mb-3 text-white">{t('progress.recentAchievements')}</h3>
          <div className="space-y-3">
            {[
              { title: t('progress.achievements.sevenDayStreak'), description: t('progress.achievements.sevenDayStreakDesc'), icon: '🔥' },
              { title: t('progress.achievements.pronunciationPro'), description: t('progress.achievements.pronunciationProDesc'), icon: '🎯' },
              { title: t('progress.achievements.fastLearner'), description: t('progress.achievements.fastLearnerDesc'), icon: '⚡' },
            ].map((achievement, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/70 backdrop-blur-sm rounded-lg shadow-md border border-slate-600/50">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500/30 to-yellow-500/30 border border-amber-400/40 rounded-lg flex items-center justify-center text-lg shadow-sm">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{achievement.title}</div>
                  <div className="text-xs text-slate-300">{achievement.description}</div>
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