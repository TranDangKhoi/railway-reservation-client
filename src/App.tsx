import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/auth.context";
import useRouteElements from "./routes/useRouteElements";
import { LocalStorageEventTarget } from "./utils/auth";

function App() {
  const routeElements = useRouteElements();
  const { clearAuthenFromProvider } = useContext(AuthContext);
  useEffect(() => {
    LocalStorageEventTarget.addEventListener("clearAuthen", clearAuthenFromProvider);
    return () => {
      LocalStorageEventTarget.removeEventListener("clearAuthen", clearAuthenFromProvider);
    };
  }, [clearAuthenFromProvider]);
  return <>{routeElements}</>;
}

export default App;
