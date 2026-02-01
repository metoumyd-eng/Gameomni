
import React, { useState } from 'react';
import { Platform, Game } from '../types';
import { PLATFORMS } from '../constants';
import { fetchGameMetadata } from '../services/geminiService';

interface AddGameModalProps {
  onClose: () => void;
  onAdd: (game: Omit<Game, 'id' | 'playtimeHours' | 'addedAt' | 'isFavorite'>) => void;
}

const AddGameModal: React.FC<AddGameModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    platform: 'Steam' as Platform,
    genre: '',
    description: '',
    coverUrl: 'https://picsum.photos/seed/game/400/600'
  });
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiAutofill = async () => {
    if (!formData.title) return;
    setIsAiLoading(true);
    const metadata = await fetchGameMetadata(formData.title);
    if (metadata) {
      setFormData(prev => ({
        ...prev,
        title: metadata.title || prev.title,
        genre: metadata.genre || prev.genre,
        description: metadata.description || prev.description,
        coverUrl: `https://picsum.photos/seed/${encodeURIComponent(metadata.title)}/400/600`
      }));
    }
    setIsAiLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold">Add New Game</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Game Title</label>
            <div className="flex space-x-2">
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                placeholder="Enter game title..."
              />
              <button
                type="button"
                onClick={handleAiAutofill}
                disabled={isAiLoading || !formData.title}
                className="bg-violet-600/20 text-violet-400 hover:bg-violet-600/30 px-4 py-2 rounded-lg text-sm font-semibold border border-violet-600/30 disabled:opacity-50 flex items-center"
              >
                {isAiLoading ? '⌛' : '✨ AI Autofill'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value as Platform })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Genre</label>
              <input
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="RPG, FPS..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Tell us about the game..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Cover URL</label>
            <input
              type="text"
              value={formData.coverUrl}
              onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="https://..."
            />
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-slate-400 hover:bg-slate-800 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-bold shadow-lg shadow-violet-900/40"
            >
              Add Game
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGameModal;
