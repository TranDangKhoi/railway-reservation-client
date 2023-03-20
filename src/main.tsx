import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/auth.context";
import { DropdownProvider } from "./contexts/dropdown.context";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
        <ToastContainer
          progressStyle={{
            background: "#3B71FE",
          }}
          pauseOnHover={false}
        ></ToastContainer>
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
