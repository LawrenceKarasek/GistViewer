import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { File, FilesState } from '../types/file';
import { getFiles } from '../data/files';
import type { RootState } from './index';

const initialState: FilesState = {
  data: [],
  loading: false,
  error: null,
  selectedFile: undefined,
};

export const fetchFiles = createAsyncThunk<File[], string, { state: RootState }>(
  'files/fetchFiles',
  async (gistId: string) => {
    return await getFiles(gistId);
  }
);

export const fetchFileContents = createAsyncThunk('files/fetchFileContents', async (file: File, { getState }) => {
  const state = getState() as { files: FilesState };
  const existingFile = state.files.data.find((f) => f.filename === file.filename);

  if (!existingFile) {
    throw new Error(`file can't be found for fileName:${file.filename}`);
  } else {
    return existingFile.content;
  }
});

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setSelectedFile(state, action: PayloadAction<File | undefined>) {
      state.selectedFile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load files';
      })
      .addCase(fetchFileContents.fulfilled, (state, action) => {
        if (state.selectedFile) state.selectedFile.content = action.payload;
      });
  },
});

export const { setSelectedFile } = filesSlice.actions;
export default filesSlice.reducer;
