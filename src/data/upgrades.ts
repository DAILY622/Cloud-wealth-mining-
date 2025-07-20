import { Upgrade } from '../types';

export const availableUpgrades: Upgrade[] = [
  {
    id: 'mining_power_1',
    name: 'Enhanced Processor',
    description: 'Increase mining power by 0.5x',
    cost: 50,
    benefit: '+0.5x Mining Power',
    level: 1,
    maxLevel: 10,
    owned: false
  },
  {
    id: 'energy_capacity_1',
    name: 'Extended Battery',
    description: 'Increase maximum energy by 20',
    cost: 75,
    benefit: '+20 Max Energy',
    level: 1,
    maxLevel: 5,
    owned: false
  },
  {
    id: 'energy_regen_1',
    name: 'Fast Charger',
    description: 'Increase energy regeneration rate',
    cost: 100,
    benefit: '+50% Energy Regen',
    level: 1,
    maxLevel: 3,
    owned: false
  },
  {
    id: 'auto_miner_1',
    name: 'Auto Mining Bot',
    description: 'Enables automatic mining when away',
    cost: 200,
    benefit: 'Auto Mining Unlocked',
    level: 1,
    maxLevel: 1,
    owned: false
  },
  {
    id: 'luck_boost_1',
    name: 'Lucky Charm',
    description: 'Increase chance of bonus rewards',
    cost: 150,
    benefit: '+25% Bonus Chance',
    level: 1,
    maxLevel: 4,
    owned: false
  }
];