import { publicRoutes } from "./routes.jsx";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import { ThemeProvider } from "@mui/material";
import { theme } from "../components/Theme.js";

export default function AppRouter() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          {/* {authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))} */}

          <Route path="/" element={<Layout />}>
            {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}
