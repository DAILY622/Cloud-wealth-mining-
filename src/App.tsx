import React, { useState, useEffect } from 'react';
import { Cloud, Zap, TrendingUp, Users, Award, Settings } from 'lucide-react';
import MiningInterface from './components/MiningInterface';
import StatsPanel from './components/StatsPanel';
import UserProfile from './components/UserProfile';
import Navigation from './components/Navigation';

function App() {
  const [activeTab, setActiveTab] = useState('mine');
  const [userStats, setUserStats] = useState({
    balance: 0,
    totalMined: 0,
    miningPower: 1,
    level: 1,
    experience: 0,
    rank: 'Novice Miner'
  });

  const [miningStats, setMiningStats] = useState({
    totalMiners: 12847,
    totalMined: 2847392.50,
    activeMiners: 3421
  });

  const handleMine = (amount: number) => {
    setUserStats(prev => ({
      ...prev,
      balance: prev.balance + amount,
      totalMined: prev.totalMined + amount,
      experience: prev.experience + amount * 10
    }));
  };

  useEffect(() => {
    // Level up logic
    const newLevel = Math.floor(userStats.experience / 1000) + 1;
    if (newLevel > userStats.level) {
      setUserStats(prev => ({
        ...prev,
        level: newLevel,
        miningPower: newLevel,
        rank: getRank(newLevel)
      }));
    }
  }, [userStats.experience]);

  const getRank = (level: number) => {
    if (level >= 50) return 'Cloud Master';
    if (level >= 25) return 'Elite Miner';
    if (level >= 10) return 'Expert Miner';
    if (level >= 5) return 'Advanced Miner';
    return 'Novice Miner';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Cloud className="w-8 h-8 text-cyan-400" />
                  <Zap className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Cloud Wealth Mining</h1>
                  <p className="text-xs text-gray-400">Digital Asset Mining Platform</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Balance</p>
                  <p className="text-lg font-bold text-cyan-400">${userStats.balance.toFixed(2)}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{userStats.level}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Stats */}
            <div className="lg:col-span-1">
              <StatsPanel userStats={userStats} miningStats={miningStats} />
            </div>

            {/* Center Column - Mining Interface */}
            <div className="lg:col-span-1">
              {activeTab === 'mine' && (
                <MiningInterface 
                  onMine={handleMine} 
                  miningPower={userStats.miningPower}
                  level={userStats.level}
                />
              )}
              {activeTab === 'profile' && <UserProfile userStats={userStats} />}
            </div>

            {/* Right Column - Additional Info */}
            <div className="lg:col-span-1">
              <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {[
                    { action: 'Mining Reward', amount: '+$2.50', time: '2 min ago' },
                    { action: 'Level Up!', amount: 'Level 5', time: '15 min ago' },
                    { action: 'Mining Reward', amount: '+$1.75', time: '18 min ago' },
                    { action: 'Mining Reward', amount: '+$3.20', time: '25 min ago' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white text-sm">{activity.action}</p>
                        <p className="text-gray-400 text-xs">{activity.time}</p>
                      </div>
                      <span className="text-green-400 font-semibold">{activity.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  Achievements
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'First Mine', icon: '⛏️', unlocked: true },
                    { name: 'Level 5', icon: '🏆', unlocked: userStats.level >= 5 },
                    { name: '$100 Mined', icon: '💰', unlocked: userStats.totalMined >= 100 },
                    { name: 'Cloud Master', icon: '☁️', unlocked: userStats.level >= 50 },
                  ].map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg text-center ${
                        achievement.unlocked 
                          ? 'bg-yellow-500/20 border border-yellow-500/30' 
                          : 'bg-gray-500/10 border border-gray-500/20'
                      }`}
                    >
                      <div className="text-2xl mb-1">{achievement.icon}</div>
                      <p className={`text-xs ${achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'}`}>
                        {achievement.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

export default App;