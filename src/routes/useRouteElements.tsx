import { useRoutes } from "react-router-dom";
import { path } from "src/constants/path.enum";
import AuthenticationLayout from "src/layouts/AuthenticationLayout";
import MainLayout from "src/layouts/MainLayout";
import Homepage from "src/pages/Homepage";
import LoginPage from "src/pages/LoginPage";

function ProtectedRoutes() {
  return <></>;
}

function RejectedRoutes() {
  return <></>;
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
      path: path.login,
      element: (
        <AuthenticationLayout>
          <LoginPage></LoginPage>
        </AuthenticationLayout>
      ),
    },
    {},
  ]);
  return routes;
}
