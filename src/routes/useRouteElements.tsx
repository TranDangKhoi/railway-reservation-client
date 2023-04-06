import { useContext } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { path } from "src/constants/path.enum";
import { AuthContext } from "src/contexts/auth.context";
import AuthenticationLayout from "src/layouts/AuthenticationLayout";
import MainLayout from "src/layouts/MainLayout";
import Homepage from "src/pages/Homepage";
import LoginPage from "src/pages/LoginPage";
import OrdersPage from "src/pages/OrdersPage";
import PaymentPage from "src/pages/PaymentPage";
import ProfilePage from "src/pages/ProfilePage";
import RegisterPage from "src/pages/RegisterPage";
import TrackDetailsPage from "src/pages/TrackDetailsPage";
import TrackPage from "src/pages/TrackPage";
import UpdateProfilePage from "src/pages/UpdateProfilePage";

function ProtectedRoutes() {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet></Outlet> : <Navigate to={path.login}></Navigate>;
}

function RejectedRoutes() {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Outlet></Outlet> : <Navigate to={path.homepage}></Navigate>;
}

export default function useRouteElements() {
  const routes = useRoutes([
    {
      path: path.homepage,
      index: true,
      element: (
        <MainLayout>
          <Homepage></Homepage>
        </MainLayout>
      ),
    },
    {
      path: "",
      element: <ProtectedRoutes></ProtectedRoutes>,
      children: [
        {
          path: path.payment,
          element: (
            <MainLayout>
              <PaymentPage></PaymentPage>
            </MainLayout>
          ),
        },
        {
          path: path.profile,
          element: (
            <MainLayout>
              <ProfilePage></ProfilePage>
            </MainLayout>
          ),
        },
        {
          path: path.updateProfile,
          element: (
            <MainLayout>
              <UpdateProfilePage></UpdateProfilePage>
            </MainLayout>
          ),
        },
        {
          path: path.orders,
          element: (
            <MainLayout>
              <OrdersPage></OrdersPage>
            </MainLayout>
          ),
        },
      ],
    },
    {
      path: "",
      element: <RejectedRoutes></RejectedRoutes>,
      children: [
        {
          path: path.login,
          element: (
            <AuthenticationLayout>
              <LoginPage></LoginPage>
            </AuthenticationLayout>
          ),
        },
        {
          path: path.register,
          element: (
            <AuthenticationLayout>
              <RegisterPage></RegisterPage>
            </AuthenticationLayout>
          ),
        },
      ],
    },
    {
      path: path.tracks,
      element: (
        <MainLayout>
          <TrackPage></TrackPage>
        </MainLayout>
      ),
    },
    {
      path: path.trackDetails,
      element: (
        <MainLayout>
          <TrackDetailsPage></TrackDetailsPage>
        </MainLayout>
      ),
    },
  ]);
  return routes;
}
