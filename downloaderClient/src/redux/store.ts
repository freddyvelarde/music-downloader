import { configureStore } from "@reduxjs/toolkit";
import songList from "./slices/songList";

const store = configureStore({
  reducer: {
    songs: songList,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
