import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

const MySkeleton = () => {
  return (
    <Stack spacing={1}>
      <Box width={210} height={220} sx={{ position: "relative" }}>
        <Skeleton
          variant="rounded"
          width={190}
          height={220}
          animation="wave"
          sx={{
            borderRadius: "16px",
            padding: "0 10px 11px",
          }}
        />
        <Skeleton
          variant="text"
          width={67}
          height={17}
          sx={{
            fontSize: "1rem",
            position: "absolute",
            bottom: "50px",
            left: "20px",
          }}
        />
        <Skeleton
          variant="text"
          width={140}
          height={40}
          sx={{
            fontSize: "1rem",
            position: "absolute",
            bottom: "10px",
            left: "20px",
          }}
        />
      </Box>
    </Stack>
  );
};
export default MySkeleton;
