import React from "react";
import { Link } from "react-router-dom";
import { ListItem, Typography, Box } from "@mui/material";
import Skeleton from "../../../UI/Skeleton";
import { useSelector } from "react-redux";
const CardsItem = ({ image, ru_name, issue_year, id, toManga, isLoading }) => {
  // const isLoading = useSelector((state) => state.mangas.isLoading);

  return (
    <ListItem sx={{ width: "190px", padding: "0" }}>
      {!isLoading ? (
        <Link to={`/${id}`}>
          <Box
            onClick={() => toManga(id)}
            sx={{
              backgroundImage: `url(${image})`,
              borderRadius: "16px",
              width: "190px",
              height: "220px",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              rowGap: "11px",
              padding: "0 10px 11px",
            }}
          >
            <Typography variant="p" sx={{ fontSize: "14px", color: "#FFFFFF" }}>
              {`Год: ${issue_year}`}
            </Typography>
            <Typography
              variant="span"
              sx={{ color: "#FFFFFF", fontWeight: 500 }}
            >
              {ru_name}
            </Typography>
          </Box>
        </Link>
      ) : (
        <Box>
          <Skeleton />
        </Box>
      )}
    </ListItem>
  );
};

export default CardsItem;
