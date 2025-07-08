import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RootLayout from "./Root/RootLayout";
import { RouterProvider } from "react-router";
import router from "./Routes/Router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <RootLayout />
    </RouterProvider>
  </StrictMode>
);
