import { configureStore } from '@reduxjs/toolkit';
import gistsReducer from '../store/gistsSlice';
import filesReducer from '../store/filesSlice';
import favoritesReducer from '../store/favoritesSlice';

export const store = configureStore({
  reducer: {
    gists: gistsReducer,
    files: filesReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
