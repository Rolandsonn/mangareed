import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/AuthSlice";
import mangas from "./slices/MangasSlice";
import genres from "./slices/GenresSlice";

export const store = configureStore({
  reducer: {
    auth: auth,
    mangas: mangas,
    genres: genres,
  },
});
