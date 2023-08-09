import { CustomPagination } from "./screens/Pagination/CustomPagination";

export const paginationElems = (
  state,
  changeOffset,
  mangas,
  mangasByYears,
  mangasByGenres,
  mangasByType,
  topMangas
) => {
  if (state === "Mangas")
    return (
      <CustomPagination
        changePage={changeOffset}
        count={Math.ceil(mangas?.count / 12)}
      />
    );
  else if (state === "Types")
    return (
      <CustomPagination
        changePage={changeOffset}
        count={Math.ceil(mangasByType?.count / 12)}
      />
    );
  else if (state === "Genres")
    return (
      <CustomPagination
        changePage={changeOffset}
        count={Math.ceil(mangasByGenres?.count / 12)}
      />
    );
  else if (state === "Years")
    return (
      <CustomPagination
        changePage={changeOffset}
        count={Math.ceil(mangasByYears?.length / 12)}
      />
    );
  else if (state === "TopMangas")
    return (
      <CustomPagination
        changePage={changeOffset}
        count={Math.ceil(topMangas?.count / 12)}
      />
    );
};
