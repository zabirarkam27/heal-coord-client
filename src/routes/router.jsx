import { createBrowserRouter } from "react-router-dom";
import MainLayout from './../layout/MainLayout';
import Home from "../pages/Home/Home";
import Error from "../pages/Error";
import Login from "../pages/Login/Login";
import JoinUs from './../pages/JoinUs/JoinUs';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/join-us",
        element: <JoinUs/>,
      },
    ],
  },
]);

export default router;
