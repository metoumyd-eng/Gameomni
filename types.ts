
export type Platform = 'Steam' | 'Epic' | 'GOG' | 'Battle.net' | 'Ubisoft' | 'EA' | 'Custom';

export interface Game {
  id: string;
  title: string;
  coverUrl: string;
  platform: Platform;
  genre: string;
  description: string;
  isFavorite: boolean;
  lastPlayed?: string;
  playtimeHours: number;
  addedAt: string;
}

export type ViewFilter = 'All' | 'Favorites' | 'Recent' | Platform;
