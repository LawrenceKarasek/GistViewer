import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Favorite, FavoritesState } from '../types/favorite';

const initialState: FavoritesState = {
  data: [],
  loading: false,
  error: null,
  selectedFavorite: undefined,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Favorite>) {
      state.data.push(action.payload);
      state.selectedFavorite = action.payload;
    },
    removeFavorite(state, action: PayloadAction<Favorite>) {
      state.data = state.data.filter(
        (fav) => !(fav.filename === action.payload.filename && fav.userName === action.payload.userName)
      );
      state.selectedFavorite = undefined;
    },
    getFavorite(state, action: PayloadAction<Favorite>) {
      state.selectedFavorite = undefined;

      state.selectedFavorite = state.data.find(
        (fav) => fav.filename === action.payload.filename && fav.userName === action.payload.userName
      );
    },
  },
});

export const { addFavorite, removeFavorite, getFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
