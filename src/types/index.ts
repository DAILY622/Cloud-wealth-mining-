export interface UserStats {
  balance: number;
  totalMined: number;
  miningPower: number;
  level: number;
  experience: number;
  rank: string;
  energy: number;
  maxEnergy: number;
  joinDate: string;
  lastLogin: string;
}

export interface MiningStats {
  totalMiners: number;
  totalMined: number;
  activeMiners: number;
  networkHashrate: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  requirement: number;
  type: 'mining' | 'level' | 'balance' | 'time';
}

export interface MiningReward {
  amount: number;
  timestamp: number;
  type: 'manual' | 'auto';
  bonus?: number;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  benefit: string;
  level: number;
  maxLevel: number;
  owned: boolean;
}