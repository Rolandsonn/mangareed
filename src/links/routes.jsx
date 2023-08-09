import DetailsPage from "../pages/DetailsPage";
import HomePage from "../pages/HomePage";

export const authRoutes = [];

export const publicRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:id",
    element: <DetailsPage />,
  },
];
