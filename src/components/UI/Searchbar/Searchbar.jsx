import React, { useState, useEffect } from "react";
import { CustomSTextField } from "../../Theme";
import { searchManga, setSearch } from "../../../redux/slices/MangasSlice";
import { Box, InputAdornment } from "@mui/material";
import searchIcon from "../../../assets/icon/search-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import SearchModal from "../../screens/SearchModal/SearchModal";

const Searchbar = () => {
  const dispatch = useDispatch();

  const [modalSearch, setModalSearch] = useState(false);
  const [media, setMedia] = useState(["3px", "1"]);
  const searchResults = useSelector((state) => state.mangas.search);
  const search = useSelector((state) => state.mangas.searchText);

  const hide = () => {
    setMedia(["3px", "1"]);
    setTimeout(() => {
      setModalSearch(false);
    }, 1000);
  };

  function searchModalSet(state) {
    if (state === true) {
      return (
        searchResults?.length > 0 && (
          <SearchModal
            results={searchResults?.length > 0 && searchResults}
            sx={{ display: "block" }}
          />
        )
      );
    } else {
      return false;
    }
  }

  useEffect(() => {
    dispatch(
      searchManga({
        search: search !== "" && search,
      })
    );
  }, [search, dispatch]);

  return (
    <Box sx={{ position: "relative" }}>
      <CustomSTextField
        sx={{ height: "56px", width: "342px" }}
        variant="outlined"
        placeholder="Поиск..."
        onClick={() => setModalSearch(true)}
        onChange={(e) => {
          dispatch(setSearch(e.target.value));
        }}
        onFocus={() => setMedia(["-16px", "0"])}
        onBlur={() => hide()}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img
                src={searchIcon}
                alt="loop"
                width={24}
                height={24}
                style={{
                  borderRadius: "8px",
                  opacity: media[1],
                  marginRight: media[0],
                  transition: ".4s",
                }}
              />
            </InputAdornment>
          ),
        }}
      />
      {searchModalSet(modalSearch)}
    </Box>
  );
};

export default Searchbar;
