import React from 'react';
import { TrendingUp, Users, Zap, Award } from 'lucide-react';

interface UserStats {
  balance: number;
  totalMined: number;
  miningPower: number;
  level: number;
  experience: number;
  rank: string;
}

interface MiningStats {
  totalMiners: number;
  totalMined: number;
  activeMiners: number;
}

interface StatsPanelProps {
  userStats: UserStats;
  miningStats: MiningStats;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ userStats, miningStats }) => {
  const experienceToNextLevel = (userStats.level * 1000) - userStats.experience;
  const experienceProgress = (userStats.experience % 1000) / 1000 * 100;

  return (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-cyan-400" />
          Your Progress
        </h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Rank</span>
            <span className="text-cyan-400 font-semibold">{userStats.rank}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Level</span>
            <span className="text-white font-bold">{userStats.level}</span>
          </div>
          
          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Experience</span>
              <span>{experienceToNextLevel} to next level</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${experienceProgress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Mined</span>
            <span className="text-green-400 font-semibold">${userStats.totalMined.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Mining Power</span>
            <span className="text-yellow-400 font-semibold">{userStats.miningPower}x</span>
          </div>
        </div>
      </div>

      {/* Global Stats */}
      <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
          Global Statistics
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-gray-400">Total Miners</span>
            </div>
            <span className="text-white font-semibold">{miningStats.totalMiners.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-gray-400">Active Now</span>
            </div>
            <span className="text-green-400 font-semibold">{miningStats.activeMiners.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-gray-400">Total Mined</span>
            </div>
            <span className="text-cyan-400 font-semibold">${miningStats.totalMined.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        
        <div className="space-y-3">
          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
            Upgrade Mining Power
          </button>
          
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
            Boost Energy
          </button>
          
          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300">
            Withdraw Funds
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;