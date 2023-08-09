import React, { useState, useEffect } from "react";

import { Box, AppBar, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/slices/AuthSlice";

import AuthModals from "../../screens/AuthModals/AuthModals";

import Searchbar from "../../UI/Searchbar";
import Logo from "../../UI/Logo";
import Profile from "../../screens/Profile";
import BtnAuth from "../../UI/BtnAuth";
const Header = () => {
  const [open, setOpen] = React.useState(false);
  const [log, setLog] = useState("Reg");
  const [modalStyle, setModalStyle] = useState(["none", "static"]);
  const dispatch = useDispatch();

  let { isAuth, users, dataUser } = useSelector((state) => state.auth);

  let account =
    users.length > 0 &&
    dataUser &&
    users.find((user) => user.username === dataUser.username);
  let refreshToken = JSON.parse(
    JSON.stringify(localStorage.getItem("tokenRefresh"))
  );
  if (!account) account = JSON.parse(localStorage.getItem("account"));
  if (!isAuth) isAuth = JSON.parse(localStorage.getItem("isAuth"));

  const closeModal = () => {
    setOpen(false);
    setModalStyle(["none", "static"]);
    setLog("Log");
  };

  const openRegModal = () => {
    setOpen(true);
    setModalStyle(["block", "absolute"]);
    setLog("Reg");
  };

  const openLogModal = () => {
    setOpen(true);
    setModalStyle(["block", "absolute"]);
    setLog("Log");
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <AppBar sx={{ background: "#f3f3f3" }}>
      <Container
        fixed
        sx={{ "&.MuiContainer-root": { padding: 0, width: 1240 } }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo className={"title"} />
          <Searchbar />
          {isAuth ? (
            <Profile account={account && account} refreshToken={refreshToken} />
          ) : (
            <BtnAuth openLog={openLogModal} openReg={openRegModal} />
          )}
          <AuthModals
            account={account && account}
            openLog={openLogModal}
            openReg={openRegModal}
            users={users}
            open={open}
            displayType={modalStyle}
            modalType={log}
            closeModal={closeModal}
          />
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
