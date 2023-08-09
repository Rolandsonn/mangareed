import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { logoutUser } from "../../../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";

const Profile = ({ account, refreshToken }) => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(
      logoutUser({
        refresh: refreshToken,
      })
    );
    localStorage.removeItem("tokenAccess");
    localStorage.removeItem("tokenRefresh");
    localStorage.removeItem("account");
    localStorage.setItem("isAuth", false);
    location.reload();
  };
  const image_file = JSON.parse(localStorage.getItem("image_file"));
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Box>
        <Typography variant="span" sx={{ color: "#000", fontSize: "24px" }}>
          {account?.username}
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${image_file && image_file})`,
          width: "80px",
          height: "80px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          borderRadius: "50%",
        }}
      ></Box>
      <Button variant="contained" onClick={logOut}>
        <Typography variant="span">Выйти</Typography>
      </Button>
    </Box>
  );
};

export default Profile;
