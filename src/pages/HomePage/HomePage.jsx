import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import FirstFilter from "../../components/screens/Filters/FirstFilter";
import {
  getMangas,
  setMangasByType,
  getMangasByTypes,
  setMangasByYear,
  getMangasByGenres,
  setMangaId,
  getTopMangas,
  setMangaByGenre,
} from "../../redux/slices/MangasSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getGenres } from "../../redux/slices/genresSlice";
import SecondFilter from "../../components/screens/Filters/SecondFilter";
import { pageElems } from "../../components/screens/cards/CardsList/pageElems";
import { paginationElems } from "../../components/PaginationsElems";

const HomePage = () => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const [all, setAll] = useState(false);
  const [page, setPage] = useState("TopMangas");
  const startYear = useSelector((state) => state.mangas.startYear);
  const endYear = useSelector((state) => state.mangas.endYear);
  const types = useSelector((state) => state.mangas.types);
  const mangas = useSelector((state) => state.mangas.mangas);
  const topMangas = useSelector((state) => state.mangas.topMangas);
  const mangasByGenres = useSelector((state) => state.mangas.mangaByGenres);
  const mangasByType = useSelector((state) => state.mangas.mangasByType);
  const mangasByYears = useSelector((state) => state.mangas.mangasByYears);
  const genres = useSelector((state) => state.genres.genres);
  const selectedGenres = useSelector((state) => state.genres.selectedGenres);
  const isLoading = useSelector((state) => state.mangas.isLoading);
  const toManga = (id) => dispatch(setMangaId(id));

  useEffect(() => {
    dispatch(
      getTopMangas({
        limit: 12,
        offset: offset,
      })
    );
  }, [offset, dispatch]);

  useEffect(() => {
    dispatch(
      getMangas({
        limit: 12,
        offset: offset,
      })
    );
  }, [dispatch, HomePage]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getMangasByGenres({
        limit: 12,
        offset: offset,
        genre__title: selectedGenres,
      })
    );
  }, [offset, dispatch, selectedGenres]);

  useEffect(() => {
    dispatch(
      getMangasByTypes({
        limit: 12,
        offset: offset,
        type: "",
      })
    );
  }, [dispatch]);

  const confirm = (type) => {
    dispatch(
      getMangasByTypes({
        limit: 12,
        offset: offset,
        type: type,
      })
    );
  };

  const confirmGenres = (selectedGenres) => {
    dispatch(
      getMangasByGenres({
        limit: 12,
        offset: offset,
        genre__title: selectedGenres,
      })
    );
    setPage("Genres");
  };

  const changeFilter = () => {
    setAll(!all);
    dispatch(
      setMangasByType({
        count: 0,
        results: [],
      })
    );
    dispatch(setMangasByYear([]));
    setPage("TopMangas");
  };

  const resetAll = () => {
    dispatch(
      getMangas({
        limit: 12,
        offset: offset,
      })
    );
    dispatch(
      setMangasByType({
        count: 0,
        results: [],
      })
    );
    dispatch(setMangasByYear([]));
    dispatch(
      setMangaByGenre({
        count: 0,
        return: [],
      })
    );
  };

  const filterTypeMangasByYears = (startYear, endYear) => {
    dispatch(
      setMangasByYear(
        mangasByType?.results?.filter(
          (item) => item?.issue_year >= startYear && item?.issue_year <= endYear
        )
      )
    );
    setPage("Years");
  };

  const filterMangasByYears = (startYear, endYear) => {
    dispatch(
      setMangasByYear(
        mangas?.results?.filter(
          (item) => item?.issue_year >= startYear && item?.issue_year <= endYear
        )
      )
    );
    setPage("Years");
  };

  const changeOffset = (p) => setOffset(p);
  const changePage = () => setPage("Genres");
  const changePageToTypes = () => setPage("Types");

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F3F3F3",
          marginTop: "84px",
          padding: "32px 0",
        }}
      >
        <Container
          fixed
          sx={{ "&.MuiContainer-root": { padding: 0, width: 1240 } }}
        >
          <Box sx={{ display: "flex", gap: "20px" }}>
            {!all ? (
              <FirstFilter
                changePageToTypes={changePageToTypes}
                changeFilter={changeFilter}
                types={types}
                mangasByYears={mangasByYears}
                resetAll={resetAll}
                startYear={startYear}
                endYear={endYear}
                confirm={confirm}
                offset={offset}
                changeOffset={changeOffset}
                filterByYears={filterMangasByYears}
                filterTypeByYear={filterTypeMangasByYears}
              />
            ) : (
              <SecondFilter
                changePage={changePage}
                selectedGenres={selectedGenres}
                changeFilter={changeFilter}
                confirmGenres={confirmGenres}
                resetAll={resetAll}
                offset={offset}
                changeOffset={changeOffset}
                filterByYears={filterMangasByYears}
                genres={genres}
              />
            )}
            {pageElems(
              page,
              mangas,
              toManga,
              mangasByType,
              mangasByGenres,
              mangasByYears,
              topMangas,
              isLoading
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", padding: "" }}>
            {paginationElems(
              page,
              changeOffset,
              mangas,
              mangasByYears,
              mangasByGenres,
              mangasByType,
              topMangas
            )}
          </Box>
        </Container>
      </Box>
      )
    </>
  );
};

export default HomePage;
