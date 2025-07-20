import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "aos/dist/aos.css";
import { RouterProvider } from "react-router";
import router from "./Routes/Router";
import AuthProvider from "./Firebase/AuthContext";
import { Toaster } from "react-hot-toast";
import Aos from "aos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initTheme } from "./Hoocks/Api";
import { HelmetProvider } from "react-helmet-async";

Aos.init({
  offset: 120, // Offset (in px) from the original trigger point
  delay: 300, // Delay in ms
  duration: 700, // Animation duration in ms
  easing: "ease", // Default easing for animations
  once: false, // ❗ Animation will trigger every time you scroll into view
  mirror: true,
});

const queryClient = new QueryClient();
initTheme();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        <Toaster />
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
