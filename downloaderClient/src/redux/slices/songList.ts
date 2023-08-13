import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SongListState {
  value: string[];
}

const initialState: SongListState = {
  value: [],
};

const songListSlice = createSlice({
  name: "songlist",
  initialState,
  reducers: {
    updateSongList: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateSongList } = songListSlice.actions;
export default songListSlice.reducer;
