import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
  name: "songs",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Fetch Songs
    fetchSongsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
    },
    fetchSongsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    // Create Song
    createSongRequest(state) {
      state.loading = true;
    },
    createSongSuccess(state, action) {
      state.list.push(action.payload);
      state.loading = false;
    },

    // Update Song
    updateSongRequest(state) {
      state.loading = true;
    },
    updateSongSuccess(state, action) {
      const index = state.list.findIndex(
        (song) => song.id === action.payload.id
      );
      state.list[index] = action.payload;
      state.loading = false;
    },

    // Delete Song
    deleteSongRequest(state) {
      state.loading = true;
    },
    deleteSongSuccess(state, action) {
      state.list = state.list.filter((song) => song.id !== action.payload);
      state.loading = false;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongRequest,
  createSongSuccess,
  updateSongRequest,
  updateSongSuccess,
  deleteSongRequest,
  deleteSongSuccess,
} = songsSlice.actions;

export default songsSlice.reducer;
