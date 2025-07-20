import { Achievement } from '../types';

export const defaultAchievements: Achievement[] = [
  {
    id: 'first_mine',
    name: 'First Steps',
    description: 'Complete your first mining operation',
    icon: '⛏️',
    unlocked: false,
    requirement: 1,
    type: 'mining'
  },
  {
    id: 'level_5',
    name: 'Rising Star',
    description: 'Reach level 5',
    icon: '⭐',
    unlocked: false,
    requirement: 5,
    type: 'level'
  },
  {
    id: 'level_10',
    name: 'Expert Miner',
    description: 'Reach level 10',
    icon: '🏆',
    unlocked: false,
    requirement: 10,
    type: 'level'
  },
  {
    id: 'level_25',
    name: 'Elite Status',
    description: 'Reach level 25',
    icon: '👑',
    unlocked: false,
    requirement: 25,
    type: 'level'
  },
  {
    id: 'mine_100',
    name: 'Hundred Club',
    description: 'Mine $100 in total',
    icon: '💰',
    unlocked: false,
    requirement: 100,
    type: 'mining'
  },
  {
    id: 'mine_1000',
    name: 'Thousand Miner',
    description: 'Mine $1,000 in total',
    icon: '💎',
    unlocked: false,
    requirement: 1000,
    type: 'mining'
  },
  {
    id: 'balance_500',
    name: 'Wealth Builder',
    description: 'Accumulate $500 balance',
    icon: '🏦',
    unlocked: false,
    requirement: 500,
    type: 'balance'
  },
  {
    id: 'week_veteran',
    name: 'Week Veteran',
    description: 'Mine for 7 consecutive days',
    icon: '📅',
    unlocked: false,
    requirement: 7,
    type: 'time'
  },
  {
    id: 'month_veteran',
    name: 'Monthly Miner',
    description: 'Mine for 30 days',
    icon: '🗓️',
    unlocked: false,
    requirement: 30,
    type: 'time'
  },
  {
    id: 'cloud_master',
    name: 'Cloud Master',
    description: 'Reach level 50',
    icon: '☁️',
    unlocked: false,
    requirement: 50,
    type: 'level'
  }
];