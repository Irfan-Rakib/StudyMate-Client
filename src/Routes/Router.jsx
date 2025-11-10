import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import FindPartners from "../Pages/FindPartners";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Error404 from "../Pages/Error404";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    errorElement: <Error404></Error404>,
    children: [
      { index: true, Component: Home },

      { path: "/find-partners", Component: FindPartners },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
    ],
  },
]);
