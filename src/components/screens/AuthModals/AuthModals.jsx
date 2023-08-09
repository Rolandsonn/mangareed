import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LogModal from "./LogModal";
import RegModal from "./RegModal";
import { createPortal } from "react-dom";

const myModal = document.getElementById("modal-root");

const AuthModals = (props) => {
  const {
    users,
    openReg,
    openLog,
    open,
    modalType,
    displayType,
    closeModal,
    account,
  } = props;

  return createPortal(
    <Box sx={{ display: `${displayType[0]}`, position: `${displayType[1]}` }}>
      <Modal
        open={open}
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClose={closeModal}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "30px",
            padding: "20px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              cursor: "pointer",
            }}
          >
            <CloseIcon onClick={closeModal} />
          </Box>
          <Box
            sx={{
              display: "flex",
              columnGap: "30px",
              borderBottom: "2px solid #878787",
            }}
          >
            <Button
              sx={{
                color: "#000",
                borderBottom: `${modalType === "Log" && "4px solid #AD02E0"}`,
                transition: ".3s",
                ":hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Typography
                onClick={openLog}
                variant="span"
                sx={{ fontSize: "24px" }}
              >
                Вход
              </Typography>
            </Button>
            <Button
              onClick={openReg}
              sx={{
                color: "#000",
                borderBottom: `${modalType === "Reg" && "5px solid #AD02E0"}`,
                ":hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Typography variant="span" sx={{ fontSize: "24px" }}>
                Регистрация
              </Typography>
            </Button>
          </Box>
          {modalType === "Log" ? (
            <LogModal account={account} />
          ) : (
            <RegModal users={users} />
          )}
        </Box>
      </Modal>
    </Box>,
    myModal
  );
};

export default AuthModals;
