import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  FormHelperText,
  TextField,
  Alert,
} from "@mui/material";
import { registerUser } from "../../../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegModal = ({ users }) => {
  const dispatch = useDispatch();
  const [uplFile, setUplFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);
  const isAuth = JSON.parse(localStorage.getItem("isAuth"));
  const navigate = useNavigate();
  const fileReader = new FileReader();
  fileReader.onloadend = () => setFileURL(fileReader.result);

  const setFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setUplFile(file);
    setFileURL(URL.createObjectURL(file));
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };
  //? Логика регистрации пользователя
  const handleRegister = () => {
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      nickname.trim() === "" ||
      !uplFile
    ) {
      setSnackbarMessage("Заполните все поля!");
      setIsSnackbarOpen(true);
      setError("error");
    } else if (
      username.length < 10 ||
      password.length < 8 ||
      nickname.length < 10
    ) {
      setSnackbarMessage("Имя и Никнейм должен состоять 10 букв и более");
      setIsSnackbarOpen(true);
      setError("error");
    } else if (users.find((u) => u.username === username)) {
      setSnackbarMessage("Такой пользователь уже зарегистрирован");
      setIsSnackbarOpen(true);
      setError("warning");
    } else {
      let dataReg = {
        username: username,
        nickname: nickname,
        password: password,
        image_file: uplFile,
      };
      localStorage.setItem("image_file", JSON.stringify(uplFile));
      dispatch(registerUser(dataReg));
      setSnackbarMessage("Вы успешно зарегистрировались");
      setIsSnackbarOpen(true);
      setError("success");
      handleSnackbarClose();
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(false);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  return (
    <Box
      sx={{
        width: "600px",
        height: "650px",
        paddingTop: "40px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${fileURL ? fileURL : "Выберите картинку"})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            border: "1px solid",
          }}
        ></Box>
        <Button
          sx={{
            fontWeight: "400",
            fontSize: "16px",
            marginTop: "21px",
            marginBottom: "40px",
            color: "#000",
            background: "none",
          }}
          component="label"
        >
          Добавить фото
          <input
            type="file"
            onChange={setFile}
            hidden
            accept="image/*,.png,.jpg,.gif,.web,"
            multiple
          />
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: "30px",
        }}
      >
        <TextField
          onChange={handleUsernameChange}
          placeholder="Username"
          sx={{ width: "500px" }}
          error={usernameError}
          value={username}
        />
        <TextField
          onChange={handleNicknameChange}
          placeholder="Nickname"
          sx={{ width: "500px" }}
          error={passwordError}
          value={nickname}
        />
        <TextField
          onChange={handlePasswordChange}
          placeholder="Password"
          sx={{ width: "500px" }}
          required
          error={passwordError}
          value={password}
        />

        <Button
          onClick={handleRegister}
          variant="contained"
          sx={{ padding: "15px 186px" }}
        >
          <Typography variant="span">Регистрация</Typography>
        </Button>

        <Box sx={{ position: "absolute", bottom: "62%", width: "300px" }}>
          <Snackbar
            sx={{ position: "absolute", width: "300px" }}
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
          >
            <Alert onClose={handleSnackbarClose} severity={error}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
        <FormHelperText error={false}> </FormHelperText>
      </Box>
    </Box>
  );
};

export default RegModal;
