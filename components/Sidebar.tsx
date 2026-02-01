
import React from 'react';
import { ViewFilter, Platform } from '../types';
import { PLATFORMS } from '../constants';

interface SidebarProps {
  currentFilter: ViewFilter;
  onFilterChange: (filter: ViewFilter) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentFilter, onFilterChange }) => {
  // Use React.FC to properly type the local component and handle intrinsic props like 'key'
  const NavItem: React.FC<{ label: string; value: ViewFilter; icon: string }> = ({ label, value, icon }) => (
    <button
      onClick={() => onFilterChange(value)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        currentFilter === value 
          ? 'bg-violet-600/20 text-violet-400 font-semibold border border-violet-600/30' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm tracking-wide">{label}</span>
    </button>
  );

  return (
    <aside className="w-64 flex-shrink-0 bg-slate-900 border-r border-slate-800 p-6 flex flex-col h-screen sticky top-0">
      <div className="mb-10 flex items-center space-x-3 px-2">
        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-900/20">
          <span className="text-white font-bold">O</span>
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          OmniHub
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Library</p>
        <NavItem label="All Games" value="All" icon="🎮" />
        <NavItem label="Favorites" value="Favorites" icon="⭐" />
        <NavItem label="Recently Played" value="Recent" icon="🕒" />

        <div className="pt-8 space-y-2">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Platforms</p>
          {PLATFORMS.map((platform) => (
            <NavItem 
              key={platform} 
              label={platform} 
              value={platform as Platform} 
              icon="📀" 
            />
          ))}
        </div>
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white transition-colors">
          <span className="text-xl">⚙️</span>
          <span className="text-sm">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
