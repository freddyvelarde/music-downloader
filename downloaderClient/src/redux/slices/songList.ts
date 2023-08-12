import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SongListState {
  value: string[];
}

const initialState: SongListState = {
  value: ["test song naem", "anther test osng :(", "xdxdxdxdx"],
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
