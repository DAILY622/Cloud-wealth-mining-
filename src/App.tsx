import React, { useState, useEffect } from 'react';
import { Cloud, Zap, Bell } from 'lucide-react';
import MiningInterface from './components/MiningInterface';
import StatsPanel from './components/StatsPanel';
import UserProfile from './components/UserProfile';
import Navigation from './components/Navigation';
import AchievementsPanel from './components/AchievementsPanel';
import UpgradesPanel from './components/UpgradesPanel';
import LeaderboardPanel from './components/LeaderboardPanel';
import { UserStats, MiningStats, Achievement, Upgrade } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { 
  calculateMiningReward, 
  calculateExperienceGain, 
  calculateLevelFromExperience,
  getRankFromLevel,
  checkAchievements,
  formatCurrency
} from './utils/gameLogic';
import { defaultAchievements } from './data/achievements';
import { availableUpgrades } from './data/upgrades';

function App() {
  const [activeTab, setActiveTab] = useState('mine');
  
  const [userStats, setUserStats] = useLocalStorage<UserStats>('userStats', {
    balance: 0,
    totalMined: 0,
    miningPower: 1,
    level: 1,
    experience: 0,
    rank: 'Novice Miner',
    energy: 100,
    maxEnergy: 100,
    joinDate: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  });

  const [miningStats, setMiningStats] = useState<MiningStats>({
    totalMiners: 12847,
    totalMined: 2847392.50,
    activeMiners: 3421,
    networkHashrate: 1250000
  });

  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('achievements', defaultAchievements);
  const [upgrades, setUpgrades] = useLocalStorage<Upgrade[]>('upgrades', availableUpgrades);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [autoMining, setAutoMining] = useState(false);

  const handleMine = (amount: number) => {
    if (userStats.energy < 10) return;
    
    const reward = calculateMiningReward(userStats);
    const expGain = calculateExperienceGain(reward);
    
    setUserStats(prev => ({
      ...prev,
      balance: prev.balance + reward,
      totalMined: prev.totalMined + reward,
      experience: prev.experience + expGain,
      energy: Math.max(0, prev.energy - 10),
      lastLogin: new Date().toISOString()
    }));
    
    return reward;
  };

  const handleUpgradePurchase = (upgradeId: string) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade || userStats.balance < upgrade.cost || upgrade.owned) return;
    
    setUserStats(prev => ({
      ...prev,
      balance: prev.balance - upgrade.cost,
      miningPower: upgradeId.includes('mining_power') ? prev.miningPower + 0.5 : prev.miningPower,
      maxEnergy: upgradeId.includes('energy_capacity') ? prev.maxEnergy + 20 : prev.maxEnergy
    }));
    
    setUpgrades(prev => prev.map(u => 
      u.id === upgradeId ? { ...u, owned: true } : u
    ));
    
    addNotification(`Purchased ${upgrade.name}!`);
  };

  const addNotification = (message: string) => {
    setNotifications(prev => [...prev, message]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 3000);
  };

  useEffect(() => {
    const newLevel = calculateLevelFromExperience(userStats.experience);
    if (newLevel > userStats.level) {
      setUserStats(prev => ({
        ...prev,
        level: newLevel,
        rank: getRankFromLevel(newLevel)
      }));
      addNotification(`Level up! You are now level ${newLevel}`);
    }
  }, [userStats.experience]);

  useEffect(() => {
    const updatedAchievements = checkAchievements(userStats, achievements);
    const newlyUnlocked = updatedAchievements.filter((achievement, index) => 
      achievement.unlocked && !achievements[index].unlocked
    );
    
    if (newlyUnlocked.length > 0) {
      setAchievements(updatedAchievements);
      newlyUnlocked.forEach(achievement => {
        addNotification(`Achievement unlocked: ${achievement.name}!`);
      });
    }
  }, [userStats, achievements]);

  useEffect(() => {
    // Energy regeneration
    const energyInterval = setInterval(() => {
      setUserStats(prev => ({
        ...prev,
        energy: Math.min(prev.maxEnergy, prev.energy + 1)
      }));
    }, 1000);

    return () => clearInterval(energyInterval);
  }, [userStats.maxEnergy]);

  useEffect(() => {
    // Auto mining
    let autoMiningInterval: NodeJS.Timeout;
    if (autoMining && userStats.energy >= 10) {
      autoMiningInterval = setInterval(() => {
        handleMine(0);
      }, 3000);
    }
    return () => clearInterval(autoMiningInterval);
  }, [autoMining, userStats.energy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Notifications */}
        <div className="fixed top-20 right-4 z-50 space-y-2">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-green-500/90 backdrop-blur-lg text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in-right"
            >
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span className="text-sm font-medium">{notification}</span>
              </div>
            </div>
          ))}
        </div>

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
                  <p className="text-lg font-bold text-cyan-400">{formatCurrency(userStats.balance)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Energy</p>
                  <p className="text-lg font-bold text-yellow-400">{userStats.energy}/{userStats.maxEnergy}</p>
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
          {activeTab === 'mine' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <StatsPanel userStats={userStats} miningStats={miningStats} />
              </div>
              <div className="lg:col-span-1">
                <MiningInterface 
                  userStats={userStats}
                  onMine={handleMine}
                  autoMining={autoMining}
                  setAutoMining={setAutoMining}
                />
              </div>
              <div className="lg:col-span-1">
                <LeaderboardPanel />
              </div>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="max-w-4xl mx-auto">
              <UserProfile userStats={userStats} />
            </div>
          )}
          
          {activeTab === 'achievements' && (
            <div className="max-w-4xl mx-auto">
              <AchievementsPanel achievements={achievements} />
            </div>
          )}
          
          {activeTab === 'upgrades' && (
            <div className="max-w-4xl mx-auto">
              <UpgradesPanel 
                upgrades={upgrades}
                userBalance={userStats.balance}
                onPurchase={handleUpgradePurchase}
              />
            </div>
          )}
        </main>

        {/* Bottom Navigation */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

export default App;