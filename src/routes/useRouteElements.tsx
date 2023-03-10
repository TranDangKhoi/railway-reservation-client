import { useRoutes } from "react-router-dom";
import { path } from "src/constants/path.enum";
import MainLayout from "src/layouts/MainLayout";
import Homepage from "src/pages/Homepage";

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
  ]);
  return routes;
}
