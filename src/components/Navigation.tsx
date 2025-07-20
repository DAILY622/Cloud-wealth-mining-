import React from 'react';
import { Pickaxe, User, Trophy, ShoppingBag } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'mine', icon: Pickaxe, label: 'Mine' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'achievements', icon: Trophy, label: 'Achievements' },
    { id: 'upgrades', icon: ShoppingBag, label: 'Upgrades' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'animate-pulse' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;