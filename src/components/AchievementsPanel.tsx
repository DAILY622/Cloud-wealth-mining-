import React from 'react';
import { Trophy, Lock, CheckCircle } from 'lucide-react';
import { Achievement } from '../types';

interface AchievementsPanelProps {
  achievements: Achievement[];
}

const AchievementsPanel: React.FC<AchievementsPanelProps> = ({ achievements }) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
          Achievements
        </h3>
        <span className="text-sm text-gray-400">
          {unlockedCount}/{totalCount}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border transition-all duration-300 ${
              achievement.unlocked
                ? 'bg-yellow-500/20 border-yellow-500/30 shadow-lg shadow-yellow-500/10'
                : 'bg-gray-500/10 border-gray-500/20'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className={`font-semibold ${
                    achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'
                  }`}>
                    {achievement.name}
                  </h4>
                  {achievement.unlocked ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                <p className={`text-sm mt-1 ${
                  achievement.unlocked ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {achievement.description}
                </p>
                {achievement.unlocked && achievement.unlockedAt && (
                  <p className="text-xs text-yellow-400 mt-2">
                    Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPanel;