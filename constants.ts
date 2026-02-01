
import { Game } from './types';

export const INITIAL_GAMES: Game[] = [
  {
    id: '1',
    title: 'Elden Ring',
    coverUrl: 'https://picsum.photos/seed/elden/400/600',
    platform: 'Steam',
    genre: 'Action RPG',
    description: 'Rise, Tarnished, and be led by grace to brandish the power of the Elden Ring.',
    isFavorite: true,
    lastPlayed: '2023-10-25',
    playtimeHours: 124,
    addedAt: '2023-01-10'
  },
  {
    id: '2',
    title: 'Cyberpunk 2077',
    coverUrl: 'https://picsum.photos/seed/cp2077/400/600',
    platform: 'GOG',
    genre: 'RPG',
    description: 'An open-world, action-adventure story set in Night City.',
    isFavorite: false,
    lastPlayed: '2023-11-01',
    playtimeHours: 85,
    addedAt: '2023-02-15'
  },
  {
    id: '3',
    title: 'Hades',
    coverUrl: 'https://picsum.photos/seed/hades/400/600',
    platform: 'Epic',
    genre: 'Roguelike',
    description: 'Defy the god of the dead as you hack and slash out of the Underworld.',
    isFavorite: true,
    lastPlayed: '2023-11-05',
    playtimeHours: 42,
    addedAt: '2023-05-20'
  },
  {
    id: '4',
    title: 'Baldur\'s Gate 3',
    coverUrl: 'https://picsum.photos/seed/bg3/400/600',
    platform: 'Steam',
    genre: 'RPG',
    description: 'Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal.',
    isFavorite: true,
    lastPlayed: '2023-11-10',
    playtimeHours: 210,
    addedAt: '2023-08-03'
  }
];

export const PLATFORMS: string[] = ['Steam', 'Epic', 'GOG', 'Battle.net', 'Ubisoft', 'EA', 'Custom'];
