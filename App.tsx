
import React, { useState, useMemo, useEffect } from 'react';
import { Game, ViewFilter, Platform } from './types';
import { INITIAL_GAMES, PLATFORMS } from './constants';
import Sidebar from './components/Sidebar';
import GameCard from './components/GameCard';
import AddGameModal from './components/AddGameModal';

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>(() => {
    const saved = localStorage.getItem('omnihub_games');
    return saved ? JSON.parse(saved) : INITIAL_GAMES;
  });
  
  const [filter, setFilter] = useState<ViewFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({ totalHours: 0, totalGames: 0 });

  useEffect(() => {
    localStorage.setItem('omnihub_games', JSON.stringify(games));
    const totalHours = games.reduce((acc, game) => acc + game.playtimeHours, 0);
    setStats({ totalHours, totalGames: games.length });
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (filter === 'All') return true;
      if (filter === 'Favorites') return game.isFavorite;
      if (filter === 'Recent') {
        if (!game.lastPlayed) return false;
        const lastPlayedDate = new Date(game.lastPlayed);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return lastPlayedDate >= thirtyDaysAgo;
      }
      return game.platform === filter;
    }).sort((a, b) => {
        // Sort by last played for "Recent" view
        if (filter === 'Recent') {
            return (b.lastPlayed || '').localeCompare(a.lastPlayed || '');
        }
        return a.title.localeCompare(b.title);
    });
  }, [games, filter, searchQuery]);

  const handleToggleFavorite = (id: string) => {
    setGames(prev => prev.map(g => g.id === id ? { ...g, isFavorite: !g.isFavorite } : g));
  };

  const handleLaunchGame = (id: string) => {
    // Simulate game launch
    setGames(prev => prev.map(g => {
        if (g.id === id) {
            return {
                ...g,
                lastPlayed: new Date().toISOString().split('T')[0],
                playtimeHours: g.playtimeHours + Math.floor(Math.random() * 3) + 1
            };
        }
        return g;
    }));
    alert(`Launching ${games.find(g => g.id === id)?.title}... Enjoy your session!`);
  };

  const handleDeleteGame = (id: string) => {
    if (confirm("Are you sure you want to remove this game from your library?")) {
        setGames(prev => prev.filter(g => g.id !== id));
    }
  };

  const handleAddGame = (newGameData: Omit<Game, 'id' | 'playtimeHours' | 'addedAt' | 'isFavorite'>) => {
    const newGame: Game = {
      ...newGameData,
      id: Date.now().toString(),
      isFavorite: false,
      playtimeHours: 0,
      addedAt: new Date().toISOString().split('T')[0],
    };
    setGames(prev => [newGame, ...prev]);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 selection:bg-violet-500/30 selection:text-violet-200">
      <Sidebar currentFilter={filter} onFilterChange={setFilter} />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">
              {filter === 'All' ? 'My Library' : filter}
            </h2>
            <p className="text-slate-400 text-sm">
              Manage and launch your collection of <span className="text-violet-400 font-semibold">{filteredGames.length}</span> games.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Quick Stats */}
            <div className="hidden lg:flex items-center space-x-6 mr-6 px-6 py-2 bg-slate-900 rounded-2xl border border-slate-800">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Total Playtime</p>
                <p className="text-lg font-bold text-violet-400">{stats.totalHours}h</p>
              </div>
              <div className="w-px h-8 bg-slate-800"></div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Library Size</p>
                <p className="text-lg font-bold text-emerald-400">{stats.totalGames}</p>
              </div>
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
              <input 
                type="text" 
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all text-sm"
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-2 rounded-xl flex items-center space-x-2 transition-all shadow-lg shadow-violet-900/30"
            >
              <span>+</span>
              <span>Add Game</span>
            </button>
          </div>
        </header>

        {/* Empty State */}
        {filteredGames.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
            <div className="text-6xl grayscale opacity-30">🎮</div>
            <div>
              <h3 className="text-xl font-bold text-slate-300">No games found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your filters or search query, or add a new game!</p>
            </div>
            <button 
              onClick={() => {setFilter('All'); setSearchQuery('');}}
              className="text-violet-400 font-semibold hover:text-violet-300 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Game Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {filteredGames.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                onToggleFavorite={handleToggleFavorite}
                onLaunch={handleLaunchGame}
                onDelete={handleDeleteGame}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal Overlay */}
      {isModalOpen && (
        <AddGameModal 
          onClose={() => setIsModalOpen(false)} 
          onAdd={handleAddGame} 
        />
      )}
    </div>
  );
};

export default App;
