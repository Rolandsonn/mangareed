import React from "react";
import styles from "./BtnAuth.module.scss";
import { Box, Button, Typography } from "@mui/material";
const BtnAuth = ({ openLog, openReg }) => {
  return (
    <Box sx={{ display: "flex", gap: "15px" }}>
      <Button
        onClick={openLog}
        variant="outlined"
        sx={{
          padding: "12px 40px",
          color: "#000",
          border: "2px solid #AD02E0",
          borderRadius: "8px",
          "&:hover": {
            color: "#FFFFFF",
            background: "#AD02E0",
            border: "2px solid #AD02E0",
            boxShadow: "0px 0px 20px #AD02E0",
          },
          "&:active": {
            background: "#740994",
            boxShadow: "inset 0px 0px 20px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <Typography variant="span">Войти</Typography>
      </Button>
      <Button
        onClick={openReg}
        variant="contained"
        color="neutral"
        sx={{
          padding: "12px 40px",
          borderRadius: "8px",
          "&:hover": { color: "#FFFFFF", boxShadow: "0px 0px 20px #AD02E0" },
          "&:active": {
            background: "#740994",
            boxShadow: "inset 0px 0px 20px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <Typography variant="span">Регистрация</Typography>
      </Button>
    </Box>
  );
};

export default BtnAuth;
