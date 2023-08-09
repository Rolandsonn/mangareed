import { Box, Typography } from "@mui/material";
import React from "react";

const Comment = ({ user }) => {
  return (
    <Box sx={{ display: "flex", gap: "26px", padding: "0 10px" }}>
      <Box
        sx={{
          backgroundImage: `${user?.image_file}`,
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "black",
        }}
      ></Box>
      <img src={user?.image_file} alt="" />
      <Box
        sx={{
          paddingLeft: "26px",
          width: "1063px",
          display: "flex",
          flexWrap: "wrap",
          borderLeft: "2px solid #878787",
        }}
      >
        <Typography variant="h2">{user?.username || user?.nickname}</Typography>
        <Typography paragraph sx={{ color: "#878787", marginBottom: "0" }}>
          {user?.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default Comment;
