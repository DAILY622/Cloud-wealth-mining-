import { UserStats, Achievement, MiningReward } from '../types';

export const calculateMiningReward = (userStats: UserStats): number => {
  const baseReward = 0.5;
  const levelBonus = userStats.level * 0.1;
  const powerBonus = userStats.miningPower * 0.2;
  const randomBonus = Math.random() * 0.5;
  const energyMultiplier = userStats.energy > 50 ? 1.2 : 1.0;
  
  return (baseReward + levelBonus + powerBonus + randomBonus) * energyMultiplier;
};

export const calculateExperienceGain = (miningAmount: number): number => {
  return Math.floor(miningAmount * 10);
};

export const calculateLevelFromExperience = (experience: number): number => {
  return Math.floor(experience / 1000) + 1;
};

export const getRankFromLevel = (level: number): string => {
  if (level >= 100) return 'Cloud Legend';
  if (level >= 75) return 'Mining Titan';
  if (level >= 50) return 'Cloud Master';
  if (level >= 25) return 'Elite Miner';
  if (level >= 15) return 'Expert Miner';
  if (level >= 10) return 'Advanced Miner';
  if (level >= 5) return 'Skilled Miner';
  return 'Novice Miner';
};

export const getExperienceToNextLevel = (experience: number): number => {
  const currentLevel = calculateLevelFromExperience(experience);
  return (currentLevel * 1000) - experience;
};

export const getExperienceProgress = (experience: number): number => {
  return (experience % 1000) / 1000 * 100;
};

export const checkAchievements = (userStats: UserStats, achievements: Achievement[]): Achievement[] => {
  return achievements.map(achievement => {
    if (achievement.unlocked) return achievement;
    
    let shouldUnlock = false;
    
    switch (achievement.type) {
      case 'mining':
        shouldUnlock = userStats.totalMined >= achievement.requirement;
        break;
      case 'level':
        shouldUnlock = userStats.level >= achievement.requirement;
        break;
      case 'balance':
        shouldUnlock = userStats.balance >= achievement.requirement;
        break;
      case 'time':
        const daysSinceJoin = Math.floor((Date.now() - new Date(userStats.joinDate).getTime()) / (1000 * 60 * 60 * 24));
        shouldUnlock = daysSinceJoin >= achievement.requirement;
        break;
    }
    
    if (shouldUnlock) {
      return {
        ...achievement,
        unlocked: true,
        unlockedAt: new Date().toISOString()
      };
    }
    
    return achievement;
  });
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(2)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(2)}K`;
  }
  return `$${amount.toFixed(2)}`;
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};