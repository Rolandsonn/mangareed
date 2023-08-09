import React from "react";
import CardsItem from "../CardsItem";
import { List } from "@mui/material";

const CardsList = ({
  mangas,
  toManga,
  page,
  mangasByType,
  mangasByGenres,
  mangasByYears,
  topMangas,
}) => {
  let cardsElem = null;
  console.log(mangasByYears);
  if (page === "Mangas") {
    cardsElem = mangas?.results?.map((card) => (
      <CardsItem key={card.id} {...card} toManga={toManga} />
    ));
  } else if (page === "Types") {
    cardsElem = mangasByType?.results?.map((card) => (
      <CardsItem key={card.id} {...card} toManga={toManga} />
    ));
  } else if (page === "Genres") {
    cardsElem = mangasByGenres?.results?.map((card) => (
      <CardsItem key={card.id} {...card} toManga={toManga} />
    ));
  } else if (page === "Years") {
    cardsElem = mangasByYears?.results?.map((card) => (
      <CardsItem key={card.id} {...card} toManga={toManga} />
    ));
  } else if (page === "TopMangas") {
    cardsElem = topMangas?.results?.map((card) => (
      <CardsItem key={card.id} {...card} toManga={toManga} />
    ));
  }
  return (
    <List
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 190px)",
        gridAutoRows: "max-content",
        gap: "20px",
      }}
    >
      {cardsElem}
    </List>
  );
};

export default CardsList;
