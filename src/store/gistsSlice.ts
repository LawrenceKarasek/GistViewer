import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Gist, GistsState } from '../types/gist';
import { getGists } from '../data/gists';
import type { RootState } from './index';

const initialState: GistsState = {
  data: [],
  loading: false,
  error: null,
  selectedGist: undefined,
};

export const fetchGists = createAsyncThunk<Gist[], string, { state: RootState }>(
  'gists/fetchGists',
  async (userName: string) => {
    return await getGists(userName);
  }
);

export const clearGists = createAsyncThunk<[], '', { state: RootState }>('gists/clearGists', () => {
  return [];
});

const gistsSlice = createSlice({
  name: 'gists',
  initialState,
  reducers: {
    setSelectedGist(state, action: PayloadAction<Gist>) {
      state.selectedGist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGists.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGists.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || 'Failed to load gists';
      })
      .addCase(clearGists.fulfilled, (state) => {
        state.loading = false;
        state.data = [];
      });
  },
});

export const { setSelectedGist } = gistsSlice.actions;
export default gistsSlice.reducer;
