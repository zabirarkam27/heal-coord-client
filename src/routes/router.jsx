import { createBrowserRouter } from "react-router-dom";
import MainLayout from './../layout/MainLayout';
import Home from "../pages/Home/Home";
import Error from "../pages/Error";
import Login from "../pages/Login/Login";
import JoinUs from './../pages/JoinUs/JoinUs';
import AvailableCamp from "../pages/AvailableCamp/AvailableCamp";
import ShowDetails from "../pages/Home/ShowDetails/ShowDetails";
import PrivateRoutes from './PrivateRoutes';

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
        element: <JoinUs />,
      },
      {
        path: "/available-camps",
        element: <AvailableCamp />,
      },
      {
        path: "/camp-details/:campId",
        element: (
          <PrivateRoutes>
            <ShowDetails />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
