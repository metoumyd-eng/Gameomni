
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onToggleFavorite: (id: string) => void;
  onLaunch: (id: string) => void;
  onDelete: (id: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onToggleFavorite, onLaunch, onDelete }) => {
  return (
    <div className="group relative bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-900/20 transition-all duration-300 transform hover:-translate-y-1">
      {/* Cover Image */}
      <div className="aspect-[2/3] w-full overflow-hidden relative">
        <img 
          src={game.coverUrl} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
        
        {/* Platform Badge */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-slate-300 border border-slate-700">
          {game.platform}
        </div>

        {/* Action Overlay (Visible on Hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/40 backdrop-blur-[2px]">
          <button 
            onClick={() => onLaunch(game.id)}
            className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-all transform hover:scale-105"
          >
            PLAY
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 relative">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-slate-100 truncate flex-1">{game.title}</h3>
          <button 
            onClick={() => onToggleFavorite(game.id)}
            className={`ml-2 text-xl transition-colors ${game.isFavorite ? 'text-yellow-400' : 'text-slate-600 hover:text-slate-400'}`}
          >
            {game.isFavorite ? '★' : '☆'}
          </button>
        </div>
        
        <p className="text-xs text-slate-400 font-medium mb-3">{game.genre}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">
            {game.playtimeHours} Hours Played
          </div>
          <button 
            onClick={() => onDelete(game.id)}
            className="text-slate-600 hover:text-red-400 text-sm transition-colors opacity-0 group-hover:opacity-100"
            title="Remove from Hub"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
