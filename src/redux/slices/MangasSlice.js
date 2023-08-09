import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const getMangas = createAsyncThunk("getMangas", async (params) => {
  try {
    const response = await axios.get("/api/v1/manga/", { params: params });
    return response.data;
  } catch (error) {
    console.error("getMangas", error);
  }
});

export const getManga = createAsyncThunk("fetchManga", async (id) => {
  try {
    const response = await axios.get(`/api/v1/manga/${id}/`);

    return response.data;
  } catch (error) {
    console.error(error + "FetchManga failed");
  }
});

export const postComm = createAsyncThunk("postComm", async (data) => {
  const { id, text } = data;
  const response = await axios.post(`api/v1/manga/${id}/add-comment/`, text, {
    headers: {
      Authorization: `Bearer ${JSON.parse(
        JSON.stringify(localStorage.getItem("tokenAccess"))
      )}`,
    },
  });
  return response;
});

export const getTopMangas = createAsyncThunk(
  "topMangas/getTopMangas",
  async (params) => {
    try {
      const response = await axios.get("/api/v1/top-manga/", {
        params: params,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const searchManga = createAsyncThunk(
  "search/searchManga",
  async (params) => {
    try {
      const response = await axios.get("api/v1/top-manga/", { params: params });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getMangasByTypes = createAsyncThunk(
  "mangaByTypes/getMangasByTypes",
  async (params) => {
    try {
      const response = await axios.get("api/v1/manga/", { params: params });
      return response.data;
    } catch (error) {
      console.log("getMangasByTypes error", error);
    }
  }
);

export const getMangasByGenres = createAsyncThunk(
  "mangaByGenres/getMangasByGenres",
  async (params) => {
    try {
      const response = await axios.get("api/v1/manga/", { params: params });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getComments = createAsyncThunk(
  "mangaComments/getComments",
  async (id) => {
    try {
      const response = await axios.get(`api/v1/manga/${id}/comments/`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
const initialState = {
  search: [],
  searchText: "",
  mangas: {
    count: 0,
    results: [],
  },
  topMangas: {
    count: 0,
    results: [],
  },
  comments: [],
  manga: {
    comments_count: 0,
    results: {},
  },
  mangaId: 212,
  mangasByType: {
    count: 0,
    results: [],
  },
  mangasByYears: [],
  mangaByGenres: {
    count: 0,
    results: [],
  },
  types: "",
  startYear: 0,
  endYear: 0,
  users: [],
  isLoading: true,
};

const mangasSlice = createSlice({
  name: "manga",
  initialState,
  reducers: {
    setStartYear(state, action) {
      state.startYear = action.payload;
    },
    setEndYear(state, action) {
      state.endYear = action.payload;
    },
    setMangasByType(state, action) {
      state.mangasByType = action.payload;
    },
    setResults(state, action) {
      state.mangas = action.payload;
    },
    setMangasByYear(state, action) {
      state.mangasByYears = action.payload;
    },
    setTypes(state, action) {
      state.types = action.payload;
    },
    setManga(state, action) {
      state.manga = action.payload;
    },
    setMangaId(state, action) {
      state.mangaId = action.payload;
    },
    setMangaByGenre(state, action) {
      state.mangaByGenres = action.payload;
    },
    setSearch(state, action) {
      state.searchText = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getMangas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMangas.fulfilled, (state, action) => {
      state.mangas = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getManga.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getManga.fulfilled, (state, action) => {
      state.manga = action.payload;
      state.isLoading = false;
    });
    builder.addCase(searchManga.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchManga.fulfilled, (state, action) => {
      state.search = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getMangasByGenres.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMangasByGenres.fulfilled, (state, action) => {
      state.mangaByGenres = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getTopMangas.fulfilled, (state, action) => {
      state.topMangas = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getMangasByTypes.fulfilled, (state, action) => {
      state.mangasByType = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getMangasByTypes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTopMangas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getComments.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default mangasSlice.reducer;
export const {
  setMangasByType,
  setSearch,
  setMangaByGenre,
  setMangaId,
  setStartYear,
  setEndYear,
  setResults,
  setMangasByYear,
  setTypes,
  setManga,
} = mangasSlice.actions;
