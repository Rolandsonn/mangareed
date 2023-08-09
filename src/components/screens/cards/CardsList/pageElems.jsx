import Skeleton from "../../../UI/Skeleton";
import CardsItem from "../CardsItem";
import { Box, List } from "@mui/material";

export const pageElems = (
  state,
  mangas,
  toManga,
  mangasByType,
  mangasByGenres,
  mangasByYears,
  topMangas,
  isLoading
) => {
  if (state === "Mangas")
    return (
      <List
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 190px)",
          gridAutoRows: "max-content",
          gap: "20px",
        }}
      >
        {!isLoading ? (
          mangas?.results?.map((manga) => (
            <CardsItem toManga={toManga} {...manga} key={manga?.id} />
          ))
        ) : (
          <Box>
            <Skeleton />
          </Box>
        )}
      </List>
    );
  else if (state === "Types")
    return !isLoading ? (
      <List
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 190px)",
          gridAutoRows: "max-content",
          gap: "20px",
        }}
      >
        {mangasByType?.results?.map((manga) => (
          <CardsItem toManga={toManga} {...manga} key={manga?.id} />
        ))}
      </List>
    ) : (
      <Box>
        <Skeleton />
      </Box>
    );
  else if (state === "Genres")
    return !isLoading ? (
      <List
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 190px)",
          gridAutoRows: "max-content",
          gap: "20px",
        }}
      >
        {mangasByGenres?.results?.map((manga) => (
          <CardsItem toManga={toManga} {...manga} key={manga?.id} />
        ))}
      </List>
    ) : (
      <Box>
        <Skeleton />
      </Box>
    );
  else if (state === "Years")
    return !isLoading ? (
      <List
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 190px)",
          gridAutoRows: "max-content",
          gap: "20px",
        }}
      >
        {mangasByYears?.map((manga) => (
          <CardsItem toManga={toManga} {...manga} key={manga?.id} />
        ))}
      </List>
    ) : (
      <Box>
        <Skeleton />
      </Box>
    );
  else if (state === "TopMangas")
    return (
      <List
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 190px)",
          gridAutoRows: "max-content",
          gap: "20px",
        }}
      >
        {!isLoading ? (
          topMangas?.results?.map((manga) => (
            <CardsItem
              toManga={toManga}
              {...manga}
              key={manga?.id}
              isLoading={isLoading}
            />
          ))
        ) : (
          <Box>
            <Skeleton />
          </Box>
        )}
      </List>
    );
};
