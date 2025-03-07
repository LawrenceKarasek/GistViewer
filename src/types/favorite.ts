export interface Favorite {
  filename: string;
  userName: string;
}

export interface FavoritesState {
  data: Favorite[];
  loading: boolean;
  error: string | null;
  selectedFavorite?: Favorite;
}
