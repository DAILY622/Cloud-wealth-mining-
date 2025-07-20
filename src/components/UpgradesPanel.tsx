import React from 'react';
import { Zap, ShoppingCart, CheckCircle } from 'lucide-react';
import { Upgrade } from '../types';
import { formatCurrency } from '../utils/gameLogic';

interface UpgradesPanelProps {
  upgrades: Upgrade[];
  userBalance: number;
  onPurchase: (upgradeId: string) => void;
}

const UpgradesPanel: React.FC<UpgradesPanelProps> = ({ upgrades, userBalance, onPurchase }) => {
  return (
    <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
        <Zap className="w-5 h-5 mr-2 text-cyan-400" />
        Upgrades
      </h3>

      <div className="space-y-4">
        {upgrades.map((upgrade) => {
          const canAfford = userBalance >= upgrade.cost;
          const isMaxLevel = upgrade.level >= upgrade.maxLevel;
          
          return (
            <div
              key={upgrade.id}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                upgrade.owned
                  ? 'bg-green-500/20 border-green-500/30'
                  : canAfford
                  ? 'bg-cyan-500/10 border-cyan-500/20 hover:bg-cyan-500/20'
                  : 'bg-gray-500/10 border-gray-500/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-white">{upgrade.name}</h4>
                    {upgrade.owned && <CheckCircle className="w-4 h-4 text-green-400" />}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{upgrade.description}</p>
                  <p className="text-sm text-cyan-400 font-semibold">{upgrade.benefit}</p>
                  {upgrade.maxLevel > 1 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Level {upgrade.level}/{upgrade.maxLevel}
                    </p>
                  )}
                </div>
                
                <div className="ml-4 text-right">
                  <p className="text-lg font-bold text-white mb-2">
                    {formatCurrency(upgrade.cost)}
                  </p>
                  <button
                    onClick={() => onPurchase(upgrade.id)}
                    disabled={!canAfford || upgrade.owned || isMaxLevel}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      upgrade.owned || isMaxLevel
                        ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                        : canAfford
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {upgrade.owned ? (
                      'Owned'
                    ) : isMaxLevel ? (
                      'Max Level'
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 inline mr-1" />
                        Buy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradesPanel;