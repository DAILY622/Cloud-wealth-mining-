import React from 'react';
import { User, Trophy, Calendar, Zap } from 'lucide-react';

interface UserStats {
  balance: number;
  totalMined: number;
  miningPower: number;
  level: number;
  experience: number;
  rank: string;
}

interface UserProfileProps {
  userStats: UserStats;
}

const UserProfile: React.FC<UserProfileProps> = ({ userStats }) => {
  const joinDate = new Date('2024-01-15').toLocaleDateString();
  const miningDays = Math.floor((Date.now() - new Date('2024-01-15').getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <User className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Cloud Miner #{Math.floor(Math.random() * 10000)}</h2>
        <p className="text-cyan-400 font-semibold">{userStats.rank}</p>
      </div>

      <div className="space-y-6">
        {/* Profile Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{userStats.level}</p>
            <p className="text-gray-400 text-sm">Level</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Zap className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{userStats.miningPower}x</p>
            <p className="text-gray-400 text-sm">Power</p>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-gray-400">Current Balance</span>
            <span className="text-green-400 font-semibold">${userStats.balance.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-gray-400">Total Mined</span>
            <span className="text-cyan-400 font-semibold">${userStats.totalMined.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-gray-400">Experience Points</span>
            <span className="text-purple-400 font-semibold">{userStats.experience.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-gray-400">Member Since</span>
            <span className="text-white">{joinDate}</span>
          </div>
          
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-400">Mining Days</span>
            <span className="text-white">{miningDays} days</span>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-3 flex items-center">
            <Trophy className="w-4 h-4 mr-2 text-yellow-400" />
            Recent Achievements
          </h3>
          <div className="space-y-2">
            {[
              { name: 'First Mine', date: '2024-01-15', earned: true },
              { name: 'Level 5 Reached', date: '2024-01-20', earned: userStats.level >= 5 },
              { name: '$100 Mined', date: '2024-01-25', earned: userStats.totalMined >= 100 },
            ].map((achievement, index) => (
              <div key={index} className={`flex justify-between items-center p-2 rounded ${
                achievement.earned ? 'bg-green-500/20' : 'bg-gray-500/20'
              }`}>
                <span className={achievement.earned ? 'text-green-400' : 'text-gray-500'}>
                  {achievement.name}
                </span>
                {achievement.earned && (
                  <span className="text-xs text-gray-400">{achievement.date}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
            Edit Profile
          </button>
          
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
            Share Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;