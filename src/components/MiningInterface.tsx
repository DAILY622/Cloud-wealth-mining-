import React, { useState, useEffect } from 'react';
import { Zap, Cloud, Sparkles } from 'lucide-react';
import { UserStats } from '../types';
import { formatCurrency } from '../utils/gameLogic';

interface MiningInterfaceProps {
  userStats: UserStats;
  onMine: () => number | undefined;
  autoMining: boolean;
  setAutoMining: (value: boolean) => void;
}

const MiningInterface: React.FC<MiningInterfaceProps> = ({ 
  userStats, 
  onMine, 
  autoMining, 
  setAutoMining 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [lastReward, setLastReward] = useState<number>(0);

  const handleMine = () => {
    if (userStats.energy < 10) return;
    
    setIsAnimating(true);
    
    const reward = onMine();
    if (reward) {
      setLastReward(reward);
    }
    
    // Create particles
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100
    }));
    setParticles(newParticles);
    
    setTimeout(() => {
      setIsAnimating(false);
      setParticles([]);
    }, 1000);
  };

  return (
    <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-8 text-center relative overflow-hidden">
      {/* Mining Animation Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none animate-ping"
          style={{
            left: `50%`,
            top: `50%`,
            transform: `translate(${particle.x}px, ${particle.y}px)`,
          }}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </div>
      ))}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Cloud Mining Core</h2>
        <p className="text-gray-400">Tap to mine digital wealth from the cloud</p>
      </div>

      {/* Energy Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Energy</span>
          <span>{userStats.energy}/{userStats.maxEnergy}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(userStats.energy / userStats.maxEnergy) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Last Reward Display */}
      {lastReward > 0 && (
        <div className="mb-4 text-center">
          <p className="text-green-400 font-semibold animate-pulse">
            +{formatCurrency(lastReward)} mined!
          </p>
        </div>
      )}

      {/* Mining Button */}
      <div className="relative mb-6">
        <button
          onClick={handleMine}
          disabled={userStats.energy < 10}
          className={`relative w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 
            shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 
            ${isAnimating ? 'animate-pulse scale-110' : ''} 
            ${userStats.energy < 10 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-cyan-500/50'}
            disabled:transform-none disabled:hover:scale-100`}
        >
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
            <div className="relative">
              <Cloud className={`w-16 h-16 text-white ${isAnimating ? 'animate-bounce' : ''}`} />
              <Zap className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2" />
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/50 to-purple-600/50 blur-xl"></div>
        </button>
        
        <div className="mt-4">
          <p className="text-white font-semibold">Mining Power: {userStats.miningPower}x</p>
          <p className="text-gray-400 text-sm">Level {userStats.level} Bonus Active</p>
        </div>
      </div>

      {/* Auto Mining Toggle */}
      <div className="flex items-center justify-center space-x-3 mb-4">
        <span className="text-gray-400">Auto Mining</span>
        <button
          onClick={() => setAutoMining(!autoMining)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
            autoMining ? 'bg-cyan-500' : 'bg-gray-600'
          }`}
        >
          <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform duration-300 ${
            autoMining ? 'translate-x-6' : 'translate-x-0.5'
          }`}></div>
        </button>
      </div>

      {/* Mining Tips */}
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2">Mining Tips</h4>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>• Higher levels increase mining rewards</li>
          <li>• Energy regenerates over time</li>
          <li>• Auto mining works when you're away</li>
          <li>• Purchase upgrades to boost efficiency</li>
          <li>• Complete achievements for rewards</li>
        </ul>
      </div>
    </div>
  );
};

export default MiningInterface;