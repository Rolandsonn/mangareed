import React, { useState } from "react";
import {
  Box,
  Button,
  Snackbar,
  Checkbox,
  Typography,
  TextField,
} from "@mui/material";
import {
  authUser,
  setPassword,
  setUsername,
} from "../../../redux/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const LogModal = ({ account }) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const dispatch = useDispatch();
  const { username, password } = useSelector((state) => state.auth.dataUser);
  const logData = useSelector((state) => state.auth.dataUser);

  const loginUser = (event) => {
    event.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      setSnackbarMessage("Заполните все поля!");
      setIsSnackbarOpen(true);
    } else if (username.length) {
    } else {
      localStorage.setItem("account", JSON.stringify(account));
      dispatch(authUser(logData));
      setSnackbarMessage("Вы успешно вошли в свой аккаунт!");
      setIsSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Box>
      <Box
        sx={{
          paddingTop: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: "30px",
        }}
      >
        <TextField
          onChange={(e) => dispatch(setUsername(e.target.value))}
          placeholder="Username"
          sx={{ width: "500px" }}
        />
        <TextField
          onChange={(e) => dispatch(setPassword(e.target.value))}
          placeholder="Password"
          sx={{ width: "500px" }}
        />
      </Box>
      <Box
        sx={{
          paddingTop: "30px",
          display: "flex",
          flexDirection: "column",
          rowGap: "30px",
        }}
      >
        <Box
          sx={{
            borderColor: "#AD02E0",
            display: "flex",
            columnGap: "10px",
            alignItems: "center",
          }}
        >
          <Checkbox size="large" />
          <Typography variant="h4" sx={{ color: "#878787" }}>
            Запомнить меня
          </Typography>
        </Box>
        <Button
          onClick={loginUser}
          variant="contained"
          sx={{ padding: "15px 186px", width: "100%" }}
        >
          <Typography variant="span">Войти</Typography>

          <Box sx={{ position: "absolute", top: "1%" }}>
            <Snackbar
              sx={{ position: "absolute" }}
              ContentProps={{
                sx: {
                  background: "red",
                  height: "40px",
                  padding: "0px",
                  paddingLeft: "10px",
                },
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
                overflow: "hidden",
              }}
              open={isSnackbarOpen}
              autoHideDuration={5000}
              onClose={handleSnackbarClose}
              message={snackbarMessage}
            />
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

export default LogModal;
