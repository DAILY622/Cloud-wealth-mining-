import React from 'react';
import { Crown, TrendingUp, Medal } from 'lucide-react';
import { formatCurrency } from '../utils/gameLogic';

interface LeaderboardEntry {
  rank: number;
  username: string;
  totalMined: number;
  level: number;
  isCurrentUser?: boolean;
}

const LeaderboardPanel: React.FC = () => {
  // Mock leaderboard data
  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, username: 'CloudMaster99', totalMined: 15420.50, level: 87 },
    { rank: 2, username: 'MiningLegend', totalMined: 12890.25, level: 76 },
    { rank: 3, username: 'CryptoKing', totalMined: 11250.75, level: 68 },
    { rank: 4, username: 'DigitalMiner', totalMined: 9875.30, level: 62 },
    { rank: 5, username: 'CloudHunter', totalMined: 8920.15, level: 58 },
    { rank: 6, username: 'You', totalMined: 245.80, level: 12, isCurrentUser: true },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-gray-400 font-bold text-sm">#{rank}</span>;
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
        Global Leaderboard
      </h3>

      <div className="space-y-3">
        {leaderboard.map((entry) => (
          <div
            key={entry.rank}
            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
              entry.isCurrentUser
                ? 'bg-cyan-500/20 border border-cyan-500/30'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center space-x-3">
              {getRankIcon(entry.rank)}
              <div>
                <p className={`font-semibold ${
                  entry.isCurrentUser ? 'text-cyan-400' : 'text-white'
                }`}>
                  {entry.username}
                </p>
                <p className="text-sm text-gray-400">Level {entry.level}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-green-400">
                {formatCurrency(entry.totalMined)}
              </p>
              <p className="text-xs text-gray-400">Total Mined</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-white/5 rounded-lg">
        <p className="text-sm text-gray-400 text-center">
          Keep mining to climb the ranks! 🚀
        </p>
      </div>
    </div>
  );
};

export default LeaderboardPanel;