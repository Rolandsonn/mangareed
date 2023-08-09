import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const getGenres = createAsyncThunk("getGenres", async (params) => {
  try {
    const response = await axios.get("api/v1/genre/", { params: params });
    return response.data;
  } catch (error) {
    console.error("getGenres", error);
  }
});

const initialState = {
  genres: [],
  selectedGenres: "",
  isLoading: true,
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    setGenres(state, action) {
      state.selectedGenres = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.isLoading = false;
    });
  },
});

export default genresSlice.reducer;
export const { setGenres } = genresSlice.actions;
