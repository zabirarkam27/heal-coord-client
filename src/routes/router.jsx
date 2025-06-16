import { createBrowserRouter } from "react-router-dom";
import MainLayout from './../layout/MainLayout';
import Home from "../pages/Home/Home";
import Error from "../pages/Error";
import Login from "../pages/Login/Login";
import JoinUs from './../pages/JoinUs/JoinUs';
import AvailableCamp from "../pages/AvailableCamp/AvailableCamp";
import ShowDetails from "../pages/Home/ShowDetails/ShowDetails";
import PrivateRoutes from './PrivateRoutes';
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import AdminRoute from "./AdminRoute";
import ParticipantRoute from "./ParticipantRoute";
import ParticipantDashboard from "../layout/ParticipantDashboard";
import AdminProfile from './../pages/Dashboard/AdminDashboard/AdminProfile';
import AddCamp from "../pages/Dashboard/AdminDashboard/AddCamp";
import ManageCamps from './../pages/Dashboard/AdminDashboard/ManageCamps';
import UpdateCamp from "../pages/Dashboard/AdminDashboard/UpdateCamp";
import ManageRegisteredCamps from "../pages/Dashboard/AdminDashboard/ManageRegisteredCamps";
import Analytics from './../pages/Dashboard/ParticipantDashboard/Analytics';
import ParticipantProfile from './../pages/Dashboard/ParticipantDashboard/ParticipantProfile';
import RegisteredCamps from "../pages/Dashboard/ParticipantDashboard/RegisteredCamps";


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
      {
        path: "/admin-dashboard",
        element: (
          <AdminRoute>
            <AdminDashboardLayout />
          </AdminRoute>
        ),
        children: [
          {
            path: "profile",
            element: <AdminProfile />,
          },
          {
            path: "add-camp",
            element: <AddCamp />,
          },
          {
            path: "manage-camps",
            element: <ManageCamps />,
          },
          {
            path: "update-camp/:id",
            element: <UpdateCamp />,
          },

          {
            path: "manage-registered",
            element: <ManageRegisteredCamps />,
          },
        ],
      },
      {
        path: "/participant-dashboard",
        element: (
          <ParticipantRoute>
            <ParticipantDashboard />
          </ParticipantRoute>
        ),
        children: [
          {
            path: "analytics",
            element: <Analytics />,
          },
          {
            path: "participant-profile",
            element: <ParticipantProfile />,
          },
          {
            path: "registered-camps",
            element: <RegisteredCamps />,
          },
        ],
      },
    ],
  },
]);

export default router;
